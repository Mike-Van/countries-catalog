import { UndefinedInitialDataOptions, useQuery } from '@tanstack/react-query';
import { apiInstance } from '~/libs/axios';

export const useGetAllCountries = ({ enabled }: Pick<UndefinedInitialDataOptions, 'enabled'>) => {
	return useQuery({
		enabled: enabled,
		queryKey: ['all'],
		queryFn: async () => apiInstance.get<Array<Record<string, any>>>('/all'),
		select: ({ data }) => {
			return data;
		},
	});
};

export const useGetAllCountriesCache = () => {
	return useGetAllCountries({ enabled: false });
};
