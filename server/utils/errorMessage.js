const errorMessage = (type, error) => {
	console.error(`Error Occurred: ${error}`);
	throw new type(`Error Occurred: ${error?.message || error}`);
};

module.exports = errorMessage;
