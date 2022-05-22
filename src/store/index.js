import Vue from 'vue'
import Vuex from 'vuex'

import category from './modules/category';
import payments from './modules/payments';
import paymentsNew from './modules/paymentsNew';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    payments,
    paymentsNew,
    category
  }
})
