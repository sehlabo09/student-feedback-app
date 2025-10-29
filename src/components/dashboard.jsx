import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Dashboard() {
  const [feedbackList, setFeedbackList] = useState([]);

  const fetchFeedback = async () => {
    const { data, error } = await supabase
      .from("feedback")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error(error);
    else setFeedbackList(data);
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this feedback?")) return;
    const { error } = await supabase.from("feedback").delete().eq("id", id);
    if (error) console.error(error);
    else fetchFeedback();
  };

  return (
    <div className="dashboard">
      <h2>Feedback Dashboard</h2>
      {feedbackList.length === 0 ? (
        <p>No feedback yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Course</th>
              <th>Comments</th>
              <th>Rating</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {feedbackList.map(f => (
              <tr key={f.id}>
                <td>{f.studentname}</td> {/* lowercase */}
                <td>{f.coursecode}</td>   {/* lowercase */}
                <td>{f.comments}</td>
                <td>{f.rating}</td>
                <td>{new Date(f.created_at).toLocaleString()}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(f.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
