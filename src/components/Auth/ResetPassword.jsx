import React, { useState } from "react";
import { Link } from "react-router-dom";

import Container from "../layout/Container";
import { auth } from "../../utils/firebase";

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState("");
    const [error, setError] = useState("");

    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "email") {
            setEmail(value);
        }
    };

    const sendResetEmail = event => {
        event.preventDefault();

        auth.sendPasswordResetEmail(email)
            .then(() => {
                setEmailSent(true);
                setTimeout(() => setEmailSent(false), 5000);
            })
            .catch(error => {
                setError("Failed to send email. Please try again or contact the system administrator.");
                console.error(error);
            })
    };

    return (
        <div className="ab-home">
            <section className="ab-sign-in">
                <Container>
                    <div>
                        <h2 className="ab-heading ab-heading--one">
                            Forgot Password
                        </h2>
                        <form className="ab-form" onSubmit={event => sendResetEmail(event)}>
                            {error ?? (
                                <div>
                                    Shit... Something wong...
                                </div>
                            )}
                            {emailSent && (
                                <div className="">
                                    An email has been sent to you!
                                </div>
                            )}
                            <div className="ab-form__group">
                                <fieldset>
                                    <label className="ab-form__label">
                                        E-Mail:
                                        <input type="text" name="email" placeholder="user@place.com" value={email} onChange={onChangeHandler} autoFocus />
                                    </label>
                                </fieldset>
                                <div>
                                    <button className="btn ab-button" type="submit">Restore Password</button>
                                </div>
                            </div>

                            <div className="ab-form__group">
                                <p>
                                    <Link to="/">Back to Sign In page</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </Container>
            </section>
        </div>
    )
}

export default ResetPassword;