import React, { useState } from "react";
import './SignIn.css';

function SignIn({onRouteChange, loadUser}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
      };
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
      };

    const handleSubmit = (e) => {
        fetch('http://localhost:8080/signin', 
            {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        )
        .then(response => response.json())
        .then(user => {
            if (user.id){                    
                loadUser(user);
                onRouteChange('home');
            } else {
                setError('Sign-in failed. Please check your credentials and try again.')
            }
        })
        .catch(error => {
           setError('Error during sign-in. Please try again later.')
        });
    }

    return(
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"
                            value={email}
                            onChange={handleEmailChange}/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"
                            value={password}
                            onChange={handlePasswordChange}/>
                        </div>
                    </fieldset>
                    <div className="">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        id="sign-in-btn"
                        value="Sign in"
                        type="submit"
                        onClick={handleSubmit}
                        />
                    </div>
                    <div className="lh-copy mt3">
                        {/* Display error message conditionally */}
                        {error && <p className="f6 link dim red db pointer">{error}</p>}
                        <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                    </div>
                </div>
            </main>
        </article>
    );
}

export default SignIn;