import React, { useState } from 'react'
import { BiZoomIn, BiZoomOut } from 'react-icons/bi'
const ImagePreview = ({ isZoom ,rotate=0,src}) => {
    const [zoomNum, setZoomNum] = useState(1)
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
    const handleZoom = (event) => {
        const { offsetX, offsetY } = event.nativeEvent

        setCursorPosition({ x: offsetX, y: offsetY })
    }
    const handleZoomWheel = (event) => {
        const scrollDelta = event.deltaY
        if (scrollDelta > 0) {
            if (zoomNum > 1) setZoomNum((prev) => +prev - 0.1)
        } else {
            if (zoomNum <= 3) setZoomNum((prev) => +prev + 0.1)
        }
    }
    return (
        <section className="my-1 h-[67%]   relative overflow-clip">
            <div className="w-9/12 mx-auto flex items-center justify-center h-[100%] max-h-[500px]   relative z-[2]  transition-all duration-200"
            style={{ rotate:rotate>0?`${rotate}deg`:null}}
            >
                <img
                    src={src}
                    alt=""
                    className={`w-auto h-full object-cover rounded-xl overflow-hidden max-h-full`}
                    style={{
                        scale:isZoom? `${zoomNum}`:"1",
                        transformOrigin: `${cursorPosition.x}px ${cursorPosition.y}px`,
                      
                    }}
                    onMouseMove={isZoom ? handleZoom : null}
                    onWheel={ handleZoomWheel}
                  
                />
            
            </div>


                {/* zoom */}
                {isZoom ? (
                    <div className="zoom-box">
                        <button
                            className="disabled:text-gray-500 text-white"
                            onClick={() =>
                                zoomNum > 0.1
                                    ? setZoomNum((prev) => +prev - 0.1)
                                    : null
                            }
                            disabled={zoomNum == 1}
                        >
                            <BiZoomOut size={24} />
                        </button>
                        <div className="w-full">
                            <input
                                type="range"
                                min={1}
                                max={3}
                                step="0.1"
                                value={zoomNum}
                                className="range w-full range-primary "
                                onChange={(e) => setZoomNum(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() =>
                                zoomNum <= 3
                                    ? setZoomNum((prev) => +prev + 0.1)
                                    : null
                            }
                            disabled={zoomNum >= 3}
                            className="disabled:text-gray-500 text-white"
                        >
                            <BiZoomIn size={24} />
                        </button>
                    </div>
                ) : null}
        </section>
    )
}

export default ImagePreview
