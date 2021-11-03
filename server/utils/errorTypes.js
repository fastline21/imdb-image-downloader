class NotImplementedError extends Error {
	constructor(message) {
		super();
		this.statusCode = 500;
		this.name = 'NotImplemented';
		this.message = message || 'Not Implemented';
	}
}

class BadRequestError extends Error {
	constructor(message) {
		super();
		this.statusCode = 400;
		this.name = 'BadRequest';
		this.message = message || 'Bad Request';
	}
}

class ForbiddenError extends Error {
	constructor(message) {
		super();
		this.statusCode = 403;
		this.name = 'Forbidden';
		this.message = message || 'Forbidden';
	}
}

class NotFoundError extends Error {
	constructor(message) {
		super();
		this.statusCode = 404;
		this.name = 'NotFound';
		this.message = message || 'Not Found';
	}
}

module.exports = {
	NotImplementedError,
	BadRequestError,
	ForbiddenError,
	NotFoundError,
};
