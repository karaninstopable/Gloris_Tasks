import "../styles/users.css";

// Receives data and the click handler from the parent through props
function UserChild({ users, onSelectUser }) {
  if (!users || users.length === 0) {
    return <p>No users to show yet.</p>;
  }

  return (
    <ul className="users__list">
      {users.map((user) => (
        <li key={user.id} className="users__item">
          <span className="users__name">{user.name}</span>
          <button
            type="button"
            className="users__button"
            onClick={() => onSelectUser(user.name)}
          >
            Show name
          </button>
          <span className="users__email">{user.email}</span>
        </li>
      ))}
    </ul>
  );
}

export default UserChild;
