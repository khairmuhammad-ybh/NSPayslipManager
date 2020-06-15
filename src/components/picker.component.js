import React from 'react';
import {Picker} from '@react-native-community/picker';
// resources
import stringResource from '../resources/string.resource';

let curYear = new Date().getFullYear();
let prevYear = new Date().getFullYear() - 1;
let nxYear = new Date().getFullYear() + 1;
let years = [prevYear.toString(), curYear.toString(), nxYear.toString()];

export function pickerYear() {
  let yearItems = years.map((s, i) => {
    return <Picker.Item key={i} value={`${s}`} label={`${s}`} />;
  });

  return yearItems;
}

export function pickerMonth() {
  let monthItems = stringResource.pickersContents.pickerMonthContent.map(
    (s, i) => {
      return <Picker.Item key={i} value={`${s}`} label={`${s}`} />;
    },
  );

  return monthItems;
}

export function pickerRank() {
  let rankItems = stringResource.pickersContents.pickerRankContent.ranks.map(
    (s, i) => {
      return (
        <Picker.Item
          key={i}
          value={`${
            stringResource.pickersContents.pickerRankContent.allowance[i]
          }`}
          label={`${s}`}
        />
      );
    },
  );

  return rankItems;
}

export function pickerVocation() {
  let vocationItems = stringResource.pickersContents.pickerVocationContent.vocations.map(
    (s, i) => {
      return <Picker.Item key={i} value={`${s}`} label={`${s}`} />;
    },
  );
  return vocationItems;
}

export function pickerDivision() {
  let divItems = stringResource.pickersContents.pickerDivContent.units.map(
    (s, i) => {
      return (
        <Picker.Item
          key={i}
          value={`${
            stringResource.pickersContents.pickerDivContent.prefix
          }/${s}`}
          label={`${
            stringResource.pickersContents.pickerDivContent.prefix
          }/${s}`}
        />
      );
    },
  );

  return divItems;
}

export function pickerTroop() {
  let troopItems = stringResource.pickersContents.pickerDivContent.troops.map(
    (s, i) => {
      return <Picker.Item key={i} value={`${s}`} label={`${s}`} />;
    },
  );

  return troopItems;
}

// --------- IOS ---------

export function pickerYearIOS() {
  let yearItems = years.map(s => {
    return s;
  });

  return yearItems;
}
export function pickerMonthIOS() {
  let monthItems = stringResource.pickersContents.pickerMonthContent.map(s => {
    return s;
  });

  return monthItems;
}
export function pickerRankIOS() {
  let rankItems = stringResource.pickersContents.pickerRankContent.ranks.map(
    (s, i) => {
      return s;
    },
  );

  return rankItems;
}
export function pickerVocationIOS() {
  let vocationItems = stringResource.pickersContents.pickerVocationContent.vocations.map(
    s => {
      return s;
    },
  );

  return vocationItems;
}
export function pickerDivisionIOS() {
  let divItems = stringResource.pickersContents.pickerDivContent.units.map(
    s => {
      return `${stringResource.pickersContents.pickerDivContent.prefix}/${s}`;
    },
  );

  return divItems;
}
export function pickerTroopIOS() {
  let troopItems = stringResource.pickersContents.pickerDivContent.troops.map(
    s => {
      return s;
    },
  );

  return troopItems;
}
