const rp = require('request-promise');
const cheerio = require('cheerio');

// Utils
const {
	BadRequestError,
	NotImplementedError,
	NotFoundError,
} = require('./../utils/errorTypes');
const errorMessage = require('./../utils/errorMessage');

const fetchIMDbData = async (imdbID) => {
	const requestURL = `https://www.imdb.com/title/${imdbID}`;

	let result = {
		success: false,
	};

	const getIMDBData = async (requestURL) => {
		try {
			const pageResult = await rp(requestURL);
			const $ = cheerio.load(pageResult);

			const title = $(process.env.IMDB_TITLE, pageResult).text().trim();
			const year = $(
				process.env.IMDB_YEAR,
				pageResult
			)[0].children[0].data.trim();
			const imgURLSource = $(process.env.IMDB_IMAGE, pageResult).attr();

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
				const imgResult = await rp(
					`${process.env.IMDB_URL}${imgURLSource.href}`
				);
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

	return { ...rest };
};

module.exports = { fetchIMDbData };
