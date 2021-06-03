import React, { useState } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAssets } from 'expo-asset';
import { connect } from 'react-redux';
import { TextInput, withTheme } from 'react-native-paper';

import styles from './styles';
import { SCREENS } from '../../constants';

const SignUp = ({ theme: { colors }, navigation: { navigate } }) => {
	const [assets] = useAssets([require('../../assets/logo.png')]);
	const [btnOpacity, setBtnOpacity] = useState(1);
	const [inputs, setInputs] = useState({
		name: {
			value: 'Rapheal Bamidele',
			error: false,
		},
		email: {
			value: 'ponmilerapheal@gmail.com',
			error: false,
		},
		password: {
			value: '12345',
			error: false,
		},
		cPassword: {
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

	const handleSignUp = () => {
		Keyboard.dismiss();

		console.log(typeof inputs?.email?.value, inputs?.email?.value);

		if (inputs?.name?.value === '') return setError('name', true);
		if (inputs?.email?.value === '') return setError('email', true);
		if (inputs?.password?.value === '') return setError('password', true);
		if (inputs?.cPassword?.value === '') return setError('cPassword', true);

		if (inputs?.password?.value !== inputs?.cPassword?.value) return setError('password', true)('alert', 'Password error', 'Password did not match!');

		navigate(SCREENS.AUTH.SIGNIN);
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<LinearGradient style={[styles.container]} colors={colors.gradient}>
				<ScrollView contentContainerStyle={styles.scrollView}>
					<View style={styles.header}>
						<Image style={styles.logo} source={require('../../assets/logo.png')} resizeMode="cover" />
						<Text style={[styles.label, { color: colors.primary }]}>Sign Up</Text>
					</View>
					<View style={[styles.form, { flex: 1.5 }]}>
						<KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
							<TextInput
								style={styles.input}
								label="Full Name"
								underlineColor={colors.primary}
								value={inputs?.name?.value}
								onChangeText={(value) => onChangeText('name', value)}
								error={inputs?.name?.error}
							/>
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
							<TextInput
								style={styles.input}
								label="Confirm Password"
								underlineColor={colors.primary}
								value={inputs?.cPassword?.value}
								onChangeText={(value) => onChangeText('cPassword', value)}
								error={inputs?.cPassword?.error}
								secureTextEntry={true}
							/>
							<View style={{ flexDirection: 'row' }}>
								<Text>Already have an account? </Text>
								<TouchableOpacity
									onPress={() => {
										navigate(SCREENS.AUTH.SIGNIN);
									}}
								>
									<Text style={{ color: colors.primary }}>Sign In</Text>
								</TouchableOpacity>
							</View>
						</KeyboardAvoidingView>
					</View>
				</ScrollView>
				<TouchableWithoutFeedback onPressIn={() => setBtnOpacity(0.7)} onPressOut={() => setBtnOpacity(1)} onPress={handleSignUp}>
					<View style={[styles.btn, { backgroundColor: colors.primary, opacity: btnOpacity }]}>
						<Text style={styles.btnTxt}>Sign Up</Text>
					</View>
				</TouchableWithoutFeedback>
			</LinearGradient>
		</TouchableWithoutFeedback>
	);
};

export default connect(null, null)(withTheme(SignUp));
