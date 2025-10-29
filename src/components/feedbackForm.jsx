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
    if (!studentname.trim()) errors.studentname = "Student name is required";
    if (!coursecode.trim()) errors.coursecode = "Course code is required";
    if (!comments.trim()) errors.comments = "Comments cannot be empty";
    if (rating < 1 || rating > 5) errors.rating = "Rating must be 1–5";
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

    const { data, error } = await supabase
      .from("feedback")
      .insert([{
        studentname,     // lowercase
        coursecode,      // lowercase
        comments,
        rating: Number(rating)
      }]);

    setLoading(false);

    if (error) setMessage("Failed to submit feedback: " + error.message);
    else {
      setMessage("Feedback submitted successfully!");
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
      <input value={studentname} onChange={e => setStudentname(e.target.value)} />
      <label>Course Code</label>
      <input value={coursecode} onChange={e => setCoursecode(e.target.value)} />
      <label>Comments</label>
      <textarea value={comments} onChange={e => setComments(e.target.value)} />
      <label>Rating (1–5)</label>
      <input
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={e => setRating(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Feedback"}
      </button>
    </form>
  );
}
