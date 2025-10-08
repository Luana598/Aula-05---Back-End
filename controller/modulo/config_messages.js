/************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelos padrões de mensagens de erro ou sucesso que o projeto irá realizar, todas em formato JSON
 * Data: 07/10/2025
 * Autor: Luana M. Lopes Bomfim
 * Versão: 1.0
 ************************************************************************************************************************************/

//criando objeto da classe date para obter a data atual
const data_atual = new Date()

/***********************************************************MENSAGENS PADRONIZADAS****************************************************/

const DEFAULT_HEADER = {
    development : 'Luana M. Lopes Bomfim',
    api_description : 'API para manipular dados de filmes',
    status: Boolean,
    status_code: Number,
    request_date: data_atual.toLocaleString(), //toString()
    items: {}
}

/***********************************************************MENSAGENS DE SUCESSO*****************************************************/
const SUCCESS_REQUEST = {status: true, status_code: 200, message: 'Requisição bem sucedida!'}

/***********************************************************MENSAGENS DE ERRO********************************************************/

const ERROR_NOT_FOUND                  = {status: false, status_code: 404, message: 'Não foram encontrados dados de retorno!'}
const ERROR_INTERNAL_SERVER_CONTROLLER = {status: true, status_code: 500, message: 'Não foi possível processar a requisição devido a erros internos no servidor(CONTROLLER)!'}
const ERROR_INTERNAL_SERVER_MODEL      = {status: true, status_code: 500, message: 'Não foi possível processar a requisição devido a erros internos no servidor(MODELAGEM DE DADOS)!'}
const ERROR_REQUIRED_FIELDS            = {status: false, status_code: 400, message: 'Não foi possível processar a requisição pois existem campos obrigatórios que devem ser encaminhados e atendidos conforme documentação!'}

module.exports = {
    DEFAULT_HEADER,
    SUCCESS_REQUEST,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_REQUIRED_FIELDS
}