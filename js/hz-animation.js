var xmlns = "http://www.w3.org/2000/svg",
  xlinkns = "http://www.w3.org/1999/xlink",
  select = function(s) {
    return document.querySelector(s);
  },
  selectAll = function(s) {
    return document.querySelectorAll(s);
  },
  devicesSVG = select('.devicesSVG'),
  horizonSVG = select('.horizonSVG'),
  desktopSVGContainer = select('.desktopSVGContainer'),
  iPadSVGContainer = select('.iPadSVGContainer'),
  phoneSVGContainer = select('.phoneSVGContainer'),
  desktopSVG = horizonSVG.cloneNode(true),
  iPadSVG = horizonSVG.cloneNode(true),
  phoneSVG = horizonSVG.cloneNode(true)

desktopSVGContainer.appendChild(desktopSVG);
iPadSVGContainer.appendChild(iPadSVG);
phoneSVGContainer.appendChild(phoneSVG);
select('.hz-animation').removeChild(horizonSVG);
desktopSVG.setAttribute('class', 'desktopSVG');
iPadSVG.setAttribute('class', 'iPadSVG');
phoneSVG.setAttribute('class', 'phoneSVG');

var allMountains = selectAll('.allMountains'),
  warmSkyBg = selectAll('.warmSkyBg'),
  smallGroup = selectAll('.smallGroup'),
  medGroup = selectAll('.medGroup'),
  bigGroup = selectAll('.bigGroup'),
  logoSun = selectAll('.logoSun'),
  mainLogoGroup = selectAll('.mainLogoGroup'),
  mainLogoMaskCircle = selectAll('.mainLogoMaskCircle'),
  waterGroup = selectAll('.waterGroup'),
  notifyDisp = selectAll('.notifyDisp')
  //console.log(numPeaks)
TweenMax.set('svg', {
  visibility: 'visible'
})

TweenMax.set(desktopSVGContainer, {
  scale: 0.5,
  x: -74,
  y: 6,
  transformOrigin: '50% 50%',
  svgOrigin: '252 270'
})
TweenMax.set(iPadSVGContainer, {
  scale: 0.375,
  x: 74,
  y: 11,
  transformOrigin: '50% 50%',
  svgOrigin: '591 326'
})
TweenMax.set(phoneSVGContainer, {
  scale: 0.185,
  x: 65,
  y: 16,
  transformOrigin: '50% 50%',
  svgOrigin: '746 386'
})

TweenMax.set(allMountains, {
  x: '-=950',
  y: 111
})
TweenMax.set(waterGroup, {
  x: 800,
  y: 311 + 78
})
TweenMax.set('.phoneGroup', {
  x: -725, //changed in 008
  y: 0,
  scale: 1.05,
  transformOrigin: '0% 100%'
})
TweenMax.set('.iPadGroup', {
  x: -92,
  y: 0
})
TweenMax.set('.desktopGroup', {
  x:0,
  y: 0
})

TweenMax.set(mainLogoMaskCircle, {
  attr: {
    r: 560
  }
})

TweenMax.set(logoSun, {
    attr: {
      cy: 100
    }
  })
TweenMax.set('#allDevices', {
    scale:1.3,
  //x:-120,
  //y:-150,
  svgOrigin:'-10 560'
  })

//DEVICE SPECIFIC ANIMATION vv
TweenMax.set(iPadSVG.querySelector('.waterGroup'), {
  y: 500
})
TweenMax.set(iPadSVG.querySelector('.wholeChat'), {
  y: 111
})
TweenMax.set(phoneSVG.querySelector('.wholeChat'), {
    y: 58,
    scale: 0.7,
    transformOrigin: '50% 0%'
  })
  //DEVICE SPECIFIC ANIMATION ^^
  //DEVICE SPECIFIC ANIMATION vv
TweenMax.set(desktopSVG.querySelector('.horizon'), {
    y: '-=40'
  })
  //DEVICE SPECIFIC ANIMATION ^^

var tl = new TimelineMax({
  paused: true,
  repeat: -1,
  repeatDelay: 1
});
tl.staggerFrom([smallGroup, medGroup, bigGroup], 0.6, {
  y: '+=400',
  ease: Expo.easeOut
}, 0.1, '-=1')
.to(smallGroup, 4, {
    x: -(2 * 1200),
    ease: Power2.easeInOut
  })
  .to(medGroup, 4, {
    x: -(3 * 1858),
    ease: Power2.easeInOut
  }, '-=4')
  .to(bigGroup, 4, {
    x: -(4 * 2676),
    ease: Power2.easeInOut
  }, '-=4')
  .to('.horizon', 1, {
    alpha: 0,
    x: '-=400',
    ease: Power2.easeIn
  }, '-=4')
  .to(waterGroup, 1, {
    x: -1000,
    ease: Power2.easeOut
  }, '-=1.8')
  .to(warmSkyBg, 1.2, {
    alpha: 1,
    ease: Power2.easeOut
  }, '-=2')
  .from(logoSun, 1.2, {
    attr: {
      cx: '+=500'
    },
    ease: Power2.easeOut
  }, '-=2')

.from('.chatPanel', 0.6, {
  scaleY: 0,
  transformOrigin: '50% 100%',
  ease: Power3.easeInOut
}, '-=0.6')

.to('.chatMessage', 0.6, {
    y: '-=50',
    //delay:0.25,
    ease: Anticipate.easeIn
  }, '-=0.6')
  .from('.chat0 rect', 0.2, {
    scaleX: 0.1,
    y: '+=30',
    transformOrigin: '0% 100%',
    ease: Anticipate.easeIn
  }, '-=0.2')

.to('.chatMessage', 0.4, {
    y: '-=50',
    delay: 0.25,
    ease: Anticipate.easeIn
  })
  .from('.chat1 rect', 0.2, {
    scaleX: 0.1,
    y: '+=30',
    transformOrigin: '100% 100%',
    ease: Anticipate.easeIn
  }, '-=0.2')

.to('.chatMessage', 0.4, {
    y: '-=50',
    delay: 0.25,
    ease: Anticipate.easeIn
  })
  .from('.chat2 rect', 0.2, {
    scaleX: 0.1,
    y: '+=30',
    transformOrigin: '100% 100%',
    ease: Anticipate.easeIn
  }, '-=0.2')

.to('.chatMessage', 0.4, {
    y: '-=50',
    delay: 0.25,
    ease: Anticipate.easeIn
  })
  .from('.chat3 rect', 0.2, {
    scaleX: 0.1,
    y: '+=30',
    transformOrigin: '0% 100%',
    ease: Anticipate.easeIn
  }, '-=0.2')

.to('.chatMessage', 0.4, {
    y: '-=50',
    delay: 0.25,
    ease: Anticipate.easeIn
  })
  .from('.chat4 rect', 0.2, {
    scaleX: 0.1,
    y: '+=30',
    transformOrigin: '100% 100%',
    ease: Anticipate.easeIn
  }, '-=0.2')

.to('.chatMessage', 0.4, {
    y: '-=50',
    delay: 0.25,
    ease: Anticipate.easeIn
  })
  .from('.chat5 rect', 0.2, {
    scaleX: 0.1,
    y: '+=30',
    transformOrigin: '0% 100%',
    ease: Anticipate.easeIn
  }, '-=0.2')

.to('.chatPanel', 1, {
    alpha: 0,
    delay: 0
  })
  .to('.chatMessage', 1, {
    y: '-=200',
    alpha: 0,
    ease: Back.easeIn.config(0.6)
  }, '-=1')

.to(mainLogoMaskCircle, 1, {
    attr: {
      r: 203.8
    },
    ease: Power3.easeInOut
  }, '-=0.5')
//DEVICE SPECIFIC ANIMATION vv
.to(iPadSVG.querySelector('.waterGroup'), 1, {
    y: '-=276',
    x: '-=100',
    ease: Power3.easeInOut
  }, '-=1')
  .to(phoneSVG.querySelector('.waterGroup'), 1, {
    y: '-=170',
    x: '-=100',
    ease: Power3.easeInOut
  }, '-=1')
  .to(desktopSVG.querySelector('.waterGroup'), 1, {
    y: '-=170',
    x: '-=100',
    ease: Power3.easeInOut
  }, '-=1')
  //DEVICE SPECIFIC ANIMATION ^^
  //DEVICE SPECIFIC ANIMATION vv
  .to(iPadSVG.querySelector('.mainLogoGroup'), 1, {
    scale: 0.7,
    x: 418,
    y: 326,
    transformOrigin: '0% 0%',
    ease: Power3.easeInOut
  }, '-=1')
  .to(phoneSVG.querySelector('.mainLogoGroup'), 1, {
    scale: 0.7,
    x: 416,
    y: 326,
    transformOrigin: '0% 0%',
    ease: Power3.easeInOut
  }, '-=1')
  .to(desktopSVG.querySelector('.mainLogoGroup'), 1, {
    scale: 0.7,
    x: 416,
    y: 290,
    transformOrigin: '0% 0%',
    ease: Power3.easeInOut
  }, '-=1')
  //DEVICE SPECIFIC ANIMATION ^^

.to(logoSun, 1, {
    attr: {
      cy: 215,
      r: 75.3
    },
    ease: Anticipate.easeOut
  }, '-=1')
  .set('.horizon', {
    x: 0
  })
  .to(mainLogoGroup, 1, {
    alpha: 0,
    delay: 0,
    ease: Power1.easeIn
  })
  .to('.horizon', 1, {
    alpha: 1,
    ease: Power2.easeIn
  })

tl.timeScale(0.6)
tl.play(0)
