const axios = require('axios').default
const util = require('./util.js')

module.exports.handleGetCursos = function(req, res) {
    axios.get(util.API_URL + '/cursos?_sort=nome&_order=asc')
    .then(apiRes => {
        let cursos = apiRes.data

        util.sendOkResponseStart(res)

        res.write('<h2>Escola de Música: Lista de Cursos</h2>')
        res.write('<ul>')
        
        cursos.forEach(c => {
            res.write(`<li><a href="/cursos/${c.id}">${c.designacao}</a></li>`)
        })

        res.write('</ul>')

        res.write('<address>[<a href="/">Voltar</a>]</address>')

        util.sendOkResponseEnd(res)
    }).catch(err => {
        console.error(err)

        util.sendErrorResponse(res, 500, 'Internal server error', '/cursos')
    })
}

module.exports.handleGetCurso = function(req, res, url) {
    const idCurso = url.split('/')[2] // Get last path component of URL

    axios.get(util.API_URL + `/cursos/${idCurso}`)
    .then(apiRes => {
        const curso = apiRes.data

        util.sendOkResponseStart(res)

        res.write(`<h2>Escola de Música: ${curso.designacao}</h2>`)
        
        res.write(`
        <ul>
            <li><b>Código do Curso:</b> ${curso.id}</li>
            <li><b>Designação:</b> ${curso.designacao}</li>
            <li><b>Duração:</b> ${curso.duracao != 1 ? (curso.duracao + ' anos') : '1 ano'}</li>
            <li><b>Instrumento:</b> <a href="/instrumentos/${curso.instrumento.id}">${curso.instrumento['#text']}</a></li>
        </ul>
        `)
    
        res.write('<address>[<a href="/cursos">Voltar</a>]</address>')

        util.sendOkResponseEnd(res)
    })
    .catch(err => {
        if(err.response.status === 404) {
            // util.sendErrorResponse(res, 404, 'Not Found')
            util.send404Response(res, '/cursos')
        } else {
            console.log(err)

            util.sendErrorResponse(res, 500, 'Internal server error', '/cursos')
        }
    })
}
