<template>
    <v-card>
      <v-card-title class="text-h5">{{title}}</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="ok">OK</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
</template>

<script>
export default {
  name: "ModalConfirm",
  props: {
    title: String,
    cancel: Function,
    ok: Function,
  }
}
</script>

<style scoped>

</style>