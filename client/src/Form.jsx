import { useState, useEffect } from 'react';

function MyForm({ initialData, onSaved }) {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [formData, setFormData] = useState({
        name: '',
        team: '',
        age: '',
        leftRating: '',
        rightRating: '',
        primaryPosition: '',
        secondaryPosition: '',
        technicalRating: '',
        mentalRating: '',
        physicalRating: '',
        available: true // Default to true, can be changed based on your requirements
    });

    const [editingId, setEditingId] = useState(null);
    const [errors, setErrors] = useState({});
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetchOptions = async () => {
            const response = await fetch(`${apiUrl}/api/teams`);
            const data = await response.json();
            const mapped = data.map(item => ({
                label: item.name,
                value: item.id
            }));
            setOptions(mapped);
        };
        fetchOptions();
    }, []);

    useEffect(() => {
        if (!initialData) {
            return;
        }

        const pendingData = {
            name: initialData.name || '',
            team: initialData.team != null ? String(initialData.team) : '',
            age: initialData.age || '',
            leftRating: initialData.leftRating || '',
            rightRating: initialData.rightRating || '',
            primaryPosition: initialData.primaryPosition || '',
            secondaryPosition: initialData.secondaryPosition || '',
            technicalRating: initialData.technicalRating || '',
            mentalRating: initialData.mentalRating || '',
            physicalRating: initialData.physicalRating || '',
            available: initialData.available ?? true
        };

        const timer = setTimeout(() => {
            setFormData(pendingData);
            setEditingId(initialData.id || null);
        });

        return () => clearTimeout(timer);
    }, [initialData]);

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.team) newErrors.team = 'Team is required';
        if (!formData.age) newErrors.age = 'Age is required';
        if (!formData.leftRating) newErrors.leftRating = 'Left Rating is required';
        if (!formData.rightRating) newErrors.rightRating = 'Right Rating is required';
        if (!formData.technicalRating) newErrors.technicalRating = 'Technical Rating is required';
        if (!formData.mentalRating) newErrors.mentalRating = 'Mental Rating is required';
        if (!formData.physicalRating) newErrors.physicalRating = 'Physical Rating is required';
        if (!formData.primaryPosition) newErrors.primaryPosition = 'Primary Position is required';

        if (Object.keys(newErrors).length === 0) {
            console.log('Form is valid');
            try {
                const url = editingId ? `${apiUrl}/api/player/${editingId}` : `${apiUrl}/api/player`;
                const method = editingId ? 'PUT' : 'POST';
                const response = await fetch(url, {
                    method,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                if (response.ok) {
                    const result = await response.json();
                    console.log('API call successful:', result);
                    if (onSaved) {
                        onSaved();
                    }
                    setFormData({
                        name: '',
                        team: '',
                        age: '',
                        leftRating: '',
                        rightRating: '',
                        primaryPosition: '',
                        secondaryPosition: '',
                        technicalRating: '',
                        mentalRating: '',
                        physicalRating: '',
                        available: true
                    });
                    setEditingId(null);
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
                <div style={{ flex: 1 }}>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    {errors.name && <div className="field-error">{errors.name}</div>}
                </div>
            </div>
            <div>
                <label>Team:</label>
                <div style={{ flex: 1 }}>
                    <select name="team" value={formData.team} onChange={handleChange} required>
                        <option value="">Select a team</option>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    {errors.team && <div className="field-error">{errors.team}</div>}
                </div>
                <label>Age:</label>
                <div style={{ flex: 1 }}>
                    <input type="number" name="age" value={formData.age} onChange={handleChange} required />
                    {errors.age && <div className="field-error">{errors.age}</div>}
                </div>
            </div>
            <div>
                <label>Left Rating:</label>
                <div style={{ flex: 1 }}>
                    <select name="leftRating" value={formData.leftRating} onChange={handleChange} required>
                        <option value="">Select Left Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    {errors.leftRating && <div className="field-error">{errors.leftRating}</div>}
                </div>
                <label>Right Rating:</label>
                <div style={{ flex: 1 }}>
                    <select name="rightRating" value={formData.rightRating} onChange={handleChange} required>
                        <option value="">Select Right Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    {errors.rightRating && <div className="field-error">{errors.rightRating}</div>}
                </div>
            </div>
            <div>
                <label>Primary Role:</label>
                <div style={{ flex: 1 }}>
                    <select name="primaryPosition" value={formData.primaryPosition} onChange={handleChange} required>
                        <option value="">Select Primary Role</option>
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
                    {errors.primaryPosition && <div className="field-error">{errors.primaryPosition}</div>}
                </div>
                <label>Secondary Role:</label>
                <div style={{ flex: 1 }}>
                    <select name="secondaryPosition" value={formData.secondaryPosition} onChange={handleChange}>
                        <option value="">Select Secondary Role</option>
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
            </div>
            <div>
                <label>Technical Rating:</label>
                <div style={{ flex: 1 }}>
                    <select name="technicalRating" value={formData.technicalRating} onChange={handleChange} required>
                        <option value="">Select Technical Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    {errors.technicalRating && <div className="field-error">{errors.technicalRating}</div>}
                </div>
                <label>Mental Rating:</label>
                <div style={{ flex: 1 }}>
                    <select name="mentalRating" value={formData.mentalRating} onChange={handleChange} required>
                        <option value="">Select Mental Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    {errors.mentalRating && <div className="field-error">{errors.mentalRating}</div>}
                </div>
            </div>
            <div className="toggle-row">
                <label>Physical Rating:</label>
                <div style={{ flex: 1 }}>
                    <select name="physicalRating" value={formData.physicalRating} onChange={handleChange} required>
                        <option value="">Select Physical Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    {errors.physicalRating && <div className="field-error">{errors.physicalRating}</div>}
                </div>
                <label htmlFor="available">Available:</label>
                <label className="switch">
                    <input
                        type="checkbox"
                        id="available"
                        name="available"
                        checked={formData.available}
                        onChange={handleChange}
                    />
                    <span className="slider" />
                </label>
                <span className="toggle-label">{formData.available ? 'On' : 'Off'}</span>
            </div>
            <button type="submit">{editingId ? 'Update' : 'Submit'}</button>
        </form>
    );
}

export default MyForm;
