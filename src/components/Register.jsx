import React, { useRef } from "react";
import useAuthStore from "../store/authStore";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function notify(message) {
  toast.success(message);
}

const Register = () => {
  const { register } = useAuthStore();

  const navigate = useNavigate();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleRegister() {
    const { success, error } = await register(
      usernameRef.current.value,
      emailRef.current.value,
      passwordRef.current.value
    );

    if (success) {
      notify("Registration successful");
      usernameRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value = "";
      navigate("/login");
    } else {
      toast.error(error);
    }
  }

  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-2xl h-[630px] border p-6 flex flex-col">
      <legend className="fieldset-legend text-6xl font-bold mb-6">
        Register
      </legend>

      {/* Inputs container */}
      <div className="flex flex-col gap-4 flex-1">
        {/* Email */}
        <label className="label text-2xl font-semibold">Username</label>
        <input
          type="text"
          className="input input-xl w-full"
          ref={usernameRef}
          placeholder="Enter your Username"
        />

        {/* Email */}
        <label className="label text-2xl font-semibold">Email</label>
        <input
          type="text"
          className="input input-xl w-full"
          ref={emailRef}
          placeholder="Enter your Email"
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
          onClick={handleRegister}
        >
          Register
        </button>

        {/* Toggle Form */}
        <button
          className="text-lg text-center"
          onClick={() => navigate("/login")}
        >
          Already have an account?{" "}
          <span className="text-blue-600 underline cursor-pointer">Login</span>
        </button>
      </div>
    </fieldset>
  );
};

export default Register;
