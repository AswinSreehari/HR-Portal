import './App.css';
import './tailwind.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Dashboard from './Pages/Dashboard/Dashboard';
import SignIn from './Pages/SignIn/SignIn';
 
import JobDetails from './Pages/Jobdetails/Jobdetails';  

function App() {
  return (
    <Router>
      <Header />  {/* ✅ Header remains on all pages */}
      <main className="container my-4">
        <Routes>
          {/* <Route path="/" element={<JobList />} />   */}
          <Route path='/' element={<SignIn/>}/>
          <Route path="/jobs/:jobId" element={<JobDetails />} />  
          <Route path="/dashboard" element={<Dashboard />} />  
        </Routes>
      </main>
      <Footer />  {/* ✅ Footer remains on all pages */}
    </Router>
  );
}

export default App;
