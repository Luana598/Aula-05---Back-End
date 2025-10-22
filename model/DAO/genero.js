/************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao gênero
 * Data: 01/10/2025
 * Autor: Luana M. Lopes Bomfim
 * Versão: 1.0
 ************************************************************************************************************************************/


const { PrismaClient } = require('../../generated/prisma')


const prisma = new PrismaClient()

//Retorna uma lista de todos os gêneros do banco de dados
const getSelectAllGenders = async function () {
    try {

        let sql = `select * from tbl_genero order by genero_id desc` //script sql que faz o select e ordena a entrega dos dados pelo ID decrescente com o "desc"
        
        let result = await prisma.$queryRawUnsafe(sql)  //"$queryRawUnsafe()" -> executa o script sql de uma variável e que retorna valores do banco (SELECT)
        
        if  (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
    
        return false
    }
}

//Retorna um genero filtrado pelo ID do banco de dados
const getSelectGenderById = async function (id) {

    try {

        let sql = `select * from tbl_genero where genero_id = ${id}` //script sql que faz o select e ordena a entrega dos dados pelo ID decrescente com o "desc"
        
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

const setInsertGender = async function (genero) {
    try {
        
        let sql = `INSERT INTO tbl_genero (nome) VALUES ('${genero.nome}')`
        

        let result = await prisma.$executeRawUnsafe(sql) //"$executeRawUnsafe()" -> executa o script sql de uma variável que NÃO retorna valores do banco (INSERT, UPDATE, DELETE)
        
        if (result)
            return true
        else
            return false


    } catch (error) {

        return false
    }
}


//retorna apenas o ultimo id gerado no BD
const getSelectLastId = async function(){
    try {
        //script sql para retornar apenas o ultimo id do BD
        let sql = `SElECT genero_id FROM tbl_genero ORDER BY genero_id DESC LIMIT 1`

        //"$queryRawUnsafe()" -> executa o script sql de uma variável e que retorna valores do banco (SELECT)
        let result = await prisma.$queryRawUnsafe(sql)

        if  (Array.isArray(result))
            return Number(result[0].genero_id)
        else
            return false

    } catch (error) {
        
        return false
    }
}

//Altera um gênero filtrado pelo ID no banco de dados
const setUpdateGender = async function (genero) {
    try {
        let sql = `UPDATE tbl_genero set nome = '${genero.nome}' where genero_id = ${genero.id}`

        let result = await prisma.$executeRawUnsafe(sql) //"$executeRawUnsafe()" -> executa o script sql de uma variável que NÃO retorna valores do banco (INSERT, UPDATE, DELETE)
        
        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    getSelectAllGenders,
    getSelectGenderById,
    setInsertGender,
    getSelectLastId,
    setUpdateGender
}