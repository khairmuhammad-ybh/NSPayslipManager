import Realm from 'realm';
import { profileDbOptions } from './dbconfig.datasource';
import { profileSchema, rankSchema } from './dbmodel.datasource';

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