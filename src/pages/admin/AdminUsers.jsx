import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/Layout';
import { getAllUsersAPI } from '../../lib/api';
import './Admin.css';

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await getAllUsersAPI();
            if (res.ok) {
                setUsers(res.data.users || []);
            } else {
                setError(res.data.message || 'Failed to fetch users');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout title="Registered Users">
            <div className="admin-table-card">
                {loading ? (
                    <p>Loading users...</p>
                ) : error ? (
                    <p className="text-red-500 font-semibold">{error}</p>
                ) : users.length === 0 ? (
                    <p>No registered users found.</p>
                ) : (
                    <div className="table-responsive">
                        <table className="admin-table w-full text-left">
                            <thead>
                                <tr>
                                    <th>Registration ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Registered At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((u) => (
                                    <tr key={u._id}>
                                        <td className="font-semibold text-blue-800">{u.registrationId}</td>
                                        <td>{u.name}</td>
                                        <td>{u.email}</td>
                                        <td>{u.mobile}</td>
                                        <td>{new Date(u.createdAt).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
