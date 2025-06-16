'use client';

import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Navbar from "../navbar/page";
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';

export default function MiningEducation() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'techniques' | 'safety' | 'environmental' | 'technology'>('overview');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);

  // Get initial theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialIsDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
    setIsDarkMode(initialIsDark);
  }, []);

  // Listen for themeChange events from the Navbar component
  useEffect(() => {
    const handleThemeChange = (event: CustomEvent<{ isDarkMode: boolean }>) => {
      setIsDarkMode(event.detail.isDarkMode);
      updateThree(event.detail.isDarkMode);
    };

    window.addEventListener('themeChange', handleThemeChange as EventListener);
    return () => {
      window.removeEventListener('themeChange', handleThemeChange as EventListener);
    };
  }, []);

  // Update THREE.js scene when theme changes
  const updateThree = (isDark: boolean) => {
    if (sceneRef.current) {
      // Update THREE.js particle color based on theme
      sceneRef.current.traverse((obj: THREE.Object3D) => {
        if (obj instanceof THREE.Points && obj.material) {
          (obj.material as THREE.PointsMaterial).color.set(isDark ? 0xD2B48C : 0x555555);
        }
      });
    }
  };

  // Toggle dark/light mode (local function, but using Navbar is preferred)
  // const toggleTheme = () => {
  //   const newTheme = !isDarkMode;
  //   setIsDarkMode(newTheme);
  //   document.documentElement.classList.toggle('dark');
  //   updateThree(newTheme);
  //   localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  // };

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  // Scroll-based animations (using scrollYProgress for future implementations)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const scaleTransform = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  // Educational content sections based on mining fundamentals and extended topics
  const educationSections = {
    overview: {
      title: "Mining Fundamentals",
      content: [
        {
          heading: "What is Mining?",
          text: "Mining is the extraction of valuable minerals or other geological materials from the Earth. Modern mining processes involve prospecting, analysis, extraction, and land reclamation."
        },
        {
          heading: "Historical Significance",
          text: "Mining has shaped human civilization since pre-historic times. Technological advancements have evolved mining into a sophisticated industry that drives economic growth."
        },
        {
          heading: "Economic Impact",
          text: "The mining industry is a crucial economic driver, providing employment, infrastructure development, and raw materials essential for various industries."
        }
      ]
    },
    techniques: {
      title: "Mining Techniques",
      content: [
        {
          heading: "Surface Mining",
          text: "Surface mining involves removing overlying soil and rock to access the mineral deposit. It is often more economical when the ore is near the surface."
        },
        {
          heading: "Underground Mining",
          text: "Underground mining extracts minerals from deep below the Earth's surface using specialized techniques when open-pit methods are not feasible."
        },
        {
          heading: "In-Situ Mining",
          text: "In-situ mining treats the ore with chemicals in place, reducing surface disturbance and extracting minerals through solution mining."
        },
        {
          heading: "Placer Mining",
          text: "Placer mining extracts minerals from alluvial deposits, separating heavy minerals from lighter materials typically found in riverbeds."
        }
      ]
    },
    safety: {
      title: "Mining Safety",
      content: [
        {
          heading: "Risk Assessment",
          text: "Comprehensive risk assessments help identify hazards and implement control measures to ensure worker and operational safety."
        },
        {
          heading: "Safety Training",
          text: "Regular training ensures personnel are equipped with the knowledge to handle emergencies and operate equipment safely."
        },
        {
          heading: "Equipment Safety",
          text: "Modern mining equipment includes safety features like automatic shutoffs and proximity detection, reducing operational risks."
        },
        {
          heading: "Environmental Monitoring",
          text: "Continuous monitoring of air quality, ground stability, and water ensures early detection of potential hazards."
        }
      ]
    },
    environmental: {
      title: "Environmental Considerations",
      content: [
        {
          heading: "Land Reclamation",
          text: "After mining operations cease, land reclamation restores the area for future use, often involving reshaping the land and replanting vegetation."
        },
        {
          heading: "Water Management",
          text: "Effective water management practices prevent contamination and ensure that mine drainage and process water are properly treated."
        },
        {
          heading: "Biodiversity Conservation",
          text: "Efforts to conserve local ecosystems include minimizing disruption and implementing measures to protect flora and fauna."
        },
        {
          heading: "Sustainable Mining",
          text: "Sustainable mining practices aim to balance resource extraction with environmental stewardship and community benefits."
        }
      ]
    },
    technology: {
      title: "Mining Technology",
      content: [
        {
          heading: "Automation and Robotics",
          text: "The use of autonomous vehicles, drones, and robotic systems improves safety and efficiency in mining operations."
        },
        {
          heading: "Data Analytics",
          text: "Advanced analytics and AI optimize processes by providing real-time insights into mining operations and maintenance needs."
        },
        {
          heading: "Remote Operations",
          text: "Remote control centers enable the monitoring and management of mining equipment from a safe distance."
        },
        {
          heading: "Sustainable Technologies",
          text: "Innovations in renewable energy, water recycling, and waste management are reducing the environmental impact of mining."
        }
      ]
    }
  };

  // Filter content based on search query within the active section
  const filteredContent = educationSections[activeTab].content.filter(item =>
    item.heading.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Courses data
  const courses = [
    {
      title: "Introduction to Mining Engineering",
      
      description: "Learn the fundamentals of mining engineering, including exploration, extraction, and processing methods.",
      topics: ["Mining principles", "Site evaluation", "Basic equipment", "Safety fundamentals"],
      image: "/images/14.jpg"
    },
    {
      title: "Advanced Mining Techniques",
     
      description: "Explore cutting-edge mining methods and technologies used in modern mining operations.",
      topics: ["Underground systems", "Automation technology", "Drilling techniques", "Production optimization"],
      image: "/images/15.jpg"
    },
    {
      title: "Mining Safety and Regulations",
     
      description: "Comprehensive overview of safety protocols, regulatory frameworks, and compliance requirements in mining.",
      topics: ["Risk assessment", "Emergency protocols", "Regulatory compliance", "Safety culture"],
      image: "/images/16.jpg"
    }
  ];

  
  // Course slider navigation
  const nextSlide = () => {
    setActiveSlide((prev) => (prev === courses.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? courses.length - 1 : prev - 1));
  };

  return (
    <div className={`relative min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'} overflow-hidden`} ref={scrollRef}>
      <Navbar />
      <Head>
        <title>Mining Education Center | Comprehensive Mining Knowledge</title>
        <meta name="description" content="Expand your knowledge in modern mining practices, from fundamentals to advanced techniques and digital transformation." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* 3D Sand Background */}
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0" />

      {/* Dark/Light Mode Toggle (This is a backup toggle, primarily use the one in Navbar) */}
     

      {/* Hero Section */}
      <main className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              MINING EDUCATION CENTER
            </motion.h1>
            <motion.p 
              className={`text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto ${isDarkMode ? 'opacity-80' : 'opacity-90'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Comprehensive resources to expand your knowledge and skills in modern mining practices.
            </motion.p>
          </div>

          {/* Category Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {Object.keys(educationSections).map((section) => (
              <motion.button
                key={section}
                onClick={() => { setActiveTab(section as keyof typeof educationSections); setSearchQuery(""); }}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeTab === section
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-black font-semibold'
                    : `${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} hover:bg-opacity-80`
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {educationSections[section as keyof typeof educationSections].title}
              </motion.button>
            ))}
          </div>

          {/* Content Section */}
          <div className={`rounded-lg p-8 mb-12 ${isDarkMode ? 'bg-gray-900 bg-opacity-70' : 'bg-white bg-opacity-90'} shadow-lg backdrop-blur-sm`}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500 mb-6">
              {educationSections[activeTab].title}
            </h2>
            
            <div className="space-y-8">
              {(filteredContent.length > 0 ? filteredContent : educationSections[activeTab].content)
                .map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h3 className="text-xl md:text-2xl font-semibold text-amber-400 mb-2">{item.heading}</h3>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Featured Courses Section */}
      <section className="relative z-10 py-16 bg-gradient-to-b from-transparent via-gray-900/50 to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">FEATURED COURSES</h2>
            <p className={`text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto ${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>
              Explore our curated mining courses designed to enhance your skills and industry knowledge.
            </p>
          </div>

          {/* Course Slider */}
          <div className="relative overflow-hidden rounded-lg">
            <div className={`course-slider relative h-96 md:h-[600px] ${isDarkMode ? 'bg-gray-900' : 'bg-gray-200'} rounded-lg overflow-hidden`}>
              {courses.map((course, index) => (
                <motion.div 
                  key={index}
                  className={`absolute inset-0 flex items-center ${index === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ 
                    opacity: index === activeSlide ? 1 : 0,
                    scale: index === activeSlide ? 1 : 0.9,
                    x: index === activeSlide ? 0 : (index < activeSlide ? -100 : 100)
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                    <div className="flex flex-col justify-center">
                      <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2">{course.title}</h2>
                      <p className={`text-base md:text-lg lg:text-xl mb-6 ${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>{course.description}</p>
                      <div>
                        {/* <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 md:py-3 md:px-8 rounded-md text-base md:text-lg font-medium transition-colors mr-4">
                          Enroll Now
                        </button>
                        <button className={`border ${isDarkMode ? 'border-white' : 'border-gray-900'} hover:border-orange-500 hover:text-orange-500 py-2 px-6 md:py-3 md:px-8 rounded-md text-base md:text-lg font-medium transition-colors`}>
                          View Syllabus
                        </button> */}
                      </div>
                    </div>
                    <div className="relative">
                      <motion.img 
                        src={course.image} 
                        alt={course.title} 
                        className="rounded-lg object-cover w-full h-full"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Navigation Arrows */}
              <button 
                onClick={prevSlide} 
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'bg-black bg-opacity-50' : 'bg-white bg-opacity-50'} rounded-full p-2 z-20 hover:bg-opacity-70 transition-all`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <button 
                onClick={nextSlide} 
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'bg-black bg-opacity-50' : 'bg-white bg-opacity-50'} rounded-full p-2 z-20 hover:bg-opacity-70 transition-all`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
              
              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {courses.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`w-3 h-3 rounded-full ${index === activeSlide ? 'bg-orange-500' : isDarkMode ? 'bg-white bg-opacity-50' : 'bg-gray-900 bg-opacity-50'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Sections */}

      {/* Licensing & Royalty Calculation Section */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8">Licensing & Royalty Calculation</h2>
          <p className="text-center text-lg md:text-xl lg:text-2xl mb-8">
            Discover how digital platforms streamline mining licensing and automate royalty calculations for transparency and efficiency.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-lg shadow-lg`}>
              <h3 className="text-xl font-bold mb-2">Digital Licensing Process</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Replace manual paperwork with a seamless online application system that lets miners submit and track their licenses in real time.
              </p>
            </div>
            <div className={`p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-lg shadow-lg`}>
              <h3 className="text-xl font-bold mb-2">Automated Royalty Calculation</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Advanced algorithms compute royalties based on extraction volumes and mineral types, minimizing errors and ensuring fairness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Transformation in Mining Section */}
      <section className={`relative z-10 py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-200'}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Digital Transformation in Mining
          </h2>
          <p className={`text-center text-lg md:text-xl lg:text-2xl mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Discover how advanced digital technologies are reshaping mining operations for enhanced safety, increased efficiency, and greater sustainability.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg`}>
              <h3 className="text-xl font-bold mb-2">Centralized Data Systems</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Consolidate diverse data streams to streamline operations and enable real-time analytics.
              </p>
            </div>
            <div className={`p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg`}>
              <h3 className="text-xl font-bold mb-2">GIS Mapping</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Utilize geospatial technologies to monitor sites and accurately assess environmental impacts.
              </p>
            </div>
            <div className={`p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg`}>
              <h3 className="text-xl font-bold mb-2">AI & Automation</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Leverage AI-powered tools to optimize operations, predict maintenance needs, and support strategic decision-making.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies & Success Stories Section */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8">Case Studies & Success Stories</h2>
          <p className="text-center text-lg md:text-xl lg:text-2xl mb-8">
            Real-world examples showcasing how digital transformation has revolutionized mining practices.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-lg shadow-lg`}>
              <h3 className="text-xl font-bold mb-2">Digital Licensing Success</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                A mining firm cut processing times by 50% by adopting an online licensing system, resulting in greater transparency and efficiency.
              </p>
            </div>
            <div className={`p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-lg shadow-lg`}>
              <h3 className="text-xl font-bold mb-2">Automated Royalty Efficiency</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Automation in royalty calculation has minimized errors and disputes, ensuring regulatory compliance and timely revenue collection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mining Innovations Section */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">MINING INNOVATIONS</h2>
            <p className={`text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto ${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>
              Discover the latest advancements in mining technology and sustainable practices.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Automation",
                icon: "🤖",
                description: "Revolutionizing operations with autonomous machinery and robotics."
              },
              {
                title: "Sustainability",
                icon: "🌱",
                description: "Adopting eco-friendly practices to minimize environmental impact."
              },
              {
                title: "Data Analytics",
                icon: "📊",
                description: "Harnessing big data for optimized decision-making in mining operations."
              },
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className={`rounded-lg p-8 text-center ${isDarkMode ? 'bg-gray-900 bg-opacity-70' : 'bg-white bg-opacity-70'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)" }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className={`${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer
        className={`relative z-10 py-8 ${
          isDarkMode ? 'bg-gray-900' : 'bg-gray-800'
        }`}
      >
        <div className="container mx-auto px-4 text-center">
          <p
            className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-300'
            }`}
          >
            &copy; {new Date().getFullYear()} CeylonMine. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}