import SideBar from "../../Components/sidebar";

function Exames() {
    return (
        <>
            <SideBar />

            <div id="container" className="container justify-content-center col-12">
                <form className="my-5">
                    <div className="form-group m-5">
                        <h2 className="text-center">Cadastro de Exames</h2>
                        <div className="row my-3">
                            <div className="col-md-4 col-xs-12">
                                <div>
                                    <img id="imgExame" className="card-img" src="../compartilhado/images/exames/exame-001.jpg"
                                        alt="Exames Aqui" />
                                    <button className="btn btn-login" type="button" onClick="registraExame()">Registro do
                                        Exame</button>
                                </div>
                            </div>
                            <div className="block col-8">
                                <input id="tipoExame" className="form-control my-2" type="text" placeholder="Tipo de Exame" />
                                <label for="pacientesList">Paciente</label>
                                <select id="pacientesList" className="form-control my-2">
                                </select>
                                <label className="" for="dataExame">Data do Exame</label>
                                <input id="dataExame" className="form-control my-2" type="date" />
                            </div>
                        </div>
                    </div>
                    <button id="btnExame" type="button" className="btn btn-login my-2" /*onClick={}*/>Cadastrar</button>
                </form>

                <table id="examesTab" className="table table-hover">
                    <thead>
                        <tr>
                            <th>Tipo de Exame</th>
                            <th>Paciente</th>
                            <th>Data do Exame</th>
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

export default Exames;