/****************************************************************************************
* Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente aos atores.
* Data: 04/11/2025
* Autor: Rebeca Gomes
* Versão: 1.0
*****************************************************************************************/


//Import da dependência do prisma que permite a execução de script SQL no banco de dados
const { PrismaClient } = require('../../generated/prisma')

//Cria um novo objeto baseado na classe PrismaClient
const prisma = new PrismaClient()

//Retorna uma lista de todos os atores do banco de dados
const getSelectAllActors = async function () {
    try {
        //Script SQL
        let sql = `select * from tbl_atores order by ator_id desc`

        //Encaminha para o banco de dados o script SQL
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

//Retorna um ator filtrando pelo id do banco de dados
const getActorById = async function (id) {
    try {
        //Script SQL
        let sql = `select * from tbl_atores where ator_id=${id}`

        //Encaminha para o banco de dados o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

//Insere um ator novo no banco de dados
const setInsertActors = async function (ator) {
    try {
        let sql = `INSERT INTO tbl_atores (nome, 
                        nome_artistico, 
                        data_nascimento, 
                        nacionalidade, 
                        biografia, 
                        foto)
                    VALUES('${ator.nome}', 
                            '${ator.nome_artistico}', 
                            '${ator.data_nascimento}',
                            '${ator.nacionalidade}',
                            '${ator.biografia}',
                            '${ator.foto}')`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//Altera um ator no banco de dados
const setUpdateActors = async function (ator) {
    try {

        let sql = `update tbl_atores set
                        nome                = '${ator.nome}', 
                        nome_artistico      = '${ator.nome_artistico}', 
                        data_nascimento     = '${ator.data_nascimento}', 
                        nacionalidade       = '${ator.nacionalidade}',
                        biografia           = '${ator.biografia}', 
                        foto                = '${ator.foto}'
        
                    where ator_id = ${ator.id}`
                    
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

//Exclui um ator pelo id no banco de dados
const setDeleteActors = async function (id) {
    try {
        let sql = `delete from tbl_atores where ator_id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        //console.log(error)
        return false
    }
}

//Retorna o último id gerado no banco de dados
const getSelectLastId = async function(){
    try {
        //Script sql para retornar apenas o último id do banco
        let sql = `select ator_id from tbl_atores order by ator_id desc limit 1`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return Number(result[0].id_atores)
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    getSelectAllActors,
    getActorById,
    setInsertActors,
    setUpdateActors,
    setDeleteActors,
    getSelectLastId
}