const db = {
  "page1": [ 
    { "id": 1, "date": "20.03.2020", "category": "Food", "value": 169 }, 
    { "id": 2, "date": "21.03.2020", "category": "Navigation", "value": 50 }, 
    { "id": 3, "date": "22.03.2020", "category": "Sport", "value": 450 } 
  ], 
  "page2": [ 
      { "id": 4, "date": "23.03.2020", "category": "Entertainment", "value": 969 },
      { "id": 5, "date": "24.03.2020", "category": "Education", "value": 1500 }, 
      { "id": 6, "date": "25.03.2020", "category": "Food", "value": 200 }
  ],
  "page3": [ 
    { "id": 7, "date": "23.03.2020", "category": "Entertainment", "value": 969 },
    { "id": 8, "date": "24.03.2020", "category": "Education", "value": 1500 }, 
    { "id": 9, "date": "25.03.2020", "category": "Food", "value": 200 } 
  ],
}

export default {

  namespaced: true,

  state: {
    paymentsStore: {},
    paymentsPagesCount: 1,
    paymentsCurrentPage: [],
  },

  getters: {
    getPaymentsStore: state => state.store,
    // getFullValue: state => {
    //   return state.paymentList.reduce((res, cur) => res + cur.value, 0)
    // },
    getPaymentsPagesCount: state => {
      return state.paymentsPagesCount;
    },
    getPaymentsCurrentPageItems: state => {
      return state.paymentsCurrentPage;
    }
  },

  mutations: {
    setPaymentsStoreDataChunk(state, payload) {
      state.paymentsStore = Object.assign(state.paymentsStore, payload);
    },
    // addItemToPaymentsStore(state, payload) {
    //   state.paymentsStore.push(payload)
    // },
    setPaymentsPagesCount(state, payload) {
      state.paymentsPagesCount = payload;
    },
    setPaymentsCurrentPage(state, payload) {
      state.paymentsCurrentPage = [];
      state.paymentsCurrentPage = [...payload];
    }
  },

  actions: {

    fetchPaymentsData({commit, state, dispatch}, pageNumber= 1) {
      return new Promise((resolve)=>{
        setTimeout(()=>{
          const page = 'page' + pageNumber;
          // eslint-disable-next-line no-prototype-builtins
          if (!state.paymentsStore.hasOwnProperty(page)) {
            resolve({[page]: db[page]});
          } else {
            resolve({});
          }
        },100)
      }).then(res=> {
        commit('setPaymentsStoreDataChunk', res);
        dispatch('receivePaymentsCurrentPageItems', pageNumber);
      })
    },

    fetchPaymentsPagesCount({commit}) {
      return new Promise((resolve) => {
        resolve(Object.keys(db).length);
      }).then(res => {
        commit('setPaymentsPagesCount', res);
      });
    },

    receivePaymentsCurrentPageItems({commit, state}, pageNumber = 1) {
      const page = 'page' + pageNumber;
      const list = [...state.paymentsStore[page]];
      commit("setPaymentsCurrentPage", list);
    },

    addItemToPaymentsStore({state, dispatch}, item) {
      let lastPageIndex = state.paymentsPagesCount;
      const page = 'page' + lastPageIndex;
      if (db[page].length === 3) {
        lastPageIndex += 1;
        const nextPage = 'page' + lastPageIndex;
        Object.assign(db, {[nextPage]: [item]});
      } else {
        db[page].push(item);
      }
      dispatch('fetchPaymentsData', lastPageIndex);
    }
  },


}