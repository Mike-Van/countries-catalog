import { Container, Stack } from '@mui/material';
import { useGetAllCountries } from '~/queries/useGetAllCountries';
import { CurrentCountryModal } from './CurrentCountryModal';
import { SearchBar } from './SearchBar';
import { List } from './List';
import { Pagination } from './Pagination';

export const HomeApp = () => {
	// fetch initial data
	useGetAllCountries({ enabled: true });

	return (
		<Container maxWidth={false}>
			<CurrentCountryModal />
			<Stack gap={3} alignItems="center">
				<SearchBar />
				<List />
				<Pagination />
			</Stack>
		</Container>
	);
};
