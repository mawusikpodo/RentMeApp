import React from "react";

export default function Footer() {
  return (
    <div className="bg-auto bg-[url('/src/assets/hero.jpg')]">
      <div className="bg-green-900 bg-opacity-50 py-10">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-3xl text-white font-bold tracking-tight">
            RentMe
          </span>
          <span className="text-white font-bold tracking-tight flex gap-4">
            <p className="cursor-pointer">Privacy Policy</p>
            <p className="cursor-pointer">Terms of Service</p>
          </span>
        </div>
      </div>
    </div>
  );
}
