"use client";

import { useRouter } from "next/navigation";
import { useParticipant } from "../contexts/ParticipantContext";
import { useEffect } from "react";

export default function LandingPage() {
  const { groupNumber, setGroupNumber, participantId, setParticipantId } = useParticipant();
  const router = useRouter();

  useEffect(() => {
    if (participantId) {
      setParticipantId(null);
    }
  }, []);

  const handleStartStudy = () => {
    router.push("/block-one");
  };

  const toggleGroup = () => {
    setGroupNumber(groupNumber === 0 ? 1 : 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            User Research Study
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Thank you for participating in our research
          </p>
        </div>

        {/* Study Description */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
              Task Description:
            </h3>
            
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Text will be displayed that can be a word or non-word</li>
              <li>Press "N" if the text is a word</li>
              <li>Press "C" if the text is a non-word</li>
            </ul>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 p-4 mt-6">
              <p className="text-blue-800 dark:text-blue-200">
                <strong>Estimated time:</strong> 7 minutes per block<br />
              </p>
            </div>
        </div>

        {/* Controls Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
            Study Configuration
          </h2>
          
          <div className="space-y-6">
            {/* Group Toggle */}
            <div>
              <div className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Participant Group
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleGroup}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    groupNumber === 0
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  Group 0
                </button>
                <button
                  onClick={toggleGroup}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    groupNumber === 1
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  Group 1
                </button>
              </div>
            </div>

            {/* Start Button */}
            <div className="pt-6">
              <button
                onClick={handleStartStudy}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                Start Study
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 dark:text-gray-400">
          <p>If you have any questions or concerns, please contact the research team.</p>
        </div>
      </div>
    </div>
  );
}
