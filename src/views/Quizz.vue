<template>
  <h1>Quizz</h1>
  <Library />

  <div class="container">
        <div class="row">
            
            <div class="question" @click="getQuestionCard">
                <div class="field">
                    {{ currentCard.question }}
                </div>
            </div>
            <div class="answers">
                
                <ul>
                    <QuizzAnswers  :answers="currentCard.answers" :correctAnswer="currentCard.correctAnswer" />
                </ul>

            </div>

        </div>
        </div>
</template>

<script>
import store from "@/store";

import Library from "@/components/Library.vue";
import QuizzAnswers from "@/components/QuizzAnswers.vue";

export default {
  components: {
    Library,
    QuizzAnswers
  },
  data() {
    return {
      library: store.state.currentLibrary,
      currentCardId: 0,
      isActive: false,
      currentCard: {
        question: "",
        correctAnswer: "",
        answers: [],
      },
      changeCard: {
        x: 0,
        y: 0,
        type: "next",
        touchMoveX: 0,
        touchMoveY: 0,
      },
    };
  },
  computed: {
    cardsQty () {
        return this.libCards.length;
    },
    libCards () {
        return store.state.currentLibrary || [];
    }

},

methods: {

    getRandomId() {
        return Math.floor(Math.random() * ( this.cardsQty - 1 ) )
    },
    shuffle(array) {
  array.sort(() => Math.random() - 0.5);

},
    getQuestionCard() {
        if( this.cardsQty == 0 ) { return; }
        const card = [];
        let i = null;

        while ( card.length < 4 ) {

            i = this.getRandomId();
            if ( !card.includes(i) ) {
                card.push(i);
            } 

        }

        this.currentCard.question = this.libCards[ card[0] ]['word'];
        this.currentCard.correctAnswer = this.libCards[ card[0] ]['translation'];
        this.currentCard.answers = [];
        card.forEach( item => {
            this.currentCard.answers.push( this.libCards[ item ]['translation'] );
        })

        this.shuffle( this.currentCard.answers );

    },

},

watch: {
    '$store.state.currentLibrary': () =>{
        // this.currentCardId = 0;
    },
    libCards() {
        this.getQuestionCard();
    }
},
mounted() {
    this.getQuestionCard();
}

};
</script>

<style lang="scss" scoped>

.question {
    margin: 20px auto;
    width: 400px;
    min-height: 100px;
    color: #fff;
    background: rgba(100, 200, 250, 1);
    display: flex;
        justify-content: center;
        align-items: center;
        font-size: 25px;
    
}

.answers{
    
    margin: 20px auto;
    width: 400px;
    background: rgba(100, 200, 250, 1);
    padding: 10px;
    box-sizing: border-box;
    
    ul{
        width: 100%;
        color: #fff;
        font-size: 25px;
        list-style: none;
        padding: 0;

    }

}
</style>