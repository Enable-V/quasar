<template>
  <q-page class="flex q-pa-md">
    Welcome Home {{ user }} {{ email }}
    <q-space />
    <div>
      <q-btn
        class="flex flex-center q-px-lg q-py-sm q-mb-md"
        size="md"
        label="Logout"
        @click="logout"
        color="primary"
      />
    </div>
  </q-page>
</template>

<script>
import firebase from "firebase/compat/app";
export default {

// eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  data() {
    return {
      user: '',
      email: ''
    }
  },
  methods: {
    logout() {
      firebase.auth().signOut()
      this.$router.push('/')
        .then(() => {
          this.$q.notify({ message: 'Sign Out Success.' })
        })
        .catch(error => console.log('error', error))
    }
  }
}
</script>

