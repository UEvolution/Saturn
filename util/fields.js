const LIST_PAGE = ['sum', 'current', 'num']
const ITEM = ['id', 'title', 'alias']
const ARTICLE = ['author', 'relate'].concat(ITEM)

module.exports = {
	GET_ARTICLE: ARTICLE.concat(LIST_PAGE)
}
