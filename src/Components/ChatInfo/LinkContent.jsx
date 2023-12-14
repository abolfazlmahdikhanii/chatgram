import React from 'react'
import { FiLink } from 'react-icons/fi'

const LinkContent = ({ link, contextMenu, id, remove }) => {
    const showHostName = (links) => {

        if (!links?.startsWith('www')) {
            const url = new URL(links)
          
            console.log(links)
              return url?.hostname
        }
        else return links
    }

    return (
        <div
            className="flex gap-3 items-center transition-all py-2.5 px-3 rounded-xl duration-200 hover:bg-gray-700/30 cursor-pointer"
            onContextMenu={(e) => contextMenu(e, id, true)}
        >
            <div
                data-color="violet"
                className=" h-[70px] mask mask-squircle bg-primary w-[70px] grid place-items-center "
            >
                <FiLink size={25} color="#fff" />
            </div>
            <div className="max-w-[70%] space-y-1.5">
                <p className="text-sm truncate text-gray-50">
                    {showHostName(link&&link[0])}
                </p>
                <a
                    href={link&&link[0]?.startsWith("www")?`https://${link[0]}`:link[0]}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="truncate text-sm text-indigo-400 max-w-[160px] line-clamp-1 block"
                >
                    {link&&link[0]?.startsWith("www")?`https://${link[0]}`:link[0]}
                </a>
            </div>
        </div>
    )
}

export default LinkContent
