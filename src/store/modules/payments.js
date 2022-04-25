const db = {
  "page1": [ 
    { "id": 1, "date": "20.03.2020", "category": "Food", "value": 169 }, 
    { "id": 2, "date": "21.03.2020", "category": "Navigation", "value": 50 }, 
    { "id": 3, "date": "22.03.2020", "category": "Sport", "value": 450 } 
  ], 
  "page2": [ 
      { "id": 4, "date": "23.03.2020", "category": "Entertaiment", "value": 969 }, 
      { "id": 5, "date": "24.03.2020", "category": "Education", "value": 1500 }, 
      { "id": 6, "date": "25.03.2020", "category": "Food", "value": 200 }
  ],
  "page3": [ 
    { "id": 7, "date": "23.03.2020", "category": "Entertaiment", "value": 969 }, 
    { "id": 8, "date": "24.03.2020", "category": "Education", "value": 1500 }, 
    { "id": 9, "date": "25.03.2020", "category": "Food", "value": 200 } 
  ],
}

export default {

  namespaced: true,

  state: {
    paymentList: []
  },

  getters: {
    getPaymentsList: state => state.paymentList,
    getFullPaymentValue: state => {
      return state.paymentList.reduce((res, cur) => res + cur.value, 0)
    },
  },

  mutations: {
    setPaymentsListData(state, payload) {
      state.paymentList = payload
    },
    addDataToPaymentsList(state, payload) {
      state.paymentList.push(payload)
    }
  },

  actions: {
    fetchData({commit}, pageNumber=1) {
      return new Promise((resolve)=>{
        setTimeout(()=>{
          const page = 'page' + pageNumber;
          resolve(db[page]);
        },1000)
      }).then(res=> {
        commit('setPaymentsListData', res)
      })
    },
  },
}