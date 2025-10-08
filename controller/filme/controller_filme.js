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

// Retorna uma lista de todos os filmes
const listarFilmes = async function () {

   //criando um novo objeto para modificar a mensagem padrão
   let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //chama a função do DAO para retornar a lista de filmes do BD
        let resultFilmes = await filmeDAO.getSelectAllMovies()

        if (resultFilmes) {

            if (resultFilmes.length > 0) {

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
        if (!isNaN(id)) {
            let resultFilmes = await filmeDAO.getSelectMoviesById(Number(id))

            if (resultFilmes) {
                if (resultFilmes.length > 0) {
                    
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.filme = resultFilmes

                return MESSAGES.DEFAULT_HEADER

                } else {
                    return MESSAGES.ERROR_NOT_FOUND
                }
            }else{
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }

        } else {
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {

        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500

    }

}

//Insere um filme
const inserirFilme = async function (filme) {

}

//Atualiza os dados do filme buscando pelo ID
const atualizarFilme = async function (filme, id) {

}

//Exclui um filme buscando pelo ID
const excluirFilme = async function (id) {

}

module.exports = {
    listarFilmes,
    buscarFilmeID
}