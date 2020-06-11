import * as ACTION from '../actions/profle.action';

const initState = {
  name: '',
  rank: '',
  vocation: '',
};

const Profile = (state = initState, {type, payload}) => {
  switch (type) {
    case ACTION.SET_PROFILE:
        return {
            name: payload.name,
            rank: payload.rank,
            vocation: payload.vocation,
      };
    case ACTION.UPDATE_PROFILE:
        return {
            name: payload.name,
            rank: payload.rank,
            vocation: payload.vocation,
        }
    default:
      return state;
  }
};

export default Profile;
