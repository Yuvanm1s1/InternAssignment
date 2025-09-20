import React, { useState } from "react";
import { saveUserToLocalStorage } from "./Register.jsx";

const FormInput = ({ name, type = "text", placeholder, value, onChange }) => (
  <input
    name={name}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
  />
);

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      saveUserToLocalStorage(data.user, data.token);
      alert(`Hi ${data.user.name}, logged in!`);
      setForm({ email: "", password: "" });
    } else setError(data.error);
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      {error && <div className="text-red-500 mb-3 text-center">{error}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <FormInput name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <FormInput name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
}
