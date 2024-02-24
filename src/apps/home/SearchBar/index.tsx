import { SearchOutlined, SortOutlined } from '@mui/icons-material';
import { CircularProgress, InputAdornment, Stack, TextField, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useGetAllCountriesCache } from '~/queries/useGetAllCountries';

export const SearchBar = () => {
	const router = useRouter();

	const { isLoading } = useGetAllCountriesCache();

	return (
		<Stack width={1} direction="row" gap={3}>
			<TextField
				autoFocus
				fullWidth
				disabled={isLoading}
				placeholder="Seach countries..."
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							{isLoading ? <CircularProgress size="24px" /> : <SearchOutlined />}
						</InputAdornment>
					),
				}}
				// defaultValue={router.query.search}
				onChange={(e) => {
					router.push({ query: { ...router.query, search: String(e.target.value).trim(), page: 1 } }); // reset page number when searching
				}}
			/>

			<Button
				startIcon={<SortOutlined />}
				onClick={() => {
					router.push({
						query: {
							...router.query,
							sortOrder: router.query.sortOrder === 'desc' ? 'asc' : 'desc',
							page: 1,
						}, // reset page number when searching
					});
				}}
			>
				{router.query.sortOrder === 'desc' ? 'Z-A' : 'A-Z'}
			</Button>
		</Stack>
	);
};
