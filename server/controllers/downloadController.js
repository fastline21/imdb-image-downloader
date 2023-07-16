const rp = require('request-promise');
const cheerio = require('cheerio');
const { v4: uuidv4 } = require('uuid');

// Utils
const {
	BadRequestError,
	NotImplementedError,
	NotFoundError,
} = require('./../utils/errorTypes');
const errorMessage = require('./../utils/errorMessage');

const fetchIMDbData = async (imdbID) => {
	const requestID = uuidv4();

	console.log(`${requestID} - [IMDB_FETCH_DATA] - START`);

	const requestURL = `https://www.imdb.com/title/${imdbID}`;
	console.log(`${requestID} - [IMDB_FETCH_DATA] - REQUEST URL: ${requestURL}`);

	let result = {
		success: false,
	};

	const getIMDBData = async (requestURL) => {
		try {
			const pageResult = await rp(requestURL);
			const $ = cheerio.load(pageResult);

			const title = $(process.env.IMDB_TITLE, pageResult).text().trim();
			console.log(`${requestID} - [IMDB_FETCH_DATA] - TITLE: ${title}`);

			const year = $(process.env.IMDB_YEAR, pageResult)[0].children[0].data;
			console.log(`${requestID} - [IMDB_FETCH_DATA] - YEAR: ${year}`);

			const imgURLSource = $(process.env.IMDB_IMAGE, pageResult).attr('href');
			console.log(
				`${requestID} - [IMDB_FETCH_DATA] - IMAGE URL SOURCE: ${imgURLSource}`
			);

			// Sometimes the poster is undefined
			// So it needs to return false
			// In order to rerun the function again.
			if (!imgURLSource) {
				return {
					success: false,
				};
			}

			let imgURL = '';

			try {
				const imgResult = await rp(`${process.env.IMDB_URL}${imgURLSource}`);
				const $ = cheerio.load(imgResult);

				const imgLoad = $(process.env.IMDB_LOAD_IMAGE, imgResult);

				for (let i = 0; i < imgLoad.length; i++) {
					const classAttr = imgLoad[i].attribs.class;
					if (!classAttr.includes('peek')) {
						imgURL = imgLoad[i].attribs.src;
					}
				}
			} catch (error) {
				errorMessage(NotFoundError, error.message);
			}

			return {
				success: true,
				title,
				year,
				imgURL,
			};
		} catch (error) {
			errorMessage(NotFoundError, error.message);
		}
	};

	while (!result.success) {
		result = {
			...(await getIMDBData(requestURL)),
		};
	}

	const { success, ...rest } = result;

	console.log(`${requestID} - [IMDB_FETCH_DATA] - END`);
	return { ...rest };
};

module.exports = { fetchIMDbData };
