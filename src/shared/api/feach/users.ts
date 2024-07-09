import AxiosInstance from '../axiosInstance';
import { FETCH_DATA_USERS } from '../constants/endpoint';


type apiFn = () => Promise<unknown>;

type Props = {
	key: string[];
	api: apiFn;
};

/**
 * 
 * @param params 
 * @returns key for react query
 * @returns api function for the api
 */

const fetchUsers = (params: string): Props => {
	return {
		key: ['USERS_LIST', 'QUERY', params],
		api: async () => {
			const res = await AxiosInstance.get(FETCH_DATA_USERS(params));
			if (!res) {
				throw new Error('Something wrong');
			}

			return res?.data;
		},
	};
};

export { 
  fetchUsers,
};
