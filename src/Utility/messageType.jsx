const messageType=(type,name)=>{
    if (type==="mp3"&&name==="") {
       return (<p className='text-[14px] '>Voice Message</p> )
    }
    if(type==="img"){
        return (<p className='text-[14px] '>Photo</p> )
    }
    if(type==="video"){
        return (<p className='text-[14px] '>Video</p> )
    }
}


export default messageType