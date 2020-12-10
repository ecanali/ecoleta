const express = require("express")
const server = express()

// get database
const db = require("./database/db")

// configures 'public' folder
server.use(express.static("public"))

// allows the use of 'req.body' in the application
server.use(express.urlencoded({ extended: true }))

// utilizing template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views/", {
    express: server,
    noCache: true
})

// configures routes of my app
// home
// req = Requisition
// res = Response
server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    // req.body gets the content of the body of the form
    // add data into the database
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
        req.body.address2,
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
        // search empty
        return res.render("search-results.html", { total: 0 })
    }
    
    // gets data from database
    db.all(`SELECT * FROM places WHERE city like '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        const total = rows.length

        // shows the html page with the data from database
        return res.render("search-results.html", { places: rows, total: total })
    })
})

// turns on the server indicating the port
server.listen(3000)