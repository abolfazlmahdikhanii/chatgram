import React from "react";
import ProfileImage from "../ProfileImage/ProfileImage";

const Profile = ({size,path}) => {
  return (
    <div className="flex gap-5 ">
      <ProfileImage size={size} src={path}/>
  
    </div>
  );
};

export default Profile;
