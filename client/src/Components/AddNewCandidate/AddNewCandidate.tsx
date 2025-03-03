import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Candidate } from "../../types";
import { v4 as uuidv4 } from "uuid";

interface AddCandidateModalProps {
  show: boolean;
  jobId: string;
  onClose: () => void;
  onAddCandidate: (candidate: Candidate, resumeFile: File | null) => void;
}

const AddCandidateModal: React.FC<AddCandidateModalProps> = ({ show, jobId, onClose, onAddCandidate }) => {
  const [newCandidate, setNewCandidate] = useState({
    name: "",
    email: "",
    experience: "",
    skills: "",
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCandidate({ ...newCandidate, [e.target.name]: e.target.value });
  };

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResumeFile(e.target.files[0]);
    }
  };

  // Validate form inputs
  const validateForm = () => {
    let formErrors: { [key: string]: string } = {};
    
    if (!newCandidate.name.trim()) formErrors.name = "Name is required";
    if (!newCandidate.email.trim()) formErrors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newCandidate.email)) formErrors.email = "Invalid email format";
    if (!newCandidate.experience.trim()) formErrors.experience = "Experience is required";
    if (isNaN(Number(newCandidate.experience)) || Number(newCandidate.experience) < 0) {
      formErrors.experience = "Experience must be a positive number";
    }
    if (!newCandidate.skills.trim()) formErrors.skills = "Skills are required";
    if (!resumeFile) formErrors.resume = "Resume file is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Add new candidate
  const handleAddCandidate = () => {
    if (!validateForm()) return;

    const newCandidateData: Candidate = {
      id: uuidv4(),
      jobId,
      name: newCandidate.name,
      email: newCandidate.email,
      experience: parseInt(newCandidate.experience),
      skills: newCandidate.skills.split(",").map((skill) => skill.trim()),
      resumePath: "",
    };

    onAddCandidate(newCandidateData, resumeFile);
    onClose();
  };

  // Reset form when modal closes
  useEffect(() => {
    if (!show) {
      setNewCandidate({ name: "", email: "", experience: "", skills: "" });
      setResumeFile(null);
      setErrors({});
    }
  }, [show]);

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Candidate</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={newCandidate.name}
              onChange={handleInputChange}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={newCandidate.email}
              onChange={handleInputChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Experience (years)</Form.Label>
            <Form.Control
              type="number"
              name="experience"
              value={newCandidate.experience}
              onChange={handleInputChange}
              isInvalid={!!errors.experience}
              min="0"
            />
            <Form.Control.Feedback type="invalid">{errors.experience}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Skills (comma-separated)</Form.Label>
            <Form.Control
              type="text"
              name="skills"
              value={newCandidate.skills}
              onChange={handleInputChange}
              isInvalid={!!errors.skills}
            />
            <Form.Control.Feedback type="invalid">{errors.skills}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Upload Resume</Form.Label>
            <Form.Control
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              isInvalid={!!errors.resume}
            />
            <Form.Control.Feedback type="invalid">{errors.resume}</Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddCandidate}>
          Add Candidate
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddCandidateModal;
