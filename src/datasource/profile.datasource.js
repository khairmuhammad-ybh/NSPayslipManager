import Realm from 'realm';
import {profileDbOptions} from './dbconfig.datasource';
import {profileSchema, rankSchema} from './dbmodel.datasource';
import {retrieveProfile} from '../services/profile.service';

export const registerProfile = newProfile => {
  return new Promise((resolve, reject) => {
    Realm.open(profileDbOptions)
      .then(realm => {
        let profiles = realm.objects(profileSchema.name);
        let userProfile = profiles.filtered(`name = \"${newProfile.name}\"`);
        if (userProfile > 0) {
          reject('user exist');
        }
        //   write new user profile into database
        realm.write(() => {
          realm.create(profileSchema.name, newProfile);
          resolve(newProfile);
        });
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const retrieveUserProfile = () => {
  return new Promise((resolve, reject) => {
    Realm.open(profileDbOptions)
      .then(realm => {
        let userProfile = realm.objects(profileSchema.name);
        resolve(userProfile);
      })
      .catch(err => reject(err));
  });
};

export const updateProfile = updateProfile => {
  return new Promise((resolve, reject) => {
    Realm.open(profileDbOptions)
      .then(realm => {
        let payslipTemplates = realm.objects(profileSchema.name);
        if (payslipTemplates > 0) {
          reject('profile has been added');
        }
        // modified payslip template in database
        realm.write(() => {
          realm.create(profileSchema.name, updateProfile, 'modified');
        });
        realm.close();
        retrieveUserProfile()
          .then(resp => {
            resolve(resp);
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const deleteAllProfile = () => {
  return new Promise((resolve, reject) => {
    Realm.open(profileDbOptions)
      .then(realm => {
        realm.write(() => {
          let allProfiles = realm.objects(profileSchema.name);
          realm.delete(allProfiles);
        });
        let retrieveProfile = realm.objects(profileSchema.name);
        resolve(retrieveProfile);
      })
      .catch(err => reject(err));
  });
};
