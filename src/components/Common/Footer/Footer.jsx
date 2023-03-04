import { ICONS } from "../../../dummy_model/FooterDummy";
import "./Footer.css";
import SocialIcons from "./SocialIcons";

export const Footer = () => {
  return (
    <div className="bg-gray-900 text-white">
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#ffffff19] pt-3">
        <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
          <span className="text-teal-400">CES</span> always with you
        </h1>
        <div>
        </div>
      </div>
      <div className="md:flex sm:px-12 px-4 bg-[#ffffff19] py-2">
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center pt-2 text-gray-400 text-sm pb-8">
        <span>© 2022 Apply. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        <SocialIcons Icons={ICONS} />
      </div>
    </div>
  );
};