import React from "react";
import {
  CUSTOMER_CARE,
  FOLLOW_US,
  PAYMENT,
  PRIVACY,
} from "../../dummy_database/FooterDummyDatabase";

export const FooterInfo = (props) => {
  return (
    <ul>
      <h1 className="mb-1 font-semibold">{props.title}</h1>
      {props.data.map((item) => (
        <li key={item.name}>
          <a
            className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6"
            href={item.route}
          >
            {item.name}
          </a>
        </li>
      ))}
    </ul>
  );
};
export const InfoContainer = (props) => {
  return (
    <div></div>
  );
};
