"use client";

import { useEffect, useState } from "react";
import { useParticipant } from "../../contexts/ParticipantContext";
import { initJsPsych } from "jspsych";
import htmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";
import {
  realWords1,
  nonWords1,
} from "../../../lib/words";
import { useRouter } from "next/navigation";

export default function BlockOnePage() {
  const { participantId, groupNumber, setParticipantId } = useParticipant();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const createNewParticipant = async () => {
      if (!isStarted) {
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
          setParticipantId(data.participantId);
        } catch (err) {
          console.error("Error creating participant:", err);
          setError("Failed to initialize participant. Please try again.");
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
          var trials = jsPsych.data.get().filter({task: 'response'}).trials;
          console.log("Experiment completed!");
          console.log(trials);

          var formattedData = trials.map(trial => ({
            block: 1,
            colour: trial.colour,
            isWord: trial.is_word,
            isCorrect: trial.correct,
            responseTime: trial.rt,
            participantId: participantId,
          }));

          fetch("/api/response", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formattedData),
          })

          router.push("/break");
        },
      });
      // Create a simple experiment timeline
      var timeline = [];

      var welcome = {
        type: htmlKeyboardResponse,
        stimulus: "Press any key to begin.",
      };
      timeline.push(welcome);

      // Create stimuli array with real words and non-words
      var testStimuli = [];
      
      // Add real words (orange, response 'n')
      realWords1.forEach(word => {
        testStimuli.push({
          stimulus: `<div style="color: orange; font-size: 48px; font-weight: bold;">${word}</div>`,
          colour: "orange",
          correct_response: "n",
          is_word: true
        });
      });
      
      // Add non-words (blue, response 'c')
      nonWords1.forEach(nonWord => {
        testStimuli.push({
          stimulus: `<div style="color: blue; font-size: 48px; font-weight: bold;">${nonWord}</div>`,
          colour: "blue",
          correct_response: "c",
          is_word: false
        });
      });

      var fixation = {
        type: htmlKeyboardResponse,
        stimulus: '<div style="font-size:60px;">+</div>',
        choices: "NO_KEYS",
        trial_duration: 1000,
      };

      // Create test trials
      var test = {
        type: htmlKeyboardResponse,
        stimulus: jsPsych.timelineVariable("stimulus"),
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
        },
      };

      // Create timeline with repeated trials
      var testProcedure = {
        timeline: [fixation, test],
        prompt: "Press 'C' for non-word, 'N' for word",
        timeline_variables: testStimuli,
        sample: {
          type: "fixed-repetitions",
          size: 1
        }
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
