import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/auth.context';
import Cookies from 'js-cookie'

const ResetPass = () => {
    const navigate = useNavigate();
    const { Signup_URL } = useAuth();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

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
        <form onSubmit={handleResetPassword}>
            <h2>Reset Your Password</h2>
            <div>
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit" disabled={loading}>
                {loading ? 'Resetting...' : 'Reset Password'}
            </button>
        </form>
    );
};

export default ResetPass;
