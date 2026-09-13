import React from'react';
import{AdminLayout}from'../../components/Layout';
import'./Admin.css';
export default function AdminDashboard(){
    return <AdminLayout title="Admin Dashboard">
        <div className="admin-stats">{[['Total Applications','1,248'],['Submitted','875'],['Under Review','125'],['Shortlisted','48']].map(x=>
            <div className="admin-stat" key={x[0]}><p>{x[0]}</p><b>{x[1]}</b></div>)}</div>
            <div className="admin-grid">
                <div className="admin-card">
                    <h3>Applications Trend</h3>
                    <div className="chart-bars">{[40,75,55,100,70,130,110].map((h,i)=><i key={i} style={{height:h}}/>)}</div>
                    </div>
                    <div className="admin-card">
                        <h3>Quick Actions</h3>
                        <p>Create Job</p>
                        <p>Verify Documents</p>
                        <p>Review Payments</p>
                        <p>Publish Shortlist</p>
                        </div>
                        </div>
                        </AdminLayout>
                        }