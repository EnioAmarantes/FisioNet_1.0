import React, {useState} from "react";
import firebase from "../../Config/firebase";
import Artigos from "../artigos";
import Logo from "../../Components/images/fisioLogo.png";

import "firebase/auth";

function LostPassword() {

    const [email, setEmail] = useState();
    const [msg, setMsg] = useState();

    function recuperarSenha(){
        firebase.auth().sendPasswordResetEmail(email)
        .then(result => {
            setMsg("Um email para redefinir sua senha foi enviado em sua caixa de entrada.");
        }
        ).catch(err => {
            setMsg("Por favor insira um email válido");
        })
    }

    return (
        <>
        <div className="row m-0 p-0 align-items-center justify-content-center">
            <div className="col-8 m-0">
                <Artigos />

            </div>
            <div className="col-4">

            <form className="text-center form-login mx-auto mt-5">
            <img id="fisioLogo" src={Logo} alt="logo da Fisionet" />
                <h3 className="mb-3 font-weight-bold">Recuperação de Senha</h3>
                <input onChange={e => setEmail(e.target.value)} className="form-control my-2 mb-3" type="email" placeholder="E-mail" />

                <div className="msg my-8 mb-3">
                    <span>{msg}</span>
                </div>

                <button onClick={recuperarSenha} type="button" className="btn btn-lg btn-login btn-block my-6">Recuperar Senha</button>
            </form>
            </div>
            </div>
        </>
    );
}

export default LostPassword;