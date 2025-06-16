"use client";

import React from 'react';

interface FooterProps {
  language?: string;
  isDarkMode?: boolean;
}

const translations = {
  en: {
    userFooter: "All rights reserved."
  },
  si: {
    userFooter: "සියලු හිමිකම් ඇවිරිණි."
  }
};

export default function Footer({ language = 'en', isDarkMode = true }: FooterProps) {
  const t = translations[language as keyof typeof translations];

  return (
    <footer className="relative z-10 py-8 bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} CeylonMine. {t.userFooter}
        </p>
      </div>
    </footer>
  );
}
