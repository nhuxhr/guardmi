import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { withTheme } from 'react-native-paper';
import { useAssets } from 'expo-asset';

import { Icon } from '../../../components';
import { LinearGradient } from 'expo-linear-gradient';

const features = [{ title: 'No Ads' }, { title: 'Increase Connection Speed' }, { title: 'Protect your security' }];
const prices = [
	{ title: '1 Month', features: 'All Features', price: 12.99 },
	{ title: '6 Month', features: 'All Features', price: 8.99 },
	{ title: '12 Month', features: 'All Features', price: 4.99 },
];

const Upgrade = ({ theme: { colors } }) => {
	const [assets] = useAssets([require('../../../assets/crown.png')]);

	return (
		<LinearGradient style={styles.container} colors={['#66d2c3', '#006c5d']}>
			<StatusBar style="light" />
			<View style={[styles.center, { flex: 1 }]}>
				<Image style={styles.crown} source={require('../../../assets/crown.png')} />
				<View style={styles.center}>
					<Text style={styles.title}>Get premium today</Text>
					<Text style={styles.subtitle}>Remove Ads and unlock all locations</Text>
				</View>
				<View style={styles.featuresContainer}>
					{features.map(({ title }, key) => (
						<View style={styles.featureItem} key={key}>
							<Icon family="Entypo" name="dot-single" color="rgba(255, 255, 255, .2)" />
							<Text style={styles.featureTitle}>{title}</Text>
						</View>
					))}
				</View>
			</View>
			<View style={styles.priceTable}>
				{prices.map(({ title, features, price }, key) => (
					<TouchableOpacity style={styles.price} key={key} onPress={() => Alert.alert('Package', `${title} plan selected!`)}>
						<View>
							<Text style={styles.priceTitle}>{title}</Text>
							<Text style={styles.priceFeatures}>{features}</Text>
						</View>
						<Text style={styles.priceAmount}>${price}</Text>
					</TouchableOpacity>
				))}
			</View>
		</LinearGradient>
	);
};

export default withTheme(Upgrade);

const styles = StyleSheet.create({
	center: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	crown: {
		width: 60,
		height: 60,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		letterSpacing: 6,
		color: '#FFF',
		textTransform: 'uppercase',
	},
	subtitle: {
		fontSize: 16,
		letterSpacing: 1,
		color: 'rgba(255, 255, 255, .5)',
	},
	featuresContainer: {
		alignSelf: 'flex-start',
		marginTop: 30,
	},
	featureItem: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	featureTitle: {
		fontSize: 18,
		color: '#FFF',
		letterSpacing: 2,
	},
	priceTable: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: Dimensions.get('screen').width,
	},
	price: {
		width: '80%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, .1)',
		paddingVertical: 20,
		paddingHorizontal: 30,
		borderRadius: 10,
		marginBottom: 15,
	},
	priceTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#FFF',
		letterSpacing: 1,
	},
	priceFeatures: {
		color: 'rgba(255, 255, 255, .5)',
		letterSpacing: 2,
	},
	priceAmount: {
		height: '100%',
		backgroundColor: 'rgba(0, 0, 0, .2)',
		paddingHorizontal: 15,
		textAlignVertical: 'center',
		textAlign: 'center',
		color: '#FFF',
		fontSize: 24,
		fontWeight: 'bold',
		borderRadius: 5,
	},
});
