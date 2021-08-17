import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import firebase from "firebase";

import SideBar from "../../Components/sidebar";

function Diagnosticos() {

    return (
        <>
            <SideBar />

            <div id="container" className="container justify-content-center col-12">
                <form className="my-5">
                    <div className="form-group m-5">
                        <h2 className="text-center">Tela de Diagnósticos</h2>

                        <label className="" for="dataDiagnostico">Data Diagnóstico</label>
                        <input id="dataDiagnostico" className="form-control my-2" type="date" />

                        <label for="pacientes">Paciente</label>
                        <select className="form-control my-2" name="paciente" id="pacientes">
                        </select>

                        <lable for="reclamacaoPaciente">Reclamações do Paciente</lable>
                        <textarea id="reclamacao" className="form-control rounded-0 my-2" rows="3"></textarea>

                        <lable for="testeRealizado">Testes Realizados</lable>
                        <textarea id="testes" className="form-control rounded-0 my-2" rows="3"></textarea>

                        <lable for="diagnostico">Diagnóstico</lable>
                        <textarea id="diagnostico" className="form-control rounded-0 my-2" rows="3"></textarea>
                    </div>

                    <button id="btnDiagnostico" type="button" className="btn btn-login my-2"
                        /*onClick={}*/>Cadastrar</button>
                </form>

                <table id="diagnosticosTab" className="table table-hover">
                    <thead>
                        <tr>
                            <th>Paciente</th>
                            <th>Reclamações</th>
                            <th>Data Diagnóstico</th>
                            <th>Diagnóstico</th>
                            <th className="text-center">Opções</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Diagnosticos;