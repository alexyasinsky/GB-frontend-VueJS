<template>

    <v-card>
      <v-date-picker v-model="picker"></v-date-picker>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="handler(picker)">OK</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>

</template>

<script>
export default {
  name: "ModalCalendar",
  props: {
    show: Boolean,
    handler: Function
  },
  data: () => ({
    picker:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
  })
}
</script>

<style scoped>

</style>