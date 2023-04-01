import { fetchApi } from '@/utils';
import { METHOD } from '@/utils/constants';
import queryString from 'query-string';

export const getListUrl = (page = null, page_size = null) => () =>
	fetchApi(`url/list?${queryString.stringify({ page, page_size })}`, null, METHOD.GET, {});

export const detectUrl = (data) => () => fetchApi(`url/detect-url`, data, METHOD.POST, {});
