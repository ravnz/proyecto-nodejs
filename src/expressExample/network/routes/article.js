const { Router } = require('express')
const { getAllArticles, removeOneArticle, updateOneArticle } = require('../../database/mongo/queries/article')
const { ArticleService } = require('../../services')

const response = require('./response')
const ArticleRouter = Router()

//const {
//    article: {
//        getAllArticles,
//        saveArticle,
//        removeOneArticle,
//        updateOneArticle,
//        getOneArticle
//    }
//} = queries

ArticleRouter.route('/article/:userId')
    .post(async (req, res) => {
        const {
            body: { name, price },
            params: { userId }
        } = req
        const articleService = new ArticleService ({ name, price, userId })

        try {
            const result = await articleService.saveArticle()

            response({
                error: false,
                message: result,
                res,
                status: 201
            })
        } catch(error) {
            console.error(error)
            response({ message: 'Internal server error', res })
        }
    })

    ArticleRouter.route('/article/:id')
    .get(async (req, res) => {
        const { params: { id } } = req

        try {
            const articleService = new ArticleService({ id })
            const article = await articleService.getArticle()

            res.redirect(article.name)
        }catch (error) {
            console.error(error)
            response({ message: 'Internal server error', res })
        }
    })
    .delete(async (req, res) => {
        try {
            const { params: { id } } = req

            await removeOneArticle(id)
            response({ error: false, message: await getAllArticles(), res, status: 200 })
        } catch (error) {
            console.error(error)
            response({ message: 'Internal server error', res})
        }
    })
    .patch(async (req, res) => {
        const {
            body: {name, price, userId},
            params: {id}
        } = req

        try{
            await updateOneArticle({ id, name, price, userId })
            response({ error: false, message: await getAllArticles(), res, status: 200 })
        } catch (error) {
            console.error(error)
            response({ message: 'Internal server error', res})
        }
    })

ArticleRouter.route('/article')
    .get(async (req, res) => {
        
        try {
            const articles = await getAllArticles()
            response({ error: false, message: articles, res, status: 200 })
        
        } catch (error) {
            console.error(error)
            response({ message: 'Internal server error asdf', res })
      }
    })

module.exports = ArticleRouter
