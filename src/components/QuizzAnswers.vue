<template>
  
  <li v-for="(item, index) in answers" :class="[{correct: isCorrect[index]}, {incorrect: isIncorrect[index] }]" :key="index" @click="{
                        checkAnswer( $event, item, index );
                        }" :ref="'itemRefs_'+index">
                        {{ item }}
                    </li>

</template>

<script>
import { ref, onMounted } from 'vue'

const itemRefs = ref([]);

export default {

    props: {
        answers: {
            type: Array,
            required: true
        },
        correctAnswer: {
            type: String,
            required: true,
        }
    },

    data() {
        return{
            isCorrect: [],
            isIncorrect: []
        }
    },
    methods:{
        checkAnswer(event, item, index){

            if( item == this.correctAnswer ) { 
                this.isCorrect[index] = true;
            } else {
                this.isIncorrect[index] = true;
            }

}

    },
    watch: {
        answers(){
            this.isIncorrect = [];
            this.isCorrect = [];
            
        }
    },
    mounted(){
        // this.$refs['itemRefs'][0].classList.add("green");
        // this.$refs['itemRefs'].$slots
    },

    updated() {

    }

}
</script>

<style lang="scss" scoped>
li{
            margin: 20px;
            padding: 7px 0;
            cursor: pointer;
            box-shadow: 2px 2px 2px #aaa;

            &.correct{
                background: #42b983;
                color: #fff;
            }
            &.incorrect {
                background: #b94242;
                color: #fff;
            }
        }

</style>