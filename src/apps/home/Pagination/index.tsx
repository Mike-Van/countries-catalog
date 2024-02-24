import { Pagination as MuiPagination } from '@mui/material';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useGetAllCountriesCache } from '~/queries/useGetAllCountries';
import { useFilteredData } from '../hooks/useFilteredData';

const PAGE_SIZE = 25;

export const Pagination = () => {
	const router = useRouter();

	const { isLoading, data = [] } = useGetAllCountriesCache();
	const { searched } = useFilteredData();

	const pagesCount = useMemo(() => {
		if (!data.length) return 1;

		return router.query.search ? Math.ceil(searched.length / PAGE_SIZE) : Math.ceil(data.length / PAGE_SIZE);
	}, [data, searched, router.query.search]);

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
