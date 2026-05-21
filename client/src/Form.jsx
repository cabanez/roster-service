import React, { useState } from 'react';

function MyForm() {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        leftRating: '',
        rightRating: '',
        primaryPosition: '',
        secondaryPosition: '',
        available: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.age) newErrors.age = 'Age is required';
        if (!formData.leftRating) newErrors.leftRating = 'Left Rating is required';
        if (!formData.rightRating) newErrors.rightRating = 'Right Rating is required';
        if (!formData.primaryPosition) newErrors.primaryPosition = 'Primary Position is required';
        if (!formData.available) newErrors.available = 'Availability is required';

        if (Object.keys(newErrors).length === 0) {
            console.log('Form is valid');
            try {
                const response = await fetch('http://localhost:5000/player', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                if (response.ok) {
                    const result = await response.json();
                    console.log('API call successful:', result);
                } else {
                    console.error('API call failed:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Network or server error :', error);
            }
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Age:</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} required />
            </div>
            <div>
                <label>Left Rating:</label>
                <input type="number" name="leftRating" value={formData.leftRating} onChange={handleChange} required />
            </div>
            <div>
                <label>Right Rating:</label>
                <input type="number" name="rightRating" value={formData.rightRating} onChange={handleChange} required />
            </div>
            <div>
                <label>Primary Position:</label>
                <select name="primaryPosition" value={formData.primaryPosition} onChange={handleChange} required>
                    <option value="">Select Primary Position</option>
                    <option value="GK">Goalkeeper</option>
                    <option value="DC">Center-back</option>
                    <option value="DR">Right-back</option>
                    <option value="DL">Left-back</option>
                    <option value="DM">Defensive Midfielder</option>
                    <option value="WBR">Right Wing-back</option>
                    <option value="WBL">Left Wing-back</option>
                    <option value="MC">Center Midfielder</option>
                    <option value="MR">Right Midfielder</option>
                    <option value="ML">Left Midfielder</option>
                    <option value="AMC">Attacking Midfielder</option>
                    <option value="AML">Left Winger</option>
                    <option value="AMR">Right Winger</option>
                    <option value="ST">Striker</option>
                </select>
            </div>
            <div>
                <label>Secondary Position:</label>
                <select name="secondaryPosition" value={formData.secondaryPosition} onChange={handleChange}>
                    <option value="">Select Secondary Position</option>
                    <option value="GK">Goalkeeper</option>
                    <option value="DC">Center-back</option>
                    <option value="DR">Right-back</option>
                    <option value="DL">Left-back</option>
                    <option value="DM">Defensive Midfielder</option>
                    <option value="WBR">Right Wing-back</option>
                    <option value="WBL">Left Wing-back</option>
                    <option value="MC">Center Midfielder</option>
                    <option value="MR">Right Midfielder</option>
                    <option value="ML">Left Midfielder</option>
                    <option value="AMC">Attacking Midfielder</option>
                    <option value="AML">Left Winger</option>
                    <option value="AMR">Right Winger</option>
                    <option value="ST">Striker</option>
                </select>
            </div>
            <div>
                <label>Available:</label>
                <input type="checkbox" name="available" checked={formData.available} onChange={handleChange} required />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

export default MyForm;
