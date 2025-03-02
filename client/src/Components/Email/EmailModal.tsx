import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Candidate } from "../../types";
import axios from "axios";
import { BASEURL } from "../../utils/utils";

interface EmailModalProps {
  show: boolean;
  candidate: Candidate | null;
  emailDetails: {
    date: string;
    time: string;
    location: string;
    interviewer: string;
  };
  onClose: () => void;
  onSendEmail: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}



const EmailModal: React.FC<EmailModalProps> = ({
  show,
  candidate,
  onClose,
}) => {
  const [emailDetails, setEmailDetails] = useState({
    date: "",
    time: "",
    location: "",
    interviewer: "",
    meetingLink: "",
    interviewType: "",
  });

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setEmailDetails({ ...emailDetails, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSendEmail = async () => {
    if (!candidate) return;

    // Prepare FormData
    const formData = {
      candidateEmail: candidate.email,
      candidateName: candidate.name,
      ...emailDetails,
    };

    try {
      const response = await axios.post(
        `${BASEURL}/api/candidates/schedule-interview`,
        formData
      );
      if (response.status === 201) {
        alert("Interview scheduled and email sent!");
        onClose();
      } else {
        alert("Failed to schedule interview.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("An error occurred while sending the email.");
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Schedule Interview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {candidate && (
          <p>
            Scheduling an interview for <strong>{candidate.name}</strong>
          </p>
        )}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Interview Type</Form.Label>
            <Form.Control
              type="text"
              name="interviewType"
              value={emailDetails.interviewType}
              onChange={handleInputChange}
              placeholder="Enter interview type"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={emailDetails.date}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="time"
              name="time"
              value={emailDetails.time}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              placeholder="Enter location (or 'Online')"
              value={emailDetails.location}
              onChange={handleInputChange}
               
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Interviewer</Form.Label>
            <Form.Control
              type="text"
              name="interviewer"
              placeholder="Enter interviewer name"
              value={emailDetails.interviewer}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Meeting Link</Form.Label>
            <Form.Control
              type="url"
              name="meetingLink"
              placeholder="Enter meeting link (e.g., Microsoft Teams, Zoom, Google Meet)"
              value={emailDetails.meetingLink}
              onChange={handleInputChange}
              disabled={emailDetails.interviewType === "In-Person"}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSendEmail}>
          Send Email
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmailModal;
