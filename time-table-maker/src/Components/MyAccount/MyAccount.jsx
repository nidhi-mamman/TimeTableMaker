import { useState } from "react";

const MyAccount = () => {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [role, setrole] = useState("");

    // student
    const [rollNumber, setRollNumber] = useState("");
    const [course, setCourse] = useState("");
    const [semester, setSemester] = useState("");

    // teacher / hod
    const [department, setDepartment] = useState("");
    const [subject, setSubject] = useState("");
    const [qualification, setQualification] = useState("");
    const [yearsOfExperience, setYearsOfExperience] = useState("");


    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const data = {
    //         name,
    //         email,
    //         password,
    //         role,
    //     };

    //     // add role-specific fields
    //     if (role === "student") {
    //         data.rollNumber = rollNumber;
    //         data.course = course;
    //         data.semester = semester;
    //     }

    //     if (role === "teacher") {
    //         data.department = department;
    //         data.subject = subject;
    //         data.qualification = qualification;
    //     }

    //     if (role === "hod") {
    //         data.department = department;
    //         data.yearsOfExperience = yearsOfExperience;
    //     }
    //     try {
    //         const response = await fetch("http://localhost:4000/auth/signup", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(data),
    //         });

    //         const result = await response.json();
    //         console.log(result);
    //         alert("Signup successful!");
    //     } catch (error) {
    //         console.error(error);
    //         alert("Signup failed");
    //     }
    // };

    return (
        <div className="wrapper">
            <div className="form-box login">
                <form>
                    {/* common fields */}
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        placeholder="Enter your name"
                    />

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        placeholder="Enter your email"
                    />

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        placeholder="Enter your password"
                    />

                    <select value={role} onChange={(e) => setrole(e.target.value)}>
                        <option value="">Select role</option>
                        <option value="hod">HOD</option>
                        <option value="teacher">Teacher</option>
                        <option value="student">Student</option>
                    </select>

                    {/* STUDENT */}
                    {role === "student" && (
                        <>
                            <input
                                type="text"
                                placeholder="Roll Number"
                                value={rollNumber}
                                onChange={(e) => setRollNumber(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Course"
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="Semester"
                                value={semester}
                                onChange={(e) => setSemester(e.target.value)}
                            />
                        </>
                    )}

                    {/* TEACHER */}
                    {role === "teacher" && (
                        <>
                            <input
                                type="text"
                                placeholder="Department"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Qualification"
                                value={qualification}
                                onChange={(e) => setQualification(e.target.value)}
                            />
                        </>
                    )}

                    {/* HOD */}
                    {role === "hod" && (
                        <>
                            <input
                                type="text"
                                placeholder="Department"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="Years of Experience"
                                value={yearsOfExperience}
                                onChange={(e) => setYearsOfExperience(e.target.value)}
                            />
                        </>
                    )}


                    <button type="submit">Signup</button>
                </form>
            </div>
        </div>
    );
};

export default MyAccount;
