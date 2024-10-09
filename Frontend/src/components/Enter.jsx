import React from "react";

const Enter = () => {
  const login = () => {
    window.open("http://localhost:8000/auth/google/callback", "_self");
  };

  return (
    <div className="w-[100vw] h-[88vh] flex justify-center items-center">
      <button className="bg-sky-400 py-2 px-4 text-white text-xl active:scale-90 duration-200"
      onClick={login}
      >
        Sign With Google
      </button>
    </div>
  );
};

export default Enter;
