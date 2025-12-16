/****************************************************************************************
* Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente aos diretores.
* Data: 04/11/2025
* Autor: Luana M. Lopes Bomfim
* Versão: 1.0
*****************************************************************************************/

//Import da dependencia do Prisma que permite a execução de script SQL no BD
const {PrismaClient} = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Retorna todos os diretores existentes no bd
const getSelectAllDirectors = async function(){
    try {

        let sql = `SELECT * FROM tbl_diretor ORDER BY diretor_id DESC`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result)){
            return result
        }else
            return false

    } catch (error) {
        return false
    }
}

//Retorna um diretor recebendo o id como parâmetro
const getSelectDirectorById = async function(id){
    try {

        let sql = `SELECT * FROM tbl_diretor WHERE diretor_id = ${id}`

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

        let sql = `SELECT diretor_id FROM tbl_diretor ORDER BY diretor_id DESC LIMIT 1`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return Number(result[0].diretor_id)
        else
            return false

    } catch (error) {
        return false
    }
}

//Insere um diretor no banco de dados
const setInsertDirector = async function(diretor){
    try {

        let sql = `INSERT INTO tbl_diretor ( nome, data_nascimento, nacionalidade, biografia, foto_url)
                VALUES('${diretor.nome}',
                '${diretor.data_nascimento}',
                '${diretor.nacionalidade}',
                '${diretor.biografia}',
                '${diretor.foto_url}')`
    
        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//Atualiza um diretor existente no banco de dados
const setUpdateDirector = async function(diretor){
    try {
     
        let sql = `UPDATE tbl_diretor SET 
        nome = '${diretor.nome}',
        data_nascimento = '${diretor.data_nascimento}',
        nacionalidade = '${diretor.nacionalidade}', 
        biografia = '${diretor.biografia}',
        foto_url = '${diretor.foto_url}'
        WHERE diretor_id = ${diretor.diretor_id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const setDeleteDirector = async function(id){
    try {
        //Script sql
        let sql = `DELETE FROM tbl_diretor WHERE diretor_id = ${id}`

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
    getSelectAllDirectors,
    getSelectDirectorById,
    getSelectLastId,
    setInsertDirector,
    setUpdateDirector,
    setDeleteDirector
}