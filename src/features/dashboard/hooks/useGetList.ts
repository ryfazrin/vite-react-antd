import { fetchUsers } from "@/shared/api/feach/users";
import useFetchHook from "@/shared/api/useFetchHook";
import { paramsToString } from "@/shared/helpers/utils";
import { QueryClient } from "@tanstack/react-query";
import { modelUsers } from "../models/model-users";
import { DASHBOARD_HOME } from "@/shared/api/constants/path";
import { useLocation, useNavigate } from "react-router-dom";

/**
 *
 * @param queryClient
 * @param offset
 */
export const prefetchListQuery = async (
	queryClient: QueryClient,
	params: any,
) => {
	const fetchDataDashboard = fetchUsers(paramsToString(params));
	await queryClient.prefetchQuery(
		fetchDataDashboard.key,
		fetchDataDashboard.api,
	);
};

/**
 * the optional initial data used for SSR
 * @param initialData
 */
const useGetList = (initialData?: any) => {
	const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const limit = 10;

	const page = Object.fromEntries(searchParams).page || 1;
	const offset = (+page - 1) * limit;

	const params = {
		...Object.fromEntries(searchParams),
		offset,
		per_page: limit,
	};

	/**
	 * use query
	 * with key of array combine based on params
	 */
	const fetchDataUsers = fetchUsers(paramsToString(params));
	const fetchQuery: any = useFetchHook({
		keys: fetchDataUsers.key,
		api: fetchDataUsers.api,
		initialData,
		option: {
			onError: (error: any) => {
				console.log('error', error.toString());
			},
		},
	});

	const getCurrentPage = (): string => {
		return page as string;
	};

	const dataTable = modelUsers(
		fetchQuery?.data?.data,
		+getCurrentPage(),
		limit,
	);

	const generateLinkPagination = (type: string): string => {
		let currentPage = +page as number;
		currentPage =
			type === 'next'
				? currentPage + 1
				: currentPage > 1
				? currentPage - 1
				: currentPage;

		const params = paramsToString({
			...Object.fromEntries(searchParams),
			page: currentPage,
		});

		return `${DASHBOARD_HOME}${params}`;
	};

	const onChangePage = (page: string) => {
		const params = paramsToString({
			...Object.fromEntries(searchParams),
			page,
		});
		navigate(`${DASHBOARD_HOME}${params}`);
	};

	const handleOnSearch = (form: any) => {
		const params = paramsToString({
			...Object.fromEntries(searchParams),
			page: 1,
			filter:
				form?.getFieldValue('filter')?.length > 0
					? form?.getFieldValue('filter')
					: null,
			search: form?.getFieldValue('search'),
		});
		navigate(params);
	};

	const getDefaultValueFilter = (): any => {
		return {
			filter: Object.fromEntries(searchParams)?.filter,
			search: Object.fromEntries(searchParams)?.search,
		};
	};

	return {
		fetchQuery,
		generateLinkPagination,
		getCurrentPage,
		onChangePage,
		handleOnSearch,
		getDefaultValueFilter,
		dataTable,
	};
};

export default useGetList;
