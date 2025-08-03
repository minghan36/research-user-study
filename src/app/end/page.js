"use client";

import { useRouter } from "next/navigation";
import { useParticipant } from "../../contexts/ParticipantContext";

export default function EndPage() {
  const router = useRouter();
  const { participantId } = useParticipant();

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Thank You! 🎉
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
            You have successfully block 2.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Please notify the experimenter that you are done. We will give you instructions.
          </p>
        </div>
        
        <div className="space-y-4">
          {participantId && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
              Study completed • Participant ID: {participantId}
            </p>
          )}
          
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
            If you have any questions about this study, please contact the research team.
          </p>
        </div>
      </div>
    </div>
  );
}
