import * as React from "react";

import { ItemTab } from "./ItemTab";
import { InformationTab } from "./InformationTab";
export const OrderTabPage = () => {
  return (
    <div className="w-[65%] space-y-5">
      <InformationTab />
      <ItemTab />
    </div>
  );
};
