const { IncomingMessage, ServerResponse } = require('http')
const qs = require('querystring')

const API_URL = 'http://localhost:3000'

/**
 * 
 * @param {ServerResponse} res 
 * @param {any} data 
 * @param {number} statusCode 
 */
function makeJsonResponse(res, data, statusCode = 200) {
    res.writeHead(statusCode, {'Content-Type': 'application/json; charset=UTF-8'})
    res.end(JSON.stringify({
        error: statusCode < 200 || statusCode >= 300,
        data: data
    }))
}

/**
 * 
 * @param {IncomingMessage} req 
 */
function getPostBody(req) {
    return new Promise((resolve, reject) => {
        let body = ''

        req.on('data', bloco => {
            body += bloco.toString()
        })

        req.on('end', () => {
            let mimeType = req.headers['content-type'].split(';')[0]

            if(mimeType === 'application/x-www-form-urlencoded') {
                resolve(qs.parse(body))
            } else if(mimeType === 'application/json') {
                resolve(JSON.parse(body))
            } else {
                reject('Wrong Content-Type header in request!')
            }
        })
    })
}

module.exports.API_URL = API_URL

module.exports.makeJsonResponse = makeJsonResponse
module.exports.getPostBody = getPostBody
