import React from "react";
import { Link } from "react-router-dom";

import "./sidebar.css";

function SideBar() {

    function hide(){

    }
    
    return(<div id="sidebar" className="sidebar">
        <div className="logo_content">
            <div className="logo">
                <span id="fisonet" className="material-icons mx-2">spa</span>
                <div id="logo_name" className="logo_name">FisioNet</div>
            </div>
            <span id="btn" onClick={hide} className="material-icons mx-2">menu</span>
        </div>
        <ul className="nav_list">
            <li>
                <Link to="/pacientes">
                    <span id="pacientes" className="material-icons mx-2">person</span>
                    <span className="links_name">Pacientes</span>
                </Link>
                <span className="tooltip">Pacientes</span>
            </li>

            <li>
                <Link to="/exames">
                    <span id="exames" className="material-icons mx-2">biotech</span>
                    <span className="links_name">Exames</span>
                </Link>
                <span className="tooltip">Pacientes</span>
            </li>

            <li>
                <Link to="/diagnosticos">
                    <span id="diagnosticos" className="material-icons mx-2">sick</span>
                    <span className="links_name">Diagnósticos</span>
                </Link>
                <span className="tooltip">Pacientes</span>
            </li>

            <li>
                <Link to="/tratamentos">
                    <span id="tratamento" className="material-icons mx-2">settings_backup_restore</span>
                    <span className="links_name">Tratamentos</span>
                </Link>
                <span className="tooltip">Pacientes</span>
            </li>
        </ul>
    </div>
    );
}

export default SideBar;