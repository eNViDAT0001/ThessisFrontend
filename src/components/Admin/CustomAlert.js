import React from "react";

const CustomAlert = ({ message }) => {
  return (
    <div className="px-6">
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded shadow">
          <h1 className=" font-bold">Content detail:</h1>
          <div className="flex flex-col space-y-4">
            <h1 className="max-w-[250px] break-all">{message}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
