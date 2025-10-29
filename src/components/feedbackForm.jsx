import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function FeedbackForm({ onFeedbackAdded }) {
  const [studentname, setStudentname] = useState("");
  const [coursecode, setCoursecode] = useState("");
  const [comments, setComments] = useState("");
  const [rating, setRating] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const validate = () => {
    const errors = {};

    // Student Name: only letters and spaces
    if (!studentname.trim()) {
      errors.studentname = "Student name is required";
    } else if (!/^[A-Za-z\s]+$/.test(studentname)) {
      errors.studentname = "Student name must contain only letters and spaces";
    }

    // Course Code: letters and numbers allowed
    if (!coursecode.trim()) {
      errors.coursecode = "Course code is required";
    } else if (!/^[A-Za-z0-9]+$/.test(coursecode)) {
      errors.coursecode = "Course code must contain only letters and numbers (e.g. CSC101)";
    }

    // Comments: only letters, punctuation, spaces (no digits)
    if (!comments.trim()) {
      errors.comments = "Comments cannot be empty";
    } else if (!/^[A-Za-z\s.,!?'"-]+$/.test(comments)) {
      errors.comments = "Comments should contain only text and punctuation (no numbers)";
    }

    // Rating: must be between 1 and 5
    if (rating < 1 || rating > 5) {
      errors.rating = "Rating must be between 1 and 5";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();

    if (Object.keys(errors).length > 0) {
      setMessage(Object.values(errors).join(", "));
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase.from("feedback").insert([
      {
        studentname,
        coursecode,
        comments,
        rating: Number(rating),
      },
    ]);

    setLoading(false);

    if (error) setMessage("Failed to submit feedback: " + error.message);
    else {
      setMessage("✅ Feedback submitted successfully!");
      setStudentname("");
      setCoursecode("");
      setComments("");
      setRating(1);
      if (onFeedbackAdded) onFeedbackAdded();
    }
  };

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <h2>Submit Feedback</h2>
      {message && <p className="message">{message}</p>}

      <label>Student Name</label>
      <input
        value={studentname}
        onChange={(e) => setStudentname(e.target.value)}
        placeholder="Enter your name"
        required
      />

      <label>Course Code</label>
      <input
        value={coursecode}
        onChange={(e) => setCoursecode(e.target.value)}
        placeholder="e.g. CSC101"
        required
      />

      <label>Comments</label>
      <textarea
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        placeholder="Write your feedback..."
        required
      />

      <label>Rating (1–5)</label>
      <input
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Feedback"}
      </button>
    </form>
  );
}
