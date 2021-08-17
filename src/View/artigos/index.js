import "./artigos.css";
import artigo1 from "../../Components/images/artigos/artigo1.jpg";
import artigo2 from "../../Components/images/artigos/artigo2.jpg";
import artigo3 from "../../Components/images/artigos/artigo3.jpg";

function Artigos() {
    return (
        <div className="artigos align-items-center justify-content-center">
            <div className="container-fluid panel-group">
                <div className="panel mb-4">
                    <div className="panel-heading">COVID-19: a importância da fisioterapia na recuperação da saúde do trabalhador</div>
                    <div className="panel-body mt-3">
                        <img className="img-thumbnail img-artigo mx-3" src={artigo1} alt="Imagem de Fisio" />
                        <p className="text-justify">
                            É inegável o impacto econômico e social que a doença do coronavírus-19 (COVID-19) pode trazer, uma vez que elevados contingentes de trabalhadores ativos da produção e prestação de serviços estão sendo contaminados. Além disso, os infectados podem apresentar sequelas a longo prazo, prejudicando sua capacidade funcional e, consequentemente, as atividades laborais. Este artigo analisou as repercussões da COVID-19 sobre a saúde do trabalhador, enfatizando a importância da fisioterapia na recuperação dos infectados. Trata-se de uma revisão integrativa da literatura, realizada nas bases de dados eletrônicos PubMed, SciELO e LILACS, utilizando os descritores: COVID-19, fisioterapia, reabilitação e saúde do trabalhador. Dos 1.308 estudos encontrados, apenas 15 se enquadraram nos critérios de inclusão.
                        </p>
                        <button className="btn btn-artigo">Saiba Mais</button>
                    </div>
                </div>

                <div className="panel mb-4">
                    <div className="panel-heading">Distúrbios musculoesqueléticos relacionados ao trabalho de professores</div>
                    <div className="panel-body mt-3">
                        <img className="img-thumbnail img-artigo mx-3" src={artigo2} alt="Imagem de Fisio" />
                        <p className="text-justify">
                            O trabalho na contemporaneidade está intrinsicamente associado às relações capitalistas, em que o trabalhador, além de necessitar atualização contínua sobre o seu ofício, é constantemente cobrado para manter o êxito em suas funções. Somada a isso, a forma como o trabalho está organizado pode contribuir para o surgimento de problemas na vida do trabalhador, inclusive no que se refere à sua saúde1,2. Nesse contexto, os distúrbios musculoesqueléticos (DME) têm obtido destaque por seus impactos nas várias esferas da vida e trabalho das pessoas.
                        </p>
                        <button /*onClick={}*/ className="btn btn-artigo">Saiba Mais</button>
                    </div>
                </div>

                <div className="panel mb-4">
                    <div className="panel-heading">Influência da ginástica laboral no desempenho cognitivo de trabalhadores</div>
                    <div className="panel-body mt-3">
                        <img className="img-thumbnail img-artigo mx-3" src={artigo3} alt="Imagem de Fisio" />
                        <p className="text-justify">
                            A rotina de trabalho nos setores administrativos busca implementar processos organizacionais padronizados e eficientes, a fim de melhorar a qualidade do serviço prestado e o gerenciamento do tempo. Porém, essa rotina pode impor aos trabalhadores cargas elevadas constantes, muitas vezes sem pausas, podendo desencadear problemas relacionados aos relacionamentos interpessoais e ao sistema osteomuscular1.
                        </p>
                        <button /*onClick={}*/ className="btn btn-artigo">Saiba Mais</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Artigos;