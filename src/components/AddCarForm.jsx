import { useState } from "react";

function AddCarForm({ onAddCar }) {
  const [licensePlate, setLicensePlate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!licensePlate.trim()) return;

    const success = onAddCar({ licensePlate });
    if (success) {
      setLicensePlate("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">Add New Car</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="licensePlate"
            className="block text-sm font-medium text-gray-700"
          >
            License Plate
          </label>
          <input
            type="text"
            id="licensePlate"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
            placeholder="Enter license plate"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Park Car
        </button>
      </form>
    </div>
  );
}

export default AddCarForm;
