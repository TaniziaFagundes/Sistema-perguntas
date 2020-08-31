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

module.exports = Pergunta;

/* os codigos acima estao criando uma tabela chamada pergunta, exemplo em sql:

CREATE TABLE IF NOT EXISTS pergunta(
    id INTERGER NOT NULL auto-increment,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    PRIMARY KEY(id)
)
*/