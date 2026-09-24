import { useEffect, useState } from "react";
import UserChild from "./UserChild";
import "../styles/users.css";

const API_URL = "https://jsonplaceholder.typicode.com/users";

function UserParent() {
  const [users, setUsers] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // API call lives in the parent
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Request failed with status " + response.status);
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError("Could not load users. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Passed down to the child and called when a button is clicked
  const handleSelectUser = (name) => {
    setSelectedName(name);
  };

  return (
    <section className="users">
      <h2 className="users__title">Users</h2>

      {/* The empty <p> that gets filled on button click */}
      <p className="users__selected">{selectedName}</p>

      {loading && <p>Loading users…</p>}

      {error && (
        <p className="users__error">
          {error} <button onClick={fetchUsers}>Try again</button>
        </p>
      )}

      {!loading && !error && (
        <UserChild users={users} onSelectUser={handleSelectUser} />
      )}
    </section>
  );
}

export default UserParent;
