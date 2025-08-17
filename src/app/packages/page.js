"use client";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/app/LoadingSpinner";

export default function Packages() {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPDFs = async () => {
      try {
        const res = await fetch("https://script.google.com/macros/s/AKfycbx5e69OfF41JV-zHwcYJtScs5OJV1xjVEFWZWa8bWd30a8DV45ymE8ItgvSU9Kc5OqP/exec?sheet=packages");
        const data = await res.json();
        setPdfs(data);
      } catch (err) {
        console.error("Failed to load PDFs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPDFs();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  const getPDFUrl = (fileId) =>
    `https://drive.google.com/file/d/${fileId}/preview`;

  return (
    <main className="py-10 px-4 sm:px-6 min-h-screen flex flex-col items-center bg-gradient-to-r from-orange-600 to-gray-800">
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-100 mt-20 text-center">
        Training Packages
      </h1>
      <span className="block w-24 sm:w-32 h-0.5 bg-orange-500 mt-4 mx-auto"></span>

      {/* Local Players Section */}
      {pdfs.map((pdf, index) => (
      <section 
      key={index}
      className="w-full max-w-3xl mt-10 p-4 bg-gradient-to-r from-gray-600 to-orange-700 rounded-lg shadow-lg"
      > 
        <p className="text-white text-lg sm:text-xl text-center">
          RSBA training fees for <strong>{pdf.title}</strong>
        </p>

        <div className="mt-6 w-full">
          <iframe
            title={pdf.title}
            src={`${getPDFUrl(pdf.fileId)}#toolbar=0&navpanes=0&scrollbar=0`}
            className="w-full h-[400px] sm:h-[500px] md:h-[600px] border-4 border-orange-700 rounded-lg"
          ></iframe>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center">
          <a
            href={`https://drive.google.com/uc?export=download&id=${pdf.fileId}`}
            download
            className="px-4 py-2 bg-orange-600 text-white rounded-lg text-center shadow-md hover:bg-orange-500 transition"
          >
            📥 Download PDF
          </a>
          <a
            href={`https://drive.google.com/file/d/${pdf.fileId}/view`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-700 text-white rounded-lg text-center shadow-md hover:bg-gray-600 transition"
          >
            🔍 View in New Tab
          </a>
        </div>
      </section>

      ))}
    </main>
  );
}

{/* Leisure badminton Section */}
      {/*<div className="w-full max-w-4xl mt-12 p-4 bg-gradient-to-r from-gray-600 to-orange-700 rounded-lg shadow-lg">
        <p className="text-xl text-white">
          Check out the RSBA training fees for <strong>Leisure Badminton.</strong>
        </p>

        <div className="w-full max-w-4xl mt-8">
          <Image
            src="/leisureBadminton.jpg"
            alt="Leisure Badminton"
            width={800}
            height={500}
            className="w-full h-[500px] md:h-[600px] lg:h-[800px] border-4 border-orange-700 rounded-lg shadow-lg object-contain"
          />
        </div>

        <div className="flex gap-4 mt-4 justify-center">
          <a href="/leisureBadminton.jpg" download
            className="px-4 py-2 bg-orange-600 text-white rounded-lg shadow-lg transition-all duration-300 hover:bg-orange-500 hover:scale-105">
            📥 Download PDF
          </a>
          <a href="/leisureBadminton.jpg" target="_blank" rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow-lg transition-all duration-300 hover:bg-gray-600 hover:scale-105">
            🔍 View in New Tab
          </a>
        </div>
      </div>*/}