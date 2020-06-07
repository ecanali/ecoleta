// importar dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

// criar objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
// utilizar objeto de banco de dados
// db.serialize(() => {
    
//     // criar uma tabela
//     db.run(`
//             CREATE TABLE IF NOT EXISTS places (
//                 id INTEGER PRIMARY KEY AUTOINCREMENT,
//                 image TEXT,
//                 name TEXT,
//                 address TEXT,
//                 address2 TEXT,
//                 state TEXT,
//                 city TEXT,
//                 items TEXT
//             );
//     `)
//     // inseri itens na tabela
//     const query = `
//         INSERT INTO places (
//             image,
//             name,
//             address,
//             address2,
//             state,
//             city,
//             items
//         ) VALUES (?,?,?,?,?,?,?);
//     `
//     const values = [
//         "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
//         "Papersider",
//         "Guilherme Gemballa",
//         "Número 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Papéis e Papelão"
//     ]
    
//     function afterInsertData(err) {
//         if(err) {
//             return console.log(err)
//         }
//         console.log("Cadastrado com sucesso")
//         console.log(this)
//     }

//     db.run(query, values, afterInsertData)
// })