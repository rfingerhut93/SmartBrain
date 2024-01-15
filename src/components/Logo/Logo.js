import React from "react";
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
    return (
        <div className= 'ma4 mt0' style={{display:'flex', justifyContent: 'flex-start'}}>
            <img style={{paddingTop: '5px'}}src={brain} alt='logo'/>    
        </div>
    );
}

export default Logo;
