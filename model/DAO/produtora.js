/************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente as produtoras
 * Data: 01/11/2025
 * Autor: Luana M. Lopes Bomfim
 * Versão: 1.0
 ************************************************************************************************************************************/


const { PrismaClient } = require('../../generated/prisma')


const prisma = new PrismaClient()

//Retorna uma lista de todos as produtoras do banco de dados
const getSelectAllProducers = async function () {
    try {
        let sql = `select * from tbl_produtora order by produtora_id desc`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        //console.log(error)
        return false
    }
}

//Retorna uma produtora filtrando pelo id do banco de dados
const getProducerById = async function (id) {
    try {
        let sql = `select * from tbl_produtora where produtora_id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

//Insere uma produtora novo no banco de dados
const setInsertProducer = async function (produtora) {
    try {
        let sql = `INSERT INTO tbl_produtora (nome, 
                        nome_fantasia, 
                        pais_origem, 
                        data_fundacao, 
                        site, 
                        descricao,
                        ativa)
                    VALUES('${produtora.nome}', 
                            '${produtora.nome_fantasia}', 
                            '${produtora.pais_origem}',
                            '${produtora.data_fundacao}',
                            '${produtora.site}',
                            '${produtora.descricao}'),
                            '${produtora.ativa}')`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//Retorna o último id gerado no banco de dados
const getSelectLastId = async function(){
    try {
        let sql = `select produtora_id from tbl_produtora order by produtora_id desc limit 1`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return Number(result[0].produtora_id)
        else
            return false

    } catch (error) {
        return false
    }
}

//Altera uma produtora no banco de dados
const setUpdateProducer = async function (produtora) {
    try {

        let sql = `update tbl_produtora set
                        nome                = '${produtora.nome}', 
                        nome_fantasia       = '${produtora.nome_artistico}', 
                        pais_origem         = '${produtora.data_nascimento}', 
                        data_fundacao       = '${produtora.nacionalidade}',
                        site                = '${produtora.biografia}', 
                        descricao           = '${produtora.biografia}', 
                        ativa               = '${produtora.foto}'
        
                    where produtora_id = ${produtora.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        //console.log(error)
        return false
    }
}


module.exports = {
    getSelectAllProducers,
    getProducerById,
    setInsertProducer,
    setUpdateProducer,
    getSelectLastId
}
