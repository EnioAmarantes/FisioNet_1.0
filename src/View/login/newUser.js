import React, { useState } from "react";
import firebase from "../../Config/firebase";
import "firebase/auth";
import "./login.css";
import Artigos from "../artigos";

function NewUser() {

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [msgType, setMsgType] = useState();
    const [msg, setMsg] = useState();
    const [carregando, setCarregando] = useState();

    function cadastrar() {
        setCarregando(1);
        setMsgType(null);

        if (!email || !senha) {
            setMsgType("erro");
            setMsg("Você não preencheu todos os campos");
        }

        firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then(res => {
                setCarregando(0);
                setMsgType("ok");
            }
            )
            .catch(err => {
                setCarregando(0);
                setMsgType("erro");
                switch (err.message) {
                    case 'Password showd be at least 6 characters':
                        setMsg("A senha deve ter pelo menos 6 caracteres");
                        break;
                    case 'The email address is already in use by another account.':
                        setMsg("Esse e-mail já está sendo usado por outra conta.");
                        break;
                    case 'The email address is badly formatted.':
                        setMsg("O formato do e-mail é inválido");
                        break;
                    default:
                        setMsg("Não foi possível cadastrar. Por favor, tente mais tarde.");
                        break;
                }
            });
    }

    return (
        <>
            <div className="row">
                <div className="col-8">
                    <Artigos />

                </div>

                <div className="col-4 d-flex align-items-center justify-content-center">
                    <div className="form-cadastro">
                        <form className="text-center form-login mx-auto mt-9">
                            <h1 className="h3 mb-3 text-black font-weight-bold">Cadastro</h1>

                            <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control my-2" placeholder="E-mail" />
                            <input onChange={(e) => setSenha(e.target.value)} type="password" className="form-control my-2" placeholder="Senha" />

                            {
                                carregando ?
                                    <div className="spinner-border text-secondary" role="status">
                                        <span className="sr-only"></span>
                                    </div>
                                    : <button onClick={cadastrar} type="button" className="btn btn-lg mt-3 mb-5 btn-cadastro">Cadastrar</button>
                            }


                            <div className="text-black text-center my-5">
                                {msgType === "ok" && <span><strong>Uau!</strong> Usuário cadastrado com Sucesso. &#128521;</span>}
                                {msgType === "erro" && <span><strong>Ah!</strong> {msg} &#128533;</span>}
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewUser;