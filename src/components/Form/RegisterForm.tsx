"use client";

import React from "react";

const RegisterForm = () => {
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Mencegah reload halaman

    const form = e.currentTarget;
    const formData = new FormData(form);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullname: formData.get("fullname"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    if (res.ok) {
      alert("Berhasil");
    } else {
      alert("Gagal");
    }
  };

  return (
    <form
      className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
      onSubmit={handleRegister} // Panggil fungsi di sini
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Register
      </h2>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="fullname"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            name="fullname"
            id="fullname"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
