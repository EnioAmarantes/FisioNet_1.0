import React from "react";
import { Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import { Confirm } from 'react-st-modal';

import "./sidebar.css";

function SideBar() {

    const dispatch = useDispatch();

    function hide(){

    }

    async function logout(){
        const result = await Confirm('Deseja realmente fazer LogOut do sistema?', 'LOGOUT');

        if(result)
            dispatch({type: 'LOGOUT'});
    }
    
    return(
    <div id="sidebar" className="sidebar">
        <div className="logo_content">
            <div className="logo">
                <span id="fisonet" className="material-icons mx-2">spa</span>
                <div id="logo_name" className="logo_name">FisioNet</div>
            </div>
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
                <span className="tooltip">Exames</span>
            </li>

            <li>
                <Link to="/diagnosticos">
                    <span id="diagnosticos" className="material-icons mx-2">sick</span>
                    <span className="links_name">Diagnósticos</span>
                </Link>
                <span className="tooltip">Diagnósticos</span>
            </li>

            <li>
                <Link to="/tratamentos">
                    <span id="tratamento" className="material-icons mx-2">settings_backup_restore</span>
                    <span className="links_name">Tratamentos</span>
                </Link>
                <span className="tooltip">Tratamentos</span>
            </li>

            <li>
                <Link to="/artigoNovo">
                    <span id="artigosNovo" className="material-icons mx-2">feed</span>
                    <span className="links_name">Artigos</span>
                </Link>
                <span className="tooltip">Artigos</span>
            </li>

            <li>
                <Link onClick={logout}>
                    <span id="logout" className="material-icons mx-2">logout</span>
                    <span className="links_name">LogOut</span>
                </Link>
                <span className="tooltip">LogOut</span>
            </li>
        </ul>
    </div>
    );
}

export default SideBar;