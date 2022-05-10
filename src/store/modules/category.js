

export default {

  namespaced: true,
  
  state: {
    categoryList: []
  },

  getters: {
    getCategoryList: state=>state.categoryList
  },

  mutations: {
    setCategories(state, payload){
      state.categoryList = payload
    },
    addCategory(state, payload) {
      state.categoryList.push(payload);
    }
  },

  actions: {
    fetchCategoryList({commit}) {
      return new Promise((resolve)=> {
        setTimeout(()=>{
          resolve (['Food', 'Transport', 'Education', 'Entertainment', 'Navigation', 'Sport'])
        },100)
      }).then(res => { commit('setCategories', res)})
    }
  },
}