import { format } from "date-fns";

function ParkingGrid({ slots, onRemoveCar }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Parking Grid</h2>
      <div className="grid grid-cols-4 gap-4">
        {slots.map((slot) => (
          <div
            key={slot.id}
            className={`p-4 rounded-lg border-2 ${
              slot.occupied
                ? "border-red-500 bg-red-50"
                : "border-green-500 bg-green-50"
            }`}
          >
            <div className="text-sm font-semibold mb-2">Slot {slot.id + 1}</div>
            {slot.occupied && slot.car ? (
              <div>
                <p className="text-sm">{slot.car.licensePlate}</p>
                <p className="text-xs text-gray-500">
                  {format(slot.car.entryTime, "HH:mm:ss")}
                </p>
                <button
                  onClick={() => onRemoveCar(slot.id)}
                  className="mt-2 bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Empty</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ParkingGrid;
