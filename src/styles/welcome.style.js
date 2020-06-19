import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    width: Dimensions.get('screen').width - 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleContainer: {
    flex: 3,
    width: Dimensions.get('screen').width - 30,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  horizontalFlexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: Dimensions.get('screen').width - 30,
  },
  horizontalFlexSubContainer_one: {flex: 1},
  horizontalFlexSubContainer_two: {flex: 0.7},
  keyboard: {flex: 1, flexDirection: 'column'},
  title: {
    fontSize: 36,
    fontStyle: 'normal',
    textAlign: 'center',
  },
  inputHeader: {fontSize: 24, marginStart: 10},
  inputText: {
    margin: 10,
    padding: 8,
    borderColor: '#000',
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1.5,
    width: Dimensions.get('screen').width - 30,
  },
  picker: {
    margin: 10,
    padding: 8,
    borderColor: '#000',
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1.5,
  },
  dropdown: {
    margin: 10,
    padding: 8,
    borderColor: '#000',
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1.5,
    width: Dimensions.get('screen').width - 30,
  },
  button: {
    padding: 12,
    borderColor: '#708CB5',
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 3,
    alignItems: 'center',
    width: '50%',
  },
  policies: {
    textAlign: 'center',
  },
});

export default styles;
