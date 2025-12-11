/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela criação dos endpoints de atores
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

const controllerAtor = require('../controller/ator/controller_atores.js')

//Endpoints para as rotas de atores

//Função 01 - retorna a lista de atores
router.get('/', cors(), async function (request, response) {
 
    let atores = await controllerAtor.listarAtores()
    response.status(atores.status_code)
    response.json(atores)
})

//Função 02 - retorna o ator filtrando pelo id
router.get('/:id', cors(), async function (request, response) {

    let idAtores = request.params.id

    let atores = await controllerAtor.buscarAtorId(idAtores)
    response.status(atores.status_code)
    response.json(atores)
})

//Funçaõ 03 - insere um novo ator
router.post('/', cors(), bodyParserJSON, async function (request, response) {
    //Recebe os dados do body da requisição (Se voce utilizar o bodyparse, é obrigatório ter no endpoint)
    let dadosBody = request.body

    //Recebe o tipo de dados da requisição (JSON, XML ou outros formatos)
    let contentType = request.headers['content-type']

    let atores = await controllerAtor.inserirAtor(dadosBody, contentType)

    response.status(atores.status_code)
    response.json(atores)
})

//Função 04 - atualiza um ator existente
router.put('/:id', cors(), bodyParserJSON, async function (request, response) {

    let idAtores = request.params.id

    //Recebe os dados do body da requisição (Se voce utilizar o bodyparse, é obrigatório ter no endpoint)
    let dadosBody = request.body

    //Recebe o tipo de dados da requisição
    let contentType = request.headers['content-type']

    let atores = await controllerAtor.atualizarAtor(dadosBody, idAtores, contentType)

    response.status(atores.status_code)
    response.json(atores)
})

//Função 05 - exclui um ator existente
router.delete('/:id', cors(), async function (request, response) {
    let idAtores = request.params.id

    let atores = await controllerAtor.excluirAtor(idAtores)

    response.status(atores.status_code)
    response.json(atores)
})

module.exports = router;

