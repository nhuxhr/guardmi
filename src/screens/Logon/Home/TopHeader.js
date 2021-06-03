import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Animated, TouchableWithoutFeedback, Easing } from 'react-native';
import { connect } from 'react-redux';
import { useAssets } from 'expo-asset';
import { LinearGradient } from 'expo-linear-gradient';
import { withTheme } from 'react-native-paper';

import { Icon } from '../../../components';
import { DISPATCHES } from '../../../constants';
import { removeData } from '../../../helpers/storage';

import styles from './styles';
import Upgrade from './Upgrade';

const TopHeader = ({ theme: { colors }, connection, dispatch, props: { loading, setLoading, connected, setConnected, handleConnect } }) => {
	const [assets] = useAssets([require('../../../assets/global.png')]);

	const spinValue = new Animated.Value(0);

	Animated.timing(spinValue, {
		toValue: 1,
		duration: 500,
		easing: Easing.linear,
		useNativeDriver: true,
	}).start();

	const powerOn = spinValue.interpolate({
		inputRange: [0, 1],
		outputRange: ['180deg', '360deg'],
	});
	const powerOff = spinValue.interpolate({
		inputRange: [0, 1],
		outputRange: ['360deg', '180deg'],
	});

	const handleSignOut = async () => {
		setLoading(false);
		setConnected(false);
		await removeData('auth');
		dispatch({ type: DISPATCHES.SIGNOUT });
	};

	return (
		<View style={styles.header}>
			<ImageBackground style={styles.headerInner} source={require('../../../assets/global.png')} resizeMode="cover">
				<View style={[styles.overlay]}></View>
				<TouchableOpacity style={styles.logoutBtn} onPress={handleSignOut}>
					<Icon name="power" color="#FFF" size={34} />
				</TouchableOpacity>
				<View style={{ flex: 4, justifyContent: 'flex-end', alignItems: 'center' }}>
					<Animated.View style={{ transform: [{ rotate: loading ? '180deg' : connected ? powerOn : powerOff }] }}>
						<TouchableWithoutFeedback onPress={handleConnect}>
							<LinearGradient style={styles.connectionBtn} colors={loading ? colors.connecting : connected ? colors.connected : colors.disconnected}>
								<Icon name="power" color="#FFF" size={34} />
							</LinearGradient>
						</TouchableWithoutFeedback>
					</Animated.View>
					<View style={styles.serverInfo}>
						<Text style={styles.selectedServer}>
							<Text style={{ fontWeight: 'bold' }}>{connection.country}</Text> - {connection.city}
						</Text>
						<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
							<LinearGradient style={styles.statusDot} colors={loading ? colors.connecting : connected ? colors.connected : colors.disconnected} />
							<Text style={[styles.status, loading && { color: '#ffe9b9' }, connected && { color: '#b2e8e1' }]}>{loading ? `Connecting...` : connected ? `Connected` : `Disconnected`}</Text>
						</View>
					</View>
				</View>
				<Upgrade />
			</ImageBackground>
		</View>
	);
};

const mapStateToProps = (state) => ({
	connection: state?.server?.connection,
});
const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(TopHeader));
