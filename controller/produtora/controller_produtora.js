/********************************************************************************************************
* Objetivo: Arquivo responsável pela manipulação e dados entre o app e a model para o crud de produtora.
* Data: 04/11/2025
* Autor: Luana M. Lopes Bomfim
* Versão: 1.0
*********************************************************************************************************/

//Import da model do DAO do filme
const produtoraDAO = require('../../model/DAO/produtora.js')

//Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

//Retorna uma lista de todos as produtoras
const listarProdutora = async function () {
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Chama a função do DAO para retornar a lista de produtoras do banco de dados
        let resultProdutoras = await produtoraDAO.getSelectAllProducers()

        if (resultProdutoras) {
            if (resultProdutoras.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.produtoras = resultProdutoras

                return MESSAGES.DEFAULT_HEADER //200
            } else {
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Retorna uma produtora filtrando pelo id
const buscarProdutoraId = async function (id) {
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultProdutoras = await produtoraDAO.getProducerById(Number(id))

            if (resultProdutoras) {
                if (resultProdutoras.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.produtoras = resultProdutoras

                    return MESSAGES.DEFAULT_HEADER //200
                } else {
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[id incorreto!]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Insere uma nova produtora
const inserirProdutora = async function (produtora, contentType) {
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Validação de entrada de todos os atributos da produtora
            if (produtora.nome == '' || produtora.nome == undefined || produtora.nome == null || produtora.nome.length > 100 ||
                produtora.nome_fantasia == '' || produtora.nome_fantasia == undefined || produtora.nome_fantasia == null ||
                !produtora.data_fundacao || produtora.data_fundacao.length != 10 ||
                produtora.descricao == undefined ||
                produtora.site == undefined ||
                produtora.pais_origem == undefined ||
                typeof produtora.ativa != 'boolean'
            ) {
                return MESSAGES.ERROR_REQUIRED_FIELDS // 400
            } else {

                let resultProdutora = await produtoraDAO.setInsertProducer(produtora)

                if (resultProdutora) {

                    let lastId = await produtoraDAO.getSelectLastId()

                    if (lastId) {
                        produtora.id = lastId
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = produtora

                        return MESSAGES.DEFAULT_HEADER //201
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const atualizarProdutora = async function (produtora, id, contentType) {
    
}

module.exports = {
    listarProdutora,
    buscarProdutoraId,
    inserirProdutora
}