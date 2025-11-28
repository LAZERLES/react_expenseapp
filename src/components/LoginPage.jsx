import React, { useState, useRef } from "react";
import useAuthStore from "../store/authStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function notify(message) {
  toast.success(message);
}

const LoginPage = () => {
  const { login} = useAuthStore();

  const navigate = useNavigate();
  const usernameoremailRef = useRef();
  const passwordRef = useRef();

  async function handleLogin() {
    const { success, error } = await login(
      usernameoremailRef.current.value,
      passwordRef.current.value
    );

    if (success) {
      notify("Login successful");
      usernameoremailRef.current.value = "";
      passwordRef.current.value = "";
      navigate("/dashboard");
    } else {
      toast.error(error);
    }
  }

  return (
    <>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-2xl h-[630px] border p-6 flex flex-col">
        <legend className="fieldset-legend text-6xl font-bold mb-6">
          Login
        </legend>

        {/* Inputs container */}
        <div className="flex flex-col gap-4 flex-1">
          {/* Email */}
          <label className="label text-2xl font-semibold">
            Email or Username
          </label>
          <input
            type="text"
            className="input input-xl w-full"
            ref={usernameoremailRef}
            placeholder="Enter your Email or Username"
          />

          {/* Password */}
          <label className="label text-2xl font-semibold">Password</label>
          <input
            type="password"
            className="input input-xl w-full"
            ref={passwordRef}
            placeholder="Enter your Password"
          />
        </div>

        {/* Bottom container for submit + toggle */}
        <div className="mt-auto flex flex-col gap-4">
          {/* Submit */}
          <button
            className="btn btn-soft btn-xl w-full bg-gradient-to-b from-white to-[#f8eedb] shadow-md active:translate-y-0.5 active:btn-active"
            onClick={handleLogin}
          >
            Login
          </button>


          {/* Toggle Form */}
          <button
            className="text-lg text-center"
            onClick={() => navigate("/register")}
          >
            Don’t have an account?{" "}
            <span className="text-blue-600 underline cursor-pointer">
              Register
            </span>
          </button>
        </div>
      </fieldset>
    </>
  );
};

export default LoginPage;
