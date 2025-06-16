"use client";

import React, { useState, useEffect } from 'react';
import MainTemplate from './components/MainTemplate';
import { motion } from 'framer-motion';
import Footer from './components/Footer';

// ImageSlider component moved outside
interface ImageSliderProps {
  currentSlide: number;
  setCurrentSlide: (slide: number) => void;
}

const ImageSlider = ({ currentSlide, setCurrentSlide }: ImageSliderProps) => {
  const images = [
    {
      src: "/images/1.jpg",
      title: "Empowering Sustainable Mining",
      description: "Revolutionizing the minerals sector with digital solutions for responsible resource extraction."
    },
    {
      src: "/images/2.jpg",
      title: "Transparent Licensing",
      description: "Streamline mining permits and certifications with our blockchain-backed verification system."
    },
    {
      src: "/images/3.jpg",
      title: "Automated Royalty Calculations",
      description: "Precision mineral valuation and tax assessment using real-time market rates and production data."
    },
    {
      src: "/images/4.jpg",
      title: "Environmental Stewardship",
      description: "Monitor ecological impact with integrated satellite imagery, IoT sensors, and AI analytics."
    },
    {
      src: "/images/5.jpg",
      title: "Digital Transformation",
      description: "Harness machine learning to optimize extraction workflows and resource management."
    }
  ];

  const nextImage = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextImage]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {images.map((image, index) => (
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{
            opacity: index === currentSlide ? 1 : 0,
            zIndex: index === currentSlide ? 10 : 0
          }}
          transition={{ duration: 1 }}
        >
          <img 
            src={image.src} 
            alt={`Slide ${index + 1}`} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: index === currentSlide ? 1 : 0, y: index === currentSlide ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
              {image.title}
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto">
              {image.description}
            </p>
          </motion.div>
        </motion.div>
      ))}

      {/* Navigation Buttons */}
      <div className="absolute inset-0 flex items-center justify-between px-8 z-20">
        <button 
          onClick={prevImage}
          className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all"
          aria-label="Previous image"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>
        <button 
          onClick={nextImage}
          className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all"
          aria-label="Next image"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>
      </div>
      
      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-orange-500' : 'bg-white bg-opacity-50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(savedTheme === 'dark' || (!savedTheme && systemPrefersDark));

    const handleThemeChange = (event: any) => {
      setIsDarkMode(event.detail.isDarkMode);
      localStorage.setItem('theme', event.detail.isDarkMode ? 'dark' : 'light');
    };

    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, []);

  const features = [
    {
      id: 1,
      title: "DIGITAL LICENSING",
      subtitle: "Streamlined Concessions & Permits",
      description: "Centralize mining rights applications with blockchain-verified documentation to reduce processing time from months to days while ensuring regulatory compliance and preventing fraud.",
      image: "/images/13.jpg",
    },
    {
      id: 2,
      title: "AUTOMATED ROYALTY CALCULATION",
      subtitle: "Precision Resource Valuation",
      description: "Advanced algorithms process real-time mineral extraction data, market prices, and grade classifications to ensure accurate royalty computations with transparent audit trails for both operators and authorities.",
      image: "/images/8.jpg",
    },
    {
      id: 3,
      title: "SUSTAINABLE MINING OVERSIGHT",
      subtitle: "Environmental Intelligence",
      description: "Integrate satellite imagery, drone surveys, and IoT sensor networks to monitor water quality, air emissions, and land disturbance metrics with automated compliance reporting and remediation workflows.",
      image: "/images/9.jpg",
    },
  ];

  const translations = {
    en: {
      heroSubtitle: "Digitizing mineral extraction permitting and taxation to drive transparency, compliance, and sustainability throughout Sri Lanka's mining value chain.",
      ourCommitment: "OUR COMMITMENT",
      commitmentText: "CeylonMine is dedicated to revolutionizing mining operations through cutting-edge digital technology, ensuring transparent governance, operational efficiency, and ecological protection.",
      transparency: "TRANSPARENCY",
      efficiency: "EFFICIENCY",
      sustainability: "SUSTAINABILITY",
      featuresHeading: "OUR PLATFORM IN ACTION",
      featuresText: "Experience the seamless integration of digital permitting, AI-driven royalty calculation, and real-time environmental monitoring with CeylonMine's comprehensive minerals management ecosystem.",
      userFooter: "All rights reserved."
    },
    si: {
      userFooter: "සියලු හිමිකම් ඇවිරිණි."
    }
  };

  const t = translations[language];

  return (
    <MainTemplate isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}>
      <main className="relative z-10 pt-28 pb-16">
        <div className="container mx-auto px-4">
          <ImageSlider 
            currentSlide={currentSlide} 
            setCurrentSlide={setCurrentSlide} 
          />
          
          <div className="text-center mb-16 mt-16">
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              CeylonMine
            </motion.h1>
            <motion.p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto opacity-80">
              {t.heroSubtitle}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                className={`rounded-lg p-8 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-orange-500 mb-2">{feature.subtitle}</p>
                <p className="opacity-80">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <section className={`relative z-10 py-16 ${isDarkMode ? 'bg-gray-900 bg-opacity-50' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">{t.ourCommitment}</h2>
          <p className="max-w-3xl mx-auto mb-12 opacity-80">{t.commitmentText}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: t.transparency, icon: "🔍" },
              { title: t.efficiency, icon: "⚙️" },
              { title: t.sustainability, icon: "🌱" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold">{item.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-600">
              {t.featuresHeading}
            </h2>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {t.featuresText}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
            {[
              { title: "Drone Surveying", desc: "High-precision terrain mapping for volume calculations and environmental monitoring." },
              { title: "Automated Permitting", desc: "AI-powered document verification reducing licensing times from weeks to hours." },
              { title: "Mineral Analysis", desc: "Real-time assay data integration for accurate grade determination and valuation." },
              { title: "Compliance Monitoring", desc: "Automated violation detection with instant alerts to regulators and operators." },
              { title: "Community Portal", desc: "Transparent information sharing with local stakeholders promoting trust and cooperation." },
              { title: "Production Tracking", desc: "Blockchain-verified mineral chain of custody from extraction to market." }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative aspect-square group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.6, delay: index * 0.15 }
                }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl rotate-6 scale-[0.97] opacity-75 blur-sm group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
                <div className="relative h-full overflow-hidden rounded-xl shadow-2xl group-hover:shadow-lg group-hover:shadow-orange-500/30">
                  <img 
                    src={`/images/${index + 1}.jpg`} 
                    alt={`Mining Feature ${index + 1}`}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-40 transition-all duration-300 flex items-end">
                    <div className="p-6 w-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-white text-xl font-bold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-white text-sm opacity-90">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer language={language} isDarkMode={isDarkMode} />
    </MainTemplate>
  );
}