import React, { useState } from "react";
import { Link } from "react-router-dom";

import Container from '../layout/Container';

const RegisterUser = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [error, setError] = useState(null);

    const registerUserHandler = (event, displayName, email, password, confirmPassword) => {
        event.preventDefault();
        setEmail("");
        setPassword("");
        setDisplayName("");
        setConfirmPassword("");
    };

    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "displayName") {
            setDisplayName(value);
        } else if (name === "confirmPassword") {
            setConfirmPassword(value);
        }
    };

    return (
        <div className="ab-home">
            <section className="ab-sign-in">
                <Container>
                    <div>
                        <h2 className="ab-heading ab-heading--one">
                            Register
                        </h2>
                        <form className="ab-form" onSubmit={event => registerUserHandler(event, email, password)}>
                            {error !== null && <div className="py-4 bg-red-600 w-full text-white text-center mb-3">{error}</div>}
                            <div className="ab-form__group">
                                <fieldset>
                                    <label className="ab-form__label">
                                        Display Name:
                                        <input type="text" name="displayName" placeholder="Full Name" value={displayName} onChange={onChangeHandler} />
                                    </label>
                                    <label className="ab-form__label">
                                        E-Mail:
                                        <input type="text" name="email" placeholder="user@place.com" value={email} onChange={onChangeHandler} />
                                    </label>
                                    <label className="ab-form__label">
                                        Password:
                                        <input type="password" name="password" value={password} onChange={onChangeHandler} />
                                    </label>
                                    <label className="ab-form__label">
                                        Confirm Password:
                                        <input type="password" name="confirmPassword" value={password} onChange={onChangeHandler} />
                                    </label>
                                </fieldset>
                                <div>
                                    <button className="btn ab-button" type="submit">Register</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div>
                        <p>
                            Already have an account?{" "}
                            <Link to="/">Sign in here</Link>
                        </p>
                    </div>
                </Container>
            </section>
        </div>
    );
}

export default RegisterUser;