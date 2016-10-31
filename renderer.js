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
            this.flashtmp=2;
        }
        noToTier(no) {
            return this.rant[no];
        }
        getFlashNoS(no){
            return this.flashtmp++;
        }
        FlashStart(no){
          return true;
        }
        isFlashShouldKeep(){
          return true;
        }
        getFlashInterval(){
          return 100;
        }
    };
}());
