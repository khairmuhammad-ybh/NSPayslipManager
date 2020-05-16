import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 95,
    left: 0,
  },
  headerText: {
    fontSize: 36,
    fontFamily: 'Bree Serif',
    fontStyle: 'normal',
    textAlign: 'center',
  },
  contentHeader: {
    fontSize: 24,
    marginStart: 10,
  },
  contentContainer: {
    marginBottom: 20,
  },
  textInput: {
    margin: 10,
    padding: 8,
    borderColor: '#000',
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1.5,
    width: Dimensions.get('screen').width - 50,
  },
  buttonInput: {
    position: 'absolute',
    bottom: '15%',
    padding: 12,
    borderColor: '#708CB5',
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 3,
    width: Dimensions.get('screen').width - 300,
    alignItems: 'center',
  },
  btnText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dropdownInput: {
    margin: 10,
    padding: 8,
    borderColor: '#000',
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1.5,
    width: Dimensions.get('screen').width / 2 - 45,
  },
  horizontalFlexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default styles;
