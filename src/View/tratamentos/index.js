import { useEffect, useState } from "react";
import firebase from "firebase";
import { Redirect } from "react-router";
import { useSelector } from "react-redux";

import SideBar from "../../Components/sidebar";
import EditButton from "../../Components/buttons/editButton";
import DeleteButton from "../../Components/buttons/deleteButton";

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

const COLLECTION = 'tratamentos';

const MSG_CARREGANDO = 'Carregando tratamentos';
const MSG_CARREGADO = 'Tratamentos carregados';
const MSG_CADASTRADO = 'Tratamento cadastrado com sucesso!';
const MSG_EDITADO = 'Tratamento editado com sucesso!';
const MSG_REMOVIDO = 'Tratamento removido com sucesso!';

const MSG_CADASTRADO_ERRO = 'Não foi possível cadastrar o Tratamento';
const MSG_EDITADO_ERRO = 'Não foi possível editar o Tratamento';
const MSG_REMOVIDO_ERRO = 'Não foi possível remover o Tratamento';


function Tratamentos() {

    const [loadMode, setLoadMode] = useState(0);
    const [index, setIndex] = useState(0);
    const [msgStatus, setMsgStatus] = useState();

    const [tratamentos, setTratamentos] = useState([]);
    const [nomeTratamento, setNomeTratamento] = useState();
    const [indicacao, setIndicacao] = useState();
    const [descTratamento, setDescTratamento] = useState();

    const db = firebase.firestore();

    var listaTratamentos = [];

    useEffect(() => {
        if (loadMode == 0)
            updateStatus(STATUS.OK, MSG_CARREGANDO);

        firebase.firestore().collection(COLLECTION).get().then(async (res) => {
            await res.docs.forEach(doc => {
                listaTratamentos.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setTratamentos(listaTratamentos);
            if (loadMode == 0)
                updateStatus(STATUS.OK, MSG_CARREGADO);
        })

    }, [tratamentos.length])

    function registrar() {

        if (loadMode == 0) {
            db.collection(COLLECTION).add({
                nomeTratamento: nomeTratamento,
                indicacao: indicacao,
                descTratamento: descTratamento
            }).then(() => {
                setLoadMode(1)
                tratamentos.push({
                    nomeTratamento: nomeTratamento,
                    indicacao: indicacao,
                    descTratamento: descTratamento
                })
                updateStatus(STATUS.OK, MSG_CADASTRADO);
            }
            ).catch((e) => {
                console.log(MSG_CADASTRADO_ERRO);
                console.log(e);
                updateStatus(STATUS.ERRO, MSG_CADASTRADO_ERRO);
            })
        } else {
            db.collection(COLLECTION).doc(tratamentos[index].id).update({
                nomeTratamento: nomeTratamento,
                indicacao: indicacao,
                descTratamento: descTratamento
            }).then(() => {
                tratamentos[index].nomeTratamento = nomeTratamento;
                tratamentos[index].indicacao = indicacao;
                tratamentos[index].descTratamento = descTratamento;
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

        document.getElementById("nomeTratamento").value = tratamentos[index].nomeTratamento;
        document.getElementById("indicacao").value = tratamentos[index].indicacao;
        document.getElementById("descTratamento").value = tratamentos[index].descTratamento;

        setNomeTratamento(tratamentos[index].nomeTratamento);
        setIndicacao(tratamentos[index].indicacao);
        setDescTratamento(tratamentos[index].descTratamento);

    }

    function deletar(value) {
        setLoadMode(1)

        let index = value.target.parentNode.parentNode.parentNode.rowIndex;
        setIndex(--index);

        db.collection(COLLECTION).doc(tratamentos[index].id).delete()
            .then(() => {
                tratamentos.splice(index, 1);
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

        setNomeTratamento("");
        setIndicacao("");
        setDescTratamento("");

        document.getElementById("nomeTratamento").value = "";
        document.getElementById("indicacao").value = "";
        document.getElementById("descTratamento").value = "";
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
        if(document.getElementById("divStatus") != null){
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
    }

    return (
        <>
            {
                useSelector(state => state.userLoged) > 0 ?
                    <>
                        <SideBar />

                        <div id="row" className="container justify-content-center">
                            <div id="divStatus" className="text-center p-4 my-5"><span><strong>{msgStatus}</strong></span></div>
                            <form className="my-5">
                                <div className="form-group m-5">
                                    <h2 className="text-center">Tela de Tratamentos</h2>

                                    <input id="nomeTratamento" onChange={(e) => setNomeTratamento(e.target.value)} className="form-control my-2" type="text" placeholder="Tratamento" />

                                    <input id="indicacao" onChange={(e) => setIndicacao(e.target.value)} className="form-control my-2" type="text" placeholder="Indicação" />

                                    <label htmlFor="descTratamento">Descrição do Tratamento</label>
                                    <textarea id="descTratamento" onChange={(e) => setDescTratamento(e.target.value)} className="form-control rounded-0 my-2" rows="3"></textarea>

                                </div>

                                <button id="btnTratamento" type="button" className="btn btn-login my-2"
                                    onClick={registrar}>{loadMode == 0 ? "Cadastrar" : "Editar"}</button>
                            </form>

                            <table id="tratamentosTab" className="table table-hover">
                                <thead key="thead">
                                    <tr>
                                        <th scope="col">Tratamento</th>
                                        <th scope="col">Indicação</th>
                                        <th scope="col">Descrição</th>
                                        <th scope="col" className="text-center">Opções</th>
                                    </tr>
                                </thead>
                                <tbody key="tbody">
                                    {
                                        tratamentos.map(item => {
                                            return (<tr key={item.id}>
                                                <th scope="row">{item.nomeTratamento}</th>
                                                <th>{item.indicacao}</th>
                                                <th>{item.descTratamento}</th>
                                                <th className="text-center">
                                                    <span onClick={editar}><EditButton /></span>
                                                    <span onClick={deletar}><DeleteButton /></span>
                                                </th>
                                            </tr>)
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>

                    </>
                    :
                    <>
                        <Redirect to="home" />
                    </>
            }
        </>
    );
}

export default Tratamentos;