import React, { useEffect, useState } from 'react';
import { Form, Button, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

// Actions
import { getDownloadInfo } from 'actions/downloadAction';

// Components
import PreLoader from 'components/PreLoader';

const Download = ({
	downloadState: { download, loading, error },
	getDownloadInfo,
}) => {
	const initialFormData = {
		imdbID: '',
	};
	const initialOutput = {
		title: '',
		year: '',
		imgURL: '',
	};

	const [formData, setFormData] = useState(initialFormData);
	const [output, setOutput] = useState(initialOutput);
	const [success, setSuccess] = useState(false);

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormData({ ...formData, [name]: value });
	};

	const { imdbID } = formData;
	const { title, year, imgURL } = output;

	const handleSubmit = (event) => {
		event.preventDefault();

		setOutput(initialOutput);

		setSuccess(false);
		getDownloadInfo(imdbID);
		setFormData(initialFormData);
	};

	const downloadFile = async (title, year, file) => {
		const filename = title.replace(/[^a-zA-Z 0-9.]+/g, '');
		const ext = file.split(/[#?]/)[0].split('.').pop().trim();

		const res = await axios({
			url: file,
			method: 'GET',
			responseType: 'blob',
		});

		const url = window.URL.createObjectURL(new Blob([res.data]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', `${filename} (${year}).${ext}`);
		document.body.appendChild(link);
		link.click();
	};

	useEffect(() => {
		if (download) {
			setSuccess(true);
			setOutput({ ...download });
		}

		// eslint-disable-next-line
	}, [download]);

	if (loading) {
		return <PreLoader />;
	}

	return (
		<div className='mt-5'>
			<Form onSubmit={handleSubmit}>
				<Form.Group className='mb-3' controlId='imdbIDInput'>
					<Form.Label>IMDb ID</Form.Label>
					<Form.Control
						name='imdbID'
						type='text'
						placeholder='Enter ID'
						id='imdbIDInput'
						onChange={handleChange}
						value={imdbID}
					/>
				</Form.Group>
				<div className='d-grid gap-2 my-3'>
					<Button variant='primary' size='lg' type='submit'>
						Submit
					</Button>
				</div>
			</Form>
			{success ? (
				<>
					<hr />
					<h3 className='text-center mb-3'>
						{title} ({year})
					</h3>
					<Image src={imgURL} fluid />
					<div className='d-grid gap-2 my-3'>
						<Button
							onClick={(event) => {
								event.preventDefault();
								downloadFile(title, year, imgURL);
							}}
						>
							Download
						</Button>
					</div>
				</>
			) : (
				<div className='min-vh-100'></div>
			)}
		</div>
	);
};

Download.propTypes = {
	downloadState: PropTypes.object.isRequired,
	getDownloadInfo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	downloadState: state.downloadState,
});

export default connect(mapStateToProps, { getDownloadInfo })(Download);
