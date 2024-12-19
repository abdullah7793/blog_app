import React from "react";

const Header = () => {
  return (
    <header className="bg-stone-500 text-white py-4">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-gray-200 text-center">
          My Blogs
        </h1>
        <nav>
          <ul className="flex space-x-4 text-center justify-center">
            <li>
              <a href="#home" className="hover:text-white text-gray-200 px-20 ">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-white text-gray-200 px-20">
                About
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-white  text-gray-200 text-center px-20"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
