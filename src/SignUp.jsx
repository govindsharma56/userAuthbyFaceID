
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState('');

    const [phone, setPhone] = useState('');
    const [phoneErr, setPhoneErr] = useState('');

    const [DOB, setDOB] = useState('');
    const [DOBErr, setDOBErr] = useState('');

    const [surname, setSurname] = useState('');
    const [surnameErr, setSurnameErr] = useState('');

    const [allErr, setAllErr] = useState('');

    const [mode, setMode] = useState('email');

    const navigate = useNavigate();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    function handleSubmit(e) {
        e.preventDefault();

        // Clear previous errors
        setEmailErr('');
        setPhoneErr('');
        setDOBErr('');
        setSurnameErr('');
        setAllErr('');

        let isValid = true;

        if (mode === 'email') {
            if (!email) {
                setEmailErr('Please enter email');
                isValid = false;
            } else if (!emailRegex.test(email)) {
                setEmailErr('Please enter a valid email');
                isValid = false;
            }
        } else {
            if (!phone) {
                setPhoneErr('Please enter phone number');
                isValid = false;
            } else if (!phoneRegex.test(phone)) {
                setPhoneErr('Please enter a valid phone number');
                isValid = false;
            }
        }

        if (!DOB) {
            setDOBErr('Please enter DOB');
            isValid = false;
        } else if (new Date(DOB) > new Date()) {
            setDOBErr('DOB cannot be in the future');
            isValid = false;
        }

        if (!surname.trim()) {
            setSurnameErr('Please enter surname');
            isValid = false;
        }

        if (!isValid) return;

        const details = {
            ...(mode === 'email' ? { email } : { phone }),
            DOB,
            surname
        };
        localStorage.setItem('data', JSON.stringify(details));
        navigate('/login');
    }

    return (
        <div>
            <form onSubmit={handleSubmit} noValidate>

                {mode === 'email' ? (
                    <>
                        <label>
                            Email:
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setEmailErr('');
                                }}
                            />
                        </label>
                        <p>{emailErr}</p>
                    </>
                ) : (
                    <>
                        <label>
                            Phone Number:
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                    setPhoneErr('');
                                }}
                            />
                        </label>
                        <p>{phoneErr}</p>
                    </>
                )}

                <label>
                    <input
                        type="radio"
                        name="mode"
                        checked={mode === 'email'}
                        onChange={() => setMode('email')}
                    />
                    Email
                </label>

                <label>
                    <input
                        type="radio"
                        name="mode"
                        checked={mode === 'phone'}
                        onChange={() => setMode('phone')}
                    />
                    Phone
                </label>

                <br />

                <label>
                    DOB:
                    <input
                        type="date"
                        value={DOB}
                        onChange={(e) => {
                            setDOB(e.target.value);
                            setDOBErr('');
                        }}
                    />
                </label>
                <p>{DOBErr}</p>

                <br />

                <label>
                    Surname:
                    <input
                        type="text"
                        value={surname}
                        onChange={(e) => {
                            setSurname(e.target.value);
                            setSurnameErr('');
                        }}
                    />
                </label>
                <p>{surnameErr}</p>

                <button type="submit">Submit</button>

                <p>{allErr}</p>

            </form>
        </div>
    );
};

export default SignUp;