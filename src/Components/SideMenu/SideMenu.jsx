import React from "react";
import Box from "../UI/Box/Box";
import SideMenuItem from "./SideMenuItem";
import ThemSwitch from "../UI/ThemSwitch/ThemSwitch";
import ProfileImage from "../ProfileImage/ProfileImage";

const SideMenu = () => {
  return (
    <Box>
      <section className="side-menu ">
        {/* top */}
        <div>
          {/* logo */}
          <div className="w-[80px] h-[80px]">
            <img
              src="../../../src/assets/images/logo.png"
              alt="logo"
              className="w-full h-full object-cover"
            />
          </div>
          {/* menu */}
          <nav className="flex flex-col items-center justify-center mt-1.5">
            <ul className="side-menu--list ">
             <SideMenuItem name="chat"/>
             <SideMenuItem name="save"/>
            </ul>
            <p className="side-menu--border"></p>
            <ul className="side-menu--list">
            <SideMenuItem name="chanel"/>
             <SideMenuItem name="profile"/>
            </ul>
            <p className="side-menu--border"></p>
            <ul className="side-menu--list">
            <SideMenuItem name="setting"/>
            </ul>
          </nav>
        </div>
        {/* footer */}
        <div className="flex flex-col gap-y-4 items-center mt-3 mb-9">
          <ThemSwitch/>
          <ProfileImage />
        </div>
      </section>
    </Box>
  );
};

export default SideMenu;
