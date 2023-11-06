import { Link } from "react-router-dom";
import Signup from '../routes/signup';
import Dashboard from '../routes/dashboard';
import React from "react";
import './nav.css'
interface DefaultLayoutProps{
    children: React.ReactNode,
}
export default function DefaultLayout({children}:DefaultLayoutProps){
    return(
        <>
        <header>
            <nav className="box">
                <ul className="componet">
                    <li>
                        <Link style={{color:'white',fontSize:'25px', textDecoration:'none'}}  to="/">inicio</Link>
                    </li>
                    <li>
                        <Link style={{color:'white',fontSize:'25px', textDecoration:'none'}}  to="/signup">Registro</Link>
                    </li>
                    <li>
                        <Link style={{color:'white',fontSize:'25px', textDecoration:'none'}}  to="/dashboard">login</Link>
                    </li>
                </ul>
            </nav>
        </header>
        <br />
        <br />
        <br />
        <br />
        <main style={{display:'flex', justifyContent:'center'}}>
            {children}
        </main>
    </>
    )
    
}