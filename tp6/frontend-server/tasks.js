const { IncomingMessage, ServerResponse } = require('http')
const axios = require('axios').default
const { API_URL, getPostBody, makeJsonResponse } = require('./util.js')

/**
 * 
 * @param {IncomingMessage} req 
 * @param {ServerResponse} res 
 */
async function getTasks(req, res) {
    // Request tasks in the following order:
    // Sort by finished true then false, if tie then
    // Sort by due date asc, if tie then
    // Sort by date created desc
    let tasks = (await axios.get(`${API_URL}/tasks?_sort=finished,dateDue,dateCreated&_order=desc,asc,desc`)).data

    makeJsonResponse(res, tasks)
}

/**
 * 
 * @param {IncomingMessage} req 
 * @param {ServerResponse} res 
 */
async function createTask(req, res) {
    let task = await getPostBody(req)

    let response = await axios.post(`${API_URL}/tasks`, task)

    makeJsonResponse(res, response.data, response.status)
}

/**
 * 
 * @param {IncomingMessage} req 
 * @param {ServerResponse} res 
 */
async function updateTask(req, res) {
    let components = req.url.split('/')
    let taskId = components[components.length - 1]
    let task = await getPostBody(req)

    let response = await axios.put(`${API_URL}/tasks/${taskId}`, task)

    makeJsonResponse(res, response.data, response.status)
}

/**
 * 
 * @param {IncomingMessage} req 
 * @param {ServerResponse} res 
 */
async function deleteTask(req, res) {
    let components = req.url.split('/')
    let taskId = components[components.length - 1]

    let response = await axios.delete(`${API_URL}/tasks/${taskId}`)

    makeJsonResponse(res, response.data, response.status)
}

module.exports.getTasks = getTasks
module.exports.createTask = createTask
module.exports.updateTask = updateTask
module.exports.deleteTask = deleteTask
