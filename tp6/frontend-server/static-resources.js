const fs = require('fs')
const { IncomingMessage, ServerResponse } = require('http')

/**
 * 
 * @param {IncomingMessage} req 
 * @param {ServerResponse} res 
 */
function handleStaticResource(req, res) {
    return new Promise(resolve => {
        let urlComponents = req.url.split('/')
        let filePath = urlComponents.slice(2).join('/')
    
        fs.readFile(`public/${filePath}`, (err, data) => {
            if(err) {
                res.writeHead(404, {'Content-Type': 'text/plain; charset=UTF-8'})
                res.end('404 Not Found')
                resolve() // Always resolve the promise: an error here shouldn't trigger an internal server error
            } else {
                let contentType;

                if(filePath.endsWith('.ico')) {
                    contentType = 'image/x-icon; charset=UTF-8'
                }

                if(filePath.endsWith('.js')) {
                    contentType = 'text/javascript; charset=UTF-8'
                }

                if(filePath.endsWith('.css')) {
                    contentType = 'text/css; charset=UTF-8'
                }

                res.writeHead(200, {'Content-Type': contentType})
                res.end(data)
                resolve()
            }
        })
    })
}

module.exports.handleStaticResource = handleStaticResource
