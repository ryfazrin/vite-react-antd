import { AUTH_ROUTES, PRIVATE_ROUTES } from "../api/constants/path";

export const checkIsPrivateRoute = (currentRoute: string): boolean => {
	return Boolean(
		PRIVATE_ROUTES.find((r: string) => {
			return currentRoute.includes(r);
		}),
	);
};

export const checkIsAuthRoute = (currentRoute: string): boolean => {
	return Boolean(
		AUTH_ROUTES.find((r: string) => {
			return r.includes(currentRoute);
		}),
	);
};
