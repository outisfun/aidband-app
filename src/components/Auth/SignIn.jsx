import React, { useState } from "react";
import { Link } from "react-router-dom";

import Container from '../layout/Container';
import { auth } from "../../utils/firebase";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const signInWithEmailAndPasswordHandler = (event, email, password) => {
        event.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log("Signed in");
            })
            .catch(error => {
                setError(error);
                console.error(error);
            });
    }

    const onChangeHandler = (event) => {
        const { name, value } = event.currentTarget;

        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    return (
        <div className="ab-home">
            <section className="ab-sign-in">
                <Container>
                    <div>
                        <h2 className="ab-heading ab-heading--one">
                            Sign In
                        </h2>
                        <form onSubmit={event => signInWithEmailAndPasswordHandler(event, email, password)} className="ab-form">
                            {error !== null && <div className="py-4 bg-red-600 w-full text-white text-center mb-3">{error}</div>}
                            <div className="ab-form__group">
                                <fieldset>
                                    <label className="ab-form__label">
                                        E-Mail:
                                        <input type="text" name="email" placeholder="user@place.com" value={email} onChange={onChangeHandler} autoFocus />
                                    </label>
                                    <label className="ab-form__label">
                                        Password:
                                        <input type="password" name="password" value={password} onChange={onChangeHandler} />
                                    </label>
                                </fieldset>
                                <div>
                                    <button type="submit" className="btn ab-button">Login</button>
                                </div>
                            </div>

                            <div className="ab-form__group">
                                <p>
                                    Don't have an account?{" "}
                                    <Link to="/Register">Register here</Link>
                                    <br />
                                    <Link to="/reset-password">Forgot password?</Link>
                                </p>
                            </div>
                        </form>
                    </div>

                </Container>
            </section>
        </div>
    );
}

export default SignIn;