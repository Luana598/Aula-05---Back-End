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
const controllerGenero = require('./controller/genero/controller_genero.js') 
const controllerProdutora = require('./controller/produtora/controller_produtora.js') 

//ENDPOINTS

//função 01 - lista todos os filmes
app.get('/v1/locadora/filme', cors(), async function(request, response){

    //chama a função para listar os filmes do DB
    let filme =  await controllerFilme.listarFilmes()

    response.status(filme.status_code)

    response.json(filme)
})

//função 02 - filtra um filme pelo ID
app.get('/v1/locadora/filme/:id', cors(), async function(request, response){

    let idFilme = request.params.id

    //chama a função para listar os filmes do DB
    let filme =  await controllerFilme.buscarFilmeID(idFilme)

    response.status(filme.status_code)

    response.json(filme)
})

//função 03 - insere um novo filme
app.post('/v1/locadora/filme', cors(), bodyParserJSON, async function(request, response){

    //recebe os dados do corpo (body) da requisição
    //---- se você utilizar o bodyParser, é obrigatório ter no endPoint----
    let dadosBody = request.body
    
    //recebe o tipo de dados da requisição (JSON, XML, etc)
    let contentType = request.headers['content-type']

    //chama a função para inserir novos filmes do DB, encaminha os dados do body e o content-type
    let filme =  await controllerFilme.inserirFilme(dadosBody, contentType)

    response.status(filme.status_code)

    response.json(filme)
})

//função 04 - atualiza um filme existente
app.put('/v1/locadora/filme/:id', cors(), bodyParserJSON, async function(request, response){

    //recebe os dados do corpo (body) da requisição
    //---- se você utilizar o bodyParser, é obrigatório ter no endPoint----
    let dadosBody = request.body
    //recebe o id do filme
    let idFilme = request.params.id
    //recebe o tipo de dados da requisição (JSON, XML, etc)
    let contentType = request.headers['content-type']


    //chama a função para atualizar filmes do DB, encaminha os dados do body, do id e o content-type
    let filme =  await controllerFilme.atualizarFilme(dadosBody, idFilme, contentType)

    response.status(filme.status_code)

    response.json(filme)
})

//função 05 - deletar filmes
app.delete('/v1/locadora/filme/:id', cors(), async function(request, response){

    //recebe o id do filme
    let idFilme = request.params.id 

    //chama a função para listar os filmes do DB
    let filme =  await controllerFilme.excluirFilme(idFilme)

    response.status(filme.status_code)

    response.json(filme)
})

//end-points da tabela de Gêneros

//função 01 - lista todos os generos
app.get('/v1/locadora/generos', cors(), async function(request, response){

    //chama a função para listar os filmes do DB
    let genero =  await controllerGenero.listarGeneros()

    response.status(genero.status_code)

    response.json(genero)

})

//função 02 - filtra um genero pelo ID
app.get('/v1/locadora/genero/:id', cors(), async function(request, response){

    let idGenero = request.params.id

    //chama a função para listar os filmes do DB
    let genero =  await controllerGenero.buscarGeneroID(idGenero)

    response.status(genero.status_code)

    response.json(genero)
})

//função 03 - insere um novo genero
app.post('/v1/locadora/genero', cors(), bodyParserJSON, async function(request, response){

    //recebe os dados do corpo (body) da requisição
    //---- se você utilizar o bodyParser, é obrigatório ter no endPoint----
    let dadosBody = request.body
    
    //recebe o tipo de dados da requisição (JSON, XML, etc)
    let contentType = request.headers['content-type']

    //chama a função para inserir novos filmes do DB, encaminha os dados do body e o content-type
    let genero =  await controllerGenero.inserirGenero(dadosBody, contentType)

    response.status(genero.status_code)

    response.json(genero)
})

//função 04 - atualiza um genero existente
app.put('/v1/locadora/genero/:id', cors(), bodyParserJSON, async function(request, response){

    //recebe os dados do corpo (body) da requisição
    //---- se você utilizar o bodyParser, é obrigatório ter no endPoint----
    let dadosBody = request.body
    //recebe o id do filme
    let idGenero = request.params.id
    //recebe o tipo de dados da requisição (JSON, XML, etc)
    let contentType = request.headers['content-type']


    //chama a função para atualizar generos do DB, encaminha os dados do body, do id e o content-type
    let genero =  await controllerGenero.atualizarGenero(dadosBody, idGenero, contentType)

    response.status(genero.status_code)

    response.json(genero)
})

//Função 05 - exclui um gênero existente
app.delete('/v1/locadora/genero/:id', cors(), async function (request, response) {
    let idGenero = request.params.id

    let genero = await controllerGenero.excluirGenero(idGenero)

    response.status(genero.status_code)
    response.json(genero)
})

//Endpoints para as rotas de produtoras

//Função 01 - retorna a lista de produtoras
app.get('/v1/locadora/produtoras', cors(), async function (request, response) {
    //Chama a função para listar produtoras do banco de dados
    let produtoras = await controllerProdutora.listarProdutora()
    response.status(produtoras.status_code)
    response.json(produtoras)
})

//Função 02 - retorna a produtora filtrando pelo id
app.get('/v1/locadora/produtora/:id', cors(), async function (request, response) {
    //Recebe o id encaminhado via parâmetro na requisição
    let idProdutoras = request.params.id

    //Chama a função para listar diretores do banco de dados
    let produtoras = await controllerProdutora.buscarProdutoraId(idProdutoras)
    response.status(produtoras.status_code)
    response.json(produtoras)
})

//Funçaõ 03 - insere uma nova produtora
app.post('/v1/locadora/produtoras', cors(), bodyParserJSON, async function (request, response) {
    //Recebe os dados do body da requisição (Se voce utilizar o bodyparse, é obrigatório ter no endpoint)
    let dadosBody = request.body

    //Recebe o tipo de dados da requisição (JSON, XML ou outros formatos)
    let contentType = request.headers['content-type']

    //Chama a função da controller para inserir na produtora, encaminha os dados e o content-type
    let produtoras = await controllerProdutora.inserirProdutora(dadosBody, contentType)

    response.status(produtoras.status_code)
    response.json(produtoras)
})



//Start na API
app.listen(PORT, function(){
    console.log('API aguardando requisições...')
}) 
