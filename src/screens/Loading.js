import React, { useEffect } from 'react';
import { View, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { useAssets } from 'expo-asset';

import { getData } from '../helpers/storage';
import { DISPATCHES, SCREENS } from '../constants';

const { width, height } = Dimensions.get('screen');

const Loading = ({ dispatch, navigation: { replace } }) => {
	const [assets] = useAssets([require('../../assets/splash.png')]);

	useEffect(() => {
		(async () => {
			const auth = await getData('auth', true);

			if (auth !== null && 'user' in auth) {
				dispatch({
					type: DISPATCHES.SIGNIN,
					payload: {
						user: auth?.user,
					},
				});

				replace(SCREENS.LOGON.DEFAULT);
			} else {
				replace(SCREENS.AUTH.DEFAULT);
			}
		})();
	}, []);

	const bannerError = (bannerError) => {
		console.log({ bannerError });
	};

	return (
		<View style={{ flex: 1 }}>
			<Image style={{ width, height }} source={require('../../assets/splash.png')} resizeMode="cover" />
		</View>
	);
};

const mapStateToProps = (state) => ({ user: state?.auth?.user });
const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
