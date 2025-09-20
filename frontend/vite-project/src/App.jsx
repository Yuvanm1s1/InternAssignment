

import React from "react";
import Register from "./Register.jsx";
import Login from "./Login.jsx";

function ProtectedTable() {
  const token = localStorage.getItem("token");
  if (!token) return <div className="text-center mt-10 text-red-500 font-semibold">Access Denied</div>;

  return (
    <div className="overflow-x-auto mt-10 max-w-4xl mx-auto">
      <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 border-b text-left">Name</th>
            <th className="px-6 py-3 border-b text-left">DOB</th>
            <th className="px-6 py-3 border-b text-left">Email</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className="px-6 py-3 border-b">Sample</td>
            <td className="px-6 py-3 border-b">2000-01-01</td>
            <td className="px-6 py-3 border-b">sample@example.com</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default function App() {
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <Register />
      <Login />
      <ProtectedTable />
    </div>
  );
}
