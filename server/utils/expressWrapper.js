module.exports = (promiser) => async (req, res, next) => {
	try {
		const result = await promiser(req, res, next);
		if (result.statusCode) {
			const { statusCode, body } = result;
			res.status(statusCode).json(body);
		} else {
			res.status(200).json(result);
		}
	} catch (error) {
		res.error = error;
		res.status(error.statusCode || 500).json({ message: error.message });
	}
};
