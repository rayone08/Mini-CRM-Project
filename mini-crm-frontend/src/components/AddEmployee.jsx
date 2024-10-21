import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './css/AddEmployee.css';

const AddEmployee = () => {
    const { companyId } = useParams();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `http://localhost:8000/api/companies/${companyId}/employees`,
                { first_name: firstName, last_name: lastName, email, phone },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Employee added successfully!');
            navigate(`/companies/${companyId}/employees`);
        } catch (error) {
            console.error('Error adding employee:', error);
            setError('Failed to add employee. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-employee-container">
            <h1>Add Employee</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="add-employee-form">
                <div className="form-group">
                    <label>First Name:</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Phone:</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Employee'}
                </button>
            </form>
        </div>
    );
};

export default AddEmployee;
