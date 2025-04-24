import "../CSS/styles.css"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/auth.context';

const TimetableView = () => {
    const { TimeTable_URL } = useAuth()
    const [timetable, setTimetable] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${TimeTable_URL}/getAllClass`);
                setTimetable(res.data);
            } catch (err) {
                console.error('Failed to fetch timetable', err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="time-table-wrapper">
            <h2 className="heading2">Timetable</h2>
            <Link to="/timetableform">➕ Add New Class</Link>
            <table border="1" cellPadding="8" style={{ marginTop: '20px', width: '100%' }}>
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Teacher</th>
                        <th>Subject</th>
                        <th>Room</th>
                    </tr>
                </thead>
                <tbody>
                    {timetable.map((entry, index) => (
                        <tr key={index}>
                            <td>{entry.day}</td>
                            <td>{entry.startTime}</td>
                            <td>{entry.endTime}</td>
                            <td>{entry.teacher}</td>
                            <td>{entry.subject}</td>
                            <td>{entry.room}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TimetableView;
