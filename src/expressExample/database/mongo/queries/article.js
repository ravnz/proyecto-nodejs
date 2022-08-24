const { ArticleModel } = require('../models')

/**
 * @param {Object} article
 * @param {String} article.id
 * @param {String} article.name
 * @param {Number} article.price
 * @param {String} article.userId
 * @returns saved article
 */

const saveArticle = async article => {
    const savedArticle = new ArticleModel(article)

    await savedArticle.save()

    return savedArticle
}

/**
 * @param {String} id
 * @returns found article
 */

const getOneArticle = async id => {
    const articles = await ArticleModel.find({ id }).populate('userId')

    return articles[0]
}

/**
 * @returns found articles
 */
const getAllArticles = async () => {
    const articles = await ArticleModel.find()

    return articles
}

/**
 * 
 * @param {String} id 
 * @returns found article
 */
const removeOneArticle = async id => {
    const article = await ArticleModel.findOneAndRemove({ id })

    return article
}

/**
 * 
 * @param {Object} article 
 * @param {String} article.id
 * @param {String} article.name
 * @param {Number} article.price
 * @param {String} article.userId
 * @returns updated article
 */
const updateOneArticle = async article => {
    const { id, name, price, userId } = article
    const articleUpdated = await ArticleModel.findOneAndUpdate(
        { id },
        { name, price, userId },
        { new: true }
    )
    return articleUpdated
}

module.exports = {
    saveArticle,
    getOneArticle,
    getAllArticles,
    removeOneArticle,
    updateOneArticle
}