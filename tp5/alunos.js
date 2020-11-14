const axios = require('axios').default
const util = require('./util.js')

module.exports.handleGetAlunos = function(req, res) {
    axios.get(util.API_URL + '/alunos?_sort=nome&_order=asc')
    .then(apiRes => {
        let alunos = apiRes.data

        util.sendOkResponseStart(res)

        res.write('<h2>Escola de Música: Lista de Alunos</h2>')
        res.write('<ul>')
        
        alunos.forEach(a => {
            res.write(`<li><a href="/alunos/${a.id}">${a.nome}</a></li>`)
        })

        res.write('</ul>')

        res.write('<address>[<a href="/">Voltar</a>]</address>')

        util.sendOkResponseEnd(res)
    }).catch(err => {
        console.error(err)

        util.sendErrorResponse(res, 500, 'Internal server error', '/alunos')
    })
}

module.exports.handleGetAluno = function(req, res, url) {
    const numeroAluno = url.split('/')[2] // Get last path component of URL

    axios.get(util.API_URL + `/alunos/${numeroAluno}`)
    .then(apiRes => {
        const aluno = apiRes.data
        
        axios.get(util.API_URL + `/cursos/${aluno.curso}`)
        .then(apiRes => {
            const curso = apiRes.data
            const nomeCurso = curso.designacao

            util.sendOkResponseStart(res)

            res.write(`<h2>Escola de Música: Aluno ${aluno.id}</h2>`)
    
            res.write(`
            <ul>
                <li><b>Número do Aluno:</b> ${aluno.id}</li>
                <li><b>Nome do Aluno:</b> ${aluno.nome}</li>
                <li><b>Data de Nascimento:</b> ${aluno.dataNasc}</li>
                <li><b>Curso:</b> <a href="/cursos/${aluno.curso}">${nomeCurso}</a></li>
                <li><b>Ano:</b> ${aluno.anoCurso}</li>
                <li><b>Instrumento:</b> ${aluno.instrumento}</li>
            </ul>
            `)
    
            res.write('<address>[<a href="/alunos">Voltar</a>]</address>')
    
            util.sendOkResponseEnd(res)
        })
        .catch(err => {
            if(err.response.status === 404) {
                // Por alguma razão, existem alunos inscritos em cursos que não constam da base de dados de cursos
                // Nesses casos, simplesmente apresentar uma página que não linka para o URL do curso

                util.sendOkResponseStart(res)
    
                res.write(`<h2>Escola de Música: Aluno ${aluno.id}</h2>`)
        
                res.write(`
                <ul>
                    <li><b>Número do Aluno:</b> ${aluno.id}</li>
                    <li><b>Nome do Aluno:</b> ${aluno.nome}</li>
                    <li><b>Data de Nascimento:</b> ${aluno.dataNasc}</li>
                    <li><b>Curso:</b> ${aluno.curso}</li>
                    <li><b>Ano:</b> ${aluno.anoCurso}</li>
                    <li><b>Instrumento:</b> ${aluno.instrumento}</li>
                </ul>
                `)
        
                res.write('<address>[<a href="/alunos">Voltar</a>]</address>')
        
                util.sendOkResponseEnd(res)
            } else {
                console.log(err)
    
                util.sendErrorResponse(res, 500, 'Internal SErver error', '/alunos')
            }
        })
    })
    .catch(err => {
        if(err.response.status === 404) {
            util.send404Response(res, '/alunos')
        } else {
            console.log(err)

            util.sendErrorResponse(res, 500, 'Internal server error', '/alunos')
        }
    })
}
