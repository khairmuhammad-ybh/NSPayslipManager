import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  headerIconComponent: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 50,
  },
  headerComponent: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  headerDefaultAlignment: {
    width: 50,
  },
  headerDefaultAlignmentIOS: {
    width: 80,
  },
  headerDefaultTextAlignmenyIOS: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'blue',
  },
  headerTitleAlignment: {
    alignSelf: 'center',
  },
  headerTitleVersionIOS: {
    fontSize: 14,
    marginBottom: 7,
    marginStart: 5,
    alignSelf: 'flex-end',
  },
  ImgIOS: {
    width: Dimensions.get('screen').width - 250,
    resizeMode: 'contain',
  },
  headerTitleVersion: {
    fontSize: 14,
    marginBottom: 7,
    marginStart: 5,
    alignSelf: 'flex-end',
  },
  Img: {
    width: Dimensions.get('screen').width - 200,
    resizeMode: 'contain',
  },
});

export default styles;
