import Vuex from 'vuex';

import user from './modules/user';
import post from './modules/post';
import task from './modules/task';
import header from './modules/header';
import comment from './modules/comment';
import utilities from './modules/utilities';
import admin from './modules/admin';

export default () => {
  return new Vuex.Store({
    modules: {
      user,
      post,
      task,
      header,
      comment,
      utilities,
      admin
    }
  })
} 
