!(function() {
  let $slidewindow = $(".slidewindow");
  let $slides = $(".slides");
  let currentIndex = 0;
  let timer = undefined;
  let playing = false;
  function playSlide(index) {
    index = fixIndex(index);
    $slides.css({ transform: `translateX(${-400 * index}px)` });
    currentIndex = index;
  }
  function fixIndex(index) {
    if (index < 0) {
      index = 3;
    } else if (index > 3) {
      index = 0;
    }
    return index;
  }
  let autoPlay = () => {
    return setInterval(() => {
      playNext();
    }, 3000);
  };
  let stopPlay = () => {
    window.clearInterval(timer);
  };
  let playNext = () => {
    playSlide(currentIndex + 1);
  };
  let playPrevious = () => {
    playSlide(currentIndex - 1);
  };
  let events = [
    { el: $(".buttonPrevious"), event: "click", fn: playPrevious },
    { el: $(".buttonNext"), event: "click", fn: playNext },
    { el: $slidewindow, event: "mouseenter", fn: stopPlay },
    { el: $slidewindow, event: "mouseleave", fn: autoPlay }
  ];
  function bindEvents() {
    events.forEach(eventObject => {
      $(eventObject.el).on(eventObject.event, eventObject.fn);
    });
  }
  bindEvents();
  timer = playing ? autoPlay() : undefined;
})();
