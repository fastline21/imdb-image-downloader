import React from 'react';
import { Spinner } from 'react-bootstrap';

const PreLoader = () => {
	return (
		<div
			style={{
				position: 'fixed',
				top: 0,
				left: 0,
				right: 0,
				height: '100vh',
				backgroundColor: 'rgba(51, 51, 51, 1)',
				zIndex: 1031,
			}}
		>
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
				}}
			>
				<Spinner
					animation='border'
					style={{ height: '5rem', width: '5rem' }}
					variant='primary'
					role='status'
				/>
			</div>
		</div>
	);
};

export default PreLoader;
