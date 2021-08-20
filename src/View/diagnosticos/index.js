import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import firebase from "firebase";

import SideBar from "../../Components/sidebar";

const STATUS_COLOR_OK = 'lightgreen';
const STATUS_COLOR_EDIT = 'lightblue';
const STATUS_COLOR_REMOVE = 'orange';
const STATUS_COLOR_ERROR = 'orangered';
const STATUS_COLOR_DEFAULT = '#f7f7f7';

const STATUS = {
    OK: "ok",
    EDIT: "edit",
    REMOVE: "remove",
    ERRO: "erro"
}

const COLLECTION = 'diagnosticos';

const MSG_CARREGANDO = 'Carregando diagnósticos';
const MSG_CARREGADO = 'Diagnósticos carregados';
const MSG_CADASTRADO = 'Diagnóstico cadastrado com sucesso!';
const MSG_EDITADO = 'Diagnóstico editado com sucesso!';
const MSG_REMOVIDO = 'Diagnóstico removido com sucesso!';

const MSG_CADASTRADO_ERRO = 'Não foi possível cadastrar o Diagnóstico';
const MSG_EDITADO_ERRO = 'Não foi possível editar o Diagnóstico';
const MSG_REMOVIDO_ERRO = 'Não foi possível remover o Diagnóstico';

function Diagnosticos() {

    const [loadMode, setLoadMode] = useState(0);
    const [index, setIndex] = useState(0);
    const [msgStatus, setMsgStatus] = useState();

    const [diagnosticos, setDiagnosticos] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [dataDiagnostico, setDataDiagnostico] = useState();
    const [paciente, setPaciente] = useState();
    const [reclamacao, setReclamacao] = useState();
    const [testeRealizado, setTesteRealizado] = useState();
    const [diagnostico, setDiagnostico] = useState();

    const db = firebase.firestore();

    var listaDiagnosticos = [];
    var listaPacientes = [];

    useEffect(() => {
        if(loadMode == 0)
            updateStatus(STATUS.OK, MSG_CARREGANDO);

        firebase.firestore().collection('pacientes').get().then(async (res) => {
            await res.docs.forEach(doc => {
                listaPacientes.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setPacientes(listaPacientes);
        })

        firebase.firestore().collection(COLLECTION).get().then(async (res) => {
            await res.docs.forEach(doc => {
                listaDiagnosticos.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setDiagnosticos(listaDiagnosticos);
            if(loadMode == 0)
                updateStatus(STATUS.OK, MSG_CARREGADO);
        })

    }, [diagnosticos.length])

    function registrar() {

        if (loadMode == 0) {
            db.collection(COLLECTION).add({
                dataDiagnostico: dataDiagnostico,
                paciente: paciente.nomePaciente,
                reclamacao: reclamacao,
                testeRealizado: testeRealizado,
                diagnostico: diagnostico
            }).then(() => {
                setLoadMode(1)
                diagnosticos.push({
                    dataDiagnostico: dataDiagnostico,
                    paciente: paciente.nomePaciente,
                    reclamacao: reclamacao,
                    testeRealizado: testeRealizado,
                    diagnostico: diagnostico
                })
                updateStatus(STATUS.OK, MSG_CADASTRADO);
            }
            ).catch((e) => {
                console.log(MSG_CADASTRADO_ERRO);
                console.log(e);
                updateStatus(STATUS.ERRO, MSG_CADASTRADO_ERRO);
            })
        } else {
            db.collection(COLLECTION).doc(diagnosticos[index].id).update({
                dataDiagnostico: dataDiagnostico,
                paciente: paciente,
                reclamacao: reclamacao,
                testeRealizado: testeRealizado,
                diagnostico: diagnostico
            }).then(() => {
                diagnosticos[index].dataDiagnostico = dataDiagnostico;
                diagnosticos[index].paciente = paciente;
                diagnosticos[index].reclamacao = reclamacao;
                diagnosticos[index].testeRealizado = testeRealizado;
                diagnosticos[index].diagnostico = diagnostico;
                updateStatus(STATUS.EDIT, MSG_EDITADO);
            }).catch((e) => {
                console.log(MSG_EDITADO_ERRO);
                console.log(e);
                updateStatus(STATUS.ERRO, MSG_EDITADO_ERRO);
            })
        }
        clearMode();
    }


    function editar(value) {

        clearMode();

        let index = value.target.parentNode.parentNode.parentNode.rowIndex;
        setIndex(--index);
        setLoadMode(1);

        document.getElementById("dataDiagnostico").value = diagnosticos[index].dataDiagnostico;
        document.getElementById("paciente").value = diagnosticos[index].paciente;
        document.getElementById("reclamacao").value = diagnosticos[index].reclamacao;
        document.getElementById("testeRealizado").value = diagnosticos[index].testeRealizado;
        document.getElementById("diagnostico").value = diagnosticos[index].diagnostico;

        setDataDiagnostico(diagnosticos[index].dataDiagnostico);
        setPaciente(diagnosticos[index].paciente);
        setReclamacao(diagnosticos[index].reclamacao);
        setTesteRealizado(diagnosticos[index].testeRealizado);
        setDiagnostico(diagnosticos[index].diagnostico);

    }

    function deletar(value) {
        setLoadMode(1)

        let index = value.target.parentNode.parentNode.parentNode.rowIndex;
        setIndex(--index);

        db.collection(COLLECTION).doc(diagnosticos[index].id).delete()
            .then(() => {
                diagnosticos.splice(index, 1);
                updateStatus(STATUS.REMOVE, MSG_REMOVIDO);
            }).catch((e) => {
                console.log(MSG_REMOVIDO_ERRO);
                console.log(e);
                updateStatus(STATUS.ERRO, MSG_REMOVIDO_ERRO);
            })

    }

    function clearMode() {
        setIndex(0);
        setLoadMode(0);

        setDataDiagnostico("");
        setPaciente("");
        setReclamacao("");
        setTesteRealizado("");
        setDiagnostico("");

        document.getElementById("dataDiagnostico").value = "";
        document.getElementById("paciente").value = "";
        document.getElementById("reclamacao").value = "";
        document.getElementById("testeRealizado").value = "";
        document.getElementById("diagnostico").value = "";
    }

    function updateStatus(type, text) {
        console.log(text);

        setStatusColor(type);

        setMsgStatus(text)
        setTimeout(function () {
            setMsgStatus(null);
            setStatusColor();
        }, 3000);
    }

    function setStatusColor(type) {
        switch (type) {
            case STATUS.OK:
                document.getElementById("divStatus").style.backgroundColor = STATUS_COLOR_OK;
                break;
            case STATUS.EDIT:
                document.getElementById("divStatus").style.backgroundColor = STATUS_COLOR_EDIT;
                break;
            case STATUS.REMOVE:
                document.getElementById("divStatus").style.backgroundColor = STATUS_COLOR_REMOVE;
                break;
            case STATUS.ERRO:
                document.getElementById("divStatus").style.backgroundColor = STATUS_COLOR_ERROR;
                break;
            default:
                document.getElementById("divStatus").style.backgroundColor = STATUS_COLOR_DEFAULT;
                ;
                break;
        }
    }

    return (
        <>
            <SideBar />

            <div id="container" className="container justify-content-center col-12">
            <div id="divStatus" className="text-center p-4 my-5"><span><strong>{msgStatus}</strong></span></div>
                <form className="my-5">
                    <div className="form-group m-5">
                        <h2 className="text-center">Tela de Diagnósticos</h2>

                        <label className="" for="dataDiagnostico">Data Diagnóstico</label>
                        <input id="dataDiagnostico" onChange={(e) => setDataDiagnostico(e.target.value)} className="form-control my-2" type="date" />

                        <label for="pacientes">Paciente</label>
                        <select onChange={(e) => setPaciente(e.target.value)} className="form-control my-2" name="paciente" id="pacientes">
                            <option defaultValue>Selecione um Paciente</option>
                            {
                                pacientes.map(item => {
                                    return(
                                        <option key={item.id}>{item.nomePaciente}</option>
                                    )
                                })
                            }
                        </select>

                        <lable for="reclamacaoPaciente">Reclamações do Paciente</lable>
                        <textarea id="reclamacao" onChange={(e) => setReclamacao(e.target.value)} className="form-control rounded-0 my-2" rows="3"></textarea>

                        <lable for="testeRealizado">Testes Realizados</lable>
                        <textarea id="testeRealizado" onChange={(e) => setTesteRealizado(e.target.value)} className="form-control rounded-0 my-2" rows="3"></textarea>

                        <lable for="diagnostico">Diagnóstico</lable>
                        <textarea id="diagnostico" onChange={(e) => setDiagnostico(e.target.value)} className="form-control rounded-0 my-2" rows="3"></textarea>
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