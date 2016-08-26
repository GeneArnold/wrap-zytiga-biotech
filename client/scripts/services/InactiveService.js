import AngularBaseClass from '../angularBaseClass';

class InactiveService extends AngularBaseClass {
  constructor($window, $rootScope) {
    super(arguments);

    this.timeoutID = null;
    this.setup();

    // wait 30 seconds before calling goInactive
    this.gracePeriod = 60000;
  }

  setup() {
    const resetTimer = this.resetTimer.bind(this);
    this.$window.addEventListener("mousemove", resetTimer, false);
    this.$window.addEventListener("mousedown", resetTimer, false);
    this.$window.addEventListener("keypress", resetTimer, false);
    this.$window.addEventListener("DOMMouseScroll", resetTimer, false);
    this.$window.addEventListener("mousewheel", resetTimer, false);
    this.$window.addEventListener("touchmove", resetTimer, false);
    this.$window.addEventListener("MSPointerMove", resetTimer, false);
 
    this.startTimer();
  }
     
  startTimer() {
    this.timeoutID = window.setTimeout(this.goInactive.bind(this), this.gracePeriod);
  }
   
  resetTimer(e) {
    window.clearTimeout(this.timeoutID);
 
    this.goActive();
  }
   
  goInactive() {
    this.$rootScope.$broadcast('inactive.state');
  }
   
  goActive() {
    this.$rootScope.$broadcast('active.state');
    this.startTimer();
  }
}

InactiveService.$inject = ['$window', '$rootScope'];
export default InactiveService;
