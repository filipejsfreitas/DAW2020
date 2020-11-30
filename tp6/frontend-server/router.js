const { IncomingMessage, ServerResponse } = require('http')

/**
 * This module is an extremely simple routing module, built with the express purpose of making my life easier.
 * It supports async functions (by automatically attaching a .catch() to them) as well as sync route handler functions.
 */

const ROUTES = []

/**
 * Registers a route with the routing module.
 * 
 * @param {string|RegExp} pattern 
 * @param {'GET'|'POST'|'PUT'|'PATCH'|'DELETE'} method
 * @param {(req: IncomingMessage, res: ServerResponse) => void|Promise<void>} handler 
 */
function registerRoute(pattern, method, handler) {
    ROUTES.push({ pattern, method, handler })
}

/**
 * Finds the appropriate handler for the given request.
 * Falls back to a 404 handler if not found.
 * 
 * @param {IncomingMessage} req
 */
function findRouteHandler(req) {
    for (let route of ROUTES) {
        if (req.method !== route.method) {
            continue;
        }

        if (typeof (route.pattern) === 'string') {
            if (req.url === route.pattern) {
                return route.handler
            }
        } else {
            if (route.pattern.test(req.url)) {
                return route.handler
            }
        }
    }

    return routeNotFoundHandler
}

/**
 * Handles an incoming HTTP request.
 * 
 * @param {IncomingMessage} req 
 * @param {ServerResponse} res 
 */
function handleIncomingRequest(req, res) {
    let handler = findRouteHandler(req)

    if(handler == null) {
        routeNotFoundHandler(req, res)
        return
    }

    let result = handler(req, res)

    if(result === undefined) {
        console.log(`${req.method} ${req.url}: ${res.statusCode}`)
        return // No promise was returned, so no need to handle it
    }

    // A promise was returned. Attach a .catch() to it to ensure it executes, and a .then() to log the result
    result
    .then(() => console.log(`${req.method} ${req.url}: ${res.statusCode}`))
    .catch(err => internalServerErrorHandler(req, res, err))
}

/**
 * Simple default template for a 404 error
 */
function routeNotFoundHandler(req, res) {
    res.writeHead(404, {'Content-Type': 'text/plain; charset=UTF-8'})
    res.end('404 Not Found')
}

/**
 * Simple default template for a 500 error
 */
function internalServerErrorHandler(req, res, err) {
    console.error(`Unhandled exception while handling ${req.method} ${req.url} request: ${err}`)
    debugger;
    res.writeHead(500, {'Content-Type': 'text/plain; charset=UTF-8'})
    res.end('Internal Server Error')
}

module.exports.registerRoute = registerRoute
module.exports.handleIncomingRequest = handleIncomingRequest
