import { server as serverState } from '../states';
import { DISPATCHES } from '../../constants';

const server = (state = serverState, { type = null, payload = null }) => {
	switch (type) {
		case DISPATCHES.SELECTED_SERVER:
			return {
				...state,
				connection: payload !== null && Object.keys(payload).length >= 1 && 'server' in payload ? payload?.server : {},
			};

		default:
			return state;
	}
};

export default server;
