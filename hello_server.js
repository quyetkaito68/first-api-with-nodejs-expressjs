const http = require('http')
const port = 3001
const server = http.createServer(function(req,res){
    res.write('Hello Node')
    res.end()
})

server.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`)
 
    console.log(`Server is listening on port ${port}`)
})