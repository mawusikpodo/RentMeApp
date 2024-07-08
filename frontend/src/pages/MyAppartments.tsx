import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyAppartments = () => {
  const { data: appartmentData } = useQuery(
    "fetchMyAppartments",
    apiClient.fetchMyAppartments,
    {
      onError: () => {},
    }
  );

  if (!appartmentData) {
    return <span>No Appartments found</span>;
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Appartments</h1>
        <Link
          to="/add-appartment"
          className="flex bg-green-600 text-white text-xl font-bold p-2 hover:bg-green-500"
        >
          Add Appartment
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {appartmentData.map((appartment) => (
          <div
            data-testid="hotel-card"
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
          >
            <h2 className="text-2xl font-bold">{appartment.name}</h2>
            <div className="whitespace-pre-line">{appartment.description}</div>
            <div className="grid grid-cols-5 gap-2">
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsMap className="mr-1" />
                {appartment.city}, {appartment.country}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsBuilding className="mr-1" />
                {appartment.type}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiMoney className="mr-1" />£{appartment.pricePerNight} per
                night
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiHotel className="mr-1" />
                {appartment.adultCount} adults, {appartment.childCount} children
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiStar className="mr-1" />
                {appartment.starRating} Star Rating
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                to={`/edit-appartment/${appartment._id}`}
                className="flex bg-green-600 text-white text-xl font-bold p-2 hover:bg-green-500"
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppartments;
