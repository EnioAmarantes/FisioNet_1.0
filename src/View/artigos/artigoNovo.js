import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { Confirm } from 'react-st-modal';

import SideBar from "../../Components/sidebar";
import EditButton from "../../Components/buttons/editButton";
import DeleteButton from "../../Components/buttons/deleteButton";
import ARTIGO_PADRAO from "../../Components/images/artigos/artigo1.jpg";

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

const COLLECTION = 'artigos';

const MSG_CARREGANDO = 'Carregando artigos';
const MSG_CARREGADO = 'Artigos carregados';
const MSG_CADASTRADO = 'Artigo cadastrado com sucesso!';
const MSG_EDITADO = 'Artigo editado com sucesso!';
const MSG_REMOVIDO = 'Artigo removido com sucesso!';

const MSG_CADASTRADO_ERRO = 'Não foi possível cadastrar o Artigo';
const MSG_EDITADO_ERRO = 'Não foi possível editar o Artigo';
const MSG_REMOVIDO_ERRO = 'Não foi possível remover o Artigo';

function ArtigoNovo() {
    const [loadMode, setLoadMode] = useState(0);
    const [index, setIndex] = useState(0);
    const [msgStatus, setMsgStatus] = useState();

    const [artigos, setArtigos] = useState([]);
    const [tituloArtigo, setTituloArtigo] = useState();
    const [linkArtigo, setLinkArtigo] = useState();
    const [introArtigo, setIntroArtigo] = useState();
    const [artigoImg, setArtigoImg] = useState();
    const [urlImagem, setUrlImagem] = useState();


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

    var listaArtigos = [];

    useEffect(() => {
        if (loadMode == 0)
            updateStatus(STATUS.OK, MSG_CARREGANDO);

        firebase.firestore().collection(COLLECTION).get().then(async (res) => {
            await res.docs.forEach(doc => {
                listaArtigos.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setArtigos(listaArtigos);
            if (loadMode == 0)
                updateStatus(STATUS.OK, MSG_CARREGADO);
        })

    }, [artigos.length])

    async function tirarFoto() {
        let files = await window.showOpenFilePicker(imgOpt);

        let newFoto = await files[0].getFile();
        setArtigoImg(await files[0].getFile());

        let reader = new FileReader();
        reader.readAsDataURL(newFoto);
        reader.onload = function (event) {
            document.getElementById("artigoImg").src = event.target.result;
        }
    }

    function registrar() {

        if (loadMode == 0) {
            if (artigoImg)
                storage.ref(`imagens/artigo/${artigoImg.name}`).put(artigoImg).then(() => {
                    db.collection(COLLECTION).add({
                        tituloArtigo: tituloArtigo,
                        introArtigo: introArtigo,
                        linkArtigo: linkArtigo,
                        artigoImg: artigoImg.name
                    }).then(() => {
                        setLoadMode(1)
                        artigos.push({
                            tituloArtigo: tituloArtigo,
                            introArtigo: introArtigo,
                            linkArtigo: linkArtigo,
                            artigoImg: artigoImg.name
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
            if (artigoImg)
                storage.ref(`imagens/artigo/${artigoImg.name}`).put(artigoImg);

            db.collection(COLLECTION).doc(artigos[index].id).update({
                tituloArtigo: tituloArtigo,
                introArtigo: introArtigo,
                linkArtigo: linkArtigo,
                artigoImg: artigoImg.name
            }).then(() => {
                artigos[index].tituloArtigo = tituloArtigo;
                artigos[index].introArtigo = introArtigo;
                artigos[index].linkArtigo = linkArtigo;
                artigos[index].artigoImg = artigoImg;
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

        firebase.storage().ref(`imagens/artigo/${artigos[index].artigoImg}`).getDownloadURL().then(url => {
            setUrlImagem(url);
        })

        document.getElementById("tituloArtigo").value = artigos[index].tituloArtigo;
        document.getElementById("introArtigo").value = artigos[index].introArtigo;
        document.getElementById("linkArtigo").value = artigos[index].linkArtigo;
        document.getElementById("artigoImg").src = urlImagem;

        setTituloArtigo(artigos[index].tituloArtigo);
        setIntroArtigo(artigos[index].introArtigo);
        setLinkArtigo(artigos[index].linkArtigo);
        setArtigoImg(artigos[index].artigoImg);

    }

    async function deletar(value) {
        setLoadMode(1)

        let index = value.target.parentNode.parentNode.parentNode.rowIndex;
        setIndex(--index);

        const result = await Confirm('Deseja realmente remover o Paciente?', 'Remover');

        if(result){
        storage.ref(`imagens/artiog/${artigos[index].artigoImg.name}`).delete();

        db.collection(COLLECTION).doc(artigos[index].id).delete()
            .then(() => {
                artigos.splice(index, 1);
                updateStatus(STATUS.REMOVE, MSG_REMOVIDO);
            }).catch((e) => {
                console.log(MSG_REMOVIDO_ERRO);
                console.log(e);
                updateStatus(STATUS.ERRO, MSG_REMOVIDO_ERRO);
            })
        }
        clearMode();

    }

    function clearMode() {
        setIndex(0);
        setLoadMode(0);

        setTituloArtigo("");
        setIntroArtigo("");
        setLinkArtigo("");
        setArtigoImg("");

        document.getElementById("tituloArtigo").value = "";
        document.getElementById("introArtigo").value = "";
        document.getElementById("linkArtigo").value = "";
        document.getElementById("artigoImg").src = ARTIGO_PADRAO;
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

                    <div id="container" className="container justify-content-center col-12">
                        <div id="divStatus" className="text-center p-4 my-5"><span><strong>{msgStatus}</strong></span></div>
                        <form className="my-5">
                            <div className="form-group m-5">
                                <h2 className="text-center">{loadMode ? "Editar Artigos" : "Cadastro de Artigos"}</h2>
                                <div className="row my-3">
                                    <div className="col-md-4 col-xs-12">
                                        <div className="form-group">
                                            <img id="artigoImg" className="card-img" src={urlImagem ? urlImagem : ARTIGO_PADRAO}
                                                alt="Imagem Aqui" />
                                            <button className="btn btn-login" type="button" onClick={tirarFoto}>Tire Foto
                                            </button>
                                        </div>
                                    </div>
                                    <div className="block col-8">
                                        <input id="tituloArtigo" onChange={(e) => setTituloArtigo(e.target.value)} className="form-control my-2" type="text"
                                            placeholder="Título do Artigo" />
                                        <lable htmlFor="introArtigo">Reclamações do Paciente</lable>

                                    <textarea id="introArtigo" onChange={(e) => setIntroArtigo(e.target.value)} className="form-control rounded-0 my-2" rows="4"></textarea>

                                        <label className="" htmlFor="linkArtigo">Link do Artigo</label>
                                        <input id="linkArtigo" onChange={(e) => setLinkArtigo(e.target.value)} className="form-control my-2" type="text" />
                                    </div>
                                </div>
                            </div>
                            <button id="btnArtigo" type="button" className="btn btn-login my-2"
                                onClick={registrar}>{loadMode ? "Editar" : "Cadastrar"}</button>
                        </form>

                        <table id="artigosTab" className="table table-hover">
                            <thead key="thread">
                                <tr>
                                    <th>Título</th>
                                    <th>Introdução</th>
                                    <th>Disponível em:</th>
                                    <th className="text-center">Opções</th>
                                </tr>
                            </thead>

                            <tbody key="tbody">
                                {
                                    artigos.map(item => {
                                        return (<tr key={item.id}>
                                            <th scope="row">{item.tituloArtigo}</th>
                                            <th>{item.introArtigo}</th>
                                            <th>{item.linkArtigo}</th>
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

export default ArtigoNovo;