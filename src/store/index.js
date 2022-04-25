import Vue from 'vue'
import Vuex from 'vuex'

import category from './modules/category';
import payments from './modules/payments';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    payments,
    category
  }
})
