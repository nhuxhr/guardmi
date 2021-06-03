import { auth as authState } from '../states';
import { DISPATCHES } from '../../constants';

const auth = (state = authState, { type = null, payload = null }) => {
	switch (type) {
		case DISPATCHES.SIGNIN:
			return {
				...state,
				logon: payload !== null && Boolean(Object.keys(payload).length >= 1),
				user: payload !== null && 'user' in payload ? payload?.user : {},
			};

		case DISPATCHES.SIGNOUT:
			return {
				...state,
				logon: false,
				user: {},
			};

		default:
			return state;
	}
};

export default auth;
