const express = require('express');
const app = express();
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 4000;


app.use(express.static(__dirname + "/public"))

const historico = []

// Esse é "io" é responsável por ficar checando se alguma coisa tá acontecendo (no caso aí é a conexão)
io.on('connection', (socket) => {
    console.log("Nova conexão")

    historico.forEach(linha => {
        socket.emit('desenhar', linha) // o "socket" manda só para o que acabou de fazer a conexao
    })

    socket.on('desenhar', (linha)=>{
        historico.push(linha)
        io.emit('desenhar', linha) // o "io" manda para todos
    })

    socket.on('limpar', ()=>{
        for (var i = historico.length; i > 0; i--) {
            historico.pop();
        }
        io.emit('limpar')
    })
})

http.listen(port, function () {
    console.log('listening on port: ' + port);
});