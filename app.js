new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        superPower: true,
        magicPower: 100,
        turns: []

    },
    methods: {
        startGame: function () {
            this.gameIsRunning = !this.gameIsRunning;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.superPower = true;
        },
        attack: function () {
            var dammage = this.calculateDamage(10, 3);
            this.monsterHealth -= dammage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + dammage
            });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttack();
        },
        specialAttack: function () {
            if (this.superPower) {
                var dammage = this.calculateDamage(20, 10);
                this.monsterHealth -= dammage;
                this.turns.unshift({
                    isPlayer: true,
                    text: 'Player hits Monster for ' + dammage
                });
                if (this.checkWin()) {
                    return;
                }
                this.monsterAttack();
                this.superPower = false;
            } else {
                alert('You have no Power!');
            }
        },
        monsterAttack: function () {
            var dammage = this.calculateDamage(12, 5);
            this.playerHealth -= dammage;
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for ' + dammage
            });
            this.checkWin();
        },
        heal: function () {
            if (this.magicPower > 0) {
                if (this.playerHealth <= 90) {
                    this.playerHealth += 15;                    
                    this.magicPower -= 50;
                } else {
                    this.playerHealth = 100;
                    this.magicPower -= 50;
                }
                this.turns.unshift({
                    isPlayer: true,
                    text: 'Player heals for 15'
                })
                this.monsterAttack();
            } else {
                alert('You are out of magic power!');
            }
        },
        giveUp: function () {
            this.gameIsRunning = false;
        },
        calculateDamage: function (max, min) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                if (confirm('You Won! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You Lost! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
})