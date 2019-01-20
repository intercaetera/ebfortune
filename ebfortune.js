#!/usr/bin/env node

const program = require('commander')
const { readFileSync } = require('fs')

const { getRandomSongAndFormat } = require('./randomize')

program
	.version('1.0.0')
	.option('-s, --source <source>', 'A database of lyrics to read from')
	.option('-l, --limit <limit>', 'Character limit for each quote')
	.parse(process.argv)

if (!program.source) {
	program.source = `${__dirname}/database.json`
}

const data = readFileSync(program.source, { encoding: 'utf-8' })
const json = JSON.parse(data)
console.log(getRandomSongAndFormat(json, program.limit))
