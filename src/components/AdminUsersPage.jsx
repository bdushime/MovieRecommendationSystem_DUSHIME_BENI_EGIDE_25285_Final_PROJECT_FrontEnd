import {useState, useEffect} from "react";
import axios from "axios";
// import "./AdminUsersPage.css";

const AdminUsersPage = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8080/admin_page");
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        // fetchUsers();
    }, []);

    return (
        <div className="container">
            <h1>User List</h1>
            <table className="user-table">
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Password (Encrypted)</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Date of Birth</th>
                    <th>Phone Number</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.login}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.dateOfBirth}</td>
                        <td>{user.phoneNumber}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUsersPage;
