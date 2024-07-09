const FETCH_DATA_USERS = (params: string) =>`/users${params}`;

const FETCH_DETAIL = (id: string) => `/users/${id}`;

const LOGIN = 'http://fakeapi.jsonparseronline.com/users';


type API_PROPS = {
	[key: string]: string,
}

const API_URL: API_PROPS = {
	LOCAL: 'https://reqres.in/api',
	DEV: 'https://reqres.in/api',
	PROD: 'https://reqres.in/api',
}

export { 
	FETCH_DATA_USERS, 
	LOGIN, 
	FETCH_DETAIL, 
	API_URL
};
