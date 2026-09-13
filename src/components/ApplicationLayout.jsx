import React from 'react'; 
import { Link, useLocation } from 'react-router-dom'; 
import './ApplicationLayout.css'; 
const steps = [['Personal', '/application/personal'], ['References', '/application/references'], ['Education', '/application/education'], ['Experience', '/application/experience'], ['Academic Score', '/application/academic-score'], ['Responsibilities', '/application/responsibilities'], ['Research', '/application/research'], ['Documents', '/application/documents'], ['Payment', '/application/payment'], ['Declaration', '/application/declaration'], ['Preview', '/application/preview']]; 
export default function ApplicationLayout({ title, children }) { const l = useLocation();
     return 
     <div className="application-shell">
        <header className="app-head">
            <h2>AIJHM College Recruitment Application</h2>
        <span>Save progress at every step</span>
        </header>
        <div className="app-body">
            <aside className="app-steps">{steps.map((s, i) => <Link key={s[0]} className={l.pathname === s[1] ? 'active' : ''} to={s[1]}><em>{i + 1}</em>{s[0]}</Link>)}</aside>
            <main className="app-content">
                <div className="app-title">
                    <p>Step-by-step Application</p>
                    <h1>{title}</h1></div>{children}</main>
                    </div>
                    </div> 
                    }