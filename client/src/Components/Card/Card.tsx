import './Card.css'
import { Button, Card } from "react-bootstrap";
import jobs from '../../Data/jobs.json'
import {  useNavigate } from 'react-router-dom';


function BasicExample() {

  const navigate = useNavigate()

  const handleViewMore = (id: string) => {
    navigate(`/jobs/${id}`)

  }
  return (
    <div className="container mt-4">
      <h2 className='d-flex justify-content-center'>Job Listing</h2>
    <div className="row">
      {jobs.map((job) => (
        <div key={job.id} className="col-md-4 mb-4">
<Card
  className="p-3 bg-white rounded h-100"
  style={{
    boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
  }}
>
            <Card.Body>
              <Card.Title>{job.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {job.company} - {job.location}
              </Card.Subtitle>
              <Card.Text>
                <strong>Type:</strong> {job.jobType} <br />
                <strong>Salary:</strong> {job.salary} <br />
                <small>{job.description.substring(0, 100)}...</small>
              </Card.Text>
              <Button variant="primary" onClick={() => handleViewMore(job.id)}  >
                  View More
                </Button>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  </div>
  );
}

export default BasicExample;