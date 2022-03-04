import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import ProjectsList from '../components/ProjectsList';
import ProjectDetailsPage from './ProjectDetailsPage';
import ProjectCreatePage from './ProjectCreatePage';
import CustomersPage from './CustomersPage';
import CustomerDetailsPage from './CustomerDetailsPage';
import CustomerCreatePage from './CustomerCreatePage';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import { AuthContext } from '../context/auth.context';

export default function InternalHomePage() {

  const [projects, setProjects] = useState([]);
  const { user } = useContext(AuthContext);
  const storedToken = localStorage.getItem('authToken');
  console.log(storedToken);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/projects`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => setProjects(response.data))
      .catch((error) => console.log("Could not get projects from DB: ", error));
  }, [storedToken]);

  function getMyProjects(userId) {
    if (projects?.length > 0) {
      return projects.filter(project => project.owner === userId || project.managers.includes(userId));  
    } else {
      return [];
    }
  }

  return (
    <div>
      <Header />
      <div className="fix-content-height d-flex bg-neutral-grey">
        <SideBar />
          <Routes>
            <Route path="/" element={ <ProjectsList projects={ projects } /> }/>
            {/* nest further here later */}
            <Route path="/projects" element={ <ProjectsList projects={ projects } /> }/>
            {/* My-projects might be the same page as InternalHomePage */}
            <Route path="/projects/my-projects" element={ <ProjectsList projects={ getMyProjects(user._id) } />} />
            <Route path="/projects/create" element={ <ProjectCreatePage />} />
            <Route path="/projects/:projectId" element={ <ProjectDetailsPage />} />
            <Route path="/customers" element={ <CustomersPage /> }/>
            <Route path="/customers/create" element={ <CustomerCreatePage />}/>
            <Route path="/customers/:customerId" element={ <CustomerDetailsPage /> }/>
          </Routes>
      </div>
    </div>
  )
}
