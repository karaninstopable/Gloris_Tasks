import { useFormData } from "../context/FormContext.jsx";

export default function ShowForm() {
  const { formData } = useFormData(); // read shared data from Context

  // Requirement 1: nothing submitted yet
  if (!formData) {
    return (
      <section>
        <h1>Show Form</h1>
        <p className="empty">No data available yet.</p>
      </section>
    );
  }

  // Requirement 2: show all submitted data
  return (
    <section>
      <h1>Show Form</h1>
      <div className="card">
        {Object.entries(formData).map(([key, value]) => (
          <p key={key}>
            <strong>{key}:</strong> {value || "—"}
          </p>
        ))}
      </div>
    </section>
  );
}
