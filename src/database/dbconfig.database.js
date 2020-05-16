import {profileSchema, rankSchema} from './dbModel.database';

export const profileDbOptions = {
    path: 'profileDb.realm',
    schema: [profileSchema, rankSchema],
    schemaVersion: 0, // optional
  }
