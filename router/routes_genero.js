/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela criação dos endpoints de filmes
 * Data: 08/12/2025
 * Autor: Luana M. Lopes Bomfim
 * Versão: 1.0
 *******************************************************************************************************************************************************************/
//Import das dependencias da API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//Cria um objeto especialista no formato JSON para receber dados via POST e PUT
const bodyParserJSON = bodyParser.json()

const router = express.Router()

const controllerGenero = require('../controller/genero/controller_genero.js')


//função 01 - lista todos os generos
router.get('/', cors(), async function(request, response){

    //chama a função para listar os filmes do DB
    let genero =  await controllerGenero.listarGeneros()

    response.status(genero.status_code)

    response.json(genero)

})

//função 02 - filtra um genero pelo ID
router.get('/:id', cors(), async function(request, response){

    let idGenero = request.params.id

    //chama a função para listar os filmes do DB
    let genero =  await controllerGenero.buscarGeneroID(idGenero)

    response.status(genero.status_code)

    response.json(genero)
})

//função 03 - insere um novo genero
router.post('/', cors(), bodyParserJSON, async function(request, response){

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
router.put('/:id', cors(), bodyParserJSON, async function(request, response){

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
router.delete('/:id', cors(), async function (request, response) {
    let idGenero = request.params.id

    let genero = await controllerGenero.excluirGenero(idGenero)

    response.status(genero.status_code)
    response.json(genero)
})

module.exports = router;