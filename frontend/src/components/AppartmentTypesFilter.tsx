import { appartmentTypes } from "../config/appartment-options-config";

type Props = {
  selectedAppartmentTypes: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const AppartmentTypesFilter = ({
  selectedAppartmentTypes: selectedHotelTypes,
  onChange,
}: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Appartment Type</h4>
      {appartmentTypes.map((appartmentType) => (
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={appartmentType}
            checked={selectedHotelTypes.includes(appartmentType)}
            onChange={onChange}
          />
          <span>{appartmentType}</span>
        </label>
      ))}
    </div>
  );
};

export default AppartmentTypesFilter;
