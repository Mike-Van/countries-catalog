import {
	Stack,
	Typography,
	Button,
	Box,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useGetAllCountriesCache } from '~/queries/useGetAllCountries';

export const CurrentCountryModal = () => {
	const router = useRouter();

	const { data = [] } = useGetAllCountriesCache();

	const currentCountry = useMemo(() => {
		if (!router.query.country) return undefined;

		return data.find((c) => c.cca2 === router.query.country);
	}, [data, router.query.country]);

	const handleClose = () => {
		const updatedQuery = { ...router.query };
		delete updatedQuery.country;

		router.push({ query: updatedQuery });
	};

	if (!currentCountry) return null;

	return (
		<Dialog open onClose={handleClose} fullWidth scroll="body">
			<DialogTitle>
				{currentCountry.name.official} {currentCountry.flag}
			</DialogTitle>
			<DialogContent>
				<img width="100%" src={currentCountry.flags.png} alt={currentCountry.flags.alt} />
				<Stack gap={1.5}>
					<Box>
						<Typography variant="caption" component="div">
							Country Codes (2 chars):
						</Typography>
						<Typography variant="body2">{currentCountry.cca2}</Typography>
					</Box>

					<Box>
						<Typography variant="caption" component="div">
							Country Codes (3 chars):
						</Typography>
						<Typography variant="body2">{currentCountry.cca3}</Typography>
					</Box>

					{!!currentCountry.name.nativeName && (
						<Box>
							<Typography variant="caption" component="div">
								Native Names:
							</Typography>
							{Object.keys(currentCountry.name.nativeName).map((locale, i) => (
								<Typography key={currentCountry.name.nativeName[locale].official} variant="body2">
									{currentCountry.name.nativeName[locale].official}{' '}
								</Typography>
							))}
						</Box>
					)}

					<Box>
						<Typography variant="caption" component="div">
							Alt spellings:
						</Typography>
						{currentCountry.altSpellings.map((spelling: string) => (
							<Typography key={spelling} variant="body2">
								{spelling}
							</Typography>
						))}
					</Box>

					<Box>
						<Typography variant="caption" component="div">
							Calling codes root:
						</Typography>
						<Typography variant="body2">{currentCountry.idd.root}</Typography>
					</Box>

					<Box>
						<Typography variant="caption" component="div">
							Calling codes suffixes:
						</Typography>
						<Typography variant="body2">
							{(currentCountry.idd.suffixes || []).map((s: string) => s).join(', ')}
						</Typography>
					</Box>
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Close</Button>
			</DialogActions>
		</Dialog>
	);
};
