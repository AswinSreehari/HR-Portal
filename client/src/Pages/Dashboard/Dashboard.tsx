import './Dashboard.css' 
import Card from '../../Components/Card/Card'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
 

 const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (!email) {
      navigate('/'); 
    }
  }, [navigate]);

  return (
    
    <div className='flex flex-col min-h-screen '
    
    >
       <Card/>
    </div>
  )
}

export default Dashboard