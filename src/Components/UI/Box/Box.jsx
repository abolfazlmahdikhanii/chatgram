import React from 'react'

const Box = ({ children, style,context,mouseOut }) => {

    return (
        <div
            className={`bg-base-100 px-2 py-4 flex flex-col ${style}  transition-all duration-200 `}
            onContextMenu={context}
            onMouseLeave={mouseOut}
            
        >
            {children}
        </div>
    )
}

export default Box
