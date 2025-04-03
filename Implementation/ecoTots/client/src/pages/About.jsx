import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 py-16 px-6 sm:px-12">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-300">
        <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-6">About Our Project</h1>
        
        <p className="text-lg text-gray-800 leading-relaxed mb-6">
          Welcome to our online marketplace for gently used children's clothing! This platform is designed to help parents and guardians buy and sell kids' clothing at affordable prices. By facilitating the exchange of quality pre-loved items, we aim to reduce waste and support families in need.
        </p>
        
        <p className="text-lg text-gray-800 leading-relaxed mb-6">
          Our project is a testament to teamwork, dedication, and a shared passion for sustainability. Meet the people who made it possible:
        </p>
        
        {/* Team Section */}
        <div className="bg-gray-100 p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Our Team</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-blue-500">Lovish - Team Lead</h3>
            <p className="text-gray-700 mt-2">
              As the team lead, Lovish provided vision and direction, ensuring smooth development, timely execution, and a seamless final product. Their leadership played a crucial role in keeping the project on track.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-blue-500">Gurkanwal - Developer</h3>
            <p className="text-gray-700 mt-2">
              Gurkanwal contributed extensively to the technical aspects, working on platform functionality, Firebase integration, image uploads, and refining the user experience.
            </p>
          </div>
        </div>

        <p className="text-lg text-gray-800 leading-relaxed mt-6">
          We are incredibly proud of our progress and look forward to expanding this platform to help even more families find high-quality, affordable clothing for their little ones.
        </p>
      </div>
    </div>
  );
}
