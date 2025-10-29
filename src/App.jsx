import { useState } from "react";
import FeedbackForm from "./components/feedbackForm";
import Dashboard from "./components/dashboard";
import "./App.css";

function App() {
  // This state is used to refresh the dashboard after submitting feedback
  const [refresh, setRefresh] = useState(false);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Student Feedback App</h1>

      {/* Feedback Form */}
      <FeedbackForm onFeedbackAdded={() => setRefresh(!refresh)} />

      <hr style={{ margin: "20px 0" }} />

      {/* Dashboard displaying all feedback */}
      <Dashboard key={refresh} />
    </div>
  );
}

export default App;
