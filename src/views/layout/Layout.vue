<template>
	<div class="app-wrapper">
		<div class="main-container">
			<nav-bar></nav-bar>
			<app-main></app-main>
		</div>
	</div>
</template>

<script>
import { navBar, appMain } from '../layout';

export default {
  name: 'layout',
  components: {
    'nav-bar': navBar,
    'app-main': appMain
  },
  mounted() {
  },
  computed: {
  }
};
</script>

<style>

</style>
