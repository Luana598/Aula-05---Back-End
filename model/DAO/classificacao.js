/****************************************************************************************
* Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente às classificações indicativas.
* Data: 04/11/2025
* Autor: Luana M. Lopes Bomfim
* Versão: 1.0
*****************************************************************************************/

//Import da dependencia do Prisma que permite a execução de script SQL no BD
const {PrismaClient} = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Retorna todas as classificacoes indicativas existentes
const getSelectAllClassification = async function(){
    try {

        let sql = `SELECT * FROM tbl_classificacao ORDER BY classificacao_id DESC`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result)){
            return result
        }else
            return false

    } catch (error) {
        return false
    }
}

//Retorna uma classificacao indicativa recebendo o id como parâmetro
const getSelectClassificationById = async function(id){
    try {

        let sql = `SELECT * FROM tbl_classificacao WHERE classificacao_id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const getSelectLastId = async function(){
    try {

        let sql = `SELECT classificacao_id FROM tbl_classificacao ORDER BY classificacao_id DESC LIMIT 1`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return Number(result[0].classificacao_id)
        else
            return false

    } catch (error) {
        return false
    }
}

//Insere uma nova classificacao indicativa no banco de dados
const setInsertClassification = async function(classificacao){
    try {

        let sql = `INSERT INTO tbl_classificacao (faixa_etaria, descricao, pais_origem)
	            VALUES('${classificacao.faixa_etaria}',
	            '${classificacao.descricao}',
	            '${classificacao.pais_origem}')`
    
        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//Atualiza uma classificacao indicativa existente no banco de dados
const setUpdateClassification = async function(classificacao){
    try {
        //Script sql
        let sql = `UPDATE tbl_classificacao SET 
        faixa_etaria = '${classificacao.faixa_etaria}',
        descricao = '${classificacao.descricao}',
        pais_origem = '${classificacao.pais_origem}'
        WHERE classificacao_id = ${classificacao.classificacao_id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//Deleta uma classificacao indicativa do banco de dados
const setDeleteClassification = async function(id){
    try {
        //Script sql
        let sql = `DELETE FROM tbl_classificacao WHERE classificacao_id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    getSelectAllClassification,
    getSelectClassificationById,
    getSelectLastId,
    setInsertClassification,
    setUpdateClassification,
    setDeleteClassification
}