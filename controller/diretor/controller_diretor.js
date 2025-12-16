/********************************************************************************************************
* Objetivo: Arquivo responsável pela manipulação e dados entre o app e a model para o crud de diretores.
* Data: 04/11/2025
* Autor: Luana M. Lopes Bomfim
* Versão: 1.0
*********************************************************************************************************/

const { Prisma } = require('@prisma/client')
const diretorDAO = require('../../model/DAO/diretor.js')

//Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

//Retorna uma lista de todos os diretores
const listarDiretores = async function () {
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Chama a função do DAO para retornar a lista de diretores do banco de dados
        let resultDiretores = await diretorDAO.getSelectAllDirectors()

        if (resultDiretores) {
            if (resultDiretores.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.diretores = resultDiretores

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

//Retorna um diretor filtrando pelo ID
const buscarDiretorId = async function (id) {

    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let resultDiretor = await diretorDAO.getSelectDirectorById(id)

            if (resultDiretor) {
                if (resultDiretor.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.diretor = resultDiretor

                    return MESSAGES.DEFAULT_HEADER
                } else {
                    return MESSAGES.ERROR_NOT_FOUND // 404
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID Incorreto!]'
            return MESSAGES.ERROR_REQUIRED_FIELDS // 400
        }
    } catch (error) {
        
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Insere um diretor
const inserirDiretor = async function (diretor, contentType) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do tipo de conteúdo da requisição (OBRIGATÓRIO SER UM JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosDiretor(diretor)

            if (!validar) {
                //Processamento
                //Chama a função para inserir um novo diretor no banco de dados
                let resultDiretor = await diretorDAO.setInsertDirector(diretor)
                
                if (resultDiretor) {
                    //Chama a função para receber o ID gerado no BD
                    let lastId = await diretorDAO.getSelectLastId()
        
                    if (lastId) {
                        //Adiciona o ID no JSON de dados do diretor
                        diretor.diretor_id = lastId

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = diretor

                        return MESSAGES.DEFAULT_HEADER //201
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                }
            } else {
                return validar // 400
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

//Atualiza um diretor
const atualizarDiretor = async function (diretor, id, contentType) {

    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do tipo de conteúdo da requisição (OBRIGATÓRIO SER UM JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            //Chama a função de validar todos os dados
            let validar = await validarDadosDiretor(diretor)

            if (!validar) {

                //Validação do ID, chamando a Controller que verifica no BD se o ID existe e valida o ID
                let validarId = await buscarDiretorId(id)

                if (validarId.status_code == 200) {

                    //Adiciona o ID do diretor no JSON de dados para ser encaminhado ao DAO
                    diretor.diretor_id = Number(id)

                    //Processamento
                    //Chama a função para atualizar um diretor no banco de dados
                    let resultDiretor = await diretorDAO.setUpdateDirector(diretor)

                    if (resultDiretor) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.diretor = diretor

                        return MESSAGES.DEFAULT_HEADER //200
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }
                } else {
                    return validarId // A função buscarDiretorId poderá retornar um erro 400, 404 ou 500
                }
            } else {
                return validar // 400
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}


//Exclui um diretor
const excluirDiretor = async function (id) {
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let validarId = await buscarDiretorId(id)

            if (validarId.status_code == 200) {

                //Chama a função do DAO
                let resultDiretor = await diretorDAO.setDeleteDirector(Number(id))

                if (resultDiretor) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message

                    delete MESSAGES.DEFAULT_HEADER.response

                    return MESSAGES.DEFAULT_HEADER //200
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                }
            } else {
                return MESSAGES.ERROR_NOT_FOUND // 404
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID Incorreto!]'
            return MESSAGES.ERROR_REQUIRED_FIELDS // 400
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const validarDadosDiretor = async function (diretor) {

    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (diretor.nome == '' || diretor.nome == null || diretor.nome == undefined || diretor.nome.length > 150) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nome incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (diretor.data_nascimento == '' || diretor.data_nascimento == null || diretor.data_nascimento == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Data de nascimento incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (diretor.nacionalidade == '' || diretor.nacionalidade == null || diretor.nacionalidade == undefined || diretor.nacionalidade.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nacionalidade incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (diretor.biografia == '' || diretor.biografia == null || diretor.biografia == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Biografia incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (diretor.foto_url == '' || diretor.foto_url == null || diretor.foto_url == undefined || diretor.foto_url.length > 255) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Foto incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}

module.exports = {
    listarDiretores,
    buscarDiretorId,
    inserirDiretor, 
    atualizarDiretor,
    excluirDiretor
}