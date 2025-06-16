"use client";

import React from 'react';
import Navbar from "../navbar/page";

interface MainTemplateProps {
  children: React.ReactNode;
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
}

export default function MainTemplate({ children, isDarkMode }: MainTemplateProps) {
  return (
    <div className={`relative min-h-screen ${
      isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'
    } transition-colors duration-200`}>
      <Navbar />
      {children}
    </div>
  );
}
