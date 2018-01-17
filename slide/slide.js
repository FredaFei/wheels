!(function() {
  let slide = {
    $element: $('.slide'),
    timer: 0,
    currentIndex: 0,
    width: 400,
    controls: true,
    progress: true,
    autoPlay: false,
    $prev: $('<button class="prev arrow">prev</button>'),
    $next: $('<button class="next arrow">next</button>'),
    events: [
        {el: slide.$prev,event: 'click', fn: prevSlide},
        {el: slide.$next,event: 'click', fn: nextSlide},
        {el: slide.$element,event: 'mouseenter', fn: clearTimer},
        {el: slide.$element,event: 'mouseleave', fn: resetTimer},
        {el: slide.$element.children('.suffix>span'),event: 'click', fn: play}
    ]
  };
  init()
  function init(){
    initHtml()
    bindEvents()
    playSlide(0)
    if (slide.autoPlay) {
        playSlide()
    }
    if (slide.progress) {
        initProgress()
    }
  }
  function playSlide(index) {
    let $ol = slide.$element.children("ol");
    let length = $ol.children("li").length;
    let $suffix = slide.$element.children(".suffix");
    if (index > length - 1) {
      index = 0;
    } else if (index < 0) {
      index = length - 1;
    }
    $ol.css({
      transform: `translateX(${-index * slide.width}px)`
    });
    slide.currentIndex = index;
    $suffix
      .children("span")
      .eq(index)
      .addClass("active")
      .siblings()
      .removeClass("active");
  }
  function initHtml() {
    slide.$element.width(slide.width);
    slide.$element.append(slide.$prev);
    slide.$element.append(slide.$next);
  }
  function initProgress() {
    let $progress = $("<div class=suffix></div>");
    let $ol = slide.$element.children("ol");
    let length = $ol.children("li").length;
    let spanHtml = "";
    for (let i = 0; i < length; i++) {
      spanHtml += "<span></span>";
    }
    $progress.append($(spanHtml));
    slide.$element.append($progress);
    $progress
      .children("span")
      .eq(0)
      .addClass("active");
  }
  function bindEvents() {
      slide.events.forEach((element)=> {
          element.el.on(element.event,(e)=>{element.fn})
      });
    slide.$prev.on("click", () => {
      prev();
    });
    slide.$next.on("click", () => {
      next();
    });
    if (slide.autoPlay) {
      slide.$element
        .on("mouseenter", () => {
          stopPlay();
        })
        .on("mouseleave", () => {
          play();
        });
    }
    slide.$element.on("click", ".suffix>span", e => {
      let index = $(e.target).index();
      slide.currentIndex = index;
      playSlide(slide.currentIndex);
      $(e.target)
        .addClass("active")
        .siblings()
        .removeClass("active");
    });
  }

  function prevSlide() {
    playSlide(slide.currentIndex - 1);
  }
  function nextSlide() {
    playSlide(slide.currentIndex + 1);
  }
  function play() {
    return setInterval(() => {
      playSlide(slide.currentIndex + 1);
    }, 2000);
  }
  function resetTimer(){
    slide.timer = play()
  }
  function clearTimer() {
    window.clearInterval(slide.timer);
  }
})();
