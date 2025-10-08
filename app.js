/************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições da API da locadora de filmes
 * Data: 07/10/2025
 * Autor: Luana M. Lopes Bomfim
 * Versão: 1.0
 ************************************************************************************************************************************/

//dependências da API
const express    = require('express')    //Responsável pela API
const cors       = require('cors')       //Responsável pelas permissões da API (APP)  
const bodyParser = require('body-parser')//Responsável por gerenciar a chegada dos dados da API com o front-end

//criando uma instância de uma classe do express
const app = express()

//retorna a porta do servidor atual ou colocamos uma porta local
const PORT = process.PORT || 8080

//configuração de permissões da API pelo cors
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET')
   
    app.use(cors())

    next() 
})


//Import das contollers
const controllerFilme = require('./controller/filme/controller_filme.js') 

//ENDPOINTS

//função 01
app.get('/v1/locadora/filme', cors(), async function(request, response){

    //chama a função para listar os filmes do DB
    let filme =  await controllerFilme.listarFilmes()

    response.status(filme.status_code)

    response.json(filme)
})

//função 02
app.get('/v1/locadora/filme/:id', cors(), async function(request, response){

    let idFilme = request.params.id

    //chama a função para listar os filmes do DB
    let filme =  await controllerFilme.buscarFilmeID(idFilme)

    response.status(filme.status_code)

    response.json(filme)
})


//Start na API
app.listen(PORT, function(){
    console.log('API aguardando requisições...')
}) 
