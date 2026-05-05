import React, { useState } from 'react';

function MyForm() {
    const [formData, setFormData] = useState({
        name: '',
        preferredFoot: '',
        primaryPosition: '',
        secondaryPosition: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.preferredFoot) newErrors.preferredFoot = 'Preferred Foot is required';
        if (!formData.primaryPosition) newErrors.primaryPosition = 'Primary Position is required';

        if (Object.keys(newErrors).length === 0) {
            console.log('Form is valid');
        } else {
            setErrors(newErrors);
        }
        // Here you can add code to send formData to your backend or perform other actions
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Preferred Foot:</label>
                <select name="preferredFoot" value={formData.preferredFoot} onChange={handleChange} required>
                    <option value="">Select Preferred Foot</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="both">Both</option>
                </select>
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
            <button type="submit">Submit</button>
        </form>
    );
}

export default MyForm;
