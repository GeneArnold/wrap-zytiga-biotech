import AngularBaseClass from '../angularBaseClass';

var playVideo = function() {
  const video = $('#introVideoPlayer')[0];

  if (video && video.paused) {
    var ua = navigator.userAgent;

    if (ua.match(/iPad/)) {
      video.play()
    }
  }
};

window.addEventListener("click", function() {
  playVideo();
}, false);

class IntroController extends AngularBaseClass {
  constructor($rootScope, $scope, InactiveService) {
    super(arguments);

    angular.extend($rootScope, {
      showIntroScreen: true,
      showThankYouScreen: false
    });

    this.$scope.$on('inactive.state', e => {
      this.$scope.$apply(() => {
        this.$rootScope.showIntroScreen = true;
        this.$rootScope.showThankYouScreen = false;
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        document.activeElement.blur();
      });
    });

    this.$scope.$on('active.state', e => {
    });
  }

  startHere() {
    this.$rootScope.showIntroScreen = false;
  }
}

IntroController.$inject = ['$rootScope',
                           '$scope',
                           'InactiveService'];
export default IntroController;
