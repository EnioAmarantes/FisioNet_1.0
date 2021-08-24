import React, { useState } from "react";
import firebase from "../../Config/firebase";
import "firebase/auth";
import "./login.css";
import Artigos from "../artigos";
import Logo from "../../Components/images/fisioLogo.png";
import { useDispatch } from "react-redux";

function NewUser() {

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [msgType, setMsgType] = useState();
    const [msg, setMsg] = useState();
    const [carregando, setCarregando] = useState();
    const dispatch = useDispatch();

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

                firebase.auth().signInWithEmailAndPassword(email, senha)
                    .then(res => {
                        setTimeout(() => {
                            dispatch({ type: 'LOGIN', userEmail: email });
                        }, 500)
                    })
                    .catch(err => {
                        setMsgType("erro");
                    })
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
            <div className="row m-0 p-0 align-items-center justify-content-center">
                <div className="col-8 m-0">
                    <Artigos />

                </div>

                <div className="col-4">
                    <div className="form-cadastro">
                        <form className="text-center form-login mx-auto mt-9">
                            <img id="fisioLogo" src={Logo} alt="logo da Fisionet" />
                            <h1 className="h3 mb-3 text-black font-weight-bold">Cadastro</h1>

                            <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control my-2" placeholder="E-mail" />
                            <div>
                                <input onChange={(e) => setSenha(e.target.value)} id="password" className="form-control my-2" type="password" placeholder="Senha" />
                                <span className="lnr lnr-eye"></span>
                            </div>

                            {
                                carregando ?
                                    <div className="spinner-border text-secondary" role="status">
                                        <span className="sr-only"></span>
                                    </div>
                                    : <button onClick={cadastrar} type="button" className="btn btn-lg btn-login btn-block my-4">Cadastrar e Logar</button>
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