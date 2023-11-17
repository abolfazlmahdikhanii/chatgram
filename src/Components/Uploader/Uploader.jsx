import React from 'react'
import ModalPerview from '../UI/ModalPerview/ModalPerview'
import ModalPerviewFile from '../UI/ModalPerviewFile/ModalPerviewFile'
import Backdrop from '../UI/Backdrop/Backdrop'

const Uploader = ({
    showImage,
    showFile,
    closeImage,
    closeFile,
    files,
    images,
    remove,
    onUploadImage,
    onUploadFile,

}) => {
    return (
        <div>
            <Backdrop show={showFile ? showFile : showImage} />
            <ModalPerviewFile
                show={showFile}
                close={closeFile}
                files={files}
                onRemove={remove}
                onUpload={onUploadFile}
             
            />
            <ModalPerview
                show={showImage}
                close={closeImage}
                images={images}
                onUpload={onUploadImage}
             
            />
        </div>
    )
}

export default Uploader
