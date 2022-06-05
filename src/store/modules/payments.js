let db = [
  { "id": 1, "date": "2022-05-19", "category": "Food", "value": 169 },
  { "id": 2, "date": "2022-05-19", "category": "Navigation", "value": 50 },
  { "id": 3, "date": "2022-05-20", "category": "Sport", "value": 450 },
  { "id": 4, "date": "2022-05-20", "category": "Entertainment", "value": 969 },
  { "id": 5, "date": "2022-05-20", "category": "Education", "value": 1500 },
  { "id": 6, "date": "2022-05-21", "category": "Food", "value": 200 },
  { "id": 7, "date": "2022-05-21", "category": "Entertainment", "value": 969 },
  { "id": 8, "date": "2022-05-21", "category": "Education", "value": 1500 }
]

export default {

  namespaced: true,

  state: {
    paymentsData: [],
    paymentsSums: {}
  },

  mutations: {

    setPaymentsData(state, payload) {
      state.paymentsData = payload;
    },

    addPaymentToState(state, payload) {
      state.paymentsData.push(payload);
    },

    editPaymentInState(state, payload) {
      Object.assign(state.paymentsData[payload.index], payload.payment);
    },

    deletePaymentFromState(state, payload) {
      state.paymentsData.splice(payload, 1);
    },

    setPaymentsSums(state, payload) {
      state.paymentsSums = payload;
    }

  },

  getters: {

    getPaymentsData: state => {
      return state.paymentsData;
    },

    getLastPaymentId: state => {
      return state.paymentsData[state.paymentsData.length - 1]?.id;
    },

    getPaymentsSums: state => {
      return state.paymentsSums;
    }

  },

  actions: {

    fetchPaymentsDataFromDB({commit}) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([...db]);
        }, 500)
      }).then(response => {
        commit('setPaymentsData', response);
      });
    },

    addPayment({commit},payment) {
      return new Promise(resolve => {
        setTimeout(() => {
          db.push(payment);
          resolve(payment);
        }, 500)
      })
        .then(response => {
        commit('addPaymentToState', response);
      });
    },

    editPayment({commit}, {payment, index}) {
      return new Promise(resolve => {
        setTimeout(() => {
          Object.assign(db[index], payment)
          resolve({payment, index});
        }, 500)
      })
        .then(response => {
          commit('editPaymentInState', response)
        });
    },

    deletePayment({commit}, index) {
      return new Promise(resolve => {
        setTimeout(() => {
          db.splice(index, 1);
          resolve(index);
        }, 500)
      })
        .then(response => {
          commit('deletePaymentFromState', response);
        });
    },

    calculateSums({commit, state}, categories) {
      let sums = {};
      categories.forEach(category => {
        let sum = 0;
        for (let item of state.paymentsData) {
          if (item.category === category) {
            sum += item.value;
          }
        }
        sums = Object.assign(sums, {[category]:sum});
      });
      commit('setPaymentsSums', sums);
    }

  }
}