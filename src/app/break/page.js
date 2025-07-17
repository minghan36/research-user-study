"use client";

import { useRouter } from "next/navigation";
import { useParticipant } from "../../contexts/ParticipantContext";

export default function BreakPage() {
  const router = useRouter();
  const { participantId } = useParticipant();

  const handleContinue = () => {
    // Navigate to block two
    router.push("/block-two");
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
        
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
