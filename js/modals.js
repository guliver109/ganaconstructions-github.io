var Modal = (function() {

  var trigger = $qsa(".modal__trigger"); // what you click to activate the modal
  var modals = $qsa(".modal"); // the entire modal (takes up entire window)
  var modalsbg = $qsa(".modal__bg"); // the entire modal (takes up entire window)
  var content = $qsa(".modal__content"); // the inner content of the modal
  var closers = $qsa(".modal__close"); // an element used to close the modal
  var w = window;
  var isOpen = false;
    var contentDelay = 400; // duration after you click the button and wait for the content to show
  var len = trigger.length;

  $(".modal__ trigger").on("show", function () {
    $("body").addClass("modal-open");
  }).on("hidden", function () {
    $("body").removeClass("modal-open")
  });

  // make it easier for yourself by not having to type as much to select an element
  function $qsa(el) {
    return document.querySelectorAll(el);
  }

  var getId = function(event) {

    event.preventDefault();
    var self = this;
    // get the value of the data-modal attribute from the button
    var modalId = self.dataset.modal;
    var len = modalId.length;
    // remove the "#" from the string
    var modalIdTrimmed = modalId.substring(1, len);
    // select the modal we want to activate
    var modal = document.getElementById(modalIdTrimmed);
    // execute function that creates the temporary expanding div
    makeDiv(self, modal);
  };

  var makeDiv = function(self, modal) {

    var fakediv = document.getElementById("modal__temp");

    if (fakediv === null) {
      var div = document.createElement("div");
      div.id = "modal__temp";
      self.appendChild(div);
      moveTrig(self, modal, div);
    }
  };

  var moveTrig = function(trig, modal, div) {
    var trigProps = trig.getBoundingClientRect();
    var m = modal;
    var mProps = m.querySelector(".modal__content").getBoundingClientRect();
    var transX, transY, scaleX, scaleY;
    var xc = w.innerWidth / 2;
    var yc = w.innerHeight / 2;

    // this class increases z-index value so the button goes overtop the other buttons
    trig.classList.add("modal__trigger--active");

    // these values are used for scale the temporary div to the same size as the modal
    scaleX = mProps.width / trigProps.width;
    scaleY = mProps.height / trigProps.height;

    scaleX = scaleX.toFixed(3); // round to 3 decimal places
    scaleY = scaleY.toFixed(3);


    // these values are used to move the button to the center of the window
    transX = Math.round(xc - trigProps.left - trigProps.width / 2);
    transY = Math.round(yc - trigProps.top - trigProps.height / 2);

        // if the modal is aligned to the top then move the button to the center-y of the modal instead of the window
    if (m.classList.contains("modal--align-top")) {
      transY = Math.round(mProps.height / 2 + mProps.top - trigProps.top - trigProps.height / 2);
    }


        // translate button to center of screen
        trig.style.transform = "translate(" + transX + "px, " + transY + "px)";
        trig.style.webkitTransform = "translate(" + transX + "px, " + transY + "px)";
        // expand temporary div to the same size as the modal
        div.style.transform = "scale(" + scaleX + "," + scaleY + ")";
        div.style.webkitTransform = "scale(" + scaleX + "," + scaleY + ")";


        window.setTimeout(function() {
            window.requestAnimationFrame(function() {
                open(m, div);
            });
        }, contentDelay);

  };

  var open = function(m, div) {

    if (!isOpen) {
      // select the content inside the modal
      var content = m.querySelector(".modal__content");
      // reveal the modal
      m.classList.add("modal--active");
      // reveal the modal content
      content.classList.add("modal__content--active");
      content.addEventListener("transitionend", hideDiv, false);

      isOpen = true;
    }

    function hideDiv() {
      // fadeout div so that it can"t be seen when the window is resized
      div.style.opacity = "0";
      content.removeEventListener("transitionend", hideDiv, false);
    }
  };

  var close = function(event) {

        event.preventDefault();
    event.stopImmediatePropagation();

    var target = event.target;
    var div = document.getElementById("modal__temp");
    if (isOpen && target.classList.contains("modal__bg") || target.classList.contains("modal__close")) {

      // make the hidden div visible again and remove the transforms so it scales back to its original size
      div.style.opacity = "1";
      div.removeAttribute("style");

            for (var i = 0; i < len; i++) {
                modals[i].classList.remove("modal--active");
                content[i].classList.remove("modal__content--active");
                trigger[i].style.transform = "none";
        trigger[i].style.webkitTransform = "none";
                trigger[i].classList.remove("modal__trigger--active");
            }

      // when the temporary div is opacity:1 again, we want to remove it from the dom
            div.addEventListener("transitionend", removeDiv, false);

      isOpen = false;

    }

    function removeDiv() {
      setTimeout(function() {
        window.requestAnimationFrame(function() {
          // remove the temp div from the dom with a slight delay so the animation looks good
          div.remove();
        });
      }, contentDelay - 50);
    }

  };

  var bindActions = function() {
    for (var i = 0; i < len; i++) {
      trigger[i].addEventListener("click", getId, false);
      closers[i].addEventListener("click", close, false);
      modalsbg[i].addEventListener("click", close, false);
    }
  };

  var init = function() {
    bindActions();
  };

  return {
    init: init
  };

}());

Modal.init();

// Opsirnije modal
// console.clear();

var body = document.body;
var modal = createModal(document.querySelector("#modal-1"));
var openButton = document.querySelector("#open-button");

openButton.addEventListener("click", function(){
  modal.open();
});

function createModal(container) {
  
  var content = container.querySelector(".modal-content");
  var dialog = container.querySelector(".modal-dialog");
  var polygon = container.querySelector(".modal-polygon");
  var svg = container.querySelector(".modal-svg");

  var point1 = createPoint(45, 45);
  var point2 = createPoint(55, 45);
  var point3 = createPoint(55, 55);
  var point4 = createPoint(45, 55);

  var animation = new TimelineMax ({
        onReverseComplete: onReverseComplete,
        onStart: onStart,
        paused: true
      })
      .to(point1, 0.3, {
        x: 15,
        y: 30,
        ease: Power4.easeIn},0)
      
      .to(point4, 0.3,{
        x: 5,
        y: 80,
        ease: Power2.easeIn}, "-=0.1")
      
      .to(point1, 0.3,{
        x:0,  
        y:0, 
        ease: Power3.easeIn})
      
      .to(point2, 0.3, {
        x: 300,
        y: 0,
        ease: Power2.easeIn}, "-=0.2")
      
      .to(point3, 0.3, {
        x:  300,
        y:  300,
        ease: Power2.easeIn})
      
      .to(point4, 0.3, {
        x: 0,
        y: 300,
        ease: Power2.easeIn}, "-=0.1")
        
      .to(container, 1, {
        autoAlpha: 1}, 0)
      .to(content, 1, {
        autoAlpha: 1
      })
    
    var modal = {
      animation: animation,
      container: container,
      content: content,
      dialog: dialog,
      isOpen: false,
      open: open,
      close: close
    };

    body.removeChild(container);

      function onClick() {
        if (modal.isOpen) {
          close();
        }
      }
    
      function onStart() {
        body.appendChild(container);
        container.addEventListener("click", onClick);
      }
    
      function onReverseComplete() {
        container.removeEventListener("click", onClick);
          body.removeChild(container);
      }
      
      function open() {
        modal.isOpen = true;
        animation.play().timeScale(2);
      }
      
      function close() {
        modal.isOpen = false;
        animation.reverse().timeScale(2.5);
      } 

      function createPoint(x, y) {
        var point = polygon.points.appendItem(svg.createSVGPoint());
        point.x = x || 0;
        point.y = y || 0;
        return point;
      }
    return modal;
}

