import { useUserContext } from "../../hooks/useUserContext";

export default function CurrentUsers() {
  const { users, loading, error } = useUserContext();

  if (loading) {
    return <p className="topmar mx-3">Loading users...</p>;
  }

  if (error) {
    return <p className="topmar mx-3 text-danger">{error}</p>;
  }

  return (
    <div className="topmar mx-3">
      <h2>Users</h2>

      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "Admin" : "User"}</td>
                <td>action</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
