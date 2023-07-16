const { v4: uuidv4 } = require('uuid');

const { fetchIMDbData } = require('./downloadController');

const { saveMedia } = require('../actions/save-media.action');

const saveImage = async (imdbID) => {
	const requestID = uuidv4();

	try {
		console.log(`${requestID} - [IMDB_SAVE_IMAGE] - START`);

		const imdbData = await fetchIMDbData(imdbID);

		const { imgURL, title, year } = imdbData;

		const filename = title.replace(/[^a-zA-Z 0-9.]+/g, '');
		const ext = imgURL.split(/[#?]/)[0].split('.').pop().trim();

		await saveMedia(requestID, imgURL, `${filename} (${year}).${ext}`);

		console.log(`${requestID} - [IMDB_SAVE_IMAGE] - END`);
		return {
			success: true,
			data: imdbData,
		};
	} catch (error) {
		return {
			message: error.message,
		};
	}
};

module.exports = { saveImage };
