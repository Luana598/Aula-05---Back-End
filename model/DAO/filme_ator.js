/********************************************************************************************************
* Objetivo: Arquivo responsável pela manipulação e dados entre o app e a model para o crud na relação entre filme e ator.
* Data: 05/11/2025
* Autor: Luana Mariana Lopes Bomfim
* Versão: 1.0
*********************************************************************************************************/

//Retorna todos os filmes e atores cadastrados no banco de dados
const getSelectAllMoviesActors = async function () {
    try {
        //Script SQL
        let sql = `select * from tbl_filme_ator order by id desc`

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

//Retorna uma relação filme/ator filtrando pelo id do banco de dados
const getSelectByIdMovieActors = async function (id) {
    try {
        //Script SQL
        let sql = `select * from tbl_filme_ator where id=${id}`

        //Encaminha para o banco de dados o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        elses
        return false
    } catch (error) {
        //console.log(error)
        return false
    }
}

//Retorna uma lista de atores filtrando pelo id do filme
const getSelectActorsByIdMovies = async function (id_filme) {
    try {
        //Script SQL
        let sql = `select tbl_atores.ator_id, tbl_atores.nome
                    from tbl_filme
                        inner join tbl_filme_ator
                            on tbl_filme.filme_id = tbl_filme_ator.filme_id
                        inner join tbl_atores
                            on tbl_atores.ator_id = tbl_filme_ator.ator_id
                    where tbl_filme.filme_id =${id_filme}`

                    //console.log(sql)


        //Encaminha para o banco de dados o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        elses
        return false
    } catch (error) {
        //console.log(error)
        return false
    }
}

//Retorna uma lista de filmes filtrando pelo id do ator
const getSelectMoviesByIdActor = async function (id_ator) {
    try {
        //Script SQL
        let sql = `select tbl_filme.filme_id, tbl_filme.nome
                    from tbl_filme 
                        inner join tbl_filme_ator
                            on tbl_filme.filme_id = tbl_filme_ator.filme_id
                        inner join tbl_atores
                            on tbl_atores.ator_id = tbl_filme_ator.ator_id
                    where tbl_atores.ator_id =${id_ator}`

        //Encaminha para o banco de dados o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        elses
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
        let sql = `select id from tbl_filme_ator order by id desc limit 1`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return Number(result[0].id)
        else
            return false

    } catch (error) {
        return false
    }
}

//Insere um relacionamento filme/ator novo no banco de dados
const setInsertMovieActors = async function (filmeAtor) {
    try {
        let sql = `INSERT INTO tbl_filme_ator (filme_id, ator_id)
                    VALUES (${filmeAtor.id_filme}, ${filmeAtor.id_genero})`

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

//Altera um relacionamento filme/ator no banco de dados
const setUpdateMovieActors = async function (filmeAtor) {
    try {

        let sql = `update tbl_filme_genero set 
                        filme_id = ${filmeAtor.id_filme}, 
                        genero_id = ${filmeAtor.id_genero} 
                    where id = ${filmeAtor.id}`

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

//Exclui um relacionamento filme/ator pelo id no banco de dados
const setDeleteMovieActors = async function (id) {
    try {
        let sql = `delete from tbl_filme_ator where id = ${id}`

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

module.exports = {
    getSelectAllMoviesActors,
    getSelectByIdMovieActors,
    getSelectActorsByIdMovies,
    getSelectMoviesByIdActor,
    getSelectLastId,
    setInsertMovieActors,
    setUpdateMovieActors,
    setDeleteMovieActors
}