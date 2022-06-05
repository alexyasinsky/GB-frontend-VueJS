

export default {

  namespaced: true,
  
  state: {
    names: [],
    colors: []
  },

  getters: {
    getCategoryNames: state=>state.names,
    getCategoryColors: state=>state.colors
  },

  mutations: {
    setNames(state, payload){
      state.names = payload
    },
    addName(state, payload) {
      state.names.unshift(payload);
    },
    setColors(state, payload) {
      state.colors = payload;
    },
    addColor(state, payload) {
      state.colors.unshift(payload);
}
  },

  actions: {
    fetchCategories({commit, dispatch}) {
      return new Promise((resolve)=> {
        setTimeout(()=>{
          resolve (['Food', 'Transport', 'Education', 'Entertainment', 'Navigation', 'Sport'])
        },100)
      }).then(response => {
        commit('setNames', response);
        dispatch('generateCategoryColors');
      })
    },

    generateCategoryColors({state, commit}) {
      let count = state.names.length;
      let colors = [];
      for (let i = 1; i <= count; i++) {
        const red = Math.floor(Math.random() * 255);
        const green = Math.floor(Math.random() * 255);
        const blue = Math.floor(Math.random() * 255);
        colors.push(`rgba(${red},${green}, ${blue})`);
      }
      commit('setColors', colors);
    },

    addCategory({commit}, category) {
      commit('addName', category);
      const red = Math.floor(Math.random() * 255);
      const green = Math.floor(Math.random() * 255);
      const blue = Math.floor(Math.random() * 255);
      const color = `rgba(${red},${green}, ${blue})`;
      commit('addColor', color);
    }
  },
}