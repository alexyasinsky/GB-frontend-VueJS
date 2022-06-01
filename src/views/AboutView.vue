<template>
  <div>
    <h1>About page</h1>
    <testComp :message="text"/>
    
  </div>
</template>


<script>

import testComp from '../components/testComp.vue';
  export default {
    name: "AboutView",
    data() {
      return {
        text: 'dasd'
      };
    },
    components: {
      testComp
    },
    methods: {

    },

  }

</script>
