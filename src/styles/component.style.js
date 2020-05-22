import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#F3F4F9',
    width: Dimensions.get('screen').width - 50,
    borderRadius: 5,
    borderColor: '#fff',
    borderWidth: 2,
    marginBottom: 10,
  },
  cardContent: {
    padding: 10,
  },
  innerCardContent: {
    flexDirection: 'row',
  },
  cardDetailsText: {
    fontWeight: 'bold',
    marginEnd: 5,
  },
  cardContentContainer: {
    marginTop: 15,
    alignSelf: 'center',
  },
  labelContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  valueContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
});

export default styles;
