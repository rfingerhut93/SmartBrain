import React from "react";
import './FaceRecognition.css';

// const FaceRecognition = ({imageUrl, box, word}) => {
const FaceRecognition = ({imageUrl,  word}) => {
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImage' src={imageUrl} alt="" width='500px' height='auto' />
                {/* <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div> */}
                <div>
                    <p className="f1 items-start">The word is...</p>
                    <p className="f-5 b-ns">{word}</p>
                </div>
            </div>
        </div>
    );
}

export default FaceRecognition;