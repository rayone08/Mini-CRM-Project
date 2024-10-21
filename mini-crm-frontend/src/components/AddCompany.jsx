import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/AddCompany.css';

const AddCompany = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [logo, setLogo] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCompany = new FormData();
    newCompany.append('name', name);
    newCompany.append('email', email);
    newCompany.append('website', website);
    if (logo) newCompany.append('logo', logo);

    axios.post('http://localhost:8000/api/companies', newCompany, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(response => {
        console.log('Company added:', response.data);
        alert('Company added successfully!');
        navigate('/companies');
      })
      .catch(error => console.error('Error adding company:', error));
  };

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

      <button type="submit">Add Company</button>
    </form>
  );
};

export default AddCompany;
