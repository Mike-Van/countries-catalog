import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useGetAllCountriesCache } from '~/queries/useGetAllCountries';

const PAGE_SIZE = 25;

export const useFilteredData = () => {
	const router = useRouter();

	const { data = [] } = useGetAllCountriesCache();

	const sortedData = useMemo(() => {
		if (!data.length) return [];

		return data.sort((a, b) =>
			router.query.sortOrder === 'desc'
				? b.name.official.localeCompare(a.name.official)
				: a.name.official.localeCompare(b.name.official)
		);
	}, [data, router.query.sortOrder]);

	const filteredData = useMemo(() => {
		if (!sortedData.length) return [];

		return sortedData.filter((country) =>
			router.query.search
				? country.name.official.toLowerCase().includes((router.query.search as string).toLowerCase())
				: true
		);
	}, [sortedData, router.query.search]);

	const paginatedData = useMemo(() => {
		const page = Number(router.query.page) || 1;

		return filteredData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
	}, [filteredData, router.query.page]);

	return paginatedData;
};
