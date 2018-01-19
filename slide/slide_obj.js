!(function() {
  var slides = {
    $slides: $(".slides"),
    currentIndex: 0,
    timer: undefined,
    playing: true,
    events: [
      { el: ".buttonPrevious", event: "click", fn: "playPrevious" },
      { el: ".buttonNext", event: "click", fn: "playNext" },
      { el: ".slidewindow", event: "mouseenter", fn: "clearTimer" },
      { el: ".slidewindow", event: "mouseleave", fn: "resetTimer" }
    ],
    init() {
      this.bindEvents();
      this.timer = this.playing ? this.autoPlay() : undefined;
    },
    playNext() {
      this.clearTimer();
      this.playSlide(this.currentIndex + 1);
    },
    playPrevious() {
      this.clearTimer();
      this.playSlide(this.currentIndex - 1);
    },
    playSlide(index) {
      index = this.fixIndex(index);
      this.$slides.css({ transform: `translateX(${-400 * index}px)` });
      this.currentIndex = index;
    },
    fixIndex: index => {
      if (index < 0) {
        index = 3;
      } else if (index > 3) {
        index = 0;
      }
      return index;
    },
    resetTimer() {
      this.timer = this.playing ? this.autoPlay() : undefined;
    },
    autoPlay() {
      return setInterval(() => {
        this.playSlide(this.currentIndex + 1);
      }, 3000);
    },
    clearTimer: () => {
      window.clearInterval(this.timer);
    },
    bindEvents() {
      this.events.forEach(eventObject => {
        $(eventObject.el).on(
          eventObject.event,
          this[eventObject.fn].bind(this)
        );
      });
    }
  };
  slides.init.call(slides);
  //   slides.init()
})();
