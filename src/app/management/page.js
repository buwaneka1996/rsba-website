"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/app/LoadingSpinner";

export default function Team() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const res = await fetch("https://script.google.com/macros/s/AKfycbx5e69OfF41JV-zHwcYJtScs5OJV1xjVEFWZWa8bWd30a8DV45ymE8ItgvSU9Kc5OqP/exec?sheet=management");
        const data = await res.json();
        setTeamMembers(data);
      } catch (err) {
        console.error("Failed to fetch team data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTeam();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-600 to-gray-800 px-4">
      <div className="container mx-auto text-center py-10">
        <h1 className="mt-20 text-4xl font-bold text-gray-100 cursor-default">Meet Our Team</h1>
        <span className="block w-32 h-0.5 bg-orange-500 mt-4 mx-auto"></span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 mb-10 px-4 md:px-0">
          
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center cursor-pointer hover:bg-orange-100 transition-transform duration-300 hover:scale-105 w-full max-w-xs mx-auto"
            >
              <Image
                src={member.img}
                alt={member.name}
                width={200}
                height={200}
                className="object-cover rounded-full mb-4"
              />
              <h2 className="text-2xl font-bold text-black">{member.name}</h2>
              <p className="text-lg text-gray-600">{member.role}</p>
              <p className="text-gray-700 mt-4">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}