import React from 'react'

const Box = ({ children, style }) => {

    return (
        <div
            className={`dark:bg-base-100 px-2 py-4 flex flex-col ${style}  transition-all duration-200`}
            
        >
            {children}
        </div>
    )
}

export default Box
