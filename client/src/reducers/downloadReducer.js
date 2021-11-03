import {
	GET_DOWNLOAD_INFO,
	DOWNLOAD_LOADING,
	DOWNLOAD_ERROR,
} from 'actions/types';

const initialState = {
	download: null,
	loading: false,
	error: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
	switch (action.type) {
		case GET_DOWNLOAD_INFO:
			return {
				...state,
				download: action.payload,
				loading: false,
			};
		case DOWNLOAD_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case DOWNLOAD_LOADING:
			return {
				...state,
				loading: true,
			};
		default:
			return state;
	}
};
