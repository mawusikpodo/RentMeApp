import { Link } from "react-router-dom";
import { AppartmentType } from "../shared/types";

type Props = {
  appartment: AppartmentType;
};

const LatestDestinationCard = ({ appartment }: Props) => {
  return (
    <Link
      to={`/detail/${appartment._id}`}
      className="relative cursor-pointer overflow-hidden rounded-md"
    >
      <div className="h-[300px]">
        <img
          src={appartment.imageUrls[0]}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-md">
        <span className="text-white font-bold tracking-tight text-3xl">
          {appartment.name}
        </span>
      </div>
    </Link>
  );
};

export default LatestDestinationCard;
