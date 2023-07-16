const axios = require('axios');
const fs = require('fs');
const path = require('path');

const saveMedia = async (requestID, url, filename) => {
	const response = await axios.get(url, { responseType: 'arraybuffer' });

	fs.writeFile(path.join('output', filename), response.data, (error) => {
		if (error) {
			console.error(`${requestID} - [SAVE_MEDIA] - ERROR: ${error}`);
			throw error;
		}

		console.log(`${requestID} - [SAVE_MEDIA] - SUCCESS`);
	});

	return;
};

module.exports = { saveMedia };
