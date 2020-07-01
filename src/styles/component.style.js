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
  cardOfTheMonth: {
    flex: 2,
  },
  cardContentContainer: {
    marginTop: 15,
    alignSelf: 'center',
  },
  labelContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  valueContainerEnd: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  valueContainerMid: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  flexContainerRow: {
    flex: 1,
    flexDirection: 'row',
  },
  innerFlexRow1: {
    flex: 1,
  },
  innerFlexRow2: {
    flex: 2,
    alignItems: 'center',
  },
});

export default styles;
