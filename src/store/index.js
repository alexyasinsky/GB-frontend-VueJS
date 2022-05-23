import Vue from 'vue'
import Vuex from 'vuex'

import categories from './modules/categories';
import payments from './modules/payments';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    payments,
    categories
  }
})
