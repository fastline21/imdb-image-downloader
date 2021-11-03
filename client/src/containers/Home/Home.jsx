import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// Components
import Download from 'components/Download';

const Home = () => {
	return (
		<Container>
			<Row>
				<Col md={6} className='m-auto'>
					<Download />
				</Col>
			</Row>
		</Container>
	);
};

export default Home;
