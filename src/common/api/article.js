import { fetchApi } from '@/utils';
import { METHOD } from '@/utils/constants';
import queryString from 'query-string';

export const getListArticle = (page = null, pageSize = null) => () =>
	fetchApi(`article/list?${queryString.stringify({ page, page_size: pageSize })}`, null, METHOD.GET, {});
