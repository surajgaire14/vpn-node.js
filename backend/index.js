const static = require("node-static")
const http = require("http")

const file = new static.Server('./public')
const { connection } = require("./db/conn")

connection()
const PORT = process.env.PORT || 5000

http.createServer((req,res) => {
    req.addListener("end",() => {
        file.serve(req,res,(err) => {
            if(err){
                console.log(`Error serving ${req.url} - ${err.message}`)
                res.writeHead(err.status,err.headers).end()
                console.log(err.status,err.headers)
            }
        })
    })
}).listen(PORT,() => {
    console.log(`server started on port ${PORT}`)
})
