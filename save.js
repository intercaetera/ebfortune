const api = require('./api')
const fs = require('fs')

const getAllSongs = async () => await api.getManyPages(4393)
getAllSongs().then(allSongs => {
	fs.writeFileSync('database.json', JSON.stringify(allSongs, null, 2))
})
