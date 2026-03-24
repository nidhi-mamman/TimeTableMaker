import { useState } from "react"
import axios from 'axios'
const Login = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            email, password
        }
        try {
            const result = await axios.post('http://localhost:4000/auth/signin', data)
            console.log(result)
            localStorage.setItem('accessToken', result.data.access)
            localStorage.setItem('refreshToken', result.data.refresh)
            alert("signed in successfully")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className="main-container">
                <div className="signin-container">
                    <h1>Sign in</h1>
                    <p>or use your account</p>
                    <form onSubmit={handleSubmit}>
                        <input type="email" name="email" placeholder="Enter your email" value={email} onChange={(e) => setemail(e.target.value)} />
                        <input type="password" name="password" placeholder="Enter your password" value={password} onChange={(e) => setpassword(e.target.value)} />
                        <div className="input-group">
                            <input type="checkbox" name="rememberme" id="remember" />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <button type="submit">SIGN IN</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <h1>Welcome Back</h1>
                    <p>Sign in to access your personalized timetable and manage your daily schedule with ease.</p>
                    <p> Stay organized and keep track of your classes anytime, anywhere.</p>
                    <button className="overlay-signup">SIGN UP</button>
                </div>
            </div>
        </>
    )
}

export default Login