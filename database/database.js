const Sequelize = require("sequelize"); //sequelize permite usar javascript ao inves de sql na manipulação de tabelas

//conectando ao bd
const connection = new Sequelize('GuiaPerguntas','root','123456',{    //nome do banco de dados, usuario, senha
    host:'localhost',  //onde está rodando
    dialect:'mysql'    //qual tipo de base de dados
});

module.exports = connection;