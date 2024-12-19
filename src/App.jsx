import { useState, useEffect } from "react";
import ParkingGrid from "./components/ParkingGrid";
import AddCarForm from "./components/AddCarForm";
import Statistics from "./components/Statistics";
import AdminPanel from "./components/AdminPanel";
import { calculateStatistics } from "./utils/parkingUtils";
import GroupMembers from "./components/GroupMembers";

function App() {
  const [parkingSlots, setParkingSlots] = useState(() => {
    const slots = [];
    for (let i = 0; i < 20; i++) {
      slots.push({ id: i, occupied: false, car: null });
    }
    return slots;
  });

  const [parkingLogs, setParkingLogs] = useState([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showGroupMembers, setShowGroupMembers] = useState(false);
  const [stats, setStats] = useState({
    occupancyRate: 0,
    averageDuration: 0,
    totalCars: 0,
  });

  useEffect(() => {
    const newStats = calculateStatistics(parkingSlots, parkingLogs);
    setStats(newStats);
  }, [parkingSlots, parkingLogs]);

  const addCar = (carDetails) => {
    const availableSlot = parkingSlots.find((slot) => !slot.occupied);
    if (!availableSlot) {
      alert("Parking is full!");
      return false;
    }

    const updatedSlots = parkingSlots.map((slot) => {
      if (slot.id === availableSlot.id) {
        return {
          ...slot,
          occupied: true,
          car: {
            ...carDetails,
            entryTime: new Date(),
            slotId: slot.id,
          },
        };
      }
      return slot;
    });

    setParkingSlots(updatedSlots);
    setParkingLogs((prev) => [
      ...prev,
      {
        action: "ENTRY",
        carDetails,
        timestamp: new Date(),
        slotId: availableSlot.id,
      },
    ]);
    return true;
  };

  const removeCar = (slotId) => {
    const slot = parkingSlots[slotId];
    if (!slot.occupied) return;

    const updatedSlots = parkingSlots.map((slot) => {
      if (slot.id === slotId) {
        setParkingLogs((prev) => [
          ...prev,
          {
            action: "EXIT",
            carDetails: slot.car,
            timestamp: new Date(),
            slotId,
          },
        ]);
        return { ...slot, occupied: false, car: null };
      }
      return slot;
    });

    setParkingSlots(updatedSlots);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8 gap-3">
          <div className="flex items-center gap-3">
            {/* <img
              className="md:w-20 md:h-20 w-16 h-16 rounded-full"
              src="/logo3.jpg"
            /> */}
            <h1 className="md:text-3xl text-xl font-bold text-gray-800">
              Parking Mangement System
            </h1>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setShowGroupMembers(true)}
              className="bg-blue-500 text-white md:px-4 md:py-2 px-2 py-1 rounded hover:bg-blue-600"
            >
              Group Members
            </button>
            <button
              onClick={() => setShowAdmin(!showAdmin)}
              className="bg-blue-500 text-white md:px-4 md:py-2 px-2 py-1 rounded hover:bg-blue-600"
            >
              {showAdmin ? "View Parking" : "Admin Panel"}
            </button>
          </div>
        </header>

        {!showAdmin ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <AddCarForm onAddCar={addCar} />
              <Statistics stats={stats} />
            </div>
            <ParkingGrid slots={parkingSlots} onRemoveCar={removeCar} />
          </div>
        ) : (
          <AdminPanel
            parkingLogs={parkingLogs}
            slots={parkingSlots}
            stats={stats}
          />
        )}
        {showGroupMembers ? (
          <GroupMembers setShowGroupMembers={setShowGroupMembers} />
        ) : null}
      </div>
    </div>
  );
}

export default App;
