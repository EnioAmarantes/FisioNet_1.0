import SideBar from "../../Components/sidebar";

function Pacientes() {
    return (
        <>
            <SideBar />
            
            <div id="container" className="container justify-content-center col-12">
                <form className="my-5">
                    <div className="form-group m-5">
                        <h2 className="text-center">Cadastro de Pacientes</h2>
                        <div className="row my-3">
                            <div className="col-md-4 col-xs-12">
                                <div>
                                    <img id="avatar" className="card-img" src="../compartilhado/images/avatares/avatar-002.jpg"
                                        alt="Imagem Aqui" />
                                    <button className="btn btn-login" type="button" /*onClick={}*/>Tire uma foto</button>
                                </div>
                            </div>
                            <div className="block col-8">
                                <input id="nomePaciente" className="form-control my-2" type="text"
                                    placeholder="Nome do paciente" />
                                <input id="idadePaciente" className="form-control my-2" type="number" placeholder="Idade" />
                                <label for="tratamentos">Tratamento</label>
                                <select id="tratamentos" className="form-control my-2">
                                </select>
                                <label className="" for="prox_consulta">Próxima Conulta</label>
                                <input id="prox_consulta" className="form-control my-2" type="date" />
                            </div>
                        </div>
                    </div>
                    <button id="btnPaciente" type="button" className="btn btn-login my-2"
                        /*onClick={}*/>Cadastrar</button>
                </form>

                <table id="pacientesTab" className="table table-hover">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Tratamento</th>
                            <th>Próxima Consulta</th>
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

export default Pacientes;