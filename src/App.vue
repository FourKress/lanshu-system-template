<template>
  <div :class="layoutClassNames">
    <v-layout v-if="!$route.meta.full"></v-layout>
    <v-layout-full-page v-if="$route.meta.full"></v-layout-full-page>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
    };
  },
  created() {
  },
  watch: {
    errorMessage(message) {
      if (message) {
        this.$message({
          type: 'error',
          message,
        });
        this.$store.commit('global/errorMessage', undefined);
      }
    },
    userInfoErrorCode(value) {
      if (value) {
        this.$router.push(`/${value}`);
        this.setUserInfoErrorCode(undefined);
      }
    },
  },
  computed: {
    ...mapGetters('user', ['userInfoErrorCode']),
    errorMessage() {
      return this.$store.state.global.errorMessage;
    },
    layoutClassNames() {
      const classNameArr = ['layout-app'];
      const { layoutClassName } = this.$route.meta || {};
      if (layoutClassName) classNameArr.push(layoutClassName);
      return classNameArr.join(' ');
    },
  },
  methods: {
    ...mapActions('user', ['setUserInfoErrorCode']),
  },
};
</script>
