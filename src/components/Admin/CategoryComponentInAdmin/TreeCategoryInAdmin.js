import React, { useState } from "react";
import { useEffect } from "react";
import {
  useCategoryHandleInAdmin,
  useFetchCategoryDetailInAdmin,
} from "../../../app/hook/CategoryHook";

export const TreeCategoryInAdmin = ({ data, idHandle }) => {
  const [expanded, setExpanded] = useState([]);
  const [categoryID,setCategoryID] = useState(null)
  const categoryHandleInAdmin = useCategoryHandleInAdmin();

  useFetchCategoryDetailInAdmin(categoryID)
  const handleTreeClickSpan = async (id) => {
    if(categoryHandleInAdmin.id===id)     setCategoryID(null)
    else setCategoryID(id)
  };

  const handleTreeClickDiv = (id) => {
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
          onClick={() => handleTreeClickDiv(treeItem.id)}
          className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
          style={{ paddingLeft: `${level * 16}px` }} // Add left padding
        >
          <div
            className={` mr-6 hover:text-pink-500 ${
              treeItem.id === categoryHandleInAdmin.id ? "text-pink-500" : ""
            }`}
          >
            <span
              onClick={(e) => {
                e.stopPropagation();
                handleTreeClickSpan(treeItem.id);
              }}
            >
              {treeItem.name}
            </span>
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

  // Expand the tree until the ID of the clicked item is reached
  useEffect(() => {
    if (idHandle) {
      const findItemById = (treeData, id) => {
        if (!treeData) {
          return null;
        }
        for (let i = 0; i < treeData.length; i++) {
          if (treeData[i].id === id) {
            setExpanded((prevExpanded) => [...prevExpanded, id]);
            return;
          }
          if (treeData[i].children) {
            findItemById(treeData[i].children, id);
          }
        }
      };
      findItemById(data, idHandle);
    }
  }, [idHandle, data]);

  return (
    <div className="w-full">
      <ul className="list-disc">{renderTree(data)}</ul>
    </div>
  );
};
