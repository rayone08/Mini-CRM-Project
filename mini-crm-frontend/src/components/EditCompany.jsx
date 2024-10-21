import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './css/EditCompany.css';

const EditCompany = () => {
    const { companyId } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [logo, setLogo] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8000/api/companies/${companyId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const { name, email, website, logo } = response.data;
                setName(name);
                setEmail(email);
                setWebsite(website);
                setLogo(logo);
            } catch (error) {
                console.error('Error fetching company details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompany();
    }, [companyId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const updatedCompany = new FormData();
        updatedCompany.append('name', name);
        updatedCompany.append('email', email);
        updatedCompany.append('website', website);
        if (logo) updatedCompany.append('logo', logo);

        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:8000/api/companies/${companyId}`, updatedCompany, {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
            });
            alert('Company updated successfully!');
            navigate(`/companies/${companyId}/employees`);
        } catch (error) {
            console.error('Error updating company:', error);
            alert('Failed to update company. Please try again.');
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <form onSubmit={handleSubmit} className="add-company-form">
            <div className="form-group">
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Website:</label>
                <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Logo:</label>
                <input
                    type="file"
                    onChange={(e) => setLogo(e.target.files[0])}
                />
            </div>

            <button type="submit">Update Company</button>
        </form>
    );
};

export default EditCompany;
