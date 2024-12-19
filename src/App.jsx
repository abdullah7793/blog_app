import { useState } from "react";
import axios from "axios";
import Display from "./MyBlog/display.jsx";
import PostData from "./JSON/data.jsx";
import Header from "./MyBlog/header.jsx";
import Footer from "./MyBlog/footer.jsx";
import "./index.css";

function App() {
  return (
    <>
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-6">
        <section className="mb-8">
          <Display />
        </section>
      </div>
    </>
  );
}

export default App;
