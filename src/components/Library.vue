<template>
  
<h1>Select Library</h1>
<select v-model="currentLib">
    <option v-for="lib of libList" :key="lib.library" :value="lib.library">
        {{ lib.description }}
    </option>
</select>
</template>

<script>
import libraries from "../assets/data/libraries.json";

import store from '@/store';

export default {

data() {
    return {
        libList: libraries,
        currentLib: 'person',
    }
},

methods: {

    loadCardsLib () {
        import( "@/assets/data/" + this.currentLib + ".json" ).then((module) => {
        store.state.currentLibrary = module.default;
  });
    }

},
beforeMount() {
    this.currentLib = this.libList[0]['library'];
    this.loadCardsLib();
},
watch: {
    currentLib( val ) {
        this.currentLib = val;
        this.loadCardsLib();
    }
}


}
</script>

<style lang="scss" scoped>

</style>