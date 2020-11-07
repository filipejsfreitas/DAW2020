const http = require('http')
const fs = require('fs')
const urlm = require('url')

const server = http.createServer(async (req, res) => {
    let url = urlm.parse(req.url)

    if(url.pathname.match(/\/arqs\/?$/)) {
        fs.readFile('site/index.html', (err, data) => {
            if(err) {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' })
                res.end('Erro ao ler o ficheiro index.html!')
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' })
                res.end(data)
            }
        })

        return
    }

    if(url.pathname.match(/arqs\/[0-9]+$/)) {
        let components = url.pathname.split('/')

        let arqId = components[components.length - 1]
        
        fs.readFile(`site/arq${arqId}.html`, (err, data) => {
            if(err) {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' })
                res.end(`Erro ao ler o ficheiro ${arqId}.html!`)
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' })
                res.end(data)
            }
        })

        return
    }

    res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' })
    res.end('404 Not Found')
    
    return
})


console.log('Server listening on 3333')
server.listen(3333)
