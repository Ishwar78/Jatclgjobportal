import React from'react';
import logo from'../assets/college-logo.png';
export default function Brand({compact=false}){
    return <div className="brand">
        <img src={logo}/><div>
            <b>ALL INDIA JAT HEROES MEMORIAL COLLEGE</b>
            {!compact&&<span>(Affiliated to Maharshi Dayanand University, Rohtak)</span>}
            </div>
            </div>
            }