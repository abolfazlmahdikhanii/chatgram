import React from 'react'

const PinMessage = ({title,index}) => {

  return (
    <>
  {
    index===0&&  <div className='flex gap-3'>
   {
    typeof title!=="string"||title?.type==="img"&& 
    <div className='w-11 h-full mask mask-squircle'>
    <img src="../../../src/assets/images/profile.jpg" alt="" className='w-full h-full object-cover' />
</div>
   }
    <div className='flex flex-col gap-0.5'>
        <p className='font-semibold text-indigo-500 text-sm'>Pinned message #{index+1}</p>
        <p className='text-[14px] '>{title}</p>
    </div>
</div>
  }
  </>
  )
}

export default PinMessage