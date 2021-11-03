import React from 'react';
import { Container } from 'react-bootstrap';

const NotFound = () => {
	return (
		<Container className='text-center min-vh-100 my-5'>
			<h1>404 Error</h1>
			<p>The page you are looking for cound not be found.</p>
		</Container>
	);
};

export default NotFound;
