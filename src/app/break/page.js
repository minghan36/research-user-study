"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useParticipant } from "../../contexts/ParticipantContext";

export default function BreakPage() {
  const router = useRouter();
  const { participantId } = useParticipant();
  const [interventionActive, setInterventionActive] = useState(false);
  const [ interventionCompeleted, setInterventionCompleted ] = useState(false);

  const handleContinue = () => {
    // Navigate to block two
    router.push("/block-two");
  };

  const handleInterventionToggle = () => {
    const time = new Date().toISOString();
    if (interventionActive) {
      // End intervention logic
      fetch("/api/participant", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          participantId: participantId,
          interventionEnd: time,
        }),
      });
      setInterventionCompleted(true);
    } else {
      // Start intervention logic
      fetch("/api/participant", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          participantId: participantId,
          interventionStart: time,
        }),
      });
    }
    setInterventionActive(!interventionActive);
  };

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Great Job! 🎉
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Thank you for completing Block One of the experiment.
          </p>
          <p className="text-base font-bold text-red-600 dark:text-red-400 mb-8">
            Please notify the experimenter that you are done. We will give you instructions before proceeding to the next block.
          </p>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
                Word Example
              </h4>
              <div className="bg-gray-50 dark:bg-gray-700 p-1 rounded-lg">
                <img 
                  src="/word-example.png" 
                  alt="Example of a word"
                  className="mx-auto w-72 h-48 object-contain"
                />
              </div>
            </div>
            
            <div className="text-center">
              <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
                Non-word Example
              </h4>
              <div className="bg-gray-50 dark:bg-gray-700 p-1 rounded-lg">
                <img 
                  src="/nonword-example.png" 
                  alt="Example of a non-word"
                  className="mx-auto w-72 h-48 object-contain"
                />
              </div>
            </div>
          </div>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleInterventionToggle}
              className={`px-8 py-3 font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                interventionActive
                  ? "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500"
                  : "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500"
              }`}
            >
              {interventionActive ? "End Intervention" : "Start Intervention"}
            </button>
            <button
              onClick={handleContinue}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Continue to Block Two
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
