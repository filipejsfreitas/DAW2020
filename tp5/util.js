const { timeStamp } = require("console")

module.exports.API_URL = 'http://localhost:3000'

module.exports.sendOkResponseStart = function(res) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
    
    res.write(
        `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8" />
                <title>Escola de Música</title>
            </head>
            <body>
        `
    )
}

module.exports.sendOkResponseEnd = function(res) {
    res.end(
        `
            </body>
        </html>
        `
    )
}

module.exports.sendErrorResponse = function(res, errorCode, errorMessage, back) {
    res.writeHead(errorCode, {'Content-Type': 'text/html; charset=UTF-8'})
    
    res.write(`
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8" />
            <title>Escola de Música</title>
        </head>
        <body>
            <h2>Escola de Música</h2>

            <p><b>Um erro foi encontrado ao processar o seu pedido:</b></p>
            <p>${errorMessage}</p>

            <a href="${back}">Voltar</a>
        </body>
    </html>
    `)
    
    res.end()
}

module.exports.send404Response = function(res, back) {
    // TODO: Prettify 404 responses
    this.sendErrorResponse(res, 404, '404 Not Found', back)
}

module.exports.handleGetIndex = function(req, res) {
    this.sendOkResponseStart(res)

    res.write('<h2>Escola de Música</h2>')
    res.write('<ul>')

    res.write('<li><a href="/alunos">Lista de Alunos</a></li>')
    res.write('<li><a href="/cursos">Lista de Cursos</a></li>')
    res.write('<li><a href="/instrumentos">Lista de Instrumentos</a></li>')

    res.write('</ul>')

    this.sendOkResponseEnd(res)
}
