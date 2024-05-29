<template>
     <form-user></form-user>
</template>

<script setup  >
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import  FormUser from '../../src/components/user.vue';

const route = useRoute();
const router = useRouter();


</script>
<style scoped lang='scss'>
</style>