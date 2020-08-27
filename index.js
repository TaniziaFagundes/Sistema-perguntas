const express = require("express")
const app = express()

//estou informando para o express usar o ejs como view engine(renderizador de html)
app.set('view engine','ejs');
app.use(express.static('public')); //definindo arquivos staticos (explicação na aula 28 secao 05)

app.get("/:nome/:lang", function(req, resp){
    var nome = req.params.nome;
    var lang = req.params.lang;
    var exibirMsg = true;
    var produtos =  [ 
        {nome: "doritos", valor:3.14},
        {nome: "coca-cola", valor:5.50},
        {nome: "leite", valor:3}
    ]

    resp.render("index",{
        nome: nome,
        lang: lang,
        empresa: "guia do programador",
        msg: exibirMsg,
        produtos: produtos
    }); //render = renderizar o html=ejs (não precisa colocar o diretorio completo (views/index),pois automaticamente ele olha dentro da pasta views)
});

app.listen(8080,()=> { console.log("app rodando!")});