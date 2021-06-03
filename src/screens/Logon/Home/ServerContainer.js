import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useAssets } from 'expo-asset';
import { useNavigation } from '@react-navigation/core';
import { withTheme } from 'react-native-paper';
import { connect } from 'react-redux';

import { Icon } from '../../../components';
import { SCREENS } from '../../../constants';

import styles from './styles';

const ServerContainer = ({ theme: { colors }, connection, servers, loading, handleServer }) => {
	const [assets] = useAssets([require('../../../assets/checked.png'), require('../../../assets/unchecked.png')]);
	const { navigate } = useNavigation();

	return (
		<View style={styles.bottom}>
			{servers.map((item, key) => {
				if (key >= 3) return;

				const isConnected = connection.city === item.city;
				const isChecked = isConnected ? require('../../../assets/checked.png') : require('../../../assets/unchecked.png');

				return (
					<TouchableOpacity
						key={key}
						style={[
							styles.center,
							{
								flexDirection: 'row',
								justifyContent: 'space-between',
								paddingVertical: 26,
								marginHorizontal: 26,
								borderBottomColor: 'rgba(0, 0, 0, .12)',
								borderBottomWidth: 0.5,
							},
							key === 2 && {
								borderBottomWidth: 0,
							},
						]}
						onPress={() => handleServer(item)}
					>
						<View style={[styles.center, { flex: 2, flexDirection: 'row', justifyContent: 'flex-start' }]}>
							<Image style={{ width: 24, height: 24, marginRight: 15 }} source={item.icon} resizeMode="cover" />
							<Text style={{ fontSize: 18 }}>
								<Text style={{ fontWeight: 'bold' }}>{item.country}</Text> - {item.city}
							</Text>
						</View>
						<View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'space-between' }}>
							<Icon family="MaterialCommunityIcons" name={`wifi-strength-${item.range}`} color={colors.primary} size={18} />
							<Image style={{ width: 24, height: 24 }} source={isChecked} resizeMode="cover" />
						</View>
					</TouchableOpacity>
				);
			})}
			<TouchableOpacity
				style={[
					styles.center,
					{
						padding: 26,
						backgroundColor: '#ccf0eb',
					},
				]}
				onPress={() => navigate(SCREENS.LOGON.SERVERS, { loading })}
			>
				<Text style={{ fontSize: 18, color: colors.primary }}>
					See all <Text style={{ fontWeight: 'bold' }}>Locations</Text>
				</Text>
			</TouchableOpacity>
		</View>
	);
};

const mapStateToProps = (state) => ({
	connection: state?.server?.connection,
	servers: state?.server?.servers?.free,
});

export default connect(mapStateToProps, null)(withTheme(ServerContainer));
