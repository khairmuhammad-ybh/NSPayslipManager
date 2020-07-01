import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 36,
    textAlign: 'center',
  },
  contentContainer: {
    flex: 2,
    alignItems: 'center',
  },
  imgContainer: {
    marginBottom: 50,
  },
  img: {
    width: Dimensions.get('screen').width - 30,
    resizeMode: 'contain',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default styles;
