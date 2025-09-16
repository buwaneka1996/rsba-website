"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import LoadingSpinner from "@/app/LoadingSpinner";

export default function Players() {
  const [updatedPlayers, setUpdatedPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Compute age from DOB string
  const computeAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    if (isNaN(birthDate)) return "N/A";
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    ) {
      age -= 1;
    }
    return age;
  };

  // ✅ Fetch players from Google Sheets via your Google Apps Script URL
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbx5e69OfF41JV-zHwcYJtScs5OJV1xjVEFWZWa8bWd30a8DV45ymE8ItgvSU9Kc5OqP/exec?sheet=players"
        );
        const playersData = await response.json();

        const playersWithAge = playersData.map((player) => ({
          ...player,
          age: computeAge(player.dob),
          achievements: player.achievements
            ? player.achievements.split(",").map((a) => a.trim())
            : [],
        }));

        setUpdatedPlayers(playersWithAge);
      } catch (error) {
        console.error("Error fetching players:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  // Lock background scroll when modal is open
useEffect(() => {
  if (selectedPlayer) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
  return () => {
    document.body.style.overflow = "";
  };
}, [selectedPlayer]);

if (loading) {
  return <LoadingSpinner />;
}

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-orange-600 to-gray-800">
      <div className="w-full max-w-6xl mx-auto text-center px-4 sm:px-6 md:px-12 py-10">
        <h1 className="mt-20 text-3xl sm:text-4xl font-bold text-gray-100 cursor-default">
          Our Players
        </h1>
        <span className="block w-24 sm:w-32 h-0.5 bg-orange-500 mt-4 mx-auto"></span>

        <p className="text-white text-1xl mt-5">
          Explore our talented players excelling in various categories, showcasing their skills and
          achievements.
          We have over 50 players in our roster, including levels from beginner to national and international levels.  
          Our players have achieved remarkable success in local and international tournaments, bringing pride to our academy and as well as to the nation.
          We are committed to nurturing and developing talent, providing our players with the best training facilities and support to reach their full potential.

        </p>
        {/* Search Bar */}
        <div className="mt-8 mb-6 w-full flex justify-center">
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search Players..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 w-full font-black text-black"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            )}
          </div>
        </div>


        {/* Player Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-10 mb-12 px-2 sm:px-4 min-h-[300px]">
          {updatedPlayers.filter((player) =>
            player.name.toLowerCase().includes(searchTerm.toLowerCase())
          ).length > 0 ? (
            updatedPlayers
              .filter((player) =>
                player.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((player, index) => {
                const nameParts = player.name.split(" ");
                const firstName = nameParts[0];
                const secondName = nameParts.slice(1).join(" ");

                return (
                  <div
                    key={index}
                    className="bg-white p-3 sm:p-4 rounded-xl shadow-md flex flex-col items-center cursor-default hover:bg-orange-100 transition-transform duration-300 hover:scale-105 w-full max-w-[280px] sm:max-w-xs mx-auto"
                  >
                    <Image
                      src={
                        player.imageUrl && player.imageUrl.trim() !== ""
                          ? player.imageUrl
                          : "/placeholder.jpg"
                      }
                      alt={player.name}
                      width={200}
                      height={200}
                      className="object-cover object-center w-full h-[160px] sm:h-[200px] rounded-md"
                    />
                    <h2 className="text-sm font-semibold mt-2 text-center text-black leading-tight whitespace-pre-line">
                      {firstName}
                      {secondName && <br />}
                      {secondName}
                    </h2>

                    <span className="block w-16 h-0.5 bg-orange-500 mt-1 mb-2 mx-auto"></span>

                    <p className="text-gray-600 text-xs">Age: {player.age}</p>
                    <p className="text-gray-600 text-xs">Event: {player.playingEvent}</p>
                    <p className="text-gray-600 text-xs">World Rank: #{player.bestWorldRanking}</p>
                    <p className="text-gray-600 text-xs">Local Rank: #{player.localRanking}</p>

                    <button
                      className="mt-2 bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600 transition"
                      onClick={() => setSelectedPlayer(player)}
                    >
                      Achievements
                    </button>
                  </div>
                );
              })
          ) : (
            <p className="col-span-full text-center text-white text-sm">
              No players found.
            </p>
          )}
        </div>

        {/* Biography Modal */}
        {selectedPlayer && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-2 sm:p-4 z-50"
            onClick={() => setSelectedPlayer(null)}
          >
            <div
              className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md sm:max-w-xl max-h-[85vh] overflow-y-auto text-center relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 text-red-600 hover:text-gray-900 text-xl sm:text-2xl"
                onClick={() => setSelectedPlayer(null)}
              >
                ✖
              </button>

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-600">{selectedPlayer.name}</h2>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">{selectedPlayer.bio}</p>

              <h3 className="text-lg sm:text-xl text-black font-bold mt-4 text-center">Achievements:</h3>
              <div className="flex justify-center">
                <ul className="list-disc text-gray-700 mt-2 px-4 text-left text-sm sm:text-base max-w-xs sm:max-w-sm">
                  {selectedPlayer.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </div>

              <button
                className="mt-4 bg-red-500 text-white text-sm sm:text-base px-4 py-2 rounded hover:bg-red-600 transition"
                onClick={() => setSelectedPlayer(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}