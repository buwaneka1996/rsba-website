"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import "./page.css"; // keep your CSS

export default function Home() {
  const scrollRef = useRef(null);
  const autoplayInterval = useRef(null);
  const resumeTimeout = useRef(null);
  const isScrolling = useRef(false);
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbx5e69OfF41JV-zHwcYJtScs5OJV1xjVEFWZWa8bWd30a8DV45ymE8ItgvSU9Kc5OqP/exec?sheet=gallery" // Adjust the URL to your Google Apps Script endpoint
      );
      const data = await res.json();
  
      const extractedImages = data
        .map((item) => item.img?.trim())
        .filter((url) => url);

        console.log("Extracted gallery images:", extractedImages); // debug
  
      setImages(extractedImages);
    } catch (err) {
      console.error("Error fetching gallery images:", err);
    }
  };

  const startAutoplay = () => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    stopAutoplay();

    autoplayInterval.current = setInterval(() => {
      if (isScrolling.current) return;
      isScrolling.current = true;

      const card = scrollContainer.querySelector(".gallery-card");
      if (!card) return;

      const cardWidth = card.offsetWidth + 16;

      const atEnd =
        scrollContainer.scrollLeft + scrollContainer.clientWidth >=
        scrollContainer.scrollWidth - 5;

      const nextScroll = atEnd ? 0 : scrollContainer.scrollLeft + cardWidth;

      scrollContainer.scrollTo({
        left: nextScroll,
        behavior: "smooth",
      });

      setTimeout(() => {
        isScrolling.current = false;
      }, 500);
    }, 3000);
  };

  const handleUserScroll = () => {
    stopAutoplay();
    isScrolling.current = false;

    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);

    resumeTimeout.current = setTimeout(() => {
      startAutoplay();
    }, 1000);
  };

  const stopAutoplay = () => {
    if (autoplayInterval.current) {
      clearInterval(autoplayInterval.current);
      autoplayInterval.current = null;
    }
  };

  useEffect(() => {
    fetchImages(); // fetch image URLs from Google Sheet
    startAutoplay();

    return () => {
      stopAutoplay();
      if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    };
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center p-8 bg-gradient-to-r from-orange-600 to-gray-800">

      {/* Hero Section */}
      <section
        className="hero-section relative w-full h-[600px] sm:h-[600px] lg:h-[650px] xl:h-[700px] flex items-center justify-center text-center text-white mt-20 pt-2 cursor-default"
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          className="relative p-6 sm:p-10"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold drop-shadow-lg">
            Rising Stars Badminton Academy
          </h1>
          <p className="mt-4 sm:mt-8 text-lg max-w-3xl mx-auto px-4">
            Training young athletes to reach the highest level of badminton through expert coaching, structured programs, and state-of-the-art facilities.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition"
              href="/coaches"
            >
              Meet Our Coaches
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition"
              href="/players"
            >
              Our Players
            </motion.a>
          </div>
        </motion.div>
      </section>


      <motion.section
        className="mt-10 max-w-6xl mx-auto text-center cursor-default"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.2 }}
      >


        {/* 3-Column Layout */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">

          {/* Our Vision */}
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-orange-500">Our Vision</h3>
            <p className="mt-4 text-lg text-left">
              To be the leading badminton academy in Sri Lanka, producing world-class players through structured training and global exposure.
            </p>
          </div>

          {/* Our Mission */}
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg cursor-default">
            <h3 className="text-2xl font-semibold text-orange-500">Our Mission</h3>
            <p className="mt-4 text-lg text-left">
              To establish a technique that suits today’s world of badminton <br /><br />

              To provide world standard training for all players in the country. <br /><br />

              To offer world standard training for beginners to be groomed to become full-time professional players creating value to the sport of badminton
            </p>
          </div>

          {/* Our Objectives */}
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-orange-500">Our Objectives</h3>
            <p className="mt-4 text-lg text-left">
              To create and develop committed skillful technically sound world class players for the future of sri lanka.
            </p>
          </div>

        </div>
      </motion.section>

      {/* Featured Programs */}
      <motion.section
        className="mt-20 max-w-6xl text-center cursor-default"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-gray-100 pb-4">
          Training Programs
          <span className="block w-32 h-0.5 bg-orange-500 mt-4 mx-auto"></span>
        </h2>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 cursor-default">
          {[
            { title: "Beginner Training", desc: "A foundation course for young players starting their badminton journey." },
            { title: "Elite Training", desc: "Advanced coaching for competitive players aiming for national and international levels." },
            { title: "Fitness & Conditioning", desc: "Specialized fitness training to enhance agility, endurance, and strength." }
          ].map((program, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-100 p-6 rounded-lg shadow-xl border border-orange-500"
            >
              <h3 className="text-xl font-bold text-blue-500">{program.title}</h3>
              <p className="text-gray-700 mt-2">{program.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Gallery Section with Scroll & Navigation Arrows */}
      <motion.section
        className="mt-20 w-full max-w-7xl mx-auto text-center px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-gray-100 pb-4 cursor-default">
          Gallery
          <span className="block w-32 h-0.5 bg-orange-500 mt-4 mx-auto"></span>
        </h2>

        <div className="relative w-full flex justify-center items-center overflow-hidden group mt-6">
          {/* Left Arrow */}
          <button
            onClick={() => scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" })}
            className="absolute left-2 md:left-4 z-10 bg-black/70 group-hover:opacity-100 opacity-0 hover:bg-orange-400 p-3 rounded-full shadow-lg transition"
            aria-label="Scroll Left"
          >
            ◀
          </button>

          {/* Scrollable Gallery */}
          <div
            ref={scrollRef}
            id="gallery-scroll"
            onScroll={handleUserScroll}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide px-2 sm:px-6 py-2"
          >
            {images.map((img, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileInView={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="gallery-card snap-center shrink-0 w-[220px] sm:w-[250px] md:w-[280px] h-[260px] sm:h-[300px] flex items-center justify-center"
              >
                <Image
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  width={280}
                  height={280}
                  className="rounded-xl shadow-md object-cover w-full h-full"
                  loadling="eager"
                />
              </motion.div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" })}
            className="absolute right-2 md:right-4 z-10 bg-black/70 group-hover:opacity-100 opacity-0 hover:bg-orange-400 p-3 rounded-full shadow-lg transition"
            aria-label="Scroll Right"
          >
            ▶
          </button>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        className="mt-20 max-w-4xl text-center cursor-default"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-gray-100 pb-4">
          Testimonials
          <span className="block w-32 h-0.5 bg-orange-500 mt-4 mx-auto"></span>
        </h2>
        <motion.p className="mt-4 text-gray-700 italic max-w-3x1 bg-gradient-to-r from-gray-700 to-black-700 text-white py-4 px-8 text-center" whileHover={{ scale: 1.05 }}>
          "As a past National and veteran international Badminton medalist from small beginnings I always wanted to make sure all
          players of all walks of life can have access to international training with correct technique. Today we have managed to
          partner with international academies to bring a proper sustainable training program and also exchange programs with overseas
          training centers. I invite all players to make use of this golden opportunity and join us to achieve our vision of 2028 Olympic representation.
          <br /><br />
          Good luck to you all
          <br />
          Clarence Homer,
          Founder
        </motion.p>
      </motion.section>

      {/* Statistics */}
      <motion.section
        className="mt-20 w-full bg-gradient-to-r from-gray-600 to-orange-700 text-white py-14 text-center cursor-default"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold">
          Our Achievements
          <span className="block w-32 h-0.5 bg-orange-500 mt-4 mx-auto"></span>
        </h2>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { number: "50+", label: "National Titles" },
            { number: "5+", label: "International Titles" },
            { number: "80+", label: "Trained Athletes" },
            { number: "4+", label: "Years of Excellence" }
          ].map((stat, index) => (
            <motion.div key={index} whileHover={{ scale: 1.1 }} className="text-center">
              <h3 className="text-5xl font-extrabold">{stat.number}</h3>
              <p className="mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Facility */}
      <motion.section
        className="mt-20 max-w-6xl text-center mx-auto cursor-default px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-100 pb-4">
          Training Facility
          <span className="block w-24 sm:w-32 h-0.5 bg-orange-500 mt-4 mx-auto"></span>
        </h2>

        <p className="text-white mt-4 text-base sm:text-lg md:text-xl px-2 sm:px-6 md:px-10 lg:px-20">
          Our training facility is equipped with state-of-the-art 8 badminton courts, fitness center and specialized training equipments, dining area, accomodation facility to ensure our athletes receive the best training environment. We are committed to providing a world-class experience for all our RSBA players.
        </p>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            "stadiumfront.jpeg",
            "stadium1.jpeg",
            "stadium2.jpeg",
            "stadium3.jpeg",
            "gym1.jpeg",
            "gym2.jpeg",
            "gym4.jpeg",
            "shop1.jpeg",
            "shop2.jpeg",
          ].map((image, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="overflow-hidden rounded-xl shadow-lg flex justify-center"
            >
              <Image
                src={`/${image}`}
                alt={`Facility ${index + 1}`}
                loading="eager"
                width={200}
                height={300}
                unoptimized
                priority
                className="rounded-md object-cover 
                     w-[180px] h-[180px] 
                     sm:w-[220px] sm:h-[140px] 
                     md:w-[300px] md:h-[350px]"
              />
            </motion.div>
          ))}
        </div>
      </motion.section>


      {/* Sponsors & Partners */}
      <motion.section className="mt-20 max-w-6xl text-center cursor-default" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }}>
        <h2 className="text-4xl font-bold text-gray-100 pb-4">Sponsors & Partners
          <span className="block w-32 h-0.5 bg-orange-500 mt-4 mx-auto"></span>
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-8">
          {["sponsor1.jpeg", "sponsor2.jpeg", "sponsor3.jpeg"].map((sponsor, index) => (
            <Image key={index} src={`/${sponsor}`} alt={`Sponsor ${index}`} width={150} height={80} className="rounded-lg shadow-lg" />
          ))}
          {
            ['victor.jpg'].map((sponsor, index) => (
              <Image key={index} src={`/${sponsor}`} alt={`Sponsor ${index}`} width={1000} height={80} className="rounded-lg shadow-lg" />
            ))
          }
        </div>
      </motion.section>

      {/* Google Map */}
      <motion.section
        id="find-us"
        className="mt-20 max-w-6xl text-center cursor-default"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-gray-100 pb-4">Find Us
          <span className="block w-32 h-0.5 bg-orange-500 mt-4 mx-auto"></span>
        </h2>
        <p className="mt-4 text-white text-lg">Visit our academy at the following location:</p>
        <div className="mt-8 w-full h-[400px] flex justify-center">
          <iframe
            className="w-full sm:w-[600px] h-[350px] rounded-lg shadow-xl border border-gray-300"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.8988176035987!2d79.96264247526533!3d6.902702493096609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2519bed5c6d67%3A0xc495e4caa162ee3d!2sRising%20Stars%20Badminton%20Academy!5e0!3m2!1sen!2slk!4v1739988076983!5m2!1sen!2slk"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </motion.section>

      {/* Contact Us Section */}
      <motion.section
        id="contact-us"
        className="w-full bg-gray-800 text-white py-16 px-4 sm:px-6 md:px-12 lg:px-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-center cursor-default">
          Contact Us
          <span className="block w-32 h-0.5 bg-orange-500 mt-4 mx-auto"></span>
        </h2>

        <p className="mt-4 text-lg text-gray-200 text-center cursor-default">
          Have questions? Get in touch with us!
        </p>

        {/* Contact Details */}
        <div className="mt-10 flex flex-col items-center gap-8 text-lg sm:text-xl md:text-2xl">

          {/* Phone */}
          <a
            href="tel:+94772209406"
            className="flex items-center gap-3 text-orange-400 hover:text-orange-300 transition-all duration-300 hover:scale-105"
          >
            📞 <span className="font-bold">Mobile:</span>
            <span className="font-extrabold">+94 77 220 9406</span>
          </a>

          {/* Email */}
          <a
            href="mailto:info@rsba.lk"
            className="flex items-center gap-3 text-orange-400 hover:text-orange-300 transition-all duration-300 hover:scale-105"
          >
            📧 <span className="font-bold">Email:</span>
            <span className="font-extrabold">info@rsba.lk</span>
          </a>

          {/* Address */}
          <div className="flex flex-col items-center sm:flex-row sm:items-center gap-3 text-orange-400 hover:text-orange-300 transition-all duration-300 hover:scale-105 text-center sm:text-left max-w-2xl text-lg sm:text-xl md:text-2xl">
            <span>📍</span>
            <span className="font-bold">Address:</span>
            <span className="font-extrabold text-orange-400 hover:text-orange-300 sm:ml-2">
              Rising Stars Badminton Academy, <br></br> Homer Stadium, Malabe, Sri Lanka
            </span>
          </div>
        </div>
      </motion.section>

    </main>
  );
}
