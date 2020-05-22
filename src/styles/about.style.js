import {StyleSheet, Dimensions, Constants} from 'react-native';

const styles = StyleSheet.create({
  aboutMainContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  topContainer: {
    flex: 1,
    width: Dimensions.get('screen').width - 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleContainer: {
    flex: 4,
    width: Dimensions.get('screen').width - 30,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  footerContainer: {
    flex: 1,
    width: Dimensions.get('screen').width - 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {fontSize: 24, fontWeight: 'bold', textAlign: 'center'},
  content: {fontSize: 18, textAlign: 'center'},
  Img: {
    width: Dimensions.get('screen').width - 30,
    resizeMode: 'contain',
  },
  footerTitle: {fontSize: 18, textAlign: 'center', fontWeight: 'bold'},
  footerLink: {fontWeight: 'normal', color: '#0000EE'},
  footerNormalText: {fontWeight: 'normal'},
});

export default styles;
