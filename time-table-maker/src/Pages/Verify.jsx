import '../CSS/styles.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/auth.context';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'


const VerifySecurityForm = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [step, setStep] = useState(1);
    const { Signup_URL } = useAuth()

    const handleGetQuestion = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${Signup_URL}/verify-hod`, { email });
            setQuestion(res.data.securityQuestion);
            setStep(2);
        } catch (err) {
            alert(err.response?.data?.msg || "Error fetching question.");
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${Signup_URL}/verify-answer`, { email, securityAnswer: answer });
            alert("Verified! Proceed to reset password.");

            if (res.status === 200) {
                navigate('/resetpass');
            }

        } catch (err) {
            alert(err.response?.data?.msg || "Error verifying answer.");
        }
    };

    useEffect(() => {
        const storedEmail = Cookies.get('resetEmail')
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    return (
        <>
            <section>

                {step === 1 && (
                    <>
                        <h1 className='headings'>Verify Yourself!</h1>
                        <form className='verify-form' onSubmit={handleGetQuestion}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                defaultValue={email}
                                required
                            />
                            <button type="submit">Get Security Question</button>
                        </form>
                    </>
                )}

                {step === 2 && (
                    <>
                        <h1 className='headings'>Answer it!</h1>
                        <form onSubmit={handleVerify} className='verify-form'>
                            <input type="email" defaultValue={email} readOnly />
                            <input type="text" defaultValue={question} readOnly />
                            <input
                                type="text"
                                placeholder="Your answer"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                required
                            />
                            <button type="submit">Verify Answer</button>
                        </form>
                    </>
                )}
            </section>
        </>
    );
};

export default VerifySecurityForm;
