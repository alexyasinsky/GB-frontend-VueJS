<template>
    <v-card>
      <v-card-title class="text-h5">
        Add new category
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-text-field v-model="category"></v-text-field>
        <v-btn color="blue darken-1" text @click="add(category)">Add</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
</template>

<script>
export default {
  name: "CategoryForm",
  props: {
    add: Function,
  },
  data: () => ({
    category: '',
  })
}
</script>

<style scoped>

</style>