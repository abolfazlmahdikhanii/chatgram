import React from "react";
import ModalPerview from "../UI/ModalPerview/ModalPerview";
import ModalPerviewFile from "../UI/ModalPerviewFile/ModalPerviewFile";
import Backdrop from "../UI/Backdrop/Backdrop";

const Uploader = ({ showImage, showFile, closeImage, closeFile ,files,images,remove}) => {

  return (
    <div>

      <Backdrop
        show={showFile ? showFile : showImage}
       
      />
      <ModalPerviewFile show={showFile} close={closeFile} files={files} onRemove={remove}/>
      <ModalPerview show={showImage} close={closeImage} images={images}/>
    </div>
  );
};

export default Uploader;
