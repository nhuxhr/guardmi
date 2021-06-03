import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	center: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		flex: 1,
	},
	header: {
		flex: 1.5,
	},
	headerInner: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	overlay: {
		flex: 1,
		width: '100%',
		height: '100%',
		position: 'absolute',
		top: 0,
		right: 0,
		left: 0,
		backgroundColor: '#000',
		opacity: 0.7,
	},
	logoutBtn: {
		position: 'absolute',
		top: 70,
		right: 40,
	},
	connectionBtn: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 150,
		height: 150,
		borderRadius: 100,
		borderWidth: 15,
		borderColor: '#FFF',
	},
	serverInfo: {
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 30,
	},
	selectedServer: {
		color: '#FFF',
		fontSize: 24,
		marginBottom: 5,
	},
	status: {
		color: 'gray',
		fontSize: 14,
		textTransform: 'uppercase',
	},
	statusDot: {
		width: 9,
		height: 9,
		borderRadius: 100,
		marginRight: 3,
	},
	bottom: {
		flex: 0.7,
		backgroundColor: '#FFF',
	},
});

export default styles;
