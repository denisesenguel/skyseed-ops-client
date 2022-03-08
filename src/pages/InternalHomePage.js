import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import AllProjectsPage from './AllProjectsPage';
import MyProjectsPage from './MyProjectsPage';
import ProjectDetailsPage from './ProjectDetailsPage';
import ProjectCreatePage from './ProjectCreatePage';
import CustomersPage from './CustomersPage';
import CustomerCreatePage from './CustomerCreatePage';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import useSidebar from '../hooks/useSidebar';
import { AuthContext } from '../context/auth.context';

export default function InternalHomePage() {

  const { sidebar, toggleSidebar } = useSidebar();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const storedToken = localStorage.getItem('authToken');

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/projects`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        setProjects(response.data);
        setIsLoading(false);
      })
      .catch((error) => console.log("Could not get projects from DB: ", error));
  }, [storedToken]);

  function getMyProjects(userId) {
    if (projects?.length > 0) {
      return projects.filter((project) => {
        const isOwner = project.owner === userId; 
        const isManager = project.managers.some(manager => manager._id === userId);
        return (isOwner || isManager);
      });  
    } else {
      return [];
    }
  }

  return (
    <div>
      <Header />
      <div className="d-flex bg-neutral-grey min-content-height">
        <SideBar sidebar={ sidebar } toggleSidebar={ toggleSidebar }/>
          <div className={ sidebar ? "fix-content-width" : "fix-content-width-hidden"}>     
            <Routes>
              <Route path="/" element={ <AllProjectsPage projects={ projects } isLoading={ isLoading } /> }/>
              <Route path="/projects" element={ <AllProjectsPage projects={ projects } isLoading={ isLoading }/> }/>
              <Route path="/projects/my-projects" element={ <MyProjectsPage projects={ getMyProjects(user._id) } isLoading={ isLoading }/>} />
              <Route path="/projects/create" element={ <ProjectCreatePage />} />
              <Route path="/projects/:projectId" element={ <ProjectDetailsPage />} />
              <Route path="/customers" element={ <CustomersPage /> }/>
              <Route path="/customers/create" element={ <CustomerCreatePage />}/>
            </Routes>
          </div>
      </div>
    </div>
  )
}
