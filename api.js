const fetch = require('node-fetch')
const cheerio = require('cheerio')
const { range, chunk, flatten } = require('lodash')

const EBPRIME = 'https://eurobeat-prime.com/lyrics.php?lyrics='

function errorHandler(error) {
	return console.error(error) // eslint-disable-line no-console
}

function stripBold(string) {
	const regexp = /<b>(.*?)<\/b>/
	return string.match(regexp)[1]
}

function parseHtmlChars(string) {
	return string
		.replace(/&amp;/g, '&')
		.replace(/&apos;/g, '\'')
}

function fetchPage(id) {
	return fetch(`${EBPRIME}${id}`)
		.then(response => response.text())
		.catch(errorHandler)
}

function parsePage(page, id) {
	const $ = cheerio.load(page)
	const html = $('.mmid1 .mmids').html()

	const rawLyrics = html.split('\n').join('').split('<br>')

	const rawTitleLine = rawLyrics.shift()
	const parsedTitleLine = stripBold(rawTitleLine).split(' - ')

	const artist = parseHtmlChars(parsedTitleLine[0])
	const title = parseHtmlChars(parsedTitleLine[1])
	const lyrics = parseHtmlChars(rawLyrics.join('\n').trim())

	return { id, artist, title, lyrics }
}

function getPage(id) {
	return fetchPage(id)
		.then(page => parsePage(page, id))
		.catch(errorHandler)
}

async function getManyPages(end, start = 1, chunkSize = 10) {
	const chunks = chunk(range(start, start+end), chunkSize)
	const results = []

	for (const each of chunks) {
		const chunkResult = await Promise.all(each.map(id => getPage(id)))
		results.push(chunkResult)
	}

	return flatten(results)
}

module.exports = {
	fetchPage,
	parsePage,
	getPage,
	getManyPages,
}
