import React, { useEffect, useState } from "react";

const Footer = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <footer
      className={`bg-gray-800 text-white h-16 fixed bottom-0 left-0 w-full transition-transform duration-300 ${
        showFooter ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="container mx-auto py-2 px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <h1 className="text-2xl font-bold">My Blogs</h1>
          <p className="text-sm">© 2024 My Blog. All rights reserved.</p>
        </div>

        <ul className="flex space-x-4">
          <li>
            <a href="#about" className="hover:text-gray-400">
              Information
            </a>
          </li>
          <li>
            <a href="#services" className="hover:text-gray-400">
              Services
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-gray-400">
              Others
            </a>
          </li>
        </ul>

        <div className="flex space-x-2 mt-2 md:mt-0">
          <a
            href="https://facebook.com"
            aria-label="Facebook"
            className="hover:text-gray-400"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.41c0-3.1 1.893-4.79 4.658-4.79 1.324 0 2.462.099 2.794.143v3.24l-1.918.001c-1.504 0-1.795.714-1.795 1.762v2.309h3.59l-.467 3.622h-3.123V24h6.116c.732 0 1.325-.593 1.325-1.325V1.325C24 .593 23.407 0 22.675 0z" />
            </svg>
          </a>
          <a
            href="https://twitter.com"
            aria-label="Twitter"
            className="hover:text-gray-400"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775A4.932 4.932 0 0 0 23.337 3c-.958.569-2.017.983-3.149 1.202a4.92 4.92 0 0 0-8.384 4.482C7.69 8.13 4.066 6.1 1.64 3.16a4.822 4.822 0 0 0-.666 2.475 4.92 4.92 0 0 0 2.188 4.1 4.902 4.902 0 0 1-2.228-.616v.061a4.93 4.93 0 0 0 3.946 4.827 4.964 4.964 0 0 1-2.224.085 4.929 4.929 0 0 0 4.6 3.42 9.86 9.86 0 0 1-6.102 2.104c-.397 0-.788-.023-1.175-.068A13.955 13.955 0 0 0 7.548 21c9.058 0 14.01-7.507 14.01-14.01 0-.213-.005-.425-.014-.636A10.025 10.025 0 0 0 24 4.557z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
