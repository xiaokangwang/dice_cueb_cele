/*jshint browser: true*/
/*global $, jQuery, alert*/
(function() {
    "use strict";
    window.tf = () => {
        console.log("x");
    };
    window.logicm = class Logic {
        constructor() {
            this.rant = [3, 3, 3, 2, 2, 1];
            this.flashtmp = 2;
            this.laststarttime = 0; /* second*1000 */
            this.laststartrank = 0;
            this.flashCurrentCounter=0;
        }
        noToTier(no) {
            return this.rant[no];
        }
        getFlashNoS(no) {
            return this.flashtmp++;
        }
        FlashStart(no) {
            this.laststarttime = new Date().getTime();
            this.laststartrank = no;
            this.flashCurrentCounter=0;
            return true;
        }
        isFlashShouldKeep() {
            if (this.laststarttime + 5000 < new Date().getTime()) {
                return false;
            }
            return true;
        }
        getFlashInterval() {
            this.flashCurrentCounter++
            let calcs =  60-11*Math.log(this.flashCurrentCounter);
            return calcs;
        }
        getNextWinner() {
            return 88;
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
