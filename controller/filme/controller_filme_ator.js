/********************************************************************************************************
* Objetivo: Arquivo responsável pela manipulação e dados entre o app e a model para o crud na relação entre filme e ator.
* Data: 12/11/2025
* Autor: Luana Mariana Lopes Bomfim
* Versão: 1.0
*********************************************************************************************************/
//Import da model do DAO da tbl filme_ator
const filmeAtorDAO = require('../../model/DAO/filme_ator.js')

//Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

//Retorna uma lista de todos os relacionamentos filme/ator
const listarFilmesAtores = async function () {
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Chama a função do DAO para retornar a lista de atoress do banco de dados
        let resultFilmesAtores = await filmeAtorDAO.getSelectAllMoviesActors()

        if (resultFilmesAtores) {
            if (resultAtores.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.filmes_atores = resultFilmesAtores

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

//Retorna uma relação de filme/ator filtrando pelo id
const buscarFilmeAtorId = async function (id) {
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultFilmesAtores = await filmeAtorDAO.getSelectMoviesByIdActor(Number(id))

            if (resultFilmesAtores) {
                if (resultFilmesAtores.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filmes_atores = resultFilmesAtores

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


//Retorna um ator filtrando pelo filme
const listarAtoresIdFilme = async function (idFilme) {
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do ID
        if (!isNaN(idFilme) && idFilme != '' && idFilme != null && idFilme > 0) {
            let resultFilmesAtores = await filmeAtorDAO.getSelectActorsByIdMovies(Number(idFilme))
          
            if (resultFilmesAtores) {
                if (resultFilmesAtores.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filmes_atores = resultFilmesAtores

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

//Retorna uma relação filme/ator filtrando pelos atores
const listarFilmesIdAtores = async function (idAtor) {
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(idAtor) && idAtor != '' && idAtor != null && idAtor > 0) {
            let resultFilmesAtores = await filmeAtorDAO.getSelectMoviesByIdActor(Number(idGenero))

            if (resultFilmesAtores) {
                if (resultFilmesAtores.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filmes_atores = resultFilmesAtores

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

//Insere um filme
const inserirFilmeAtor = async function (filmeAtor, contentType) {
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            //Chama a função de validar todos os dados filme
            let validar = await validarDadosFilmeAtor(filmeAtor)

            if (!validar) {

                //Processamento
                //Chama a função para inserir um novo filme no banco de dados
                let resultFilmesAtores = await filmeAtorDAO.setInsertMovieActors(filmeAtor)
               
                if (resultFilmesAtores) {

                    //Chama a função para receber o id gerado no banco de dados
                    let lastId = await filmeAtorDAO.getSelectLastId()
                    if (lastId) {

                        filmeAtor.id = lastId
                        MESSAGES.DEFAULT_HEADER.status          = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code     = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message         = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items           = filmeAtor

                        return MESSAGES.DEFAULT_HEADER //201
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {
                return validar //400
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Atualiza um filme filtrando pelo id
const atualizarFilmeAtor = async function (filmeAtor, id, contentType) {
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do tipo de requisição (Obrigatório ser um JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            //Chama a função de validar todos os dados filme
            let validar = await validarDadosFilmeAtor(filmeAtor)

            if (!validar) {
                //Validação para verificar se o id existe no banco de dados
                let validarId = await buscarFilmeAtorId(id)

                if (validarId.status_code == 200) {
                    //Adiciona o id do filme no JSON de dados para ser encaminhada ao DAO
                    filmeAtor.id = Number(id)

                    //Chama a função para inserir um novo filme no banco de dados
                    let resultFilmesAtores = await filmeAtorDAO.setUpdateMovieActors(filmeAtor)

                    if (resultFilmesAtores) {

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.filmes_ator = filmeAtor

                        return MESSAGES.DEFAULT_HEADER //200
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return validarId //A função buscarFilmeId poderá retornar 400, 404 ou 500
                }
            } else {
                return validar //400 referente a validação dos dados
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Exclui um filme buscando pelo ID
const excluirFilmeAtor = async function(id){
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        //Validação da chegada do ID
        if(!isNaN(id) && id != '' && id != null && id > 0){

                let resultFilmesAtores = await filmeAtorDAO.setDeleteMovieActors(Number(id))

                if(resultFilmesAtores){

                    MESSAGES.DEFAULT_HEADER.status          = MESSAGES.SUCESS_DELETED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code     = MESSAGES.SUCESS_DELETED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message         = MESSAGES.SUCESS_DELETED_ITEM.message
                    delete MESSAGES.DEFAULT_HEADER.items

                    return MESSAGES.DEFAULT_HEADER //200
                    
                }else{
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
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

//Validação dos dados de cadastro e atualização do filme
const validarDadosFilmeAtor = async function (filmeAtor) {
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    //Validação de entrada de todos os atributos
    if (isNaN((filmeAtor.id_filme) ||  filmeAtor.id_filme <= 0 || filmeAtor.id_filme == '' || filmeAtor.id_filme == undefined || filmeAtor.id_filme == null)) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += `[Id_filme incorreto]`
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }  else if(isNaN((filmeAtor.id_ator) ||  filmeAtor.id_ator <= 0 || filmeAtor.id_ator == '' || filmeAtor.id_ator == undefined || filmeAtor.id_ator == null)) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += `[Id_ator incorreto]`
            return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}

module.exports = {
    listarFilmesAtores,
    buscarFilmeAtorId,
    listarAtoresIdFilme,
    listarFilmesIdAtores,
    inserirFilmeAtor,
    atualizarFilmeAtor,
    excluirFilmeAtor,
    validarDadosFilmeAtor
}