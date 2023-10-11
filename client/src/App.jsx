import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { logo } from "./assets";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Summarize from "./pages/Summarize";
import SummarizeApp from "./components/SummarizeApp";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import picture from "../src/assets/Photo.jpg";
const App = () => {
  const [toastStatus, settoastStatus] = useState(true);
  if (toastStatus) {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <img className="h-10 w-10 rounded-full" src={picture} alt="" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">Yash Sarode</p>
                <p className="mt-1 text-sm text-gray-500">
                  Backend server is using free hoisting service which may
                  require 8-10 sec to warm-up initially, sorry for the
                  inconvenience.
                </p>
              </div>
            </div>
          </div>
          {/* <div className="flex border-l border-gray-200">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Close
        </button>
      </div> */}
        </div>
      ),
      {
        duration: 4000,
      }
    );
    settoastStatus(false);
  }
  return (
    <BrowserRouter>
      <header
        className="w-full flex justify-between items-center bg-white z-50
    sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]"
      >
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>

        <div>
          <Link
            to="/create-post"
            className="font-inter font-medium
           bg-black text-white border border-white hover:bg-white hover:text-black hover:border-black 
            hover:scale-150 duration-100 px-4 py-2 rounded-md mr-3"
          >
            Create
          </Link>

          <Link
            to="/summarize"
            className="font-inter font-medium
           bg-black text-white border border-white hover:bg-white hover:text-black hover:border-black 
            hover:scale-150 duration-100 px-4 py-2 rounded-md mr-3"
          >
            Summarize
          </Link>
        </div>
      </header>

      <main
        className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe]
    min-h-[calc(100vh-73px)]"
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/summarize" element={<SummarizeApp />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
