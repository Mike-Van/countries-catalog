import { CircularProgress, Stack, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { useRouter } from 'next/router';
import { useGetAllCountriesCache } from '~/queries/useGetAllCountries';
import { useFilteredData } from '../hooks/useFilteredData';

export const List = () => {
	const router = useRouter();

	const { isLoading } = useGetAllCountriesCache();
	const { paginated } = useFilteredData();

	if (isLoading) return <CircularProgress />;

	return (
		<Grid container spacing={3}>
			{paginated.map((country) => (
				<Grid
					key={country.cca2}
					item
					xs={2.4}
					onClick={() => router.push({ query: { ...router.query, country: country.cca2 } })}
				>
					<CardMedia component="img" image={country.flags.png} alt={country.flags.alt} />
					<Card variant="outlined">
						<CardContent component={Stack} gap={1.5}>
							<Typography variant="body1">
								{country.name.official} {country.flag}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
			))}
		</Grid>
	);
};
