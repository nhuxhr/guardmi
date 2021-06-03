import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { useAssets } from 'expo-asset';
import { withTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Icon } from '../../../components';
import { DISPATCHES, SCREENS } from '../../../constants';
import { StatusBar } from 'expo-status-bar';

const Servers = ({ theme: { colors }, connection, servers, dispatch, route: { params }, navigation: { navigate } }) => {
	const [assets] = useAssets([require('../../../assets/crown.png'), require('../../../assets/checked.png'), require('../../../assets/unchecked.png')]);

	const handleServer = (item) => {
		if (typeof params?.loading !== 'undefined' && params?.loading) return;
		if (connection.city === item.city) return;

		dispatch({
			type: DISPATCHES.SELECTED_SERVER,
			payload: {
				server: item,
			},
		});

		navigate(SCREENS.LOGON.HOME, {
			key: Math.floor(Math.random() * 9999), // This is just to trigger the Home screen useEffect. If there is better way to do this, feel free to 'cause it's your app 😁
			reconnect: true,
		});
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style="dark" />
			<View style={styles.header}>
				<View style={styles.headerLeft}>
					<TouchableOpacity onPress={() => navigate(SCREENS.LOGON.HOME)}>
						<Icon name="chevron-left" color="rgba(0, 0, 0, .5)" />
					</TouchableOpacity>
				</View>
				<View style={styles.headerMiddle}>
					<Text style={{ fontSize: 20, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2, color: 'rgba(0, 0, 0, .5)' }}>Servers</Text>
				</View>
				<View style={styles.headerRight}>
					<TouchableOpacity onPress={() => navigate(SCREENS.LOGON.UPGRADE)}>
						<Image style={{ width: 24, height: 24 }} source={require('../../../assets/crown.png')} resizeMode="cover" />
					</TouchableOpacity>
				</View>
			</View>
			<ScrollView>
				{servers?.free?.length >= 1 && (
					<View style={[styles.server, { paddingTop: 20 }]}>
						<Text style={[styles.serverTitle, { color: colors.primary }]}>
							<Text style={{ fontWeight: 'bold' }}>Free</Text> Locations
						</Text>
						{servers?.free.map((item, key) => {
							const isConnected = connection.city === item.city;
							const isChecked = isConnected ? require('../../../assets/checked.png') : require('../../../assets/unchecked.png');

							return (
								<TouchableOpacity key={key} style={[styles.center, styles.serverBtn]} onPress={() => handleServer(item)}>
									<View style={[styles.center, styles.serverLeftContent]}>
										<Image style={styles.countryImg} source={item.icon} resizeMode="cover" />
										<Text style={{ fontSize: 18 }}>
											<Text style={{ fontWeight: 'bold' }}>{item.country}</Text> - {item.city}
										</Text>
									</View>
									<View style={styles.serverRightContent}>
										<Icon family="MaterialCommunityIcons" name={`wifi-strength-${item.range}`} color={colors.primary} size={18} />
										<Image style={{ width: 24, height: 24 }} source={isChecked} resizeMode="cover" />
									</View>
								</TouchableOpacity>
							);
						})}
					</View>
				)}
				{servers?.premium?.length >= 1 && (
					<View style={styles.server}>
						<Text style={[styles.serverTitle, { color: colors.primary }]}>
							<Text style={{ fontWeight: 'bold' }}>Premium</Text> Locations
						</Text>
						{servers?.premium.map((item, key) => {
							const isConnected = connection.city === item.city;
							const isChecked = isConnected ? require('../../../assets/checked.png') : require('../../../assets/unchecked.png');

							return (
								<TouchableOpacity
									key={key}
									style={[styles.center, styles.serverBtn]}
									onPress={() =>
										Alert.alert('Premium Locations', 'Upgrade your plan in other to unlock premium location.', [
											{
												text: 'Close',
												style: 'cancel',
											},
											{
												text: 'Upgrade Now',
												onPress: () => navigate(SCREENS.LOGON.UPGRADE),
											},
										])
									}
								>
									<View style={[styles.center, styles.serverLeftContent]}>
										<Image style={styles.countryImg} source={item.icon} resizeMode="cover" />
										<Text style={{ fontSize: 18 }}>
											<Text style={{ fontWeight: 'bold' }}>{item.country}</Text> - {item.city}
										</Text>
									</View>
									<View style={styles.serverRightContent}>
										<Icon family="MaterialCommunityIcons" name={`wifi-strength-${item.range}`} color={colors.primary} size={18} />
										<Image style={{ width: 24, height: 24 }} source={isChecked} resizeMode="cover" />
									</View>
								</TouchableOpacity>
							);
						})}
					</View>
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

const mapStateToProps = (state) => ({
	connection: state?.server?.connection,
	servers: state?.server?.servers,
});
const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Servers));

const styles = StyleSheet.create({
	center: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		flex: 1,
		backgroundColor: '#FFF',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 20,
		paddingHorizontal: 26,
		shadowColor: '#000',
		shadowOffset: {
			width: 2,
			height: 2,
		},
		shadowOpacity: 0.6,
		shadowRadius: 5,
		elevation: 8,
	},
	headerLeft: {},
	headerMiddle: {},
	headerRight: {},
	server: {
		paddingTop: 50,
		paddingHorizontal: 26,
	},
	serverTitle: {
		fontSize: 20,
		marginBottom: 10,
	},
	serverBtn: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 26,
		borderBottomColor: 'rgba(0, 0, 0, .12)',
		borderBottomWidth: 0.5,
	},
	serverLeftContent: {
		flex: 2,
		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
	countryImg: {
		width: 24,
		height: 24,
		marginRight: 15,
	},
	serverRightContent: {
		flex: 0.5,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});
