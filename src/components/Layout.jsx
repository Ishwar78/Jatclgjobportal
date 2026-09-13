import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Brand from './Brand';
import { FaHome, FaFileAlt, FaUser, FaBell, FaSignOutAlt, FaUsers, FaInfoCircle } from 'react-icons/fa';
import './Layout.css';

export function PublicLayout({ children }) {
    return (
        <div className="public-shell">
            <header className="public-head">
                <Brand />
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/instructions">Instructions</Link>
                    <Link to="/login">Login</Link>
                </nav>
            </header>
            {children}
        </div>
    );
}

export function UserLayout({ title, children }) {
    const n = useNavigate();
    return (
        <div className="dash-shell">
            <aside className="side user-side">
                <Brand compact />
                <Link to="/user/dashboard"><FaHome /> Dashboard</Link>
                <Link to="/application/personal"><FaFileAlt /> New Application</Link>
                <Link to="/user/applications"><FaFileAlt /> My Applications</Link>
                <Link to="/user/notifications"><FaBell /> Notifications</Link>
                <Link to="/user/profile"><FaUser /> Profile</Link>
                <button onClick={() => n('/')}><FaSignOutAlt /> Logout</button>
            </aside>
            <main className="dash-main">
                <h1>{title}</h1>
                {children}
            </main>
        </div>
    );
}

export function AdminLayout({ title, children }) {
    const n = useNavigate();
    return (
        <div className="dash-shell">
            <aside className="side admin-side">
                <Brand compact />
                {/* Kept only Users and Applications as requested by user */}
                <Link to="/admin/users"><FaUsers style={{marginRight: '8px', display: 'inline-block'}} /> Users</Link>
                <Link to="/admin/applications"><FaFileAlt style={{marginRight: '8px', display: 'inline-block'}} /> Applications</Link>
                <Link to="/admin/instructions"><FaInfoCircle style={{marginRight: '8px', display: 'inline-block'}} /> Instructions</Link>
                
                <button onClick={() => {
                    localStorage.removeItem('adminAuth');
                    n('/admin');
                }} style={{marginTop: 'auto'}}>
                    <FaSignOutAlt style={{marginRight: '8px', display: 'inline-block'}} /> Logout
                </button>
            </aside>
            <main className="dash-main">
                <h1>{title}</h1>
                {children}
            </main>
        </div>
    );
}