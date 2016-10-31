/*jshint browser: true*/
/*global $, jQuery, alert*/
(function() {
    "use strict";

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomIntSecure(min, max) {
        var array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        return array[0] % (max - min + 1) + min;
    }
    window.tf = () => {
        console.log("x");
    };
    window.logicm = class Logic {
        constructor() {
            this.rant = [3, 3, 3, 2, 2, 1];
            this.prizeSummonDistribution = [
                [0, 50],
                [50, 100],
                [100, 150],
                [150, 200],
                [200, 250],
                [250, 300]
            ];
            this.flashtmp = 2;
            this.laststarttime = 0; /* second*1000 */
            this.laststartno = 0;
            this.flashCurrentCounter = 0;
        }
        noToTier(no) {
            return this.rant[no];
        }
        getFlashNoS(no) {
            let ranges = this.prizeSummonDistribution[no];
            return getRandomInt(ranges[0], ranges[1]);
        }
        FlashStart(no) {
            this.laststarttime = new Date().getTime();
            this.laststartno = no;
            this.flashCurrentCounter = 0;
            return true;
        }
        isFlashShouldKeep() {
            if (this.laststarttime + 5000 < new Date().getTime()) {
                return false;
            }
            return true;
        }
        getFlashInterval() {
            this.flashCurrentCounter++;
            let calcs = 2 * (60 - 13 * Math.log(this.flashCurrentCounter));
            return calcs;
        }
        getNextWinner() {
            let no = this.laststartno;
            let ranges = this.prizeSummonDistribution[no];
            return getRandomIntSecure(ranges[0], ranges[1]);
        }
        shouldMoveToHistory(no) {
            return true;
        }
        getnoInRank(no) {
            let counter = 0;
            let rant = this.rant;
            let ct = this.noToTier(no);
            while (no != -1 && rant[no] === ct) {
                counter += 1;
                no--;
            }
            return counter;
        }
    };
}());
