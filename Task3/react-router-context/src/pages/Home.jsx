import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormData } from "../context/FormContext.jsx";

const emptyForm = { name: "", email: "", course: "React", message: "" };

export default function Home() {
  const [form, setForm] = useState(emptyForm); // local state for the inputs
  const { setFormData } = useFormData();       // shared state from Context
  const navigate = useNavigate();              // programmatic navigation

  // One handler for every input: uses the input's "name" attribute as the key
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();      // stop the browser page reload
    setFormData(form);       // 1. save into Context
    navigate("/show-form");  // 2. redirect to Show Form page
  };

  return (
    <section>
      <h1>Home</h1>
      <p className="muted">Fill in the form and submit. You'll be redirected automatically.</p>

      <form onSubmit={handleSubmit} className="form">
        <label>
          Name
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>

        <label>
          Email
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>

        <label>
          Course
          <select name="course" value={form.course} onChange={handleChange}>
            <option>React</option>
            <option>JavaScript</option>
            <option>CSS</option>
          </select>
        </label>

        <label>
          Message
          <textarea name="message" rows="3" value={form.message} onChange={handleChange} />
        </label>

        <button type="submit">Submit</button>
      </form>
    </section>
  );
}
