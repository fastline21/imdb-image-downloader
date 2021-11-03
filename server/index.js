const express = require('express');
const logger = require('morgan');
const session = require('express-session');

const validation = require('./middleware/validation');

const server = () => {
	const app = express();

	// Express body parser
	app.use(express.urlencoded({ extended: true }));

	// Express session
	app.use(
		session({
			secret: 'secret',
			resave: true,
			saveUninitialized: true,
		})
	);

	// Routes
	app.use('/api', validation, require('./routes'));

	if (process.env.NODE_ENV === 'production') {
		// Set static folder
		app.use(express.static('client/build'));

		app.get('*', (req, res) =>
			res.sendFile(
				path.resolve(__dirname, 'client', 'build', 'index.html')
			)
		);
	}

	app.use(logger('dev'));

	const port = process.env.PORT || 5000;

	app.listen(port, () => console.log(`Server running on localhost:${port}`));
};

module.exports = server;
