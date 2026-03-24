import '../CSS/styles.css'
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/auth.context';


const TimetableForm = () => {
    const { TimeTable_URL } = useAuth()
    const navigate = useNavigate();
    const [form, setForm] = useState({
        teacher: '',
        room: '',
        subject: '',
        day: '',
        startTime: '',
        endTime: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${TimeTable_URL}/addclass`, form);
            alert('Class added successfully!');
            setForm({
                teacher: '',
                room: '',
                subject: '',
                day: '',
                startTime: '',
                endTime: ''
            });
            navigate('/timetableview');
        } catch (err) {
            alert(err.response?.data?.msg || 'Error adding class.');
        }
    };

    return (
        <div className='time-table-form-wrapper'>
            <h2 className='heading2'>Add New Class</h2>
            <form onSubmit={handleSubmit}>
                <input name="teacher" placeholder="Teacher Name" value={form.teacher} onChange={handleChange} required />
                <input name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} />
                <input name="room" placeholder="Room Number" value={form.room} onChange={handleChange} required />
                <select name="day" value={form.day} onChange={handleChange} required>
                    <option value="">Select Day</option>
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(day => (
                        <option key={day} value={day}>{day}</option>
                    ))}
                </select>
                <input name="startTime" type="time" value={form.startTime} onChange={handleChange} required />
                <input name="endTime" type="time" value={form.endTime} onChange={handleChange} required />
                <button type="submit">Add Class</button>
            </form>
        </div>
    );
};

export default TimetableForm;
