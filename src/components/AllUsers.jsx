import { useEffect, useState } from "react"
import "../styles/user.css"
import { getAllUsers } from "../api/userService"
const AllUsers = () => {
  const [users, setUsers] = useState([])
  const token = localStorage.getItem("token")
  useEffect(() => {
    getAllUsers(token)
      .then((res) => setUsers(res))
  }, [])
  return (
    <><h2 className="title">All users:</h2>
      <div className="user-profiles-grid">

        {users.map((user) => (
          <div key={user._id} className="user-profile-card">
            <h2 className="user-name">{user.userName}</h2>
            <p className="user-email">
              <span className="label">Email:</span> {user.email}
            </p>
            <p className="user-role">
              <span className="label">Role:</span> {user.role}
            </p>
          </div>
        ))}
      </div></>
  );
}

export default AllUsers;