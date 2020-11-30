const { IncomingMessage, ServerResponse } = require('http')

/**
 * 
 * @param {IncomingMessage} req 
 * @param {ServerResponse} res 
 */
function getMainPage(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})

    res.write(`
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>Gestor de Tarefas</title>

            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous" />

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA==" crossorigin="anonymous" />

            <link rel="stylesheet" href="public/css/main.css" />
        </head>
        <body>
            <div id="content" class="container">
                <h1 class="d-flex justify-content-center">Lista de tarefas</h1>

                <label for="only-finished-tasks">Apenas mostrar tarefas terminadas</label>
                <input type="checkbox" id="only-finished-tasks" />

                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Quem</th>
                            <th>Descrição</th>
                            <th>Data Criação</th>
                            <th>Data Fim</th>
                            <th>Tipo</th>
                            <th>Estado</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="task-table-body">
                    
                    </tbody>
                </table>

                <div id="form-modal" class="modal" tabindex="-1" role="dialog" data-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="form-title"></h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form method="POST" action="#">
                                <input type="hidden" id="form-task-id" name="form-task-id" value="-1" />

                                <div class="form-group">
                                    <label for="who">Quem</label>
                                    <input type="email" class="form-control" id="form-who" name="form-who" />
                                </div>
                                <div class="form-group">
                                    <label for="who">Descrição</label>
                                    <input type="text" class="form-control" id="form-description" name="form-description" />
                                </div>
                                <div class="form-group">
                                    <label for="dateCreated">Data Criação</label>
                                    <input type="date" class="form-control" id="form-dateCreated" name="form-dateCreated" />
                                </div>
                                <div class="form-group">
                                    <label for="dateDue">Data Fim</label>
                                    <input type="date" class="form-control" id="form-dateDue" name="form-dateDue" />
                                </div>
                                <div class="form-group">
                                    <label for="type">Tipo</label>
                                    <input type="text" class="form-control" id="form-type" name="form-type" />
                                </div>
                                <div class="form-group">
                                    <label for="finished">Estado</label>
                                    <input type="checkbox" class="form-control" id="form-finished" name="form-finished" />
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" id="form-save">Guardar</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>                

            <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>

            <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

            <script src="public/js/main.js"></script>
        </body>
    </html>
    `)

    res.end()
}

module.exports.getMainPage = getMainPage
