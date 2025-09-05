"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import LoadingSpinner from "@/app/LoadingSpinner";

export default function Coaches() {
  const [coaches, setCoaches] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const res = await fetch("https://script.google.com/macros/s/AKfycbx5e69OfF41JV-zHwcYJtScs5OJV1xjVEFWZWa8bWd30a8DV45ymE8ItgvSU9Kc5OqP/exec?sheet=coaches");
        const data = await res.json();
        const formatted = data
          .map((item) => ({
            name1: item.name1?.trim(),
            name2: item.name2?.trim(),
            experience: item.experience?.trim(),
            bio: item.bio?.split("/").map((b) => b.trim()),
            img: item.img?.trim(),
          }))
          .filter((c) => c.name1 && c.img);

        setCoaches(formatted);
      } catch (err) {
        console.error("Failed to fetch coaches:", err);
      } finally {
        setLoading(false);
      } 
      
    };

    fetchCoaches();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col bg-gradient-to-r from-orange-600 to-gray-800 min-h-screen">
      <div className="max-w-7xl w-full mx-auto text-center px-4 sm:px-8 md:px-12 py-16">
        <h1 className="mt-14 text-3xl sm:text-4xl font-bold text-gray-100 cursor-default">Our Coaches</h1>
        <span className="block w-32 h-0.5 bg-orange-500 mt-4 mx-auto"></span>

        <p className="text-white text-1xl mt-5">
          Our coaching panel consists of five coaches, including two from Indonesia and three local coaches. 
          Erza Bagaskar is the head coach of RSBA and Mr. Chamath and Mr. Lumbini are the other local coaches. Mr. Subash is the head coach in Ambalangoda Branch under the supervision of Erza Bagaskar. 
          Mr. Lahiru is the physical trainer of RSBA.     
          Our coaches have extensive experience in training players of all levels, from beginners to advanced athletes.
          Each coach brings a wealth of experience and expertise to help our players reach their full potential.

        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-14 gap-x-10 mt-10">
          {coaches.map((coach, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center cursor-default hover:bg-orange-100 transition-transform duration-300 hover:scale-105 w-full max-w-xs sm:max-w-sm mx-auto"
            >
              <div className="w-full h-[300px] sm:h-[280px] md:h-[280px] overflow-hidden rounded-lg">
                <Image
                  src={coach.img}
                  alt={`${coach.name1} ${coach.name2}`}
                  width={300}
                  height={280}
                  className="object-cover w-full h-full"
                />
              </div>

              <h2 className="text-xl sm:text-2xl font-bold mt-4 text-center whitespace-pre-line">
                <div className="text-gray-500 font-bold">{coach.name1}</div>
                <div className="text-black font-bold">{coach.name2}</div>
              </h2>

              <p className="text-gray-600 text-sm mt-1">{coach.experience} of coaching</p>

              <button
                className="mt-4 bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600 transition"
                onClick={() => setSelectedCoach(coach)}
              >
                View Bio
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Biography Modal */}
      {selectedCoach && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50"
          onClick={() => setSelectedCoach(null)}
        >
          <div
            className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto text-center relative mt-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-red-600 hover:text-gray-900 text-2xl"
              onClick={() => setSelectedCoach(null)}
            >
              ✖
            </button>

            <h2 className="text-3xl font-bold text-gray-600 whitespace-pre-line">
              {selectedCoach.name1}
            </h2>
            <h2 className="text-3xl font-bold text-blue-600 whitespace-pre-line">
              {selectedCoach.name2}
            </h2>
            <p className="text-gray-600 mt-2">{selectedCoach.experience} of coaching</p>

            <div className="flex justify-center">
              <Image
                src={selectedCoach.img}
                alt={`${selectedCoach.name1} ${selectedCoach.name2}`}
                width={200}
                height={260}
                className="object-cover rounded-lg my-4"
              />
            </div>

            <ul className="text-gray-700 mt-4 list-disc list-inside text-left">
  {Array.isArray(selectedCoach.bio)
    ? selectedCoach.bio.map((point, i) => (
        <li key={i}>{point}</li>
      ))
    : <li>{selectedCoach.bio}</li>
  }
</ul>

            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              onClick={() => setSelectedCoach(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}