import React, { useState } from "react";
import { GoSignOut } from "react-icons/go";
import { FiUser } from "react-icons/fi";

const Profile = ({ authUser, signOut }) => {
  const [showProfile, setShowProfile] = useState(false);

  const handleClick = () => {
    setShowProfile(!showProfile);
  };
  return (
    <>
      {authUser ? (
        <div className="cursor-pointer" onClick={handleClick}>
          <div className="relative">
            <div className="w-8 md:w-[32px] h-8 md:h-[32px] object-cover rounded-full flex justify-center items-center overflow-hidden">
              {authUser.profile ? (
                <img src={authUser.profile} alt="" />
              ) : (
                <img src="/a1.jpg" alt="" />
              )}
            </div>
            {showProfile && (
              <ul
                id="category-items"
                className="bg-white absolute top-[34px] right-0 min-w-[150px] md:px-2 px-1 md:py-2 py-1 text-black shadow rounded-md border md:text-base text-sm"
              >
                <li className="w-full md:h-10 h-8 flex justify-between items-center md:px-3 px-2 rounded-md whitespace-nowrap">
                  {authUser.username}
                </li>
                <li
                  className="bg-black text-white md:h-10 h-8 flex items-center gap-2 md:px-3 px-2 transition-transform hover:bg-black/[0.8] active:scale-90 md:rounded-md rounded whitespace-nowrap cursor-pointer"
                  onClick={signOut}
                >
                  <GoSignOut /> Log out
                </li>
              </ul>
            )}
          </div>
        </div>
      ) : (
        <Link href="/login">
          <FiUser className="text-[24px]" />
        </Link>
      )}
    </>
  );
};

export default Profile;
