const axios = require('axios').default
const util = require('./util.js')

module.exports.handleGetInstrumentos = function(req, res) {
    axios.get(util.API_URL + '/instrumentos?_sort=nome&_order=asc')
    .then(apiRes => {
        let instrumentos = apiRes.data

        util.sendOkResponseStart(res)

        res.write('<h2>Escola de Música: Lista de Instrumentos</h2>')
        res.write('<ul>')
        
        instrumentos.forEach(ins => {
            res.write(`<li><a href="/instrumentos/${ins.id}">${ins['#text']}</a></li>`)
        })

        res.write('</ul>')

        res.write('<address>[<a href="/">Voltar</a>]</address>')

        util.sendOkResponseEnd(res)
    }).catch(err => {
        console.error(err)

        util.sendErrorResponse(res, 500, 'Internal server error', '/instrumentos')
    })
}

module.exports.handleGetInstrumento = function(req, res, url) {
    const idInstrumento = url.split('/')[2] // Get last path component of URL

    axios.get(util.API_URL + `/instrumentos/${idInstrumento}`)
    .then(apiRes => {
        const instrumento = apiRes.data

        util.sendOkResponseStart(res)

        res.write(`<h2>Escola de Música: ${instrumento['#text']}</h2>`)
        
        res.write(`
        <ul>
            <li><b>Código do Instrumento:</b> ${instrumento.id}</li>
            <li><b>Designação:</b> ${instrumento['#text']}</li>
        </ul>
        `)
    
        res.write('<address>[<a href="/instrumentos">Voltar</a>]</address>')

        util.sendOkResponseEnd(res)
    })
    .catch(err => {
        if(err.response.status === 404) {
            util.send404Response(res, '/instrumentos')
        } else {
            console.log(err)

            util.sendErrorResponse(res, 500, 'Internal server error', '/instrumentos')
        }
    })
}
