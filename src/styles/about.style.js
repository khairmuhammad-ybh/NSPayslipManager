import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  headerContainer: {
    bottom: 50,
  },
  contentContainer: {
    width: Dimensions.get('screen').width - 50,
  },
  contentSubContainer: {
    marginBottom: 50,
    alignItems: 'center',
  },
  contentHowItWorkImg: {
    width: Dimensions.get('screen').width - 50,
    resizeMode: 'contain',
  },
  headerFontStyles: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  contentFontStyles: {
    fontSize: 18,
    textAlign: 'center',
  },
  innerSpacer: {
    height: 20,
  },
  hyperlink: {
    fontWeight: 'normal',
    color: '#0000EE',
  },
});

export default styles;
