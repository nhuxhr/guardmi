import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAssets } from 'expo-asset';
import { connect } from 'react-redux';
import { TextInput, withTheme } from 'react-native-paper';

import styles from './styles';
import { DISPATCHES, SCREENS } from '../../constants';
import { storeData } from '../../helpers/storage';

const SignIn = ({ user, dispatch, theme: { colors }, navigation: { navigate, replace } }) => {
	const [assets] = useAssets([require('../../assets/logo.png')]);
	const [btnOpacity, setBtnOpacity] = useState(1);
	const [inputs, setInputs] = useState({
		email: {
			value: 'ponmilerapheal@gmail.com',
			error: false,
		},
		password: {
			value: '12345',
			error: false,
		},
	});

	const onChangeText = (key, value) => {
		setInputs({
			...inputs,
			[key]: {
				...[key],
				value,
			},
		});
	};

	const setError =
		(key, error) =>
		(action = undefined, title = null, message = null) => {
			if (action !== undefined && title !== null && message !== null) {
				switch (action) {
					case 'alert':
						Alert.alert(title, message);
						break;

					default:
						Alert.alert(title, message);
						break;
				}
			}

			setInputs({
				...inputs,
				[key]: {
					...[key],
					error,
				},
			});
		};

	const handleSignIn = async () => {
		Keyboard.dismiss();

		if (inputs?.email?.value === '') return setError('email', true);
		if (inputs?.password?.value === '') return setError('password', true);

		const user = {
			uid: 'anything',
			name: 'Rapheal Bamidele',
			email: inputs?.email?.value,
		};

		await storeData('auth', { user }, true);
		dispatch({
			type: DISPATCHES.SIGNIN,
			payload: {
				user,
			},
		});
	};

	useEffect(() => {
		if (user !== null && Object.keys(user).length >= 1) replace(SCREENS.LOGON.DEFAULT);
	}, [user]);

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<LinearGradient style={[styles.container]} colors={colors.gradient}>
				<View style={styles.header}>
					<Image style={styles.logo} source={require('../../assets/logo.png')} resizeMode="cover" />
					<Text style={[styles.label, { color: colors.primary }]}>Sign In</Text>
				</View>
				<View style={styles.form}>
					<KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
						<TextInput
							style={styles.input}
							label="Email"
							underlineColor={colors.primary}
							value={inputs?.email?.value}
							onChangeText={(value) => onChangeText('email', value)}
							error={inputs?.email?.error}
						/>
						<TextInput
							style={styles.input}
							label="Password"
							underlineColor={colors.primary}
							value={inputs?.password?.value}
							onChangeText={(value) => onChangeText('password', value)}
							error={inputs?.password?.error}
							secureTextEntry={true}
						/>
						<View style={{ flexDirection: 'row' }}>
							<Text>Don't have an account? </Text>
							<TouchableOpacity
								onPress={() => {
									navigate(SCREENS.AUTH.SIGNUP);
								}}
							>
								<Text style={{ color: colors.primary }}>Sign Up</Text>
							</TouchableOpacity>
						</View>
					</KeyboardAvoidingView>
				</View>
				<TouchableWithoutFeedback onPressIn={() => setBtnOpacity(0.7)} onPressOut={() => setBtnOpacity(1)} onPress={handleSignIn}>
					<View style={[styles.btn, { backgroundColor: colors.primary, opacity: btnOpacity }]}>
						<Text style={styles.btnTxt}>Sign In</Text>
					</View>
				</TouchableWithoutFeedback>
			</LinearGradient>
		</TouchableWithoutFeedback>
	);
};

const mapStateToProps = (state) => ({ user: state?.auth?.user });
const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(SignIn));
