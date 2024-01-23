import React from "react";
import './FaceRecognition.css';


const FaceRecognition = ({imageUrl,  word, isLoading}) => {
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImage' src={imageUrl} alt="" width='500px' height='auto' />
                <div>
                    <p className="f1 items-start">The word is...</p>
                    {/* Display a loading message when isLoading is true */}
                    {isLoading ? 
                        (<p className="f-5 b-ns">Loading...</p>)
                        :
                        (<p className="f-5 b-ns">{word}</p>)
                    }
                </div>
            </div>
        </div>
    );
}

export default FaceRecognition;