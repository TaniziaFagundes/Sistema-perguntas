const express = require("express")
const app = express()
const bodyparser = require("body-parser"); //body-parser biblioteca express que captura os dados enviados pelo frontend(aula 37)
const connection = require("./database/database") ; //importando conexão com o banco de dados
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

//DATABASE

connection
    .authenticate()
    .then(() => {  //se autenticação ocorreu com sucesso
        console.log("Conexão com base de dados concluida com sucesso!")
    })
    .catch((msgErro) => { //senão
        console.log(msgErro)
    })

//estou informando para o express usar o ejs como view engine(renderizador de html)
app.set('view engine','ejs');
app.use(express.static('public')); //definindo arquivos staticos (explicação na aula 28 secao 05)

//BODY-PARSER
app.use(bodyparser.urlencoded({extended: false})); //configurando o body-parser para traduzir para o node os dados recebidos do front(aula 37)
app.use(bodyparser.json()); //dados de formulario enviados via json(só será usado quando for trabalhar com API)


//ROTAS
app.get("/", function(req, resp){
    Pergunta.findAll({raw:true, order:[
        ['id','DESC']            //ORDENANDO!!  ASC = CRESCENTE | DESC = DECRESCENTE
    ]}).then(perguntas => {     //equivalente a SELECT *ALL FROM perguntas
        resp.render("index", {
            perguntas : perguntas
        });

    });   
     //render = renderizar o html=ejs (não precisa colocar o diretorio completo (views/index),pois automaticamente ele olha dentro da pasta views)
});

app.get("/perguntar", (req, resp) => {
    resp.render("perguntar");
});

app.post("/salvarpergunta",(req,resp) => { //post é usado para receber dados do form
    var titulo = req.body.titulo;         //body é do body-parser
    var desc = req.body.descricao;
    Pergunta.create({                    //equivalente ao insert sql
        titulo:titulo,
        descricao: desc
    }).then(()=>{     //se dados salvos com sucesso redireciona para a pagina principal.
        resp.redirect("/");
    })                
});

app.get("/pergunta/:id", (req, resp) => {
    var id = req.params.id;
    Pergunta.findOne({ where: {id:id}}).then(pergunta => {
        if(pergunta != undefined){ //entra se a pergunta for achada

            Resposta.findAll({
                where: {perguntaId: pergunta.id}, order:[['id', 'DESC']]}).then(respostas => {
                resp.render("pergunta",{
                    pergunta: pergunta,
                    respostas:respostas
                });
            });
        }else{ //pergunta não encontrada
            resp.redirect("/");
        }
    })
});

app.post("/responder",(req,resp) => {  //aula 50
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        resp.redirect("/pergunta/" + perguntaId)
    });
})


app.listen(8080,()=> { console.log("app rodando!")});