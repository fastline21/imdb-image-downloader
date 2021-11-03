const validation = async (req, res, next) => {
	const validateCode = req.headers['validate-code'];

	if (!validateCode) {
		return res.sendStatus(403);
	}

	if (process.env.VALIDATE_CODE !== validateCode) {
		return res.sendStatus(401);
	}

	next();
};

module.exports = validation;
