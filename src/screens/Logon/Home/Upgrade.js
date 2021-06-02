import React from 'react';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useAssets } from 'expo-asset';
import { withTheme } from 'react-native-paper';

import { SCREENS } from '../../../constants';

const Upgrade = ({ theme: { colors } }) => {
	const [assets] = useAssets([require('../../../assets/crown.png')]);
	const { navigate } = useNavigation();

	return (
		<View style={{ flex: 1, justifyContent: 'center' }}>
			<TouchableWithoutFeedback onPress={() => navigate(SCREENS.LOGON.UPGRADE)}>
				<View
					style={{
						flexDirection: 'row',
						width: '90%',
						alignItems: 'center',
						backgroundColor: 'rgba(0, 108, 93, .4)',
						paddingVertical: 15,
						paddingHorizontal: 30,
						borderRadius: 10,
					}}
				>
					<Image style={{ width: 40, height: 40, marginRight: 20 }} source={require('../../../assets/crown.png')} />
					<View style={{ justifyContent: 'center', alignItems: 'center' }}>
						<Text style={{ fontSize: 20, fontWeight: 'bold', letterSpacing: 6, color: colors.primary, textTransform: 'uppercase' }}>Get premium today</Text>
						<Text style={{ fontSize: 16, letterSpacing: 1, color: '#FFF' }}>Remove Ads and unlock all locations</Text>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
};

export default withTheme(Upgrade);
