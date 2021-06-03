import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height,
	},
	scrollView: {
		flexGrow: 1,
		height: height / 1.4,
	},
	header: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		marginBottom: 50,
	},
	logo: {
		width: width / 5,
		height: width / 5,
	},
	label: {
		fontSize: 24,
		fontWeight: 'bold',
		alignSelf: 'center',
		marginTop: 10,
		textTransform: 'uppercase',
	},
	form: {
		flex: 1,
		paddingHorizontal: 20,
		marginBottom: 0,
	},
	input: {
		backgroundColor: 'rgba(0, 0, 0, .15)',
		marginBottom: 10,
	},
	btn: {
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 15,
		right: 0,
		bottom: 0,
		left: 0,
	},
	btnTxt: {
		fontSize: 24,
		textTransform: 'uppercase',
		color: '#FFF',
	},
});

export default styles;
