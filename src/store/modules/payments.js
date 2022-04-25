

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
    fetchData({commit}) {
      return new Promise((resolve)=>{
        setTimeout(()=>{
          const items = []
          for(let i=1; i<=3; i++) {
            items.push({
              date: "23.12.2022",
              category: "Sport",
              value: i,
              id: Math.floor(Math.random()* Math.floor(Math.random() * Date.now()) +i)
            })
          } resolve(items)
        },2000)
      }).then(res=> {
        commit('setPaymentsListData', res)
      })
    },
  },
}