import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import './css/CompanyList.css';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/companies')
      .then((response) => setCompanies(response.data))
      .catch((error) => console.error('Error fetching companies:', error));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:8000/api/companies/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCompanies(companies.filter((company) => company.id !== id));
      } catch (error) {
        console.error('Error deleting company:', error);
      }
    }
  };

  return (
    <div className="page-container">
      <h1 className="company-list-title">Companies</h1>
      <div className="company-list-container">
        <ul className="company-list">
          {companies.length > 0 ? (
            companies.map((company) => (
              <li key={company.id} className="company-item">
                <Link to={`/companies/${company.id}/employees`} className="company-name">
                  {company.name}
                </Link>
                <div className="icon-container">
                  <Link to={`/companies/${company.id}/edit`} className="edit-link">
                    <FaEdit />
                  </Link>
                  <button className="delete-button" onClick={() => handleDelete(company.id)}>
                    <FaTrashAlt />
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="no-companies">No companies found.</p>
          )}
        </ul>
        <Link to="/add-company" className="add-company-link">
          Add New Company
        </Link>
      </div>
    </div>
  );
};

export default CompanyList;
