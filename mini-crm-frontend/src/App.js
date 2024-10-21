import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import CompanyList from './components/CompanyList';
import EmployeeList from './components/EmployeeList';
import AddCompany from './components/AddCompany';
import Login from './components/Login';
import AddEmployee from './components/AddEmployee';
import Header from './components/Header';
import EditCompany from './components/EditCompany';

function App() {
  const location = useLocation(); // Get the current route
  const isAuthenticated = !!localStorage.getItem('token'); // Check authentication

  return (
    <div>
      {/* Render Header only if the user is authenticated and not on the login page */}
      {isAuthenticated && location.pathname !== '/login' && <Header />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/companies"
          element={isAuthenticated ? <CompanyList /> : <Navigate to="/login" />}
        />
        <Route
          path="/add-company"
          element={isAuthenticated ? <AddCompany /> : <Navigate to="/login" />}
        />
        <Route
          path="/companies/:companyId/employees"
          element={isAuthenticated ? <EmployeeList /> : <Navigate to="/login" />}
        />
        <Route
          path="/companies/:companyId/add-employee"
          element={isAuthenticated ? <AddEmployee /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to={isAuthenticated ? '/companies' : '/login'} />} />
        <Route path="/companies/:companyId/edit" element={<EditCompany />} />

      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
