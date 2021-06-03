import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import * as StoreReview from 'expo-store-review';
import * as Linking from 'expo-linking';

import { SCREENS } from '../constants';
import Loading from './Loading';
import * as Auth from './Auth';
import * as Logon from './Logon';
import { Alert } from 'react-native';

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const LogonStack = createStackNavigator();

const AuthScreens = () => (
	<>
		<StatusBar style="dark" />
		<AuthStack.Navigator headerMode="none" initialRouteName={SCREENS.AUTH.SIGNIN}>
			<AuthStack.Screen name={SCREENS.AUTH.SIGNIN} component={Auth.SignIn} />
			<AuthStack.Screen name={SCREENS.AUTH.SIGNUP} component={Auth.SignUp} />
		</AuthStack.Navigator>
	</>
);

const LogonScreens = () => (
	<LogonStack.Navigator headerMode="none" initialRouteName={SCREENS.LOGON.HOME}>
		<LogonStack.Screen name={SCREENS.LOGON.HOME} component={Logon.Home} />
		<LogonStack.Screen name={SCREENS.LOGON.SERVERS} component={Logon.Servers} />
		<LogonStack.Screen name={SCREENS.LOGON.UPGRADE} component={Logon.Upgrade} />
	</LogonStack.Navigator>
);

const Index = () => {
	useEffect(() => {
		(async () => {
			if (await StoreReview.hasAction()) {
				await StoreReview.requestReview();
			}

			const x = setTimeout(() => {
				Alert.alert('Do you like Guardmi?', 'If yes! Would you like to get the source code for this app?', [
					{
						text: 'No! Thanks',
						style: 'cancel',
					},
					{
						text: 'Yes! Please',
						onPress: () => {
							Linking.openURL('https://gum.co/guardmi');
						},
					},
				]);

				clearTimeout(x);
			}, 10000);
		})();
	}, []);

	return (
		<NavigationContainer>
			<Stack.Navigator headerMode="none" initialRouteName={SCREENS.LOADING}>
				<Stack.Screen name={SCREENS.LOADING} component={Loading} />
				<Stack.Screen name={SCREENS.AUTH.DEFAULT} component={AuthScreens} />
				<Stack.Screen name={SCREENS.LOGON.DEFAULT} component={LogonScreens} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Index;
