/************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo manipulação de dados entre o APP e a MODEL par o CRUD de filmes
 * Data: 07/10/2025
 * Autor: Luana M. Lopes Bomfim
 * Versão: 1.0
 ************************************************************************************************************************************/

//Import da model do DAO do filme
const filmeDAO = require('../../model/DAO/filme.js')
//Import do arquivos de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

//Import da controller de relação entre filme e gênero
const controllerFilmeGenero = require('./controller_filme_genero.js')

// Retorna uma lista de todos os filmes
const listarFilmes = async function () {

    //criando um novo objeto para modificar a mensagem padrão
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //chama a função do DAO para retornar a lista de filmes do BD
        let resultFilmes = await filmeDAO.getSelectAllMovies()

        if (resultFilmes) {

            if (resultFilmes.length > 0) {

                //Processamento para adicionar os gêneros aos filmes
                for (filme of resultFilmes){
                    let resultGeneros = await controllerFilmeGenero.listarGenerosIdFilme(filme.filme_id)

                    if (resultGeneros.status_code == 200)
                       filme.genero = resultGeneros.items.filmes_genero
                }
                //

                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.filmes = resultFilmes

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

//encontra um filme pelo ID
const buscarFilmeID = async function (id) {
    //criando um novo objeto para modificar a mensagem padrão
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //VAlidação da chegada do ID
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultFilmes = await filmeDAO.getSelectMoviesById(Number(id))

            if (resultFilmes) {
                
                if (resultFilmes.length > 0) {

                    for (filme of resultFilmes){
                        let resultGeneros = await controllerFilmeGenero.listarGenerosIdFilme(filme.filme_id)
    
                        if (resultGeneros.status_code == 200)
                           filme.genero = resultGeneros.items.filmes_genero
                    }

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filme = resultFilmes
          

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

//Insere um filme
const inserirFilme = async function (filme, contentType) {

    //criando um novo objeto para modificar a mensagem padrão
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            //chama a função de validação dos dados do filme
            let validar = await validarDadosFilme(filme)

            if (!validar) {
                //Processamento
                //chama a função do model para inserir um novo filme no BD
                let resultFilmes = await filmeDAO.setInsertMovies(filme)

                if (resultFilmes) {

                    //Chama a função para receber o ID gerado no Banco
                    let lastID = await filmeDAO.getSelectLastId()

                    
                    if (lastID) {

                          //Processar a inserção de dados na tabela de relação entre filme e gênero
                          //entre filme e Gênero

                          //subsituindo forEach por forOf para respeitar o tempo do async e retornar os nomes e IDs dos
                          for(genero of filme.genero){
                          //filme.genero.forEach(async function(genero){
                            let filmeGenero = {id_filme: lastID, id_genero: genero.id}

                            //Encaminha o JSON com o ID do filme e do gênero para a controller FilmeGenero
                            let resultFilmeGenero = await controllerFilmeGenero.inserirFilmeGenero(filmeGenero, contentType)
                            //console.log(resultFilmeGenero)

                            if(resultFilmeGenero.status_code != 201)
                                return MESSAGES.ERROR_RELATIONAL_INSERTION //500 Problema na tabela de relacionamento
                        }

                        //Adiciona o id no json com os dados do filme
                        filme.id = lastID
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message

                        //Adicionar no JSON os dados do GENERO
                        delete filme.genero

                        let resultDadosGeneros = await controllerFilmeGenero.listarGenerosIdFilme(lastID)
                        //console.log(resultDadosGeneros.items.filme_genero)
                        
                        filme.genero = resultDadosGeneros.items.filmes_genero
                        //
                        MESSAGES.DEFAULT_HEADER.items = filme

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

//Atualiza os dados do filme buscando pelo ID
const atualizarFilme = async function (filme, id, contentType) {

    //criando um novo objeto para modificar a mensagem padrão
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //validação do tipo de requisição (Obrigatório ser JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {


            //chama a função de validação dos dados do filme
            let validar = await validarDadosFilme(filme)

            if (!validar) {

                //validando a existência do ID no Banco de Dados
                //com a função 'buscarFilmeID()'
                let validarID = await buscarFilmeID(id)

                if (validarID.status_code == 200) {

                    //Adiciona o id do filme no JSON de dados para ser encaminhado ao DAO
                    filme.id = Number(id)

                    //Processamento
                    //chama a função do model para inserir um novo filme no BD
                    let resultFilmes = await filmeDAO.setUpdateMovie(filme)

                    if (resultFilmes) {


                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.filme = filme

                        return MESSAGES.DEFAULT_HEADER //200

                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    return validarID //retorna um dos erros da função buscarFilmeID (400 ou 404 ou 500)
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
const excluirFilme = async function (id) {

    //criando um novo objeto para modificar a mensagem padrão
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação da chegada do ID
        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let validarID = await buscarFilmeID(id)

            if (validarID.status_code == 200) {
                let resultFilmes = await filmeDAO.setDeleteMovie(Number(id))

                if (resultFilmes) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items.filme = resultFilmes
                    
                    return MESSAGES.DEFAULT_HEADER
                    
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {
                return MESSAGES.ERROR_NOT_FOUND //404
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Validação dos dados de cadastro e atualização do filme
const validarDadosFilme = async function (filme) {

    //criando um novo objeto para modificar a mensagem padrão
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    //validações de entrada de todos os atributos do filme
    if (filme.nome == '' || filme.nome == undefined || filme.nome == null || filme.nome.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nome incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.sinopse == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Sinopse incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.data_lancamento == undefined || filme.data_lancamento.length != 10) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Data de lançamento incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.duracao == '' || filme.duracao == undefined || filme.duracao == null || filme.duracao.length != 8) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Duração incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.orcamento == '' || filme.orcamento == undefined || filme.orcamento == null || filme.orcamento.length > 14 || typeof (filme.orcamento) != 'number') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Orçamento incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.trailer == undefined || filme.trailer.length > 200) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Trailer incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.capa == '' || filme.capa == undefined || filme.capa == null || filme.capa.length > 100 || filme.capa.length > 200) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Capa incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}

module.exports = {
    listarFilmes,
    buscarFilmeID,
    inserirFilme,
    atualizarFilme,
    excluirFilme

}