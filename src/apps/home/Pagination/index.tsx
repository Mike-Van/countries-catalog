import { Pagination as MuiPagination } from '@mui/material';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useGetAllCountriesCache } from '~/queries/useGetAllCountries';
import { useFilteredData } from '../hooks/useFilteredData';

const PAGE_SIZE = 25;

export const Pagination = () => {
	const router = useRouter();

	const { isLoading, data = [] } = useGetAllCountriesCache();
	const filteredData = useFilteredData();

	const pagesCount = useMemo(() => {
		if (!data.length) return 1;

		if (router.query.search) return Math.ceil(filteredData.length / PAGE_SIZE);

		return Math.ceil(data.length / PAGE_SIZE);
	}, [data, filteredData, router.query.search]);

	return (
		<MuiPagination
			disabled={isLoading}
			page={Number(router.query.page) || 1}
			count={pagesCount}
			onChange={(_, pageNum) => {
				router.push({ query: { ...router.query, page: pageNum } });
			}}
		/>
	);
};
