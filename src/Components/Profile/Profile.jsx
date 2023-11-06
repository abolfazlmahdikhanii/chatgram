import React from "react";
import ProfileImage from "../ProfileImage/ProfileImage";

const Profile = ({size,path,userName,bgProfile,relation}) => {

  return (
    <div className="flex gap-5 ">
      <ProfileImage size={size} src={path} userName={userName} bgProfile={bgProfile} relation={relation}/>
  
    </div>
  );
};

export default Profile;
