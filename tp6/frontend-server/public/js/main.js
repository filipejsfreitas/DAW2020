const API_URL = 'http://localhost:3000'
let tasks = []

function getAllTasks(onlyFinishedTasks = false) {
    axios.get(API_URL + '/tasks')
    .then(res => {
        tasks = res.data

        // TODO: Error handling
        $("#task-table-body *").remove()

        let $tBody = $("#task-table-body")
        let i = 0
        for(let task of tasks) {
            let finishedHtml = ''
            if(task.finished) {
                finishedHtml = '<i class="far fa-check-square"></i>'
            } else {
                if(onlyFinishedTasks) {
                    i++
                    continue
                }

                finishedHtml = '<i class="far fa-square"></i>'
            }

            let html = `
            <tr id="task-table-row-${i}">
                <td>${task.id}</td>
                <td>${task.who}</td>
                <td>${task.description}</td>
                <td>${task.dateCreated}</td>
                <td>${task.dateDue}</td>
                <td>${task.type}</td>
                <td>${finishedHtml}</td>
                <td><i class="far fa-edit" style="cursor: pointer" onclick="editTask(${i})"></i>&nbsp;&nbsp;<i class="far fa-trash-alt" style="cursor: pointer" onclick="deleteTask(${i})"></i></td>
            </tr>
            `

            $tBody.append($(html))

            i++
        }

        let $lastTableRow = $(`
        <tr id="task-table-last-row">
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td><a href="#">Criar nova tarefa...</a></td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
        </tr>
        `)

        $lastTableRow.click(createNewTask)

        $tBody.append($lastTableRow)
    })
    .catch(err => console.error(err))
}

function createNewTask(e) {
    $("#form-title").html('Criar nova tarefa')
    
    $("#form-task-id").val('-1')
    $("#form-who").val('')
    $("#form-description").val('')
    $("#form-dateCreated").val('')
    $("#form-dateDue").val('')
    $("#form-type").val('')
    $("#form-finished").prop('checked', false)
    
    $("#form-modal").modal('toggle')
}

function editTask(i) {
    let task = tasks[i]

    $("#form-title").html('Editar tarefa')

    $("#form-task-id").val(task.id)
    $("#form-who").val(task.who)
    $("#form-description").val(task.description)
    $("#form-dateCreated").val(task.dateCreated)
    $("#form-dateDue").val(task.dateDue)
    $("#form-type").val(task.type)
    $("#form-finished").prop('checked', task.finished)

    $("#form-modal").modal('toggle')
}

function deleteTask(i) {
    let task = tasks[i]

    axios.delete(API_URL + '/tasks/' + task.id)
    .then(_ => getAllTasks())
    .catch(err => console.error(err))
}

function submitTaskForm(e) {
    e.preventDefault()

    let task = {
        who: $("#form-who").val(),
        description: $("#form-description").val(),
        dateCreated: $("#form-dateCreated").val(),
        dateDue: $("#form-dateDue").val(),
        type: $("#form-type").val(),
        finished: $("#form-finished").prop('checked')
    }

    let $taskId = parseInt($("#form-task-id").val())
    if($taskId !== -1) {
        task.id = $taskId

        // Update task
        axios.put(API_URL + '/tasks/' + task.id, task)
        .then(_ => getAllTasks())
        .catch(err => console.error(err))

        $("#form-modal").modal('toggle')
    } else {
        // Create new task
        axios.post(API_URL + '/tasks', task)
        .then(_ => getAllTasks())
        .catch(err => console.error(err))

        $("#form-modal").modal('toggle')
    }
}

$(document).ready(function() {
    getAllTasks()

    $("#form-save").click(submitTaskForm)

    $("#only-finished-tasks").click(_ => {
        getAllTasks($("#only-finished-tasks").prop('checked'))
    })
})
