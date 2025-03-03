import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import jobs from "../../Data/jobs.json";
// import candidates from "../../Data/candidates.json";
import { Job, Candidate } from "../../types";
import { FaEnvelope, FaFilePdf, FaUserPlus } from "react-icons/fa";
import EmailModal from "../../Components/Email/EmailModal";
import AddCandidateModal from "../../Components/AddNewCandidate/AddNewCandidate";
import { BASEURL } from "../../utils/utils"; // API base URL
import axios from "axios";

const JobDetails: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const job: Job | undefined = jobs.find((j) => j.id === jobId);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [appliedCandidates, setAppliedCandidates] = useState<Candidate[]>(
    candidates.filter((c) => c.jobId === jobId)
  );

  // Email Modal State
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null
  );
  const [emailDetails, setEmailDetails] = useState({
    date: "",
    time: "",
    location: "",
    interviewer: "",
  });

  // Add Candidate Modal State
  const [showAddModal, setShowAddModal] = useState(false);

  // Show Email Modal
  const handleShowEmailModal = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setShowEmailModal(true);
  };

  // Close Email Modal
  const handleCloseEmailModal = () => {
    setShowEmailModal(false);
    setSelectedCandidate(null);
    setEmailDetails({ date: "", time: "", location: "", interviewer: "" });
  };

  // Show Add Candidate Modal
  const handleShowAddModal = () => setShowAddModal(true);

  // Close Add Candidate Modal
  const handleCloseAddModal = () => setShowAddModal(false);

  // Add New Candidate Function
  const handleAddCandidate = async (
    candidate: Candidate,
    resumeFile: File | null
  ) => {
    if (!job) return;

    const formData = new FormData();
    formData.append("name", candidate.name);
    formData.append("email", candidate.email);
    formData.append("experience", candidate.experience.toString());
    formData.append("skills", candidate.skills.join(","));
    formData.append("jobId", job.id.toString());

    if (resumeFile) {
      formData.append("resume", resumeFile);
    }

    try {
      const response = await axios.post(
        `${BASEURL}/api/candidates/add`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 201) {
        setAppliedCandidates([...appliedCandidates, response.data]);
        setCandidates(response.data.candidates);
        console.log("response-->", response.data.candidate);
      } else {
        console.error("Failed to add candidate");
      }
    } catch (error) {
      console.error("Error adding candidate:", error);
    }

    handleCloseAddModal();
  };

  useEffect(() => {
    const getCandidatesData = async () => {
      try {
        const response = await axios.get(
          `${BASEURL}/api/candidates/getCandidates`
        );
        setCandidates(response.data.candidates);

        setAppliedCandidates(
          response.data.candidates.filter((c: Candidate) => c.jobId === jobId)
        );
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    getCandidatesData();
  }, [jobId, appliedCandidates]);

  if (!job) {
    return <h2 className="text-center mt-4">Job not found</h2>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Job Details</h2>
      <div className="row">
        {/* Left Side - Job Details */}
        <div className="col-md-7">
          <Card className="  p-4 bg-white rounded"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
          }}
          >
            <Card.Body>
              <div className="d-flex justify-content-end">
                <Button variant="success" onClick={handleShowAddModal}>
                  <FaUserPlus /> Add Candidate
                </Button>
              </div>
              <Card.Title className="fw-bold">{job.title}</Card.Title>
              <Card.Subtitle className="mb-3 text-muted">
                {job.company} - {job.location}
              </Card.Subtitle>
              <Card.Text>
                <strong>Industry:</strong> {job.industry} <br />
                <strong>Type:</strong> {job.jobType} <br />
                <strong>Work Mode:</strong> {job.workMode} <br />
                <strong>Experience Required:</strong> {job.experience} <br />
                <strong>Salary:</strong> {job.salary} <br />
                <strong>Posted Date:</strong> {job.postedDate} <br />
              </Card.Text>
              <hr />
              <Card.Text>
                <strong>Job Description:</strong> <br />
                {job.description}
              </Card.Text>
              <hr />
              <Card.Text>
                <strong>Requirements:</strong>
                <ul>
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </Card.Text>
              <hr />
              <Card.Text>
                <strong>Benefits:</strong>
                <ul>
                  {job.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        {/* Right Side - Candidates List */}
        <div className="col-md-5">
          <h4 className="mb-3">Candidates Applied</h4>
          {appliedCandidates.length > 0 ? (
            appliedCandidates.map((candidate) => (
              <Card key={candidate.id} className="mb-3 p-2"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
              }}
              >
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div>
                    <Card.Title>{candidate.name}</Card.Title>
                    <Card.Text>
                      <strong>Email:</strong> {candidate.email} <br />
                      <strong>Experience:</strong> {candidate.experience} years{" "}
                      <br />
                      <strong>Skills:</strong> {candidate.skills?.join(", ")}
                    </Card.Text>
                  </div>
                  <div>
                    {/* Email Icon */}
                    <Button
                      variant="outline-primary"
                      className="me-2"
                      onClick={() => handleShowEmailModal(candidate)}
                    >
                      <FaEnvelope />
                    </Button>

                    {/* Resume View Icon */}
                    {candidate.resumePath && (
                      <Button
                        variant="outline-secondary"
                        className="me-2"
                        onClick={() =>
                          window.open(candidate.resumePath, "_blank")
                        }
                      >
                        <FaFilePdf />
                      </Button>
                    )}

                    {/* Resume Download Icon */}
                    {/* {candidate.resumePath && (
                      <Button variant="outline-success" onClick={() => window.open(candidate.resumePath, "_blank")}>
                        <FaDownload />
                      </Button>
                    )} */}
                  </div>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No candidates have applied yet.</p>
          )}
        </div>
      </div>

      {/* Email Modal */}
      <EmailModal
        show={showEmailModal}
        candidate={selectedCandidate}
        emailDetails={emailDetails}
        onClose={handleCloseEmailModal}
        onSendEmail={() => {}}
        onInputChange={() => {}}
      />

      {/* Add Candidate Modal */}
      <AddCandidateModal
        show={showAddModal}
        jobId={job.id}
        onClose={handleCloseAddModal}
        onAddCandidate={handleAddCandidate}
      />
    </div>
  );
};

export default JobDetails;
