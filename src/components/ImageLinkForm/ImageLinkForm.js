import React from "react";
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonClick}) => {
    return(
        <div>
            <p className='f3'>
                {'This Magic Brain will provide one word that best describes your picture.'}
            </p>
            <p className = 'f3'>{'Give it a try.'}</p>
            <div className='center'>
                <div className='form pa4 shadow-2 br3 center'>
                    <input
                        className='f4 pa2 w-70 center'
                        id="immage-url"
                        type="text" 
                        onChange={onInputChange}
                    />
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onButtonClick}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;