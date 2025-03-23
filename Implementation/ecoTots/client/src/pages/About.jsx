import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6 sm:px-12">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">About Our Project</h1>
        
        <p className="text-lg text-gray-700 mb-4">
          Welcome to our online marketplace for gently used children's clothing! This platform aims to make it easier for parents and guardians to buy and sell kids' clothing at affordable prices. Our goal is to create a vibrant, safe, and welcoming space for the community to exchange items that are still in great condition, reducing waste while supporting others in need.
        </p>
        
        <p className="text-lg text-gray-700 mb-4">
          We are thrilled to introduce our project, which was made possible by the hard work and dedication of our talented team:
        </p>
        
        <div className="text-lg text-gray-800 font-semibold mb-4">
          <h2 className="text-xl font-bold">Our Team</h2>
          
          <p className="mt-2">
            <strong>Lovish</strong> - Team Lead
          </p>
          <p className="mt-2">
            As the team lead, Lovish oversaw the entire project, ensuring smooth development, timely completion, and alignment with our mission. Their leadership helped keep the project focused and delivered successfully.
          </p>
          
          <p className="mt-4">
            <strong>Gurkanwal</strong> - Team Member
          </p>
          <p className="mt-2">
            Gurkanwal contributed significantly to the technical development of the project, working on the platform's core functionality, including the integration of Firebase, image uploading, and creating a seamless user experience.
          </p>
        </div>

        <p className="text-lg text-gray-700 mb-4">
          We're incredibly proud of what we've accomplished, and we look forward to seeing this platform grow and continue helping families find affordable clothing for their children.
        </p>
      </div>
    </div>
  );
}
