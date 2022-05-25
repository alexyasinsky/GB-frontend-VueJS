<template>
  <v-data-table
      :headers="headers"
      :items="items"
      sort-by="id"
      sort-desc
      class="elevation-1"
  >
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
          small
          class="mr-2"
          @click="edit(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
          small
          @click="remove(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
          color="primary"
          @click="reset"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "DisplayData",

  props: {
    items: Array,
    edit: Function,
    remove: Function,
    reset: Function
  },

  data: ()=> ({
    headers: [
      {
        text: '#id',
        sortable: false,
        value: 'id',
      },
      {
        text: 'Date',
        sortable: false,
        value: 'date'
      },
      {
        text: 'Category',
        sortable: false,
        value: 'category'
      },
      {
        text: 'Value',
        sortable: false,
        value: 'value'
      },
      {
        text: 'Actions',
        sortable: false,
        value: 'actions'
      },

    ],
  })
}
</script>

<style scoped>

</style>