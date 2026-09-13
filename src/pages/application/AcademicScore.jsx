import React,{useState}from'react';
import{useNavigate}from'react-router-dom';
import ApplicationLayout from'../../components/ApplicationLayout';
import'./AcademicScore.css';
export default function AcademicScore(){const n=useNavigate(),[m,setM]=useState({masters:'',graduation:'',senior:'',matric:''});
const score=Object.values(m).reduce((a,v)=>a+(Math.max(0,Number(v)-55)*.2),0);
return <ApplicationLayout title="Academic Score Calculator">
    <div className="form-card academic-score-page">
        <p className="section-note">
            Enter percentage values. The preview score updates automatically for a smooth recruitment workflow.</p>
            <div className="form-grid">{Object.entries({
                masters:"Master's Percentage",graduation:'Graduation Percentage',senior:'10+2 Percentage',matric:'Matriculation Percentage'}).map(([k,l])=>
                <div key={k}>
                    <label className="label">{l}</label>
                    <input className="form-control" type="number" min="0" max="100" value={m[k]} onChange={e=>setM({...m,[k]:e.target.value})}/></div>)}
                    <div className="score-box full">Live Academic Score: {score.toFixed(2)}</div>
                    </div><div className="form-actions">
                        <button className="btn btn-outline">Save Draft</button>
                        <button className="btn btn-primary" onClick={()=>n('/application/responsibilities')}>Continue</button>
                        </div>
                        </div>
                        </ApplicationLayout>
                        }