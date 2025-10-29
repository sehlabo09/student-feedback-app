import { useState } from "react";
import FeedbackForm from "./components/feedbackForm";
import Dashboard from "./components/dashboard";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("feedback");
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900 to-black text-white flex flex-col items-center justify-between font-sans">
      {/* Main Content */}
      <div className="w-full max-w-3xl flex flex-col items-center py-10">
        <div className="bg-black/50 backdrop-blur-md p-6 rounded-2xl shadow-2xl w-full border border-purple-500/40">
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

      {/* Footer */}
      <footer className="w-full text-center py-4 border-t border-purple-800/40 text-purple-400 text-sm bg-black/40 backdrop-blur-sm">
        <p>
          © {new Date().getFullYear()} Student Feedback App — Built with 💜 by{" "}
          <span className="font-semibold text-purple-300 hover:text-purple-400 cursor-pointer transition">
            Your Team
          </span>
        </p>
      </footer>
    </div>
  );
}

export default App;
