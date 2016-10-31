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
            return true;
        }
        isFlashShouldKeep() {
          if(this.laststarttime+4000<new Date().getTime()){
            return false;
          }
            return true;
        }
        getFlashInterval() {
            return 60;
        }
        getNextWinner() {
          return 88;
        }
        shouldMoveToHistory(no){
          return true;
        }
        getnoInRank(no){
          let counter=0;
          let rant=this.rant;
          let ct=this.noToTier(no);
          while(no!=-1&&rant[no]===ct){
            counter+=1;
            no--;
          }
          return counter;
        }
    };
}());
