let db = {
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

function reorganizeDB(oldDb) {
  let values = [];
  for (let page in oldDb) {
    values = values.concat(oldDb[page]);
  }
  let newDb = {};
  let pagesCount;
  if (values.length % 3 === 0) {
    pagesCount = values.length / 3;
  } else {
    pagesCount = Math.floor(values.length / 3) + 1;
  }
  for (let i = 0; i < pagesCount; i++) {
    let temp = [...values];
    newDb[`page${i+1}`] = temp.splice(i * 3, 3);
  }
  return newDb;
}

export default {

  namespaced: true,

  state: {
    paymentsData: {},
    PaymentsLastPage: 1,
    paymentsCurrentPage: [],
  },

  getters: {
    getPaymentsData: state => state.store,
    getPaymentsLastPage: state => {
      return state.PaymentsLastPage;
    },
    getPaymentsCurrentPageItems: state => {
      return state.paymentsCurrentPage;
    }
  },

  mutations: {
    setPaymentsDataChunk(state, payload) {
      state.paymentsData = Object.assign(state.paymentsData, payload);
    },
    setPaymentsLastPage(state, payload) {
      state.PaymentsLastPage = payload;
    },
    setPaymentsCurrentPage(state, payload) {
      state.paymentsCurrentPage = [];
      const page = 'page' + payload;
      const list = [...state.paymentsData[page]];
      state.paymentsCurrentPage = [...list];
    },
    clearPaymentsData(state) {
      state.paymentsData = {};
    }
  },

  actions: {

    fetchPaymentsDataFromDB({commit, state}, pageNumber= 1) {
      return new Promise((resolve)=>{
        setTimeout(()=>{
          const page = 'page' + pageNumber;
          // eslint-disable-next-line no-prototype-builtins
          if (!state.paymentsData.hasOwnProperty(page)) {
            resolve({[page]: db[page]});
          } else {
            resolve({});
          }
        },100)
      }).then(res=> {
        commit('setPaymentsDataChunk', res);
        commit('setPaymentsCurrentPage', pageNumber);
      })
    },

    fetchPaymentsLastPage({commit}) {
      return new Promise((resolve) => {
        resolve(Object.keys(db).length);
      }).then(res => {
        commit('setPaymentsLastPage', res);
      });
    },

    addPayment({state, dispatch}, item) {
      return new Promise((resolve) => {
        let lastPageIndex = state.PaymentsLastPage;
        const page = 'page' + lastPageIndex;
        item.id = Math.floor(Math.random()* Math.floor(Math.random() * Date.now()));
        if (db[page].length === 3) {
          lastPageIndex += 1;
          const nextPage = 'page' + lastPageIndex;
          Object.assign(db, {[nextPage]: [item]});
          resolve('new page');
        } else {
          db[page].push(item);
          resolve('current page');
        }
      }).then(() => {
        dispatch('fetchPaymentsLastPage');
      });
    },

    editPayment({dispatch}, payload) {
      return new Promise((resolve) => {
        db['page' + payload.page].forEach(payment => {
          if (payment.id === payload.item.id) {
            payment.date = payload.item.date;
            payment.category = payload.item.category;
            payment.value = payload.item.value;
          }
        });
        resolve('edited');
      }).then(()=> {
        dispatch('fetchPaymentsDataFromDB', payload.page);
      })
    },

    deletePayment({dispatch, commit}, payload) {
      return new Promise((resolve) => {
        let pageArray =  db['page' + payload.page];
        pageArray.forEach(payment => {
          if (payment.id === payload.id) {
            pageArray.splice(pageArray.indexOf(payment), 1);
          }
        });
        resolve('deleted');
      }).then(()=> {
        db = reorganizeDB(db);
        commit('clearPaymentsData');
        dispatch('fetchPaymentsDataFromDB', payload.page);
      })
    },

  },


}