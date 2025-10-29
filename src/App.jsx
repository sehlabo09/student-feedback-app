import { useState } from "react";
import FeedbackForm from "./components/feedbackForm";
import Dashboard from "./components/dashboard";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("feedback");
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900 to-black text-white flex flex-col items-center py-10 font-sans">
      <div className="bg-black/50 backdrop-blur-md p-6 rounded-2xl shadow-2xl w-full max-w-3xl border border-purple-500/40">
        <h1 className="text-3xl font-bold text-center text-purple-400 mb-6">
          Student Feedback App
        </h1>

        {/* Navigation Menu */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            className={`px-5 py-2 rounded-full transition-all ${
              activeTab === "feedback"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-purple-900/30 hover:bg-purple-800/50"
            }`}
            onClick={() => setActiveTab("feedback")}
          >
            Submit Feedback
          </button>

          <button
            className={`px-5 py-2 rounded-full transition-all ${
              activeTab === "dashboard"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-purple-900/30 hover:bg-purple-800/50"
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            View Feedback
          </button>
        </div>

        {/* Conditional Rendering */}
        <div className="bg-purple-950/40 p-6 rounded-xl border border-purple-800 shadow-inner">
          {activeTab === "feedback" ? (
            <FeedbackForm onFeedbackAdded={() => setRefresh(!refresh)} />
          ) : (
            <Dashboard key={refresh} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
