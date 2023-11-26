import React, { useEffect, useState } from 'react'
import { BsFillBookmarkFill } from 'react-icons/bs'
const ProfileImage = ({
    size,
    src,
    userName,
    bgProfile,
    relation,
    isSave = false,
}) => {
    let sizes = 16
    if (size === 'm') sizes = 22
    if (size === 'lg') sizes = 48
    return (
        <div className="avatar">
            <div
                className={`mask mask-squircle w-11 h-11 ${
                    size === 'm' && 'w-14 h-14'
                } ${size === 'xs' && 'w-5 h-5'} ${
                    size === 'lg' && 'w-32 h-32'
                }`}
            >
                {src && !isSave ? (
                    <img src={src} alt="profile" className="w-full h-full" />
                ) : (
                    <div
                        data-color={bgProfile}
                        className={`grid place-items-center text-white h-full font-bold w-full `}
                    >
                        {!src || !isSave ? (
                            <span>{userName && userName[0]}</span>
                        ) : (
                            <span>
                                <BsFillBookmarkFill
                                    size={sizes}
                                    color="#fff"
                                />
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProfileImage
