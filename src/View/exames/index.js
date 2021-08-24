import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { Redirect } from "react-router";
import { useSelector } from "react-redux";

import EXAME_PADRAO from "../../Components/images/exames/exame-001.jpg";

import SideBar from "../../Components/sidebar";
import EditButton from "../../Components/buttons/editButton";
import DeleteButton from "../../Components/buttons/deleteButton";
import ViewButton from "../../Components/buttons/viewButton";

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

const COLLECTION = 'exames';

const MSG_CARREGANDO = 'Carregando exames';
const MSG_CARREGADO = 'Exames carregados';
const MSG_CADASTRADO = 'Exame cadastrado com sucesso!';
const MSG_EDITADO = 'Exame editado com sucesso!';
const MSG_REMOVIDO = 'Exame removido com sucesso!';

const MSG_CADASTRADO_ERRO = 'Não foi possível cadastrar o Exame';
const MSG_EDITADO_ERRO = 'Não foi possível editar o Exame';
const MSG_REMOVIDO_ERRO = 'Não foi possível remover o Exame';

function Exames() {
    const [loadMode, setLoadMode] = useState(0);
    const [index, setIndex] = useState(0);
    const [msgStatus, setMsgStatus] = useState();

    const [exames, setExames] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [tipoExame, setTipoExame] = useState();
    const [dataExame, setDataExame] = useState();
    const [paciente, setPaciente] = useState();
    const [exameImagem, setExameImagem] = useState();
    const [urlImagem, setUrlImagem] = useState();
    const [urlLens, setUrlLens] = useState();


    const imgOpt = {
        types: [
            {
                description: 'Images',
                accept: {
                    'image/*': ['.png', '.gif', '.jpeg', '.jpg']
                }
            }
        ],
        excludeAcceptAllOption: true,
        multiple: false
    };

    const db = firebase.firestore();
    const storage = firebase.storage();

    var listaPacientes = [];
    var listaExames = [];

    useEffect(() => {
        if (loadMode == 0)
            updateStatus(STATUS.OK, MSG_CARREGANDO);

        firebase.firestore().collection('pacientes').get().then(async (res) => {
            await res.docs.forEach(doc => {
                listaPacientes.push({
                    id: doc.id,
                    ...doc.data()
                });
                setPacientes(listaPacientes);
            })
        })

        firebase.firestore().collection(COLLECTION).get().then(async (res) => {
            await res.docs.forEach(doc => {
                listaExames.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setExames(listaExames);
            if (loadMode == 0)
                updateStatus(STATUS.OK, MSG_CARREGADO);
        })
    }, [exames.length])

    async function tirarFoto() {
        let files = await window.showOpenFilePicker(imgOpt);

        let newFoto = await files[0].getFile();
        setExameImagem(await files[0].getFile());

        let reader = new FileReader();
        reader.readAsDataURL(newFoto);
        reader.onload = function (event) {
            document.getElementById("imgExame").src = event.target.result;
        }
    }

    function registrar() {

        if (loadMode == 0) {
            if (exameImagem)
                storage.ref(`imagens/exame/${exameImagem.name}`).put(exameImagem).then(() => {
                    db.collection(COLLECTION).add({
                        tipoExame: tipoExame,
                        paciente: paciente,
                        dataExame: dataExame,
                        exameImagem: exameImagem.name
                    }).then(() => {
                        setLoadMode(1)
                        exames.push({
                            tipoExame: tipoExame,
                            paciente: paciente,
                            dataExame: dataExame,
                            exameImagem: exameImagem.name
                        })
                        updateStatus(STATUS.OK, MSG_CADASTRADO);
                    }
                    ).catch((e) => {
                        console.log(MSG_CADASTRADO_ERRO);
                        console.log(e);
                        updateStatus(STATUS.ERRO, MSG_CADASTRADO_ERRO);
                    })
                })

        } else {
            if (exameImagem)
                storage.ref(`imagens/exame/${exameImagem.name}`).put(exameImagem);

            db.collection(COLLECTION).doc(exames[index].id).update({
                tipoExame: tipoExame,
                paciente: paciente,
                dataExame: dataExame,
                exameImagem: exameImagem
            }).then(() => {
                exames[index].tipoExame = tipoExame;
                exames[index].paciente = paciente;
                exames[index].dataExame = dataExame;
                exames[index].exameImagem = exameImagem;
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

        firebase.storage().ref(`imagens/exame/${exames[index].exameImagem}`).getDownloadURL().then(url => {
            setUrlImagem(url);
        })

        document.getElementById("tipoExame").value = exames[index].tipoExame;
        document.getElementById("pacientesList").value = exames[index].paciente;
        document.getElementById("dataExame").value = exames[index].dataExame;
        document.getElementById("imgExame").src = urlImagem;

        setTipoExame(exames[index].tipoExame);
        setPaciente(exames[index].paciente);
        setDataExame(exames[index].dataExame);
        setExameImagem(exames[index].exameImagem);

    }

    function deletar(value) {
        setLoadMode(1)

        let index = value.target.parentNode.parentNode.parentNode.rowIndex;
        setIndex(--index);

        storage.ref(`imagens/exame/${exames[index].avatar.name}`).delete();

        db.collection(COLLECTION).doc(exames[index].id).delete()
            .then(() => {
                exames.splice(index, 1);
                updateStatus(STATUS.REMOVE, MSG_REMOVIDO);
            }).catch((e) => {
                console.log(MSG_REMOVIDO_ERRO);
                console.log(e);
                updateStatus(STATUS.ERRO, MSG_REMOVIDO_ERRO);
            })

        clearMode();

    }

    function clearMode() {
        setIndex(0);
        setLoadMode(0);

        setTipoExame("");
        setPaciente("");
        setDataExame("");
        setExameImagem("");

        document.getElementById("tipoExame").value = "";
        document.getElementById("pacientesList").value = "";
        document.getElementById("dataExame").value = "";
        document.getElementById("imgExame").src = EXAME_PADRAO;
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

    function look(value) {
        let index = value.target.parentNode.parentNode.parentNode.rowIndex;
        setIndex(--index);

        firebase.storage().ref(`imagens/exame/${exames[index].exameImagem}`).getDownloadURL().then(url => {
            setUrlLens(url);
        })

        document.getElementById("btnModal").click();

        imageZoom("zoomExame", "exameDetalhe");
    }

    function imageZoom(imgID, resultID) {
        var img, lens, result, cx, cy;
        img = document.getElementById(imgID);
        result = document.getElementById(resultID);

        lens = document.createElement("DIV");
        lens.setAttribute("class", "img-zoom-lens");

        img.parentElement.insertBefore(lens, img);

        cx = result.offsetWidth / lens.offsetWidth;
        cy = result.offsetHeight / lens.offsetHeight;

        result.style.backgroundImage = "url('" + img.src + "')";
        result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";

        lens.addEventListener("mousemove", moveLens);
        img.addEventListener("mousemove", moveLens);

        lens.addEventListener("touchmove", moveLens);
        img.addEventListener("touchmove", moveLens);
        function moveLens(e) {
            var pos, x, y;

            e.preventDefault();

            pos = getCursorPos(e);

            x = pos.x - (lens.offsetWidth / 2);
            y = pos.y - (lens.offsetHeight / 2);

            if (x > img.width - lens.offsetWidth) { x = img.width - lens.offsetWidth; }
            if (x < 0) { x = 0; }
            if (y > img.height - lens.offsetHeight) { y = img.height - lens.offsetHeight; }
            if (y < 0) { y = 0; }

            lens.style.left = x + "px";
            lens.style.top = y + "px";

            result.style.backgroundPosition = "-" + (x * (result.offsetWidth / lens.offsetWidth / 3)) + "px -" + (y * (result.offsetHeight / lens.offsetHeight / 3)) + "px";
        }
        function getCursorPos(e) {
            var a, x = 0, y = 0;
            e = e || window.event;

            a = img.getBoundingClientRect();

            x = e.pageX - a.left;
            y = e.pageY - a.top;

            x = x - window.pageXOffset;
            y = y - window.pageYOffset;
            return { x: x, y: y };
        }
    }

    return (
        <>
            {
                useSelector(state => state.userLoged) > 0 ?
                    <>
                        <SideBar />

                        <div id="container" className="container justify-content-center col-12">
                            <div id="divStatus" className="text-center p-4 my-5"><span><strong>{msgStatus}</strong></span></div>
                            <form className="my-5">
                                <div className="form-group m-5">
                                    <h2 className="text-center">Cadastro de Exames</h2>
                                    <div className="row my-3">
                                        <div className="col-md-4 col-xs-12">
                                            <div>
                                                <img id="imgExame" className="card-img" src={urlImagem ? urlImagem : EXAME_PADRAO}
                                                    alt="Exames Aqui" />
                                                <button className="btn btn-login" type="button" onClick={tirarFoto}>Registro do
                                                    Exame</button>
                                            </div>
                                        </div>
                                        <div className="block col-8">
                                            <input id="tipoExame" onChange={(e) => setTipoExame(e.target.value)} className="form-control my-2" type="text" placeholder="Tipo de Exame" />
                                            <label for="pacientesList">Paciente</label>
                                            <select id="pacientesList" value={paciente} onChange={(e) => setPaciente(e.target.value)} className="form-control my-2">
                                                <option defaultValue>Selecione um Paciente</option>
                                                {
                                                    pacientes.map(item => {
                                                        return (
                                                            <option key={item.id} value={item.nomePaciente}>{item.nomePaciente}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <label className="" for="dataExame">Data do Exame</label>
                                            <input id="dataExame" onChange={(e) => setDataExame(e.target.value)} className="form-control my-2" type="date" />
                                        </div>
                                    </div>
                                </div>
                                <button id="btnExame" type="button" className="btn btn-login my-2" onClick={registrar}>{loadMode ? "Editar" : "Cadastrar"}</button>
                            </form>

                            <table id="examesTab" className="table table-hover">
                                <thead key="thead">
                                    <tr>
                                        <th>Tipo de Exame</th>
                                        <th>Paciente</th>
                                        <th>Data do Exame</th>
                                        <th className="text-center">Opções</th>
                                    </tr>
                                </thead>

                                <tbody key="tbody">
                                    {
                                        exames.map(item => {
                                            return (<tr key={item.id}>
                                                <th scope="row">{item.tipoExame}</th>
                                                <th>{item.paciente}</th>
                                                <th>{item.dataExame}</th>
                                                <th className="text-center">
                                                    <span onClick={editar}><EditButton /></span>
                                                    <span onClick={deletar}><DeleteButton /></span>
                                                    <span onClick={look}><ViewButton /></span>
                                                </th>
                                            </tr>)
                                        })
                                    }
                                </tbody>
                            </table>

                        </div>

                        <div class="container">
                            <button id="btnModal" className="hidden" type="button" data-toggle="modal" data-target="#myModal">Abrir Modal</button>
                            <div id="myModal" class="modal fade" role="dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h2>Detalhes do Exame</h2>
                                    </div>

                                    <div class="modal-body mx-auto">
                                        <div class="img-zoom-container">
                                            <img id="zoomExame" src={urlLens} alt="Exame em evidência" width="300" height="240" />
                                            <div id="exameDetalhe" src={urlLens} class="img-zoom-result my-auto">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="modal-footer">

                                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
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

export default Exames;