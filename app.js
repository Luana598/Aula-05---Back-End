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

//Criando um objeto especialista no formato JSON para obter dados via POST e PUT
const bodyParserJSON = bodyParser.json() 

//criando uma instância de uma classe do express
const app = express()

// Faz o node conseguir ler variaves presentes no arquivo .env
require('dotenv').config();

//retorna a porta do servidor atual ou colocamos uma porta local
const PORT = process.PORT || 8080

//configuração de permissões da API pelo cors
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET')
   
    app.use(cors())

    next() 
})

// Import das rotas
const classificationRoute = require('./router/routes_classificacao.js')
const actorRoute = require('./router/routes_ator.js')
const movieRoute = require('./router/routes_filme.js')
const genderRoute = require('./router/routes_genero.js')

// ENDPOINT's
// FILME
app.use('/v1/locadora/filme/', cors(), bodyParserJSON, movieRoute)
// CLASSIFICACAO
app.use('/v1/locadora/classificacao/', cors(), bodyParserJSON, classificationRoute)
// ATORES
app.use('/v1/locadora/atores/', cors(), bodyParserJSON,  actorRoute)
//GENERO
app.use('/v1/locadora/genero/', cors(), bodyParserJSON,  genderRoute)




//Start na API
app.listen(PORT, function(){
    console.log('API aguardando requisições...')
}) 
