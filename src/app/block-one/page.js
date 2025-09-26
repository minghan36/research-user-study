"use client";

import { useEffect, useState, useRef } from "react";
import { useParticipant } from "../../contexts/ParticipantContext";
import { initJsPsych } from "jspsych";
import htmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";
import { realWords1, nonWords1 } from "../../../lib/words";
import { useRouter } from "next/navigation";

export default function BlockOnePage() {
  const { participantId, groupNumber, setParticipantId } = useParticipant();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const isCreatingParticipant = useRef(false);
  const router = useRouter();

  useEffect(() => {
    const createNewParticipant = async () => {
      if (participantId == null && !isLoading && !isCreatingParticipant.current) {
        isCreatingParticipant.current = true; // Set immediately (synchronous)
        try {
          setIsLoading(true);
          const response = await fetch("/api/participant", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ groupNumber: groupNumber }),
          });

          if (!response.ok) {
            throw new Error("Failed to create participant");
          }

          const data = await response.json();
          console.log("Participant created:", data.participantId);
          setParticipantId(data.participantId);
        } catch (err) {
          console.error("Error creating participant:", err);
          setError("Failed to initialize participant. Please try again.");
          isCreatingParticipant.current = false;
        } finally {
          setIsLoading(false);
        }
      }
    };

    createNewParticipant();
  }, []);

  useEffect(() => {
    // Initialize jsPsych and timeline only when participant is ready
    if (participantId && !isLoading && !error && !isStarted) {
      // Initialize jsPsych
      const jsPsych = initJsPsych({
        on_finish: function () {
          var trials = jsPsych.data.get().filter({ task: "response" }).trials;
          console.log("Experiment completed!");
          console.log(trials);

          var formattedData = trials.map((trial) => ({
            block: 1,
            colour: trial.colour,
            isWord: trial.is_word,
            isCorrect: trial.correct,
            responseTime: trial.rt,
            participantId: participantId,
            trialNumber: trial.trial_counter,
          }));

          fetch("/api/response", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formattedData),
          });
          var endTime = new Date().toISOString();
          var start = jsPsych.data.get().filter({ task: "start" }).trials;
          var mean = jsPsych.data.get().filter({ task: "response" }).select("rt").mean();
          var accuracy = jsPsych.data.get().filter({ task: "response", correct: true }).count() / jsPsych.data.get().filter({ task: "response" }).count();
          fetch("/api/participant", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              participantId: participantId,
              startBlockOne: start[0].timeStamp,
              endBlockOne: endTime,
              blockOneMean: mean,
              blockOneAccuracy: accuracy,
            }),
          });

          router.push("/break");
        },
      });
      // Create a simple experiment timeline
      var timeline = [];
      var startTime = null
      var welcome = {
        type: htmlKeyboardResponse,
        stimulus: '<div style="height:100vh; display:flex; justify-content:center; align-items:center;">Press any key to start</div>',
        data: {
          task: "start",
        },
        on_finish: function (data) {
          startTime = new Date()
          data.timeStamp = startTime.toISOString();
        }
      }
      timeline.push(welcome);

      // Create stimuli array with real words and non-words
      var testStimuli = [];

      // Add real words (orange, response 'n')
      realWords1.forEach((word) => {
        testStimuli.push({
          stimulus: `<div style="color: orange; font-size: 48px; font-weight: bold;">${word}</div>`,
          colour: "orange",
          correct_response: "n",
          is_word: true,
        });
      });

      // Add non-words (blue, response 'c')
      nonWords1.forEach((nonWord) => {
        testStimuli.push({
          stimulus: `<div style="color: blue; font-size: 48px; font-weight: bold;">${nonWord}</div>`,
          colour: "blue",
          correct_response: "c",
          is_word: false,
        });
      });

      var fixation = {
        type: htmlKeyboardResponse,
        stimulus:
          '<div style="height:100vh; display:flex; justify-content:center; align-items:center; flex-direction:column;"><div style="font-size:60px;">+</div><div style="font-size:18px; margin-top:20px;">Press C for non-word and N for word</div></div>',
        choices: "NO_KEYS",
        trial_duration: 1000,
      };
      let trial_counter = 0;
      // Create test trials
      var test = {
        type: htmlKeyboardResponse,
        stimulus: function () {
          const stim = `<div style="height:100vh; display:flex; justify-content:center; align-items:center; flex-direction:column;">${jsPsych.evaluateTimelineVariable("stimulus")}<div style="font-size:18px; margin-top:20px;">Press C for non-word and N for word</div></div>`;
          return stim;
        },
        choices: ["c", "n"],
        data: {
          task: "response",
          correct_response: jsPsych.timelineVariable("correct_response"),
          colour: jsPsych.timelineVariable("colour"),
          is_word: jsPsych.timelineVariable("is_word"),
        },
        on_finish: function (data) {
          data.correct = jsPsych.pluginAPI.compareKeys(
            data.response,
            data.correct_response
          );
          trial_counter++;
          data.trial_counter = trial_counter;
          const timeElapsed = new Date() - startTime;
          if (timeElapsed > 20000) { 
            return jsPsych.abortExperiment("");
          }
        },
      };

      // Create timeline with repeated trials
      var testProcedure = {
        timeline: [fixation, test],
        timeline_variables: testStimuli,
        sample: {
          type: "fixed-repetitions",
          size: 1,
        },
      };

      timeline.push(testProcedure);

      // Start the experiments
      setIsStarted(true);
      jsPsych.run(timeline);
    }
  }, [participantId, isLoading, error, isStarted]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Initializing participant...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            Error
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
}
