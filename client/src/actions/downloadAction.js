import axios from 'axios';

import { GET_DOWNLOAD_INFO, DOWNLOAD_LOADING, DOWNLOAD_ERROR } from './types';

export const getDownloadInfo = (imdbID) => async (dispatch) => {
	setLoading(dispatch);

	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'validate-code': process.env.REACT_APP_VALIDATE_CODE,
			},
		};

		const res = await axios.post(`/api/download/${imdbID}`, null, config);

		dispatch({
			type: GET_DOWNLOAD_INFO,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: DOWNLOAD_ERROR,
			payload: {
				statusCode: error.response.status,
				message: error.response.message,
			},
		});
	}
};

const setLoading = (dispatch) => {
	dispatch({
		type: DOWNLOAD_LOADING,
	});
};
