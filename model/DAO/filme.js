/************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao filme 
 * Data: 01/10/2025
 * Autor: Luana M. Lopes Bomfim
 * Versão: 1.0
 ************************************************************************************************************************************/

/*    EXEMPLOS DE DEPENDÊNCIAS PARA CONEXÃO COM BD

        Bancos de Dados Relacionais -------------------------------------------------------
        Sequelize -> foi utiizado em muitos projetos desde o início do node.js 

        Prisma    -> É uma dependência atual que trabalha com BD (MySQL, PostgreSQL, SQL Server) (SQL ou ORM)  
                         comandos usados:
                         npm install prisma -- save       -> para instalar o prisma (para fazer conexão com o database)
                         npm install @prisma/client --save -> para instalar o cliente do prima (que executa os scripts ddo SQL no BD)
                         npx prisma init                   -> Prompt de comando para inicializar o prisma no projeto        
                         npx prisma migrate dev            -> Realiza o sincronismo entre o prisma e o DB 
                                                            (CUIDADO, nesse processo você poderá perder os dados do Banco, pois ele cria as tabelas 
                                                            programadas no oRM schema.prisma)
                        npx prisma generate               -> Apenas realiza o sincronismo entre o prisma e o BD, geralmente usado para rodar o projeto em um novo PC

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
const { PrismaClient } = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Retorna uma lista de todos os filmes do banco de dados
const getSelectAllMovies = async function () {
    try {

        let sql = `select * from tbl_filme order by filme_id desc` //script sql que faz o select e ordena a entrega dos dados pelo ID decrescente com o "desc"
        
        let result = await prisma.$queryRawUnsafe(sql)  //"$queryRawUnsafe()" -> executa o script sql de uma variável e que retorna valores do banco (SELECT)

        
        if  (Array.isArray(result))
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

    try {

        let sql = `select * from tbl_filme where filme_id = ${id}` //script sql que faz o select e ordena a entrega dos dados pelo ID decrescente com o "desc"
        
        let result = await prisma.$queryRawUnsafe(sql)  //"$queryRawUnsafe()" -> executa o script sql de uma variável e que retorna valores do banco (SELECT)

        
        if  (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        //console.log(error)
        return false
    }

}

//Insere um novo filme no banco de dados
const setInsertMovies = async function (filme) {
    try {
        let sql = `INSERT INTO tbl_filme ( nome, 
						sinopse,
                        data_lancamento, 
                        duracao,
                        orcamento,
                        trailer,
                        capa)
                    VALUES(  '${filme.nome}',
		                     '${filme.sinopse}',
                             '${filme.data_lancamento}',
                             '${filme.duracao}',
                             '${filme.orcamento}',
                             '${filme.trailer}',
                             '${filme.capa}')`

        let result = await prisma.$executeRawUnsafe(sql) //"$executeRawUnsafe()" -> executa o script sql de uma variável que NÃO retorna valores do banco (INSERT, UPDATE, DELETE)
        
        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }

}

//retorna apenas o ultimo id grado no BD
const getSelectLastId = async function(){
    try {
        //script sql para retornar apenas o ultimo id do BD
        let sql = `SElECT filme_id FROM tbl_filme ORDER BY filme_id DESC LIMIT 1`

        //"$queryRawUnsafe()" -> executa o script sql de uma variável e que retorna valores do banco (SELECT)
        let result = await prisma.$queryRawUnsafe(sql)

        if  (Array.isArray(result))
            return Number(result[0].filme_id)
        else
            return false

    } catch (error) {
        return false
    }
}

//Altera um filme filtrado pelo ID no banco de dados
const setUpdateMovie = async function (filme) {
    try {
        let sql = `UPDATE tbl_filme set
                        nome            = '${filme.nome}',
						sinopse         = '${filme.sinopse}',
                        data_lancamento = '${filme.data_lancamento}',
                        duracao         = '${filme.duracao}',
                        orcamento       = '${filme.orcamento}',
                        trailer         = '${filme.trailer}',
                        capa            =  '${filme.capa}'

                    where filme_id = ${filme.id}`

        let result = await prisma.$executeRawUnsafe(sql) //"$executeRawUnsafe()" -> executa o script sql de uma variável que NÃO retorna valores do banco (INSERT, UPDATE, DELETE)
        
        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//Exlui um filme filtrado pelo ID no banco de dados
const setDeleteMovie = async function (id) {

    try {
        let sql = `DELETE FROM tbl_filme where filme_id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql) //"$executeRawUnsafe()" -> executa o script sql de uma variável que NÃO retorna valores do banco (INSERT, UPDATE, DELETE)
        
        if  (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    getSelectAllMovies,
    getSelectMoviesById,
    getSelectLastId,
    setInsertMovies,
    setUpdateMovie, 
    setDeleteMovie
}