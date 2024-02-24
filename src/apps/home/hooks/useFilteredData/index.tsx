import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useGetAllCountriesCache } from '~/queries/useGetAllCountries';

const PAGE_SIZE = 25;

export const useFilteredData = () => {
	const router = useRouter();

	const { data = [] } = useGetAllCountriesCache();

	return useMemo(() => {
		if (!data.length)
			return {
				sorted: [],
				searched: [],
				paginated: [],
			};

		const sorted = data.sort((a, b) => {
			if (router.query.sortOrder === 'desc') return b.name.official.localeCompare(a.name.official);
			return a.name.official.localeCompare(b.name.official);
		});

		const searched = sorted.filter((country) =>
			router.query.search
				? country.name.official.toLowerCase().includes(String(router.query.search).toLowerCase())
				: true
		);

		const page = Number(router.query.page) || 1;
		const paginated = searched.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

		return { sorted, searched, paginated };
	}, [data, router.query.sortOrder, router.query.search, router.query.page]);
};
