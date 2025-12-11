/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela criação dos endpoints de classificacao indicativa
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

const controllerClassificacao = require('../controller/classificacao/controller_classificacao.js')

//Lista todas as classificacoes
router.get('/', cors(), async function (request, response) {

    let classificacao = await controllerClassificacao.listarClassificacoes()

    response.status(classificacao.status_code).json(classificacao)
})

//Filtra uma classificacao pelo ID
router.get('/:id', cors(), async function (request, response) {

    let idClassificacao = request.params.id

    let classificacao = await controllerClassificacao.buscarClassificacaoId(idClassificacao)

    response.status(classificacao.status_code).json(classificacao)
})

//Insere uma classificacao
router.post('/', cors(), bodyParserJSON, async function (request, response) {
    //Recebe os dados do body da requisição (se utilizar o bodyParser, é obrigatório ter no EndPoint)
    let dadosBody = request.body
    //Recebe o tipo de dado da requisição (JSON ou XML)
    let contentType = request.headers['content-type']

    let classificacao = await controllerClassificacao.inserirClassificacao(dadosBody, contentType)

    response.status(classificacao.status_code).json(classificacao)
})

//Atualiza uma classificacao
router.put('/:id', cors(), bodyParserJSON, async function (request, response) {

    let idClassificacao = request.params.id

    let dadosBody = request.body
    //Recebe o tipo de dado da requisição (JSON ou XML)
    let contentType = request.headers['content-type']

    let classificacao = await controllerClassificacao.atualizarClassificacao(dadosBody, idClassificacao, contentType)

    response.status(classificacao.status_code).json(classificacao)
})

//Deleta uma classificacao
router.delete('/:id', cors(), async function (request, response) {

    let idClassificacao = request.params.id

    let classificacao = await controllerClassificacao.excluirClassificacao(idClassificacao)

    response.status(classificacao.status_code).json(classificacao)
})

module.exports = router;