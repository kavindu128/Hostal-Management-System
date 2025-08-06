import React from 'react';
import HomeHostelCard from '../Components/HomeHostalCard';
import hostel_a from '../../images/hostel_a.jpg';
import hostel_b from '../../images/hostel_b.jpg';
import hostel_c from '../../images/hostel_c.jpg';
import hostel_d from '../../images/hostel_d.jpg';
import hostel_e from '../../images/hostel_e.jpg';
import hostel_f from '../../images/hostel_f.jpg';
import faculty from '../../images/faculty.jpg';
import inside from '../../images/inside.jpg';
import { IoIosCall } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import Footer from '../Components/Footer';

const hostels = [
  { name: "Hostel A", image: hostel_a },
  { name: "Hostel B", image: hostel_b },
  { name: "Hostel C", image: hostel_c },
  { name: "Hostel D", image: hostel_d },
  { name: "Hostel E", image: hostel_e },
  { name: "Hostel F", image: hostel_f }
];

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with faculty background image */}
      <section 
        className="relative py-10 text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${faculty})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 py-16">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-2 text-center leading-tight bg-gradient-to-r from-cyan-300 to-blue-400 
            bg-clip-text text-transparent">
                Welcome To <br />
                Faculty Hostel <br />
                Management System
            </h1>
            <p className="text-lg md:text-xl text-white/90 text-center mt-4">
                Your digital gateway to organized hostel living
            </p>
        </div>
      </section>

      {/* Hostels Section */}
      <section className="py-16 px-4 container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">OUR HOSTELS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {hostels.map((hostel, index) => (
            <HomeHostelCard 
              key={index}
              name={hostel.name}
              image={hostel.image}
            />
          ))}
        </div>

      </section>

      <section className="bg-gradient-to-br from-blue-10 to-blue-200 py-16">
        <div className="flex flex-col md:flex-row items-center gap-10 mb-20 px-4 py-auto container mx-auto">
            <img
                src={inside}
                alt="Hostel"
                className="w-full md:w-1/2 rounded-lg shadow-md"
            />
            <div className="md:w-1/2">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">About Hostels</h3>
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-400 text-transparent bg-clip-text">
                "Your digital gateway to organized hostel living."
                </h2>
                <p className="text-base leading-relaxed text-gray-700">
                    The Hostel Management System is a web-based solution designed to simplify hostel operations by managing student records,
                    room allocations, payments, and complaints across multiple hostels. It offers a user-friendly interface and secure access
                    for both students and staff, promoting organized living and efficient administration. More than just a management tool, it 
                    ensures a smooth and comfortable hostel experience — making it a true home away from home.
                </p>
            </div>
        </div>
      </section>

      <section>
        <div className="text-center py-10 px-4 container mx-auto">
            <h4 className="text-xl font-semibold text-blue-600 mb-2">Contact Us</h4>
            <h2 className="text-3xl font-bold mb-6">Send us a message</h2>

            <form className="max-w-3xl mx-auto bg-gradient-to-b from-blue-100 to-blue-50 rounded-lg p-6 shadow-md">
                <textarea
                    placeholder="Your message"
                    className="w-full h-48 p-4 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                />
            
                <div className="mt-4 text-right">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full shadow-sm"
                    >

                    Send
                    </button>
                </div>
            </form>
        </div>
      </section>

      <section>
        <div className="mt-6 flex flex-col md:flex-row justify-center items-center gap-120 text-sm text-gray-600">
            <span className="flex items-center gap-2">
                <MdOutlineEmail /> efchostel@gmail.com
            </span>
            <span className="flex items-center gap-2">
                <IoIosCall /> +12 345 6759
            </span>
        </div>

      </section>
      <Footer />

    </div>

  );
    };

    export default HomePage;
