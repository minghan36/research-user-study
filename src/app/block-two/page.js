"use client";

import { useEffect, useState, useRef } from "react";
import { useParticipant } from "../../contexts/ParticipantContext";
import { initJsPsych } from "jspsych";
import htmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";
import {
  realWords1,
  nonWords1,
} from "../../../lib/words";
import { useRouter } from "next/navigation";

export default function BlockTwoPage() {
  const { participantId } = useParticipant();
  const hasInitialized = useRef(false);
  const router = useRouter();

  useEffect(() => {
    // Initialize jsPsych and timeline only when participant is ready
    if (participantId && !hasInitialized.current) {
      hasInitialized.current = true;
      // Initialize jsPsych
      const jsPsych = initJsPsych({
        on_finish: function () {
          var trials = jsPsych.data.get().filter({task: 'response'}).trials;
          console.log("Experiment completed!");
          console.log(trials);

          var formattedData = trials.map(trial => ({
            block: 2,
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

          fetch("/api/participant", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              participantId: participantId,
              complete: true,
            }),
          });

          router.push("/end");
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

      var randomColours = jsPsych.randomization.repeat(["orange", "blue"], 5);
      
      // Add real words (orange, response 'n')
      realWords1.forEach(word => {
        const randomColour = randomColours.pop();
        testStimuli.push({
          stimulus: `<div style="color: ${randomColour}; font-size: 48px; font-weight: bold;">${word}</div>`,
          colour: randomColour,
          correct_response: "n",
          is_word: true
        });
      });
      
      // Add non-words (blue, response 'c')
      nonWords1.forEach(nonWord => {
        const randomColour = randomColours.pop();
        testStimuli.push({
          stimulus: `<div style="color: ${randomColour}; font-size: 48px; font-weight: bold;">${nonWord}</div>`,
          colour: randomColour,
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
      jsPsych.run(timeline);
    }
  }, [participantId]);

  if (!participantId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            No participant session found. Please start from the beginning.
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Go to Home Page
          </button>
        </div>
      </div>
    );
  }
}
