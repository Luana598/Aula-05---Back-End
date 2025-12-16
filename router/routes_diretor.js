/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela criação dos endpoints de diretores
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

const controllerDiretor = require('../controller/diretor/controller_diretor.js')

//Lista todos os diretores
router.get('/', cors(), async function (request, response) {

    let diretores = await controllerDiretor.listarDiretores()

    response.status(diretores.status_code).json(diretores)
})

//Filtra um diretor pelo ID
router.get('/:id', cors(), async function (request, response) {

    let idDiretor = request.params.id

    let diretor = await controllerDiretor.buscarDiretorId(idDiretor)

    response.status(diretor.status_code).json(diretor)
})

//Insere um diretor
router.post('/', cors(), bodyParserJSON, async function (request, response) {
    //Recebe os dados do body da requisição (se utilizar o bodyParser, é obrigatório ter no EndPoint)
    let dadosBody = request.body
    //Recebe o tipo de dado da requisição (JSON ou XML)
    let contentType = request.headers['content-type']

    let diretor = await controllerDiretor.inserirDiretor(dadosBody, contentType)

    response.status(diretor.status_code).json(diretor)
})

//Atualiza um diretor
router.put('/:id', cors(), bodyParserJSON, async function (request, response) {

    let idDiretor = request.params.id

    let dadosBody = request.body
    //Recebe o tipo de dado da requisição (JSON ou XML)
    let contentType = request.headers['content-type']

    let diretor = await controllerDiretor.atualizarDiretor(dadosBody, idDiretor, contentType)

    response.status(diretor.status_code).json(diretor)
})

//Deleta um diretor
router.delete('/:id', cors(), async function (request, response) {

    let idDiretor = request.params.id

    let diretor = await controllerDiretor.excluirDiretor(idDiretor)

    response.status(diretor.status_code).json(diretor)
})

module.exports = router;