<template>
    <h1> CARDS </h1>
<Library />
    <div class="container">
        <div class="row">
            
            <div class="card" :class="{active : isActive}" @click="turnCard" 
            @mousedown="mouseDown" @mouseup="mouseUp" @mousemove="mouseMove" 
            @touchstart="touchStart" @touchmove="touchMove"  @touchend="touchEnd">
                <div class="backview">
                    <div class="word"> 
                        <span v-if="currentCard.word">
                            {{ currentCard.word }} 
                        </span>
                        <span v-if="currentCard.transcription ">
                            [ {{ currentCard.transcription }} ]
                        </span>
                    </div>
                </div>
                <div class="frontview">
                    <div class="translation">
                        <span v-if="currentCard.translation">
                            {{ currentCard.translation }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import store from '@/store'

import Library from '@/components/Library.vue'

export default {
    components: {
        Library
    },

data(){
    return{
        library: store.state.currentLibrary,
        currentCardId: 0,
        isActive: false,
        currentCard: {
            word:"",
            transcription: "",
            translation: ""
        },
        changeCard : {
            x: 0,
            y: 0,
            type: 'next',
            touchMoveX: 0,
            touchMoveY: 0,
        },

    }
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

    getCurrentCard () {
        if( this.libCards.length > 0 ) {
            this.currentCard.word = this.libCards[this.currentCardId]["word"]
            this.currentCard.transcription = this.libCards[this.currentCardId]["transcription"]
            this.currentCard.translation = this.libCards[this.currentCardId]["translation"]
        }
    },

    turnCard(){
        this.isActive = !this.isActive;
    },
    touchStart( e ) {
        this.changeCard.x =  e.touches[0].clientX; 
        this.changeCard.y = e.touches[0].clientY;
        this.changeCard.touchMoveX =  e.touches[0].clientX; 
        this.changeCard.touchMoveY = e.touches[0].clientY;
        // console.log( e.touches) 
    },
    
    touchMove(e) {
        this.changeCard.touchMoveX =  e.touches[0].clientX; 
        this.changeCard.touchMoveY = e.touches[0].clientY;
        // console.log( e.touches) 

    },

    touchEnd ( e ) {
        
        const moveX = this.changeCard.touchMoveX - this.changeCard.x;
        const moveY = this.changeCard.touchMoveY - this.changeCard.y;
        

        if ( moveX > 100 || moveY > 100) {
            this.previousCard();
        } 
        if ( moveX < -100 || moveY < -100) {
            this.nextCard();
        } 

    },


    mouseDown( e ) {
        this.changeCard.x =  e.clientX; 
        this.changeCard.y = e.clientY; 
    },


    mouseUp ( e ) {
        
        const moveX = e.clientX - this.changeCard.x;
        const moveY = e.clientY - this.changeCard.y;

        if ( moveX > 150 || moveY > 150) {
            this.previousCard();
        } 
        if ( moveX < -150 || moveY < -150) {
            this.nextCard();
        } 

    },

    mouseMove ( e ) {

    },

    previousCard(){
        this.currentCardId--;
        if ( this.currentCardId < 0 ) {
            this.currentCardId = this.cardsQty - 1;
        }      
        this.isActive = false;  
        this.getCurrentCard();
    },
    nextCard() {
        this.currentCardId++;
        if ( this.currentCardId >= this.cardsQty ) {
            this.currentCardId = 0;
        } 
        this.isActive = false;  
        this.getCurrentCard();
    },

    updateLib(){
        this.library =  store.state.currentLibrary;
    }

},
mounted() {
    this.getCurrentCard();
},

watch: {
    '$store.state.currentLibrary': () =>{
        // this.currentCardId = 0;
        // this.getCurrentCard();
    },
    libCards() {
        this.currentCardId = 0;
        this.getCurrentCard();
    }
}




}
</script>

<style lang="scss" scoped>


.card{
  margin: 50px auto;
   width: 400px;
  height: 300px;
    position: relative;
    cursor: pointer;
  .frontview, 
  .backview{

  border: 1px solid rgba(100, 200, 250, 1);
  border-radius: 20px;
  padding: 0 20px;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    backface-visibility: hidden;
      transition: all 0.5s ease-in-out;
    
    div{
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
     justify-content: center;
     align-items: center;
    border-radius: 20px;
    font-size: 25px;
    font-weight: 600;
    text-align: center;
   
    }
  }
  .backview{
        background: rgba(255, 255, 255, 1);  
  
    div{
        background: rgba(100, 200, 250, 1);
        color: rgba(255, 255, 255, 1);

    }
  }
  
  .frontview{
      
             background: rgba(100, 200, 250, 1);
         transform: rotateY(180deg);
    div{
       background: rgba(255, 255, 255, 1);
        color: rgba(100, 200, 250, 1);
    }
  }
  
  &.active {
    .frontview{
      
     transform: rotateY(0);
    }
    .backview{
       transform: rotateY(180deg);
    }
  }

  span{
            display: block;
            padding-bottom: 30px;
        }
}



</style>