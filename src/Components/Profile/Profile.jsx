import React from "react";
import ProfileImage from "../ProfileImage/ProfileImage";

const Profile = ({size}) => {
  return (
    <div className="flex gap-5 ">
      <ProfileImage size={size}/>
  
    </div>
  );
};

export default Profile;
