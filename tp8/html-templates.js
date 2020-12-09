
exports.geraPostConfirm = geraPostConfirm
exports.fileList = fileList
exports.fileForm = fileForm

// File List HTML Page Template  -----------------------------------------
function fileList(files, d) {
    let pagHTML = `
      <html>
          <head>
              <title>File List</title>
              <meta charset="utf-8"/>
              <link rel="icon" href="/favicon.png"/>
              <script
                src="https://code.jquery.com/jquery-3.5.1.min.js"
                integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
                crossorigin="anonymous"></script>
              <script src="/imagens.js"></script>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js"></script>
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css" />
              <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
          </head>
          <body>
              <div class="w3-card-4 modal" id="display"></div>

              <div class="w3-container w3-teal">
                  <h2>File List</h2>
              </div>
              <table class="w3-table w3-bordered">
                  <tr>
                      <th>Date</th>
                      <th>File</th>
                      <th>Description</th>
                      <th>Size</th>
                      <th>Type</th>
                  </tr>
    `
    files.forEach(f => {
        pagHTML += `
          <tr onclick='showImage(\"${f.name}", \"${f.mimetype}\");'>
              <td>${f.date}</td>
              <td>${f.name}</td>
              <td>${f.description}</td>
              <td>${f.size}</td>
              <td>${f.mimetype}</td>
          </tr>
      `
    })

    pagHTML += `
          </table>
          <div class="w3-container w3-teal">
              <address>Generated by upload-single::PRI2020 em ${d} --------------</address>
          </div>
      </body>
      </html>
    `
    return pagHTML
}

// File Form HTML Page Template ------------------------------------------
function fileForm(d) {
    return `
    <html>
        <head>
            <title>File Upload</title>
            <meta charset="utf-8"/>
            <link rel="icon" href="/favicon.png"/>
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        </head>
        <body>
        
        </body>
            <div class="w3-container w3-teal">
                <h2>File Upload</h2>
            </div>

            <form class="w3-container" id="file-form" action="/files" method="POST" enctype="multipart/form-data">
                <span id="file-0">
                    <div class="w3-row w3-margin-bottom">
                        <div class="w3-col s3">
                            <label class="w3-text-teal">Description</label>
                        </div>
                        <div class="w3-col s9 w3-border">
                            <input class="w3-input w3-border w3-light-grey" type="text" name="descriptions[0]" />
                        </div>
                    </div>

                    <div class="w3-row w3-margin-bottom">
                        <div class="w3-col s3">
                            <label class="w3-text-teal">Select file</label>
                        </div>
                        <div class="w3-col s9 w3-border">
                            <input class="w3-input w3-border w3-light-grey" type="file" name="myFiles" />
                        </div>
                    </div>
                </span>

                <i class="fas fa-plus" onclick="addFile()" style="cursor: pointer"></i>
                <br />
                <br />

                <input class="w3-btn w3-blue-grey" type="submit" value="Submit"/>
            </form>

            <footer class="w3-container w3-teal">
                <address>Gerado por galuno::PRI2020 em ${d}</address>
            </footer>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA==" crossorigin="anonymous" />
            <script
                src="https://code.jquery.com/jquery-3.5.1.min.js"
                integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
                crossorigin="anonymous"></script>
            <script type="text/javascript" src="/uploads.js"></script>
        </body>
    </html>
    `
}

// POST Confirmation HTML Page Template -------------------------------------
function geraPostConfirm(aluno, d) {
    return `
    <html>
    <head>
        <title>POST receipt: ${aluno.id}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Aluno ${aluno.id} inserido</h1>
            </header>

            <div class="w3-container">
                <p><a href="/alunos/${aluno.id}">Aceda aqui à sua página."</a></p>
            </div>

            <footer class="w3-container w3-teal">
                <address>Gerado por galuno::PRI2020 em ${d} - [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
}