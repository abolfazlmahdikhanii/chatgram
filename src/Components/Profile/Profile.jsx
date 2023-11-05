import React from "react";
import ProfileImage from "../ProfileImage/ProfileImage";

const Profile = ({size,path,userName}) => {

  return (
    <div className="flex gap-5 ">
      <ProfileImage size={size} src={path} userName={userName}/>
  
    </div>
  );
};

export default Profile;
