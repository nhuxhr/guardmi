import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAssets } from 'expo-asset';
import { connect } from 'react-redux';

import { Ads } from '../../../components';
import { DISPATCHES, SCREENS } from '../../../constants';

import styles from './styles';
import TopHeader from './TopHeader';
import ServerContainer from './ServerContainer';

const Home = ({ user, connection, dispatch, route: { params }, navigation: { replace } }) => {
	const [assets] = useAssets([require('../../../assets/global.png'), require('../../../assets/crown.png')]);
	const [connected, setConnected] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleConnect = async () => {
		if (loading) return;
		setLoading(true);

		if (!connected) {
			await Ads.rewardAds({
				rewardedVideoUserDidEarnReward: () => {
					setConnected(true);
				},
			});
		} else {
			setConnected(false);
		}

		setLoading(false);
	};

	const handleReconnect = async () => {
		if (loading) return;
		setLoading(true);
		setConnected(false);

		await Ads.rewardAds({
			rewardedVideoUserDidEarnReward: () => {
				setConnected(true);
				setLoading(false);
			},
			rewardedVideoDidDismiss: () => {
				setLoading(false);
			},
		});
	};

	const handleServer = (item) => {
		if (loading) return;
		if (connection.city === item.city) return;

		dispatch({
			type: DISPATCHES.SELECTED_SERVER,
			payload: {
				server: item,
			},
		});

		handleReconnect();
	};

	useEffect(() => {
		if (Object.keys(user).length <= 0) replace(SCREENS.AUTH.DEFAULT);
	}, [user]);

	useEffect(() => {
		if (typeof params?.reconnect !== 'undefined' && params?.reconnect) handleReconnect();
	}, [params?.key, params?.reconnect]);

	return (
		<View style={styles.container}>
			<StatusBar style="light" />
			<TopHeader props={{ loading, setLoading, connected, setConnected, handleConnect }} />
			<ServerContainer loading={loading} handleServer={handleServer} />
		</View>
	);
};

const mapStateToProps = (state) => ({
	user: state?.auth?.user,
	connection: state?.server?.connection,
	servers: state?.server?.servers?.free,
});
const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Home);
