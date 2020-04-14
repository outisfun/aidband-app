import React, { useState } from "react";

import Container from '../layout/Container';
import { Link } from "react-router-dom";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    const signInWithEmailAndPasswordHandler = (event, email, password) => {
        event.preventDefault();
    }

    const onChangeHandler = (event) => {
        const { name, value } = event.currentTarget;

        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    return(
        <div className="ab-home">
            <section className="ab-sign-in">
                <Container>
                    <div>
                        <h2 className="ab-heading ab-heading--one">
                            Sign In
                        </h2>
                        <form>
                            {error !== null && <div className = "py-4 bg-red-600 w-full text-white text-center mb-3">{error}</div>}
                            <fieldset>
                                <label>
                                    E-Mail:
                                        <input type="text" name="email" placeholder="user@place.com" value={email} onChange={onChangeHandler} />
                                </label>
                                <label>
                                    Password:
                                    <input type="password" name="password" value={password} onChange={onChangeHandler} />
                                </label>
                            </fieldset>
                            <div>
                                <button type="submit" onClick={event => signInWithEmailAndPasswordHandler(event, email, password)}>Login</button>
                            </div>
                        </form>
                    </div>
                    <div>
                        <p>
                            Don't have an account?{" "}
                            <Link to="/Register">Sign up here</Link>
                            <br />
                            <Link to="/reset-password">Forgot password?</Link>
                        </p>
                    </div>
                </Container>
            </section>
        </div>
    )
}

export default SignIn;