import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  headerText: {
    fontSize: 36,
    fontFamily: 'Bree Serif',
    fontStyle: 'normal',
    textAlign: 'center',
  },
  contentHeader: {
    fontSize: 18,
    margin: 5,
  },
  manualMealHeader: {
    width: Dimensions.get('screen').width - 50,
  },
  contentContainer: {
    marginBottom: 5,
  },
  textInput: {
    height: 48,
    margin: 10,
    borderColor: '#000',
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1.5,
    width: Dimensions.get('screen').width - 50,
  },
  horizontalFlexContainer: {
    width: Dimensions.get('screen').width - 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  manualOperatorContainer: {
    height: 48,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  manualMealContent: {
    height: 48,
    margin: 10,
    borderColor: '#000',
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1.5,
    width: Dimensions.get('screen').width / 3 - 80,
  },
  manualText: {
    padding: 12,
  },
  manualOperator: {},
  buttonInput: {
    padding: 12,
    borderColor: '#708CB5',
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 3,
    alignItems: 'center',
    
  }
});

export default styles;
