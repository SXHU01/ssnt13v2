// Fungsi untuk memulai musik
function playMusic() {
  const music = document.getElementById('background-music');
  if (music) {
    music.play().catch(e => console.log('Music play failed:', e));
  }
}

window.addEventListener('DOMContentLoaded', function() {
  playMusic();
});
document.body.addEventListener('click', playMusic, { once: true });

const content = document.getElementById('content');
const footer = document.getElementsByTagName('footer')[0];
const timer = document.getElementById('timer');

// Flag untuk mencegah multiple clicks
let canClick = false;
let currentSlide = 0;
let typeItInstances = {};

const second = 1000,
  minute = second * 60,    
  hour = minute * 60,
  day = hour * 24;

let countDown = new Date('Jan 7, 2026 00:00:00').getTime(),
  x = setInterval(function () {
    let now = new Date().getTime(),
      distance = countDown - now;
    document.getElementById('hours').innerText = Math.floor(distance / (hour)),
      document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute)),
      document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second);

    if (distance < 0) {
      timer.classList.add('d-none');
      confetti();
      clearInterval(x);
      _slideSatu();
    }
  }, second);

// Global click handler
function handleGlobalClick(e) {
  if (!canClick) return;
  
  // Jangan proses jika klik pada button
  if (e.target.tagName === 'BUTTON') return;
  
  canClick = false;
  
  if (currentSlide === 1) {
    _slideDua();
  } else if (currentSlide === 2) {
    transitionToSlideEmpat();
  }
}

document.body.addEventListener('click', handleGlobalClick);
document.body.addEventListener('touchend', handleGlobalClick);

const _slideSatu = function () {
  const tap1 = document.getElementById('tap1');
  const slideSatu = document.getElementById('slideSatu');
  slideSatu.classList.remove('d-none');
  
  setTimeout(function () {
    tap1.classList.remove('d-none');
    canClick = true;
    currentSlide = 1;
  }, 7000);
};

const _slideDua = function () {
  const slideSatu = document.getElementById('slideSatu');
  const tap1 = document.getElementById('tap1');
  const tap2 = document.getElementById('tap2');
  const slideDua = document.getElementById('slideDua');

  setTimeout(function () {
    slideSatu.classList.replace('animate__slideInDown', 'animate__backOutDown');
    tap1.classList.add('d-none');
    setTimeout(function () {
      slideSatu.classList.add('d-none');
    }, 1000);
  }, 1000);

  slideDua.classList.remove('d-none');
  
  // Pastikan TypeIt untuk teks1 dijalankan
  if (!typeItInstances.teks1) {
    initTypeItTeks1();
  }
  
  setTimeout(function () {
    tap2.classList.remove('d-none');
    canClick = true;
    currentSlide = 2;
  }, 50000);
};

const transitionToSlideEmpat = function() {
  const slideDua = document.getElementById('slideDua');
  const tap2 = document.getElementById('tap2');
  
  slideDua.classList.replace('animate__zoomInDown', 'animate__fadeOutLeft');
  slideDua.classList.remove('animate__delay-2s', 'animate__slow');
  tap2.classList.add('d-none');
  
  setTimeout(function () {
    slideDua.remove();
    _slideEmpat();
    currentSlide = 3;
  }, 1000);
};

function getRandomPosition(element) {
  var x = document.body.offsetHeight - element.clientHeight;
  var y = document.body.offsetWidth - element.clientWidth;
  var randomX = Math.floor(Math.random() * 500);
  var randomY = Math.floor(Math.random() * y);
  return [randomX, randomY];
}

const _slideEmpat = function () {
  const slideEmpat = document.getElementById('slideEmpat');
  const btn = document.getElementsByTagName('button');
  slideEmpat.classList.remove('d-none');

  btn[0].addEventListener('click', function (e) {
    e.stopPropagation();
    var xy = getRandomPosition(slideEmpat);
    slideEmpat.style.top = xy[0] + 'px';
  });

  btn[1].addEventListener('click', function (e) {
    e.stopPropagation();
    slideEmpat.classList.replace('animate__fadeInDown', 'animate__bounceOut');
    slideEmpat.classList.remove('animate__delay-2s');
    setTimeout(function () {
      slideEmpat.remove()
      setTimeout(() => {
        _slideLima();
      }, 500);
    }, 1000);
  });
};

const _slideLima = function () {
  const slideLima = document.getElementById('slideLima');
  slideLima.classList.remove('d-none');
  const trims = document.getElementById('trims');

  // Pastikan TypeIt untuk trims dijalankan
  if (!typeItInstances.trims) {
    initTypeItTrims();
  }

  setTimeout(() => {
    trims.classList.remove('d-none');
  }, 1000);

  slideLima.addEventListener('animationend', () => {
    slideLima.classList.add('animate__delay-3s')
    slideLima.classList.replace('animate__bounceIn', 'animate__fadeOut');
    setTimeout(() => {
      slideLima.remove();
      _slideEnam();
    }, 4000);
  });
};

const _slideEnam = function () {
  const slideEnam = document.getElementById('slideEnam');
  if (slideEnam) {
    slideEnam.classList.remove('d-none');
  }
};

// Inisialisasi TypeIt dengan pengecekan
function initTypeItTeks1() {
  if (typeof TypeIt !== 'undefined') {
    try {
      typeItInstances.teks1 = new TypeIt("#teks1", {
        strings: [
          "Di hari ini, semesta seolah berbisik lembut, merayakan tanggal saat kamu pertama kali menyapa dunia.", 
          " ", 
          "Selamat ulang tahun untuk Sutanti, nama yang selalu membawa ketenangan di setiap sebutannya.", 
          " ", 
          "Di mataku, kamu adalah jiwa yang selalu mempesona, si Cantik yang kehadirannya luar biasa.", 
          " ", 
          "Terima kasih telah menjadi alasan di balik senyumku dan warna di setiap hariku yang sempat abu-abu.",
          " ",
          "Semoga setahun ke depan, semesta menjagamu dengan pelukan yang paling hangat, menghujanimu dengan tawa, dan menjauhkanmu dari segala lara.",
          " ",
          "Tetaplah bersinar dengan caramu sendiri, Cantik... Semoga bahagia selalu menetap di hatimu.",
          " ",
          "barakallah fi umrik, terima kasih sudah bertahan sampai sejauh ini.",
          " ",
          "- Wish all you the best"
        ],
        startDelay: 1000,
        speed: 75,
        waitUntilVisible: true
      }).go();
    } catch (e) {
      console.error('TypeIt teks1 error:', e);
      // Fallback: tampilkan teks langsung
      document.getElementById('teks1').innerHTML = "Di hari ini, semesta seolah berbisik lembut, merayakan tanggal saat kamu pertama kali menyapa dunia.<br><br>Selamat ulang tahun untuk Sutanti, nama yang selalu membawa ketenangan di setiap sebutannya.<br><br>Di mataku, kamu adalah jiwa yang selalu mempesona, si Cantik yang kehadirannya luar biasa.<br><br>Terima kasih telah menjadi alasan di balik senyumku dan warna di setiap hariku yang sempat abu-abu.<br><br>Semoga setahun ke depan, semesta menjagamu dengan pelukan yang paling hangat, menghujanimu dengan tawa, dan menjauhkanmu dari segala lara.<br><br>Tetaplah bersinar dengan caramu sendiri, Cantik... Semoga bahagia selalu menetap di hatimu.<br><br>barakallah fi umrik, terima kasih sudah bertahan sampai sejauh ini.<br><br>- Wish all you the best";
    }
  } else {
    console.error('TypeIt library not loaded');
    document.getElementById('teks1').innerHTML = "Di hari ini, semesta seolah berbisik lembut, merayakan tanggal saat kamu pertama kali menyapa dunia.<br><br>Selamat ulang tahun untuk Sutanti, nama yang selalu membawa ketenangan di setiap sebutannya.<br><br>Di mataku, kamu adalah jiwa yang selalu mempesona, si Cantik yang kehadirannya luar biasa.<br><br>Terima kasih telah menjadi alasan di balik senyumku dan warna di setiap hariku yang sempat abu-abu.<br><br>Semoga setahun ke depan, semesta menjagamu dengan pelukan yang paling hangat, menghujanimu dengan tawa, dan menjauhkanmu dari segala lara.<br><br>Tetaplah bersinar dengan caramu sendiri, Cantik... Semoga bahagia selalu menetap di hatimu.<br><br>barakallah fi umrik, terima kasih sudah bertahan sampai sejauh ini.<br><br>- Wish all you the best";
  }
}

function initTypeItTrims() {
  if (typeof TypeIt !== 'undefined') {
    try {
      typeItInstances.trims = new TypeIt("#trims", {
        strings: ["I Love You.&#129505;"],
        startDelay: 2000,
        speed: 150,
        loop: false,
        waitUntilVisible: true,
      }).go();
    } catch (e) {
      console.error('TypeIt trims error:', e);
      document.getElementById('trims').innerHTML = "I Love You.&#129505;";
    }
  } else {
    document.getElementById('trims').innerHTML = "I Love You.&#129505;";
  }
}

// Panggil TypeIt initialization setelah window load
window.addEventListener('load', function() {
  // Tunggu sebentar untuk memastikan semua library loaded
  setTimeout(function() {
    // Pre-initialize semua TypeIt instances tapi jangan go() dulu
    if (typeof TypeIt !== 'undefined') {
      console.log('TypeIt library loaded successfully');
    } else {
      console.error('TypeIt library failed to load');
    }
  }, 500);
});

'use strict';

var onlyOnKonami = false;

function confetti() {
  // Globals
  var $window = $(window),
    random = Math.random,
    cos = Math.cos,
    sin = Math.sin,
    PI = Math.PI,
    PI2 = PI * 2,
    timer = undefined,
    frame = undefined,
    confetti = [];

  var runFor = 2000
  var isRunning = true

  setTimeout(() => {
    isRunning = false
  }, runFor);

  // Settings
  var konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
    pointer = 0;

  var particles = 150,
    spread = 20,
    sizeMin = 5,
    sizeMax = 12 - sizeMin,
    eccentricity = 10,
    deviation = 100,
    dxThetaMin = -.1,
    dxThetaMax = -dxThetaMin - dxThetaMin,
    dyMin = .13,
    dyMax = .18,
    dThetaMin = .4,
    dThetaMax = .7 - dThetaMin;

  var colorThemes = [
    function () {
      return color(200 * random() | 0, 200 * random() | 0, 200 * random() | 0);
    },
    function () {
      var black = 200 * random() | 0;
      return color(200, black, black);
    },
    function () {
      var black = 200 * random() | 0;
      return color(black, 200, black);
    },
    function () {
      var black = 200 * random() | 0;
      return color(black, black, 200);
    },
    function () {
      return color(200, 100, 200 * random() | 0);
    },
    function () {
      return color(200 * random() | 0, 200, 200);
    },
    function () {
      var black = 256 * random() | 0;
      return color(black, black, black);
    },
    function () {
      return colorThemes[random() < .5 ? 1 : 2]();
    },
    function () {
      return colorThemes[random() < .5 ? 3 : 5]();
    },
    function () {
      return colorThemes[random() < .5 ? 2 : 4]();
    }
  ];

  function color(r, g, b) {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  function interpolation(a, b, t) {
    return (1 - cos(PI * t)) / 2 * (b - a) + a;
  }

  var radius = 1 / eccentricity,
    radius2 = radius + radius;

  function createPoisson() {
    var domain = [radius, 1 - radius],
      measure = 1 - radius2,
      spline = [0, 1];
    while (measure) {
      var dart = measure * random(),
        i, l, interval, a, b, c, d;

      for (i = 0, l = domain.length, measure = 0; i < l; i += 2) {
        a = domain[i], b = domain[i + 1], interval = b - a;
        if (dart < measure + interval) {
          spline.push(dart += a - measure);
          break;
        }
        measure += interval;
      }
      c = dart - radius, d = dart + radius;

      for (i = domain.length - 1; i > 0; i -= 2) {
        l = i - 1, a = domain[l], b = domain[i];
        if (a >= c && a < d)
          if (b > d) domain[l] = d;
          else domain.splice(l, 2);
        else if (a < c && b > c)
          if (b <= d) domain[i] = c;
          else domain.splice(i, 0, c, d);
      }

      for (i = 0, l = domain.length, measure = 0; i < l; i += 2)
        measure += domain[i + 1] - domain[i];
    }

    return spline.sort();
  }

  var container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '0';
  container.style.overflow = 'visible';
  container.style.zIndex = '9999';

  function Confetto(theme) {
    this.frame = 0;
    this.outer = document.createElement('div');
    this.inner = document.createElement('div');
    this.outer.appendChild(this.inner);

    var outerStyle = this.outer.style,
      innerStyle = this.inner.style;
    outerStyle.position = 'absolute';
    outerStyle.width = (sizeMin + sizeMax * random()) + 'px';
    outerStyle.height = (sizeMin + sizeMax * random()) + 'px';
    innerStyle.width = '100%';
    innerStyle.height = '100%';
    innerStyle.backgroundColor = theme();

    outerStyle.perspective = '50px';
    outerStyle.transform = 'rotate(' + (360 * random()) + 'deg)';
    this.axis = 'rotate3D(' +
      cos(360 * random()) + ',' +
      cos(360 * random()) + ',0,';
    this.theta = 360 * random();
    this.dTheta = dThetaMin + dThetaMax * random();
    innerStyle.transform = this.axis + this.theta + 'deg)';

    this.x = $window.width() * random();
    this.y = -deviation;
    this.dx = sin(dxThetaMin + dxThetaMax * random());
    this.dy = dyMin + dyMax * random();
    outerStyle.left = this.x + 'px';
    outerStyle.top = this.y + 'px';

    this.splineX = createPoisson();
    this.splineY = [];
    for (var i = 1, l = this.splineX.length - 1; i < l; ++i)
      this.splineY[i] = deviation * random();
    this.splineY[0] = this.splineY[l] = deviation * random();

    this.update = function (height, delta) {
      this.frame += delta;
      this.x += this.dx * delta;
      this.y += this.dy * delta;
      this.theta += this.dTheta * delta;

      var phi = this.frame % 7777 / 7777,
        i = 0,
        j = 1;
      while (phi >= this.splineX[j]) i = j++;
      var rho = interpolation(
        this.splineY[i],
        this.splineY[j],
        (phi - this.splineX[i]) / (this.splineX[j] - this.splineX[i])
      );
      phi *= PI2;

      outerStyle.left = this.x + rho * cos(phi) + 'px';
      outerStyle.top = this.y + rho * sin(phi) + 'px';
      innerStyle.transform = this.axis + this.theta + 'deg)';
      return this.y > height + deviation;
    };
  }

  function poof() {
    if (!frame) {
      document.body.appendChild(container);

      var theme = colorThemes[onlyOnKonami ? colorThemes.length * random() | 0 : 0],
        count = 0;

      (function addConfetto() {
        if (onlyOnKonami && ++count > particles)
          return timer = undefined;

        if (isRunning) {
          var confetto = new Confetto(theme);
          confetti.push(confetto);

          container.appendChild(confetto.outer);
          timer = setTimeout(addConfetto, spread * random());
        }
      })(0);

      var prev = undefined;
      requestAnimationFrame(function loop(timestamp) {
        var delta = prev ? timestamp - prev : 0;
        prev = timestamp;
        var height = $window.height();

        for (var i = confetti.length - 1; i >= 0; --i) {
          if (confetti[i].update(height, delta)) {
            container.removeChild(confetti[i].outer);
            confetti.splice(i, 1);
          }
        }

        if (timer || confetti.length)
          return frame = requestAnimationFrame(loop);

        document.body.removeChild(container);
        frame = undefined;
      });
    }
  }

  $window.keydown(function (event) {
    pointer = konami[pointer] === event.which ?
      pointer + 1 :
      +(event.which === konami[0]);
    if (pointer === konami.length) {
      pointer = 0;
      poof();
    }
  });

  if (!onlyOnKonami) poof();
}
