export function cleanUpParams(params = {}, excludeEmptyValue = true) {
	const result: any = {};

	Object.entries(params).forEach((param) => {
		if (excludeEmptyValue) {
			if (param[1]) result[param[0]] = param[1];
		} else {
			result[param[0]] = param[1];
		}
	});

	return result;
}

export function paramsToString(
	params = {},
	excludeEmptyValue = true,
	sort = true,
) {
	const cleanParams = cleanUpParams(params, excludeEmptyValue);
	const paramsArray: any[] = [];

	Object.entries(cleanParams).forEach((param) => {
		paramsArray.push(`${param[0]}=${param[1]}`);
	});

	if (sort) paramsArray.sort();

	return paramsArray.length ? `?${paramsArray.join('&')}` : '';
}