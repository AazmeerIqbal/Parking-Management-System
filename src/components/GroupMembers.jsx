import React from "react";
import { ImCross } from "react-icons/im";

const GroupMembers = ({ setShowGroupMembers }) => {
  return (
    <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div class="bg-white rounded-lg drop-shadow-xl w-[35%] h-[70vh] p-6 flex flex-col bg-gradient-to-br from-rose-100 to-teal-100">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-2xl font-bold">Group Members</h2>
          <ImCross
            class="cursor-pointer"
            onClick={() => setShowGroupMembers(false)}
          />
        </div>
        <ul class="flex flex-col justify-center h-full space-y-4">
          <li class="flex items-center ">
            <img
              src="/Marium.jpg"
              alt="Member 1"
              class="w-20 h-20 rounded-full mr-4"
            />
            <div>
              <p class="text-2xl">Marium Khan</p>
              <p class="text-gray-500 text-sm">ID: FA22-BSCS-0169</p>
            </div>
          </li>
          <li class="flex items-center ">
            <img
              src="/Azmeer2.jpg"
              alt="Member 2"
              class="w-20 h-20 rounded-full mr-4"
            />
            <div>
              <p class="text-2xl">Azmeer Iqbal</p>
              <p class="text-gray-500 text-sm">ID: FA22-BSCS-0192</p>
            </div>
          </li>
          <li class="flex items-center ">
            <img
              src="/Sadiq.jpg"
              alt="Member 3"
              class="w-20 h-20 rounded-full mr-4"
            />
            <div>
              <p class="text-2xl">Syed Muhammad Sadiq</p>
              <p class="text-gray-500 text-sm">ID: FA22-BSCS-0202</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GroupMembers;
