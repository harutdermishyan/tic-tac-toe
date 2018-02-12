import Vue from 'vue'
import {_} from 'vue-underscore';
import VueCountdown from '@dmaksimovic/vue-countdown';

export default {
  name: 'start-game',
  components: {
      VueCountdown
  },
  props: [],
  data () {
    return {
        api: 'http://127.0.0.1:8000/api',
        xIcon: '/src/assets/xicon.png',
        oIcon: '/src/assets/oicon.ico',
        game_id: null,
        count: 0,
        timer: false,
        freeIcons: [],
        startButtonShow: true,
        startGame: false,
        gameEnded: false,
        winner: null,
        data: {},
        second: null,
        timesUp: null
    }
  },

  computed: {

  },
  methods: {
    chooseItem(e) {
        //
        if(!this.gameEnded){
            let element = $(e.target);
            if(typeof element.data('icon') === 'undefined'){
                element.attr('data-icon', 'X').html($('<img>').attr({'width':50, "height":50, 'src': this.xIcon}));
                if(this.checkForWinning("X")){
                    this.winner = "X";
                    setTimeout(() => this.gameOver(), 300);
                }else{
                    this.nextStep();
                }
            }else{
                alert("Row already selected.");
            }
        }
        return false;
    },

    nextStep(){
        for(let i = 0; i < $('.icons').length; i++){
            let item = $('.icons').eq(i).data('icon');
            if(typeof item === 'undefined'){
                this.freeIcons.push($('.icons').eq(i));
            }
        }

        /**
         * If the game ending is draw.
         */
        if(this.freeIcons.length){
            this.freeIcons = _.shuffle(this.freeIcons);
            let length = this.freeIcons.length - 1;
            let image = $('<img>').attr({'width':100, "height":100, 'src': this.oIcon});
            this.freeIcons[_.random(0, length)].attr('data-icon', 'O').html(image);
        }else{
          return this.gameOver();
        }

        if(this.checkForWinning("O")){
            this.winner = "O";
            setTimeout(() => this.gameOver(), 400);
        }
        this.freeIcons = [];
    },

    checkForWinning(symbol){
        if(
            this.squareHas(0,symbol) && this.squareHas(1,symbol) && this.squareHas(2,symbol) ||
            this.squareHas(0,symbol) && this.squareHas(3,symbol) && this.squareHas(6,symbol) ||
            this.squareHas(0,symbol) && this.squareHas(4,symbol) && this.squareHas(8,symbol) ||
            this.squareHas(1,symbol) && this.squareHas(4,symbol) && this.squareHas(7,symbol) ||
            this.squareHas(2,symbol) && this.squareHas(4,symbol) && this.squareHas(6,symbol) ||
            this.squareHas(2,symbol) && this.squareHas(5,symbol) && this.squareHas(8,symbol) ||
            this.squareHas(3,symbol) && this.squareHas(4,symbol) && this.squareHas(5,symbol) ||
            this.squareHas(6,symbol) && this.squareHas(7,symbol) && this.squareHas(8,symbol)
        ){
            return true;
        }else{
            return false;
        }
    },

    squareHas(i, icon){
        return $('.icons').eq(i).data('icon') === icon;
    },

    restartGame (){
        return location.reload();
    },

    createGame(){
        this.axios.get(this.api + '/game/create').then(res => {
            if(res.data.status === 'success'){
                this.game_id = res.data.game_id;
                this.startGame = true;
                this.startButtonShow = false;
                this.startTimer();
            }
        });
    },
    handleTimeExpire () {
        this.timesUp = 'Time\'s up!';
        this.gameOver();
    },

    gameOver(){
        this.endTimer();
        this.gameEnded = true;
        this.data = {
            winner: this.winner,
            end_time: this.$children[0].time
        };

        this.axios.put(this.api + '/game/' + this.game_id, this.data).then(res => {
            if(res.data.status === 'success'){
                if(this.timesUp){
                    this.message = this.timesUp;
                }else if(this.winner){
                    this.message = this.winner + ' is Won!!';
                }else{
                    this.message = 'The game ending is draw.';
                }

                alert(this.message);
            }
        });
    },

    startTimer () {
        this.timer = true;
    },
    endTimer(){
        this.timer = false;
    }
  }
}
