import { Link } from 'react-router-dom'
import './MyAccount.css'
import InputBox from '../InputBox/input.components'
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Context/auth.context'
import { IoIosCheckmarkCircle } from "react-icons/io";
import { BiSolidError } from "react-icons/bi";
import axios from 'axios'
import Cookies from 'js-cookie'

const MyAccount = ({ type }) => {
    const navigate = useNavigate()
    const [securityQuestion, setSecurityQuestion] = useState("");
    const formRef = useRef(null)
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const { Signup_URL } = useAuth();


    useEffect(() => {
        window.scrollTo(0, 0)
        if (formRef.current) {
            formRef.current.reset();
        }
    }, [type]);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
                setMessageType("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("")
        let form = new FormData(formRef.current);
        let formData = {};

        for (let [key, value] of form.entries()) {
            formData[key] = value;
        }

        const endpoint = type === "Sign-In" ? "signin" : "post";

        try {
            const response = await axios.post(`${Signup_URL}/${endpoint}`, formData)

            if (response.status === 200) {
                setMessage(type === "Sign-In" ? "Signed in successfully!" : "Signed up successfully!");
                setMessageType("success");
                setTimeout(() => {
                    formRef.current.reset();
                    if (type === "Sign-In") {

                        navigate("/timetableview");

                    } else {
                        navigate("/signin");
                    }
                }, 1000);
            }
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.msg || "Something went wrong.");
                setMessageType("error");
            } else {
                setMessage("Network error! Please try again later.");
                setMessageType("error");
            }
        }
    };

    const handleForgotPassword = () => {
        const emailInput = document.getElementById("email");
        const email = emailInput?.value.trim();

        if (!email) {
            setMessage("Please enter your email before proceeding.");
            setMessageType("error");
            return;
        }

        Cookies.set('resetEmail', email, { expires: 1 });
        navigate('/forgotpass');
    };


    return (
        <section>
            <form ref={formRef} onSubmit={handleSubmit} className="form-box">
                <h1>{type === 'Sign-In' ? 'Welcome Back' : "SignUp"}</h1>

                {message && (
                    <p style={{
                        color: messageType === "success" ? "#1a7431" : "#660708",
                        minHeight: "3rem",
                        maxWidth: "25rem",
                        minWidth: "25rem",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "8px 12px",
                        marginBottom: "10px",
                        backgroundColor: messageType === "success" ? "#b5e48c" : "#f4845f",
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                        textAlign: "center",
                        flexWrap: "wrap",
                        borderRadius: "5px"
                    }}>
                        {messageType === "success" ? <  IoIosCheckmarkCircle style={{ color: "#1a7431" }} size={20} /> : < BiSolidError style={{ color: "#660708" }} size={20} />}
                        {message}
                    </p>
                )}

                {type !== 'Sign-In' && (
                    <InputBox
                        name="fname"
                        type="text"
                        icon="user"
                        id="username"
                        placeholder="Full Name *"
                    />
                )}


                <InputBox
                    name="email"
                    type="email"
                    icon="envelope"
                    id="email"
                    placeholder="Email *" />



                <InputBox
                    name="password"
                    type="password"
                    icon="key"
                    id="password"
                    placeholder="Password *" />

                {/* {
                    type === 'Sign-Up' && (
                        <>
                            <select name="branch" id="branches" defaultValue="">
                                <option value="" selected>Select Branch</option>
                                <option value="CSE">Computer Science and Engineering(CSE)</option>
                                <option value="IT">Innformation Technology(IT)</option>
                                <option value="ME">Mechanical Engineering(ME)</option>
                                <option value="ECE">Electronics and Communication Engineering(ECE)</option>
                                <option value="CE">Civil Engineering(CE)</option>
                            </select>
                        </>
                    )
                } */}
                {
                    type === 'Sign-Up' && (
                        <>
                            <select
                                name="securityQuestion"
                                id="securityQuestion"
                                value={securityQuestion}
                                onChange={(e) => setSecurityQuestion(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select a security question</option>
                                <option value="pet">What was your first pet's name?</option>
                                <option value="school">What was your elementary school?</option>
                                <option value="nickname">What is your childhood nickname?</option>
                                <option value="movie">What is your favorite movie?</option>
                            </select>
                        </>
                    )
                }

                {securityQuestion && type === 'Sign-Up' && (
                    <InputBox
                        name="securityAnswer"
                        type="text"
                        icon="lock"
                        id="securityAnswer"
                        placeholder="Security Answer *"
                    />
                )}

                <button type='submit' className='button'>{type.replace("-", " ")}</button>
                {
                    type === "Sign-In" && (
                        <>
                            <p className='forgotpass'>
                                <button
                                    type="button"
                                    className="text-primary"
                                    onClick={handleForgotPassword}
                                    style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: "#0d6efd" }}
                                >
                                    Forgot Password?
                                </button>
                            </p>

                        </>
                    )
                }



            </form>
        </section>
    )
}

export default MyAccount