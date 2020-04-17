import React, { useState } from "react";
import { Link } from "react-router-dom";

import Container from '../layout/Container';
import { auth, generateUserDocument } from "../../utils/firebase";

const RegisterUser = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState(null);

    const registerUserHandler = async (event, firstName, lastName, email, phoneNumber, password, confirmPassword) => {
        event.preventDefault();
        console.log("Entering registerUserHandler")

        if (!email || !firstName || !lastName || !phoneNumber || !password || !confirmPassword) {
            setError("Missing information");
            console.log("Missing information");
            console.log("firstName: " + firstName);
            console.log("lastName: " + lastName);
            console.log("email: " + email);
            console.log("phoneNumber: " + phoneNumber);
            console.log("password: " + password);
            console.log("confirmPassword: " + confirmPassword);
            return;
        }

        try {
            if (password === confirmPassword) {
                const { user } = await auth.createUserWithEmailAndPassword(email, password);
                user.firstName = firstName;
                user.lastName = lastName;

                console.log("About to create user");
                console.log(user, {phoneNumber});

                generateUserDocument(user, {});
    
                setEmail("");
                setFirstName("");
                setLastName("");
                setPhoneNumber("");
                setPassword("");
                setConfirmPassword("");
            } else {
                setError("Passwords don't match!");
            }
        } catch(error) {
            setError("Registration failed!");
            console.error(error);
        }
    };

    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "phoneNumber") {
            setPhoneNumber(value);
        } else if (name === "confirmPassword") {
            setConfirmPassword(value);
        } else if (name === "firstName") {
            setFirstName(value);
        } else if (name === "lastName") {
            setLastName(value);
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
                        <form className="ab-form" onSubmit={event => registerUserHandler(event, firstName, lastName, email, phoneNumber, password, confirmPassword)}>
                            {error && <div className="">{error}</div>}
                            <div className="ab-form__group">
                                <fieldset>
                                    <label className="ab-form__label">
                                        First Name:
                                        <input type="text" name="firstName" placeholder="First Name" value={firstName} onChange={onChangeHandler} autoFocus />
                                    </label>
                                    <label className="ab-form__label">
                                        Last Name:
                                        <input type="text" name="lastName" placeholder="Last Name" value={lastName} onChange={onChangeHandler} />
                                    </label>
                                    <label className="ab-form__label">
                                        E-Mail:
                                        <input type="text" name="email" placeholder="user@place.com" value={email} onChange={onChangeHandler} />
                                    </label>
                                    <label className="ab-form__label">
                                        Phone Number:
                                        <input type="text" name="phoneNumber" placeholder="+xx xxxxxxxxxxx" value={phoneNumber} onChange={onChangeHandler} />
                                    </label>
                                    <label className="ab-form__label">
                                        Password:
                                        <input type="password" name="password" value={password} onChange={onChangeHandler} />
                                    </label>
                                    <label className="ab-form__label">
                                        Confirm Password:
                                        <input type="password" name="confirmPassword" value={confirmPassword} onChange={onChangeHandler} />
                                    </label>
                                </fieldset>
                                <div>
                                    <button className="btn ab-button" type="submit">Register</button>
                                </div>
                            </div>

                            <div className="ab-form__group">
                                <p>
                                    Already have an account?{" "}
                                    <Link to="/">Sign in here</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </Container>
            </section>
        </div>
    );
}

export default RegisterUser;