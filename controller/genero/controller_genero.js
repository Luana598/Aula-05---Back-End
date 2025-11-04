/************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo manipulação de dados entre o APP e a MODEL par o CRUD de gêneros
 * Data: 07/10/2025
 * Autor: Luana M. Lopes Bomfim
 * Versão: 1.0
 ************************************************************************************************************************************/


//Import da model do DAO do filme
const generoDAO = require('../../model/DAO/genero.js')
//Import do arquivos de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

const listarGeneros = async function () {

    //criando um novo objeto para modificar a mensagem padrão
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //chama a função do DAO para retornar a lista de filmes do BD
        let resultGenders = await generoDAO.getSelectAllGenders()

        if (resultGenders) {

            if (resultGenders.length > 0) {

                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.genero = resultGenders


                return MESSAGES.DEFAULT_HEADER//200
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

const buscarGeneroID = async function (id) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação da chegada do ID
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultGender = await generoDAO.getSelectGenderById(Number(id))

            if (resultGender) {
                if (resultGender.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.genero = resultGender

                    return MESSAGES.DEFAULT_HEADER //200

                } else {
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }


}

const inserirGenero = async function (genero, contentType) {

    //criando um novo objeto para modificar a mensagem padrão
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            if (genero.nome != '' || genero.nome != undefined || genero.nome != null || genero.nome.length < 100) {

                let resultGender = await generoDAO.setInsertGender(genero)

                if (resultGender) {

                    //Chama a função para receber o ID gerado no Banco
                    let lastID = await generoDAO.getSelectLastId()

                    if (lastID) {

                        genero.id = lastID
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = genero

                        return MESSAGES.DEFAULT_HEADER //201
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }

            } else {

                MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nome incorreto]'
                return MESSAGES.ERROR_REQUIRED_FIELDS

            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

const atualizarGenero = async function (genero, id, contentType) {

    //criando um novo objeto para modificar a mensagem padrão
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        //Validação do tipo da requisição (TEM QUE SER JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            //validação dos dados do genero
            if (genero.nome != '' || genero.nome != undefined || genero.nome != null || genero.nome.length < 100) {

                //validando a existência do ID no Banco de Dados
                //com a função 'buscarGeneroID()'
                let validarID = await buscarGeneroID(id)

                if (validarID.status_code == 200) {

                    //Adiciona o id do genero no JSON de dados para ser encaminhado ao DAO
                    genero.id = Number(id)

                    //Processamento
                    //chama a função do model para atualizar um genero no BD
                    let resultGender = await generoDAO.setUpdateGender(genero)
                    if (resultGender) {

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.genero = genero

                        return MESSAGES.DEFAULT_HEADER //200

                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    return validarID //retorna erros da função buscarGeneroID()
                }

            } else {
                MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
                return MESSAGES.ERROR_REQUIRED_FIELDS //400
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Exclui um genero buscando pelo ID
const excluirGenero = async function(id){
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        //Validação da chegada do ID
        if(!isNaN(id) && id != '' && id != null && id > 0){

            //Validação de ID válido, chama a função da controller que verifica no BD se o ID existe e valida o ID
            let validarId = await buscarGeneroID(id)

            if(validarId.status_code == 200){

                let resultGeneros = await generoDAO.setDeleteGender(Number(id))

                if(resultGeneros){

                    MESSAGES.DEFAULT_HEADER.status          = DEFAULT_MESSAGES.SUCCESS_DELETED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code     = DEFAULT_MESSAGES.SUCCESS_DELETED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message         = DEFAULT_MESSAGES.SUCCESS_DELETED_ITEM.message

                    return MESSAGES.DEFAULT_HEADER //200
                    
                }else{
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }else{
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        }else{
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [id incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        //console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}



module.exports = {
    listarGeneros,
    buscarGeneroID,
    inserirGenero,
    atualizarGenero,
    excluirGenero
}