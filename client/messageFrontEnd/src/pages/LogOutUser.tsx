
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const LogOutUser = () => {

    const navigate = useNavigate();
    useEffect(() => {
        console.log("Logging out...");
        
        // Perform logout logic
        sessionStorage.clear();
    
        // Redirect to login page after logout
        navigate("/");
      }, [navigate]);
    

  return (
    <></>
  )
}

export default LogOutUser
