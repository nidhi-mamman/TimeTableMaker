import '../CSS/styles.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/auth.context';
import Cookies from 'js-cookie';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ResetPass = () => {
    const navigate = useNavigate();
    const { Signup_URL } = useAuth();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        const storedEmail = Cookies.get('resetEmail');
        if (storedEmail) {
            setEmail(storedEmail);
        } else {
            navigate('/forgotpass');
        }
    }, [navigate]);

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const res = await axios.post(`${Signup_URL}/reset-password`, { email, newPassword });

            if (res.data.success) {
                alert("Password reset successful!");
                Cookies.remove('resetEmail');
                navigate('/signin');
            } else {
                alert("Password reset failed. Please try again.");
            }
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.msg || "Error resetting password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section>
            <h1 className='headings'>Reset Your Password</h1>
            <form onSubmit={handleResetPassword} className='reset-form'>

                <div className="password-field">
                    <input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <span
                        className="eye-icon"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                        {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

                <div className="password-field">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <span
                        className="eye-icon"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Resetting...' : 'Reset Password'}
                </button>
            </form>
        </section>
    );
};

export default ResetPass;
