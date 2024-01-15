import './App.css';
import { useState} from 'react';
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

function App() {
  // Setting states
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [mainWord, setMainWord] = useState('');
  const [route, setRoute] = useState('signIn');
  const [isSignedIn, setIsSignedIn] = useState(false);

  // START CLARIFAI API DEFINITIONS
  const PAT = '8361ca09d09c44f785c215875d926c2e';
  const USER_ID = 'mu53zadomkfk';
  const APP_ID = 'smartbrain';
  const MODEL_ID = 'general-image-recognition';
  const MODEL_VERSION_ID = 'aa7f35c01e0642fda5cf400f543e7c40';
  const IMAGE_URL = input;

  const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
  });

  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };
  // END CLARIFAI API DEFINITIONS

  // Event to handle typing in the input box.
  const handleInputChange = (e) => {
    setInput(e.target.value);
  }

  // Saves the top associated word from API.
  const storeWord = (data) => {
    setMainWord(data);
  }

  // Event to handle detect button being clicked,
  const handleClick = (e) => {
    e.preventDefault();
    setImageUrl(input);
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
    .then(response => response.json())
    .then(result => storeWord(result.outputs[0].data.concepts[0].name))
    .catch(error => console.log('error', error));
  }

  // Used to navigate to different destinations with onClicks.
  const handleRouteChange = (route) => {
    if (route === 'signIn'){
      setIsSignedIn(false);
    } else if(route === 'home'){
      setIsSignedIn(true);
    }
    resetStates();
    setRoute(route);
  }

  // Reset the states to empty string
  const resetStates = () => {
    setImageUrl('');
    setMainWord('');
  }

  return (
    <div className="App">   
        {/*Fancy background */} 
        <div className='web'>
          <ParticlesBg type="cobweb" bg={true} color="#f5f5f5"/>
        </div>

      {/* Always display navigation and logo */}
      <Navigation onRouteChange={handleRouteChange} isSignedIn= {isSignedIn}/>
      <Logo />

      {/*Alternate routes logic */}
      {
        // If route is home, display home page.
        route === 'home' 
        ? 
        <>
          <Rank />
          <ImageLinkForm 
            onInputChange={handleInputChange}
            onButtonClick={handleClick}
          />
          <FaceRecognition imageUrl={imageUrl} word={mainWord}/>
        </>
        // Otherwise, either display the Sign In page or the Register Page.
        : (
          route === 'signIn' 
          ?
          <SignIn onRouteChange={handleRouteChange}/> 
          :
          <Register onRouteChange={handleRouteChange}/>
        )
      }
    </div>
  );
}

export default App;
