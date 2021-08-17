import { useEffect, useState } from "react";
import firebase from "firebase";

import SideBar from "../../Components/sidebar";
import EditButton from "../../Components/buttons/editButton";
import DeleteButton from "../../Components/buttons/deleteButton";

function Tratamentos() {

    const [editMode, setEditMode] = useState(0);
    const [index, setIndex] = useState(0);
    const [loadMode, setLoadMode] = useState(0);

    const [tratamentos, setTratamentos] = useState([]);
    const [nomeTratamento, setNomeTratamento] = useState();
    const [indicacao, setIndicacao] = useState();
    const [descTratamento, setDescTratamento] = useState();

    const db = firebase.firestore();

    var listaTratamentos = [];

    useEffect(() => {
        firebase.firestore().collection('tratamentos').get().then(async (res) => {
            await res.docs.forEach(doc => {
                listaTratamentos.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setTratamentos(listaTratamentos);
            console.log(tratamentos);
        })
    }, [loadMode])

    function registra() {
        setLoadMode(1);

        if(editMode == 0){
            db.collection('tratamentos').add({
                nomeTratamento: nomeTratamento,
                indicacao: indicacao,
                descTratamento: descTratamento
            }).then(() => {
                tratamentos.push({
                    nomeTratamento: nomeTratamento,
                    indicacao: indicacao,
                    descTratamento: descTratamento
                })
                console.log("sucesso!");
            }
            ).catch(() => {
                console.log("Não foi possível registrar o tratamento");
            })
        } else {
            console.log("updatando : " + tratamentos[index].id);
            db.collection('tratamentos').doc(tratamentos[index].id).update({
                nomeTratamento: nomeTratamento,
                indicacao: indicacao,
                descTratamento: descTratamento
            }).then(() => {
                tratamentos[index].nomeTratamento = nomeTratamento;
                tratamentos[index].indicacao = indicacao;
                tratamentos[index].descTratamento = descTratamento;
                console.log("Editado com Sucesso!");
            }).catch((e) => {
                console.log(e);
                console.log("Não foi possível editar o tratamento");
            })
        }
        clearMode();
        setLoadMode(0);
    }

    
    function editar(value){

        clearMode();

        let index = value.target.parentNode.parentNode.parentNode.rowIndex;
        setIndex(--index);
        setEditMode(1);

        console.log(index);

        document.getElementById("nomeTratamento").value = tratamentos[index].nomeTratamento;
        document.getElementById("indicacao").value = tratamentos[index].indicacao;
        document.getElementById("descTratamento").value = tratamentos[index].descTratamento;

        setNomeTratamento(tratamentos[index].nomeTratamento);
        setIndicacao(tratamentos[index].indicacao);
        setDescTratamento(tratamentos[index].descTratamento);

    }

    function deletar(value){
        let index = value.target.parentNode.parentNode.parentNode.rowIndex;
        setIndex(--index);
        setLoadMode(1);

        db.collection('tratamentos').doc(tratamentos[index].id).delete()
        .then(() => {
            tratamentos.splice(index, 1);
            console.log("tratamento removido");
        }).catch((e) => {
            console.log("não foi possível remover o tratamento");
        })

        setLoadMode(0);
    }

    function clearMode(){
        setIndex(0);
        setEditMode(0);

        setNomeTratamento("");
        setIndicacao("");
        setDescTratamento("");
    }

    return (
        <>
            <SideBar />

            <div id="container" className="container justify-content-center col-12">
                <form className="my-5">
                    <div className="form-group m-5">
                        <h2 className="text-center">Tela de Tratamentos</h2>

                        <input id="nomeTratamento" onChange={(e) => setNomeTratamento(e.target.value)} className="form-control my-2" type="text" placeholder="Tratamento" />

                        <input id="indicacao" onChange={(e) => setIndicacao(e.target.value)} className="form-control my-2" type="text" placeholder="Indicação" />

                        <label htmlFor="descTratamento">Descrição do Tratamento</label>
                        <textarea id="descTratamento" onChange={(e) => setDescTratamento(e.target.value)} className="form-control rounded-0 my-2" rows="3"></textarea>

                    </div>

                    <button id="btnTratamento" type="button" className="btn btn-login my-2"
                        onClick={registra}>{editMode == 0 ? "Cadastrar" : "Editar"}</button>
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
    );
}

export default Tratamentos;