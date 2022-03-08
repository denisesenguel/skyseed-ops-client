import { useState, useContext, useMemo } from 'react';
import { AuthContext } from '../context/auth.context';

export default function usePermissions(props) {
    
    const { project } = props;
    const { user } = useContext(AuthContext);
    const [isAllowedTo, setIsAuthorized] = useState(false);

    useMemo(() => {
        if (user.role === "admin") setIsAuthorized(true);

        console.log("project: ", project)

        if (project && Object.entries(project).length > 0) {
            if (project.owner === user._id || project.managers.some(manager => manager._id === user._id)) {
                setIsAuthorized(true);
            }
        }
        console.log("memo executed. isallowed: ", isAllowedTo);
    }, [project, user])
    
    return  { isAllowedTo };
}
