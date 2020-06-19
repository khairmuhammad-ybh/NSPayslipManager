import React, {Component} from 'react';
import {View, Image, Text} from 'react-native';
// Image resources
import grossSalaryImg from '../assets/gross_salary.png';
import netSalaryImg from '../assets/net_salary.png';
// styles
import styles from '../styles/howitwork.style';
// resources
import stringResource from '../resources/string.resource';

class HowItWorkScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>
            {stringResource.howItWorkScreen.header}
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.imgContainer}>
            <Text style={styles.subHeader}>Calculate Gross Salary</Text>
            <Image source={grossSalaryImg} style={styles.img} />
          </View>
          <View style={styles.imgContainer}>
            <Text style={styles.subHeader}>Calculate Net Salary</Text>
            <Image source={netSalaryImg} style={styles.img} />
          </View>
        </View>
      </View>
    );
  }
}

export default HowItWorkScreen;
