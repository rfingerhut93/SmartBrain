import './App.css';
import React, { useState, useEffect } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(
    {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: '',
    }
  ) ;

  // Event to handle typing in the input box.
  const handleInputChange = (e) => {
    setInput(e.target.value);
  }

  // Saves the top associated word from API.
  const storeWord = (data) => {
    setMainWord(data);
  }

  const handleClick = async (e) => {
    e.preventDefault();
    if (input !== imageUrl){
      setImageUrl(input);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Clarifai API endpoint
        const clarifaiResponse = await fetch("http://localhost:8080/imageurl", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageUrl: input })
        });
  
        const { clarifaiConcept } = await clarifaiResponse.json();
  
        // Fetch entries endpoint
        const entriesResponse = await fetch('http://localhost:8080/entries', {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: user.id })
        });
  
        const entriesResult = await entriesResponse.json();
  
        // Update user entries
        const updatedUser = { ...user, entries: entriesResult };
        setUser(updatedUser);
  
        // Store the Clarifai concept
        storeWord(clarifaiConcept);
        
      } catch (error) {
        console.error('Error in one or both fetches:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    if (imageUrl !== '') {
      fetchData();
    }
  }, [imageUrl]); // Add imageUrl as a dependency to useEffect

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

  // Loads user information from server response.
  // Also used in register.js
  const loadUser = (data) => {
    setUser(
      {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      }
    )
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
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm 
            onInputChange={handleInputChange}
            onButtonClick={handleClick}
          />
          <FaceRecognition imageUrl={imageUrl} word={mainWord} isLoading={isLoading}/>
        </>
        // Otherwise, either display the Sign In page or the Register Page.
        : (
          route === 'signIn' 
          ?
          <SignIn onRouteChange={handleRouteChange} loadUser={loadUser}/> 
          :
          <Register loadUser={loadUser}onRouteChange={handleRouteChange}/>
        )
      }
    </div>
  );
}

export default App;
