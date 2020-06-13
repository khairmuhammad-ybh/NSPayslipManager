// redux
import { store } from '../redux/store';
import * as Actions from '../redux/actions';
// id generator
import UUIDGenerator from 'react-native-uuid-generator';
// datasource
import * as dbProfile from '../datasource/profile.datasource';

export const createProfile = user => {
    return new Promise((resolve, reject) => {
        generateUUID().then(uuid => {
            let profId = uuid;
            generateUUID().then(uuid => {
                let dbId = uuid;
        
                let newProfile = {
                    _id: dbId,
                    profileId: profId,
                    name: user.name,
                    rank: {
                        rankName: user.rank.rankName,
                        rankPay: user.rank.rankPay,
                    },
                    divAndUnit: user.divAndUnit,
                    troop: user.troop,
                    vocation: user.vocation,
                };
                dbProfile
                    .registerProfile(newProfile)
                    .then(resp => {
                    // success registered
        
                        // retrieve profile to populate in drawable
                        dbProfile
                            .retrieveUserProfile().then(resp => {
            
                                console.log(JSON.parse(JSON.stringify(resp)))
                                let profile = JSON.parse(JSON.stringify(resp))
                                let name = profile[0].name
                                let rank = profile[0].rank.rankName
                                let vocation = profile[0].vocation
                                store.dispatch(Actions.set_profile({name, rank, vocation}));
                                // store.dispatch(Actions.update_first_launch());
                                resolve();
                            })
                            .catch(err => {
                                reject(err)
                            });
                    })
                    .catch(err => {
                        // failed to register
                        reject(err);
                    });
            });
        });
    });
};

export const retrieveProfile = () => {
    return new Promise((resolve, reject) => {
        dbProfile
            .retrieveUserProfile()
            .then(resp => {
                // success retrieve
                resolve(JSON.parse(JSON.stringify(resp)));
            })
            .catch(err => {
                // failed to retrieve profile
                reject(err);
            });
    });
};

export const deleteProfile = () => {
    return new Promise((resolve, reject) => {
        dbProfile
            .deleteAllProfile()
            .then(resp => {
                // success delete
                // update login state in redux
                // store.dispatch(Actions.update_first_launch());
                // let name = ''
                // let rank = ''
                // let vocation = ''
                // store.dispatch(Actions.set_profile({name, rank, vocation}));
                resolve(JSON.parse(JSON.stringify(resp)));
            })
            .catch(err => {
                // failed to delete profile
                reject(err);
            });
    });
};

const generateUUID = () => {
    return new Promise((resolve, reject) => {
        UUIDGenerator.getRandomUUID().then(uuid => {
            resolve(uuid);
        })
        .catch(err => {
            reject(err);
        });
    });
};