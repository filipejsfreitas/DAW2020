const http = require('http')
const urlm = require('url')

const alunos = require('./alunos.js')
const cursos = require('./cursos.js')
const instrumentos = require('./instrumentos.js')
const util = require('./util.js')

const server = http.createServer((req, res) => {
    if(req.method == 'GET') {
        const url = urlm.parse(req.url).pathname

        if(url == '/') {
            util.handleGetIndex(req, res)
        } else if(url == '/alunos') {
            alunos.handleGetAlunos(req, res)
        } else if(url.match(/\/alunos\/(AE-?[0-9]+|A[0-9]+)$/)) {
            alunos.handleGetAluno(req, res, url)
        } else if(url == '/cursos') {
            cursos.handleGetCursos(req, res)
        } else if(url.match(/\/cursos\/(CB[0-9]+|CS[0-9]+)$/)) {
            cursos.handleGetCurso(req, res, url)
        } else if(url == '/instrumentos') {
            instrumentos.handleGetInstrumentos(req, res)
        } else if(url.match(/\/instrumentos\/I[0-9]+$/)) {
            instrumentos.handleGetInstrumento(req, res, url)
        } else {
            util.send404Response(res, '/')
        }
    } else {
        util.sendErrorResponse(res, 501, 'Pedido não suportado.', '/')
    }

    console.log(`${req.method} ${req.url}: ${res.statusCode}`)
})

console.log('Server listening on 4000')
server.listen(4000)
