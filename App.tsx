import React from 'react';
import { StyleSheet } from 'react-native';
import { DefaultTheme, Provider as RNPProvider } from 'react-native-paper';
import { Provider as RRProvider } from 'react-redux';

import configureStore from './src/store';
import Screen from './src/screens';

const theme = {
	...DefaultTheme,
	roundness: 2,
	myOwnProperty: true,
	colors: {
		...DefaultTheme.colors,
		primary: '#00b59c',
		accent: '#f1c40f',
		gradient: ['#f0fff4', '#c3ffe8'],
		connected: ['#ccf0eb', '#00907c', '#00b59c'],
		connecting: ['#fff0d0', '#cc9313', '#ffb818'],
		disconnected: ['#d8d8d8', '#666666', '#808080'],
	},
};

export default function App() {
	const store = configureStore();

	return (
		<RRProvider store={store}>
			<RNPProvider theme={theme}>
				<Screen />
			</RNPProvider>
		</RRProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
