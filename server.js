const WebSocket = require("ws");

// Cria o servidor WebSocket na porta 8081
const servidor = new WebSocket.Server({
    port: 8081
});

console.log("Servidor WebSocket rodando na porta 8081");

// É executado quando um usuário entra no chat
servidor.on("connection", (cliente) => {
    console.log("Novo usuário conectado");

    // É executado quando o servidor recebe uma mensagem
    cliente.on("message", (dados) => {
        const mensagem = dados.toString();

        console.log("Mensagem recebida:", mensagem);

        // Envia a mensagem para todos os usuários conectados
        servidor.clients.forEach((usuario) => {
            if (usuario.readyState === WebSocket.OPEN) {
                usuario.send(mensagem);
            }
        });
    });

    // É executado quando um usuário sai
    cliente.on("close", () => {
        console.log("Um usuário se desconectou");

        // Envia um aviso para os usuários que continuam conectados
        servidor.clients.forEach((usuario) => {
            if (usuario.readyState === WebSocket.OPEN) {
                usuario.send("SISTEMA: Um usuário saiu do chat.");
            }
        });
    });

    // Trata possíveis erros de conexão
    cliente.on("error", (erro) => {
        console.error("Erro na conexão:", erro.message);
    });
});