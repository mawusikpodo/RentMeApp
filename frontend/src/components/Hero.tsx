import React from "react";
import Header from "./Header";

function Hero() {
  return (
    <div className="bg-cover bg-[url('/src/assets/hero.jpg')]">
      <Header />
      <div className="bg-green-900 bg-opacity-50 pb-16">
        <div className="container mx-auto flex flex-col gap-2">
          <h1 className="text-5xl text-white font-bold">
            Affordable Appartments for Rent
          </h1>
          <p className="text-2xl text-white">
            Search low prices on appartments for rent...
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
