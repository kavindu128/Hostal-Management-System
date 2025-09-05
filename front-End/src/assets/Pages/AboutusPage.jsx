import React from 'react';
import { IoIosCall } from "react-icons/io";
import { MdOutlineEmail, MdLocationOn } from "react-icons/md";
import { FaUsers, FaShieldAlt, FaChartLine, FaHeart } from "react-icons/fa";
import Footer from '../Components/Footer';

const AboutUsPage = () => {
  const teamMembers = [
    {
      name: "John Smith",
      role: "Project Lead",
      bio: "Experienced software engineer with 8+ years in system development."
    },
    {
      name: "Sarah Johnson",
      role: "UI/UX Designer",
      bio: "Creative designer passionate about user-centered design principles."
    },
    {
      name: "Michael Chen",
      role: "Backend Developer",
      bio: "Database and server architecture specialist with security focus."
    },
    {
      name: "Emily Williams",
      role: "Frontend Developer",
      bio: "React expert with a knack for creating intuitive interfaces."
    }
  ];

  const values = [
    {
      icon: <FaUsers className="text-3xl mb-4" />,
      title: "Student-Centric",
      description: "We prioritize the needs and comfort of our students above all else."
    },
    {
      icon: <FaShieldAlt className="text-3xl mb-4" />,
      title: "Security",
      description: "Ensuring the safety and privacy of all resident data is our commitment."
    },
    {
      icon: <FaChartLine className="text-3xl mb-4" />,
      title: "Efficiency",
      description: "Streamlining operations to make hostel management seamless and effective."
    },
    {
      icon: <FaHeart className="text-3xl mb-4" />,
      title: "Care",
      description: "Creating a home away from home through thoughtful service and support."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      
      <section className="relative py-20 bg-gradient-to-br from-blue-600 to-cyan-500 text-white text-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Learn about our mission, values, and the team behind the Engineering Faculty Hostel Management System
          </p>
        </div>
      </section>

      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              To provide a comprehensive, efficient, and user-friendly hostel management system that enhances 
              the living experience for students while simplifying administrative tasks for staff. We strive to 
              create a seamless digital environment that supports the academic journey of every resident.
            </p>
            <div className="bg-blue-50 rounded-lg p-8 border border-blue-100">
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">What We Offer</h3>
              <p className="text-gray-700">
                Our system handles everything from room allocation and visitor management to payment processing 
                and maintenance requests, all through an intuitive interface designed with both students and 
                administrators in mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                <div className="text-blue-600 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-blue-900">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-blue-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-4xl text-blue-800 font-bold">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-blue-900">{member.name}</h3>
                <p className="text-blue-600 mb-2">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">Our Story</h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4">
                The Engineering Faculty Hostel Management System was conceived in 2024 to address the growing 
                complexity of managing multiple hostels with increasing student numbers. What started as a simple 
                database project has evolved into a comprehensive management solution serving hundreds of students 
                and staff members.
              </p>
              <p className="text-gray-700 mb-4">
                Our journey began with a simple goal: to digitize the manual processes that were causing delays 
                and inefficiencies in hostel management. Through continuous feedback from both students and 
                administrative staff, we've refined and expanded our system to meet the evolving needs of our community.
              </p>
              <p className="text-gray-700">
                Today, we're proud to offer a robust platform that not only streamlines operations but also 
                enhances the overall hostel living experience for our engineering students.
              </p>
            </div>
          </div>
        </div>
      </section>

   
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Get In Touch</h2>
          <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
            Have questions or suggestions? We'd love to hear from you. Reach out to our team through any of the following channels.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <IoIosCall className="text-2xl text-blue-700" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="text-gray-600">+94 11 234 5678</p>
              <p className="text-gray-600">+94 77 123 4567</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <MdOutlineEmail className="text-2xl text-blue-700" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-600">efchostel@gmail.com</p>
              <p className="text-gray-600">support@efchostel.lk</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <MdLocationOn className="text-2xl text-blue-700" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <p className="text-gray-600">Engineering Faculty</p>
              <p className="text-gray-600">University of Peradeniya</p>
              <p className="text-gray-600">Peradeniya, Sri Lanka</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUsPage;