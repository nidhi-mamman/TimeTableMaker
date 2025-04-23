import { Link } from 'react-router-dom'
import './MyAccount.css'
import InputBox from '../InputBox/input.components'
import { useEffect, useState } from 'react'
// import { IoIosCheckmarkCircle } from "react-icons/io";
// import { BiSolidError } from "react-icons/bi";

const MyAccount = ({ type }) => {
    const [securityQuestion, setSecurityQuestion] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [type]);

    return (
        <section>
            <form className="form-box">
                <h1>{type === 'Sign-In' ? 'Welcome Back' : "SignUp"}</h1>

                {/* {message && (
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
                )} */}

                {type !== 'Sign-In' && (
                    <InputBox
                        name="username"
                        type="text"
                        icon="user"
                        id="username"
                        placeholder="Username *"
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

                {
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
                }
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

                {securityQuestion && (
                    <InputBox
                        name="securityAnswer"
                        type="text"
                        icon="lock"
                        id="securityAnswer"
                        placeholder="Security Answer *"
                    />
                )}

                <button className='button'>{type.replace("-", " ")}</button>
                {
                    type === "Sign-In" && (
                        <>
                            <p className='forgotpass'><Link to='/forgotpass' className='text-primary'>Forgot Password?</Link></p>
                        </>
                    )
                }



            </form>
        </section>
    )
}

export default MyAccount