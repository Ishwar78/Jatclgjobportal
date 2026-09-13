import React from'react';
import{Link}from'react-router-dom';
import{AdminLayout}from'../../components/Layout';
import'./Admin.css';
export default function AdminJobs()
{
    return <AdminLayout title="Jobs Management">
        <div className="admin-table-card">
            <div className="admin-toolbar">
                <b>Active Recruitment Posts</b>
                <Link className="btn btn-primary" to="/admin/jobs/create">Create New Job</Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Department</th>
                            <th>Vacancies</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[['Principal','Administration','1','Open'],['Assistant Professor','Various Subjects','8','Open'],['Librarian','Library','1','Closing Soon'],['Clerk','Administration','2','Open']].map(x=><tr key={x[0]}>{x.map(y=><td key={y}>{y}</td>)}<td>Edit</td></tr>)}
                    </tbody>
                </table>
            </div>
        </AdminLayout>}