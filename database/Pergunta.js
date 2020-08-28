const Sequelize = require("sequelize");
const connection = require("./database");


const Pergunta = connection.define('pergunta', {
    titulo:{
        type: Sequelize.STRING, allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT, allowNull: false
    }
});

Pergunta.sync({force: false}).then(() => {}); //se no banco de dados não existe uma tabela pergunta ele cria uma.

/* os codigos acima estao criando uma tabela chamada pergunta, exemplo em sql:

CREATE TABLE pergunta{
    id NOTNULL auto-increment
    titulo VARCHAR(255) NOTNULL,
    descricao TEXT NOTNULL
}
*/