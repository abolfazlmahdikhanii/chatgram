import React from "react";
import Box from "../UI/Box/Box";
import SideMenuItem from "./SideMenuItem";
import ThemSwitch from "../UI/ThemSwitch/ThemSwitch";
import ProfileImage from "../ProfileImage/ProfileImage";

const SideMenu = () => {
  return (
    <Box>
      <section className="flex flex-col items-center justify-between h-full overflow-y-auto overflow-x-hidden">
        {/* top */}
        <div>
          {/* logo */}
          <div className="w-[80px] h-[80px]">
            <img
              src="images/logo.png"
              alt="logo"
              className="w-full h-full object-cover"
            />
          </div>
          {/* menu */}
          <nav className="flex flex-col items-center justify-center mt-1.5">
            <ul className="flex flex-col  gap-6 ">
             <SideMenuItem name="chat"/>
             <SideMenuItem name="save"/>
            </ul>
            <p className="w-9/12 mx-auto my-6 h-[1px] bg-gray-700"></p>
            <ul className="flex flex-col  gap-6 ">
            <SideMenuItem name="chanel"/>
             <SideMenuItem name="profile"/>
            </ul>
            <p className="w-9/12 mx-auto my-6 h-[1px] bg-gray-700"></p>
            <ul className="flex flex-col  gap-6 ">
            <SideMenuItem name="setting"/>
            </ul>
          </nav>
        </div>
        {/* footer */}
        <div className="flex flex-col gap-y-4 items-center mt-3">
          <ThemSwitch/>
          <ProfileImage/>
        </div>
      </section>
    </Box>
  );
};

export default SideMenu;
