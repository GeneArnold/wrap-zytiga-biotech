let viewportWidth = function() {
  let vpw;
  let webkit = (!(window.webkitConvertPointFromNodeToPage == null));
  
  if (webkit) {
    var vpwtest = document.createElement( "div" );
    // Sets test div to width 100%, !important overrides any other misc. box model styles that may be set in the CSS
    vpwtest.style.cssText = "width:100% !important; margin:0 !important; padding:0 !important; border:none !important;";
    document.documentElement.insertBefore( vpwtest, document.documentElement.firstChild );
    vpw = vpwtest.offsetWidth;
    document.documentElement.removeChild( vpwtest );
  } else if (window.innerWidth === undefined) { // IE 6-8:
    vpw = document.documentElement.clientWidth; 
  } else { // Other:
    vpw =  window.innerWidth;
  }

  return (vpw);
};

let resize = function() {
  $(() => {
    let fullHeight = $('#full-height');
    let mainContainer = fullHeight.find(".main");

    $('#fullscreen-intro').bind('touchmove', (e) => {e.preventDefault()});

    $(window).resize(() => {
      let height = fullHeight.height();

      let elementsHeight = fullHeight
                      .find('>div')
                      .map((index, element) => { 
                        return element.clientHeight;
                      })
                      .slice(0, -1)
                      .toArray()
                      .reduce((prev, curr) => { 
                        return prev + curr; 
                      });


      if (viewportWidth() > 767) {
        mainContainer.height(height - elementsHeight);
      } else {
        mainContainer.height('100%');
      }

    }).resize();
  });
};

export default {
  viewportWidth: viewportWidth,
  resize: resize
};
