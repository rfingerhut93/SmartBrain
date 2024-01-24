import React, { useState } from "react";

function Register ({onRouteChange, loadUser}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
      };
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
      };

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleSubmit = (e) => {
        // Prevents form from making a GET request
        e.preventDefault();
        fetch('https://smartbrain-api2-wpzv.onrender.com/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                name: name,
                password: password,
            })
        }).then(response => response.json()).then(user => {
            if (user.id) {
                loadUser(user);
                onRouteChange('signIn');
            } else {
                setError('Registry failed. All fields must be completed.')
            }
        })
    }

    return(
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
            <main className="pa4 black-80">
                <form className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="text"
                                name="name" 
                                id="name"
                                autoComplete="given-name"
                                onChange={handleNameChange}
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
                            <input
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="email"
                                name="email" 
                                id="email"
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="password"
                                name="password" 
                                id="password"
                                onChange={handlePasswordChange}
                            />
                        </div>
                    </fieldset>
                    <div className="">
                        {/* Display error message conditionally */}
                        {error && <p className="f6 link dim red db pointer">{error}</p>}
                        <input 
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            value="Register"
                            type="submit"
                            id="register-btn"
                            onClick={handleSubmit}
                        />
                    </div>
                </form>
            </main>
        </article>
    );
}

export default Register;