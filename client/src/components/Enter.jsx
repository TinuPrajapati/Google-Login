import React from "react";
import { Link } from "react-router-dom";
import google from "../assets/google.png"

const Enter = () => {
  return (
    <div class="flex bg-white rounded-lg shadow-2xl w-full h-full border-2 border-custom2 p-2">

      {/* Image Div */}
      <div class="w-1/2 h-full">
        <img src="https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80" alt="No image Found" className="w-full h-full rounded-md" />
      </div>

      {/* Text Div */}
      <div class="w-1/2 h-full flex flex-col justify-center items-center gap-2">
        <p class="text-xl text-gray-600 text-center">Welcome Back!</p>
        <h2 class="text-2xl font-semibold text-gray-700 text-center">Login With Platform</h2>

        {/* Sign In Buttons */}
        <Link to={`${import.meta.env.VITE_backend}/auth/google/callback`} className="w-1/2 h-12 bg-custom2 border-2 border-custom3 rounded-lg flex justify-center items-center gap-3 text-xl font-Lora text-white active:scale-90 duration-200">
          <img src={google} alt="Google" className="w-6 h-6" />
          <p>Sign With Google</p>
        </Link>
      </div>
    </div>
  );
};

export default Enter;
