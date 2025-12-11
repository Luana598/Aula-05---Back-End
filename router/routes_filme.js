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

const controllerFilme = require('../controller/filme/controller_filme.js')

//função 01 - lista todos os filmes
router.get('/', cors(), async function(request, response){

    //chama a função para listar os filmes do DB
    let filme =  await controllerFilme.listarFilmes()

    response.status(filme.status_code)

    response.json(filme)
})

//função 02 - filtra um filme pelo ID
router.get('/:id', cors(), async function(request, response){

    let idFilme = request.params.id

    //chama a função para listar os filmes do DB
    let filme =  await controllerFilme.buscarFilmeID(idFilme)

    response.status(filme.status_code)

    response.json(filme)
})

//função 03 - insere um novo filme
router.post('/', cors(), bodyParserJSON, async function(request, response){

    //recebe os dados do corpo (body) da requisição
    //---- se você utilizar o bodyParser, é obrigatório ter no endPoint----
    let dadosBody = request.body
    
    //recebe o tipo de dados da requisição (JSON, XML, etc)
    let contentType = request.headers['content-type']

    let filme =  await controllerFilme.inserirFilme(dadosBody, contentType)

    response.status(filme.status_code)

    response.json(filme)
})

//função 04 - atualiza um filme existente
router.put('/:id', cors(), bodyParserJSON, async function(request, response){

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
router.delete('/:id', cors(), async function(request, response){

    //recebe o id do filme
    let idFilme = request.params.id 

    //chama a função para listar os filmes do DB
    let filme =  await controllerFilme.excluirFilme(idFilme)

    response.status(filme.status_code)

    response.json(filme)
})

module.exports = router;