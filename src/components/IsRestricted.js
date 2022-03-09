import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

// works as a Wrapper component around buttons and adds 'disabled' 
// prop if user is not authorized 
export default function IsRestricted(props) {
  const { children, project } = props;
  const { user } = useContext(AuthContext);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (user?.role === "admin") setIsAuthorized(true);
    if (project && Object.entries(project).length > 0) {
      if (
        project.owner === user._id ||
        project.managers.some((manager) => manager._id === user._id)
      ) {
        setIsAuthorized(true);
      }
    }
  }, [project, user])

  return React.cloneElement(children, { disabled: !isAuthorized });
}
