import React, { useState } from "react";

export const CategoryTree = ({ data }) => {
  const [expanded, setExpanded] = useState([]);

  const handleTreeClick = (id) => {
    if (expanded.includes(id)) {
      setExpanded((prevExpanded) => prevExpanded.filter((item) => item !== id));
    } else {
      setExpanded((prevExpanded) => [...prevExpanded, id]);
    }
  };

  const renderTree = (treeData, level = 0) => {
    if (!treeData) {
      return null;
    }

    return treeData.map((treeItem) => (
      <div key={treeItem.id}>
        <div
          className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
          onClick={() => handleTreeClick(treeItem.id)}
          style={{ paddingLeft: `${level * 16}px` }} // Add left padding
        >
          <div className=" hover:text-pink-500">
            <span>{treeItem.name}</span>
          </div>
          {treeItem.children && (
            <span
              className={`ml-auto ${
                expanded.includes(treeItem.id) ? "rotate-90" : ""
              }`}
            >
              &#8250;
            </span>
          )}
        </div>
        {expanded.includes(treeItem.id) &&
          renderTree(treeItem.children, level + 1)}
      </div>
    ));
  };

  return (
    <div className="w-full">
      <ul className="list-disc">{renderTree(data)}</ul>
    </div>
  );
};
