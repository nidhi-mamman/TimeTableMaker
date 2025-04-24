import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/auth.context';
import { useNavigate } from 'react-router-dom';


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
            navigate('/resetpass')

        } catch (err) {
            alert(err.response?.data?.msg || "Error verifying answer.");
        }
    };

    useEffect(() => {
        const storedEmail = localStorage.getItem("resetEmail");
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    return (
        <>
            {step === 1 && (
                <form onSubmit={handleGetQuestion}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        required
                    />
                    <button type="submit">Get Security Question</button>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={handleVerify}>
                    <input type="email" value={email} readOnly />
                    <input type="text" value={question} readOnly />
                    <input
                        type="text"
                        placeholder="Your answer"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        required
                    />
                    <button type="submit">Verify Answer</button>
                </form>
            )}
        </>
    );
};

export default VerifySecurityForm;
