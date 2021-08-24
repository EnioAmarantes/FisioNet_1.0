import React, { useEffect, useState } from 'react';
import firebase from '../../Config/firebase';

function ArtigoDetails({ id, tituloArtigo, introArtigo, linkArtigo, artigoImg }) {

    const [urlImagem, setUrlImagem] = useState();

    useEffect(() => {
        console.log(tituloArtigo);
        firebase.storage().ref(`imagens/artigo/${artigoImg}`).getDownloadURL().then(url => {
            setUrlImagem(url);
        })
    }, [urlImagem])

    return (
        <>
        <div className="panel mb-4">
            <div className="panel-heading">{tituloArtigo}</div>
            <div className="panel-body mt-3">
                <img className="img-thumbnail img-artigo mx-3" src={urlImagem} alt="Imagem de Fisio" />
                <p className="text-justify">
                    {introArtigo}
                </p>
                <a href={linkArtigo} target="_blank">
                    <button className="btn btn-artigo">Saiba Mais</button>
                </a>
            </div>
        </div>
        </>
    );

}

export default ArtigoDetails;