import '@fontsource/roboto/100.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';
import { GlobalStyles } from '@mui/material';

import type { AppProps } from 'next/app';
import { QueryProvider } from '~/providers/query-provider';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryProvider>
			<GlobalStyles
				styles={{
					'html,body': {
						fontFamily: "'Roboto', sans-serif",
					},
				}}
			/>

			<Component {...pageProps} />
		</QueryProvider>
	);
}
