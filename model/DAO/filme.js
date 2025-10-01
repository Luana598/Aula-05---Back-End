/************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao filme 
 * Data: 01/10/2025
 * Autor: Luana M. Lopes Bomfim
 * Versão: 1.0
 ************************************************************************************************************************************/

/*
    EXEMPLOS DE DEPENDÊNCIAS PARA CONEXÃO COM BD

        Bancos de Dados Relacionais -------------------------------------------------------
        Sequelize -> foi utiizado em muitos projetos desde o início do node.js 
        Prisma    -> É uma dependência atual que trabalha com BD (MySQL, PostgreSQL, SQL Server) (SQL ou ORM)  
        Knex      -> É uma dependência atual que trabalha com MySQL

        Banco de Dados Não Relacional -----------------------------------------------------
        Mongoose  -> É uma dependência para o Mongo DB (Não relacional)

 */

// EXPLICAÇÃO - QUERYRAW / EXECUTERAW

// "$queryRawUnsafe()" -> executa o script sql de uma variável 
//  e que retorna valores do banco (SELECT)

// "$executeRawUnsafe()" -> executa o script sql de uma variável 
//  e que NÃO retorna valores do banco (INSERT, UPDATE, DELETE)

// "$queryRaw()" -> executa o script sql
//   SEM ESTAR EM UMA VÁRIAVEL
//   e que retorna valores do banco (SELECT)
// faz tratamentos de segurança contra SQL injection

// "$executeRaw()" executa o script sql
//   SEM ESTAR EM UMA VÁRIAVEL 
//  e que NÃO retorna valores do banco (INSERT, UPDATE, DELETE)
// faz tratamentos de segurança contra SQL injection

//Import da dependência do Prisma que permite a execução de script SQL no Banco
const { PrismaClient } = require('@prisma/client')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Retorna uma lista de todos os filmes do banco de dados
const getSelectAllMovies = async function () {
    try {

        let sql = `select * from tbl_filme order by id desc` //script sql que faz o select e ordena a entrega dos dados pelo ID decrescente com o "desc"

        let result = await prisma.$queryRawUnsafe(sql)  //"$queryRawUnsafe()" -> executa o script sql de uma variável e que retorna valores do banco (SELECT)

        if (result.length > 0)
            return result
        else
            return false

    } catch (error) {
        //console.log(error)
        return false
    }
}

//Retorna um filme filtrado pelo ID do banco de dados
const getSelectMoviesById = async function (id) {

}

//Insere um novo filme no banco de dados
const setInsertMovies = async function () {

}

//Altera um filme filtrado pelo ID no banco de dados
const setUpdateMovie = async function (id) {

}

//Exlui um filme filtrado pelo ID no banco de dados
const setDeleteMovie = async function (id) {

}

module.exports = {
    getSelectAllMovies,
}