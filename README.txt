Random lyrics from Eurobeat songs to spice up your day.

Usage:
	ebfortune [options]

Options:
	-V, --version          output the version number
	-s, --source <source>  database of lyrics to read from (def. database.json)
	-l, --limit <limit>    character limit for each quote (def. 100)
	-h, --help             output usage information

Installation:
	# clone the repo
	git clone http://github.com/mrhuds0n/ebfortune.git && cd ebfortune

	# link executable to PATH, for example
	ln -s "$(pwd)/ebfortune.js" ~/.local/bin/ebfortune

	# download a lyrics database
	curl https://my.mixtape.moe/prokwp.json > database.json

	# ready to use
	ebfortune

Notes:
	You can find a ready lyrics database under this link:
	https://my.mixtape.moe/prokwp.json

	There is code in this repo for scraping lyrics from
	Eurobeat-Prime but it's not linked to any command
	line interface or anything user friendly so you're
	on your own if you want to update it.

	The --limit option specifies the minimum length
	of quotes in characters.
