import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './css/EmployeeList.css';

const EmployeeList = () => {
    const { companyId } = useParams();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    `http://localhost:8000/api/companies/${companyId}/employees`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employees:', error);
                setError('Failed to load employees. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchEmployees();
    }, [companyId]);

    return (
        <div className="employee-list-container">
            <h1>Employees for Company ID: {companyId}</h1>
            {loading && <p>Loading employees...</p>}
            {error && <p className="error-message">{error}</p>}

            {employees.length > 0 ? (
                <ul className="employee-list">
                    {employees.map((employee) => (
                        <li key={employee.id} className="employee-item">
                            {employee.first_name} {employee.last_name}
                        </li>
                    ))}
                </ul>
            ) : (
                !loading && <p className="no-employees">No employees found.</p>
            )}

            <Link to={`/companies/${companyId}/add-employee`} className="add-employee-link">
                Add New Employee
            </Link>

            <Link to="/companies" className="back-to-companies-link">
                Back to Companies List
            </Link>
        </div>
    );
};

export default EmployeeList;
