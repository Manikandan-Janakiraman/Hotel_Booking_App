import React from "react";
import AttractionCard from "./AttractionCard";

import chennaiImg from "../assets/attraction/che.png";
import bangaloreImg from "../assets/attraction/ban.png";
import hydImg from "../assets/attraction/hyd.png";
import mumImg from "../assets/attraction/mum.png";

const Attraction = () => {

  const attractionData = [
    {
      title: "Chennai",
      image: chennaiImg,
      places: [
        "Marina Beach",
        "Elliot’s Beach",
        "Kapaleeshwarar Temple",
        "Santhome Basilica",
        "Fort St. George"
      ]
    },
    {
      title: "Bangalore",
      image: bangaloreImg,
      places: [
        "Lalbagh Botanical Garden",
        "Cubbon Park",
        "Bangalore Palace",
        "ISKCON Temple",
        "Bannerghatta Park"
      ]
    },
    {
      title: "Hyderabad",
      image: hydImg,
      places: [
        "Charminar",
        "Golconda Fort",
        "Ramoji Film City",
        "Hussain Sagar",
        "Salar Jung Museum"
      ]
    },
    {
      title: "Mumbai",
      image: mumImg,
      places: [
        "Gateway of India",
        "Marine Drive",
        "Elephanta Caves",
        "Juhu Beach",
        "Siddhivinayak Temple"
      ]
    }
  ];

  return (
    <div className="px-10 py-16">
      
      <h1 className="text-4xl font-bold text-center mb-12">
        Popular Attractions
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {attractionData.map((item, index) => (
          <AttractionCard
            key={index}
            title={item.title}
            image={item.image}
            places={item.places}
          />
        ))}
      </div>

    </div>
  );
};

export default Attraction;
