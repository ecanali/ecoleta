const express = require("express")
const server = express()

// pegar o banco de dados
const db = require("./database/db")

// config pasta pública
server.use(express.static("public"))

// habilitar uso do req.body na aplicação
server.use(express.urlencoded({ extended: true }))

// utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views/", {
    express: server,
    noCache: true
})

// config caminhos da minha app
// pag inicial
// req: Requisição
// res: Resposta
server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    // req.body vem o corpo do form
    // inserir dados no banco de dados
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.addres2,
        req.body.state,
        req.body.city,
        req.body.items
    ]
    
    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }
        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", { saved: true })
    }

    db.run(query, values, afterInsertData)
})


server.get("/search", (req, res) => {
    
    const search = req.query.search

    if(search == "") {
        // pesquisa vazia
        return res.render("search-results.html", { total: 0 })
    }
    
    // pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city like '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        const total = rows.length

        // mostrar a página de html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total })
    })
})

// ligar o servidor
server.listen(3000)