// components/LoadingSpinner.js
"use client";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-orange-600 to-gray-800">
      <div className="w-16 h-16 border-4 border-white border-t-orange-500 rounded-full animate-spin"></div>
    </div>
  );
}