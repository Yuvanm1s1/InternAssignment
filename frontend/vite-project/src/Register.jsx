import React, { useState } from "react";


export function saveUserToLocalStorage(user, token) {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
}

const FormInput = ({ name, type = "text", placeholder, value, onChange }) => (
  <input
    name={name}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
);

export default function Register() {
  const [form, setForm] = useState({ name: "", dob: "", email: "", password: "" });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        saveUserToLocalStorage(data.user, data.token);
        alert("Registered successfully!");
        setForm({ name: "", dob: "", email: "", password: "" });
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      {error && <div className="text-red-500 mb-3 text-center">{error}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <FormInput name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <FormInput name="dob" type="date" placeholder="Date of Birth" value={form.dob} onChange={handleChange} />
        <FormInput name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <FormInput name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Register
        </button>
      </form>
    </div>
  );
}
