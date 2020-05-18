import {StyleSheet, Dimensions, Constants} from 'react-native';

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 30,
  },
  imageLogo: {
    height: Dimensions.get('screen').width / 5.5,
    resizeMode: 'contain',
  },
  contentContainer: {
    width: Dimensions.get('screen').width - 50,
  },
  contentSubContainer: {
    marginBottom: 5,
    alignItems: 'center',
  },
  contentHowItWorkImg: {
    width: Dimensions.get('screen').width - 50,
    resizeMode: 'contain',
  },
  headerFontStyles: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contentFontStyles: {
    fontSize: 14,
    textAlign: 'center',
  },
  hyperlink: {
    fontWeight: 'normal',
    color: '#0000EE',
  },
});

export default styles;
