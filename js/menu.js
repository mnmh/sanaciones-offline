gsap.registerPlugin(ScrollTrigger, Draggable);

// carga https://feathericons.com
feather.replace();

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  gsap.to(caminos, { x: 0, y: 0, left: i => pos[i].left, top: i => pos[i].top, duration: 0.5, ease: "power2.inOut" });
});
/* function resizeWindow() {
  ulWidth = document.querySelector("#menu ul").clientWidth;
  ulheight = document.querySelector("#menu ul").clientHeight;
  console.log(ulWidth);
  console.log(ulheight);
}
window.onresize = resizeWindow; */

const menuButton = document.querySelector("#menu-toggle");
const menu = document.querySelector("#menu");
const ulMenu = document.querySelector("#menu ul");
const backImgBox = document.querySelector("#menu #backImg");
const leadsBox = document.querySelector("#descripciones");
const caminos = Array.from(document.querySelectorAll("#menu ul li"));
const caminosLink = Array.from(document.querySelectorAll("#menu li a"));
let backDivs = [];
let descripciones = [];
let vel = [-1, -2, -3, -4, 1, 2, 3, 4, 5, 6, 7, 8];
let pos = [];
function posRandom() {
  pos = [
    { left: "random(14, 40, 1)" + "%", top: "random(18, 36, 1)" + "%" },
    { left: "random(65, 90, 1)" + "%", top: "random(14, 41, 1)" + "%" },
    { left: "random(40, 60, 1)" + "%", top: "random(40, 70, 1)" + "%" },
    { left: "random(15, 30, 1)" + "%", top: "random(68, 90, 1)" + "%" },
    { left: "random(68, 84, 1)" + "%", top: "random(68, 94, 1)" + "%" }
  ];
}
let dir = [
  { clase: "izq1", dirSi: "-=", dirNo: "+=" },
  { clase: "der1", dirSi: "+=", dirNo: "-=" },
  { clase: "izq2", dirSi: "-=", dirNo: "+=" },
  { clase: "der2", dirSi: "+=", dirNo: "-=" },
  { clase: "izq3", dirSi: "-=", dirNo: "+=" },
  { clase: "der3", dirSi: "+=", dirNo: "-=" },
  { clase: "izq1", dirSi: "-=", dirNo: "+=" },
  { clase: "der1", dirSi: "+=", dirNo: "-=" },
  { clase: "izq2", dirSi: "-=", dirNo: "+=" },
  { clase: "der2", dirSi: "+=", dirNo: "-=" }
];

for(let i = 0; i < 5; i++){
  let backDiv = document.createElement("div");
  backImgBox.appendChild(backDiv);
  backDivs.push(backDiv);
}

let ulWidth = ulMenu.clientWidth;
let ulHeight = ulMenu.clientHeight;
let toush = false;
let big = 0.05;
let lastBig = "";

if ("ontouchstart" in document.documentElement) {
  toush = true;
  big = 0.1;
} else {
  document.querySelector("body").classList.add("desk");
}

caminos.forEach(camino => {
  let arrow = document.createElement("div");
  arrow.ariaHidden = "true";
  arrow.classList.add("arrow");
  let arrowIcon = document.createElement("i");
  arrowIcon.ariaHidden = "true";
  arrowIcon.dataset.feather = "arrow-right";
  camino.querySelector(".name").appendChild(arrow);
  arrow.appendChild(arrowIcon);

  let trama = document.createElement("div");
  trama.ariaHidden = "true";
  trama.classList.add("trama");
  let span = document.createElement("span");
  camino.querySelector("a").appendChild(trama);
  trama.appendChild(span);

  let desc = camino.querySelector(".lead");
  let descripcion = document.createElement("div");
  descripcion.innerHTML = desc.innerHTML;
  leadsBox.appendChild(descripcion);
  descripciones.push(descripcion);
})
const names = Array.from(document.querySelectorAll("#menu .name"));
const arrows = Array.from(document.querySelectorAll("#menu .arrow .feather"));
const caminoBox = Array.from(document.querySelectorAll("#menu .trama"));
const caminoImg = Array.from(document.querySelectorAll("#menu .trama span"));

caminos.forEach((camino, index) => {
  let over = false;
  let desc = camino.querySelector(".lead");
  let arrow = camino.querySelector(".arrow");
  let descripcion = descripciones[index];
  let backImg = backDivs[index];
  let backOthers = backDivs.filter(x => x !== backImg);
  let others = caminos.filter(y => y !== camino);
  let othersDesc = descripciones.filter(j => j !== descripcion);

  function caminoOver() {
    if (over == true) {
    } else {
      others.forEach(other => {
        gsap.set(other, { zIndex: 10 });
        gsap.to(other, { opacity: 0.2, duration: 0.5, ease: "power2.out" });
        if(other.tl.play()) {
          other.tl.reverse();
        }
      });
      gsap.set(camino, { zIndex: 20 })
      gsap.to(camino, { opacity: 1, duration: 0.5, ease: "power2.out" });
      //gsap.to(backOthers, { opacity: 0, duration: 0.1, ease: "power2.in" });
      camino.tl.play();
    }
  }
  camino.tl = gsap.timeline({
    paused: true,
    reversed: true,
    onStart: function () {
      over = true;
      camino.classList.add("hover");
      backImg.classList.add("active");
      backOthers.forEach(x => {
        x.classList.remove("active");
      })
    },
    onReverseComplete: function () {
      
    }
  })
    .addLabel("walk")
    .to(desc, { height: "auto", duration: 0.5, ease: "power1.inOut" }, "walk")
    .to(desc, { opacity: 1, duration: 0.3, ease: "power1.out", delay: 0.4 }, "walk")
    .to(arrow, { height: "5vh", autoAlpha: 1, duration: 0.5, ease: "power1.inOut" }, "walk")
    .to(camino, { scale: "+=0.05", duration: 0.5, ease: "power1.inOut" }, "walk")
    ;
  
  function caminoOut() {
    over = false;
    camino.classList.remove("hover");
    backImg.classList.remove("active");
    camino.tl.reverse();
  }
  
  Draggable.create(camino, {
    onClick: function () {
      if (over == true) {
        return true;
      } else {
        caminoOver(camino);
        e.preventDefault();
        return false; 
      }
    },
    onDragStart: function () {
      document.removeEventListener('mousemove', parall);
      caminoOver(camino);
    },
    onDrag: function () {
      document.removeEventListener('mousemove', parall);
    },
    onDragEnd: function () {
      dragPos(this);
    }
  });
  
  // listeners
  camino.addEventListener("mouseover", caminoOver.bind(camino));
  camino.addEventListener("mouseout", caminoOut);
  camino.addEventListener("touchstart", function (event) {
    if (over == true) {
    } else {
      gsap.to(othersDesc, { height: 0, opacity: 0, duration: 0.5, ease: "power2.out" });
      gsap.to(descripcion, { height: "auto", opacity: 1, duration: 0.5, ease: "power2.out" });
    }
  }, false);
})

gsap.set(caminos, { xPercent: -50, yPercent: -50 });
gsap.set(caminoBox, { scale: 0.4, transformOrigin: "50% 50%", opacity: 0 });

function menuParall() {
  gsap.utils.shuffle(vel);
  document.addEventListener("mousemove", parall);
  /* document.addEventListener("touchmove", parall); */
}
function parall(e) {
  caminos.forEach((layer, i) => {
    let x = (window.innerWidth - e.pageX * vel[i]) / 100;
    let y = (window.innerHeight - e.pageY * vel[i]) / 100;
    gsap.to(layer, { x: x, y: y, duration: 1, ease: "sine" })
  })
}
function menuClose() {
  document.removeEventListener("mousemove", parall);
  menuButton.ariaExpanded = "false";
  menu.ariaHidden = "true";
  caminoBox.forEach(x => { x.classList.add("paused"); });
  menu.classList.add("open");
}

function openMenu(open) {
  document.removeEventListener('mousemove', parall);
  posRandom();
  gsap.utils.shuffle(pos);
  gsap.utils.shuffle(dir);
  let scaleTime = gsap.utils.random(2, 2.5);
  caminoBox.forEach(x => { x.classList.add("paused"); });
  if (open == true) {
    menuButton.ariaExpanded = "true";
    menu.ariaHidden = "false";
    menu.classList.add("open");
    gsap.set(caminos, { x: 0, y: 0, left: "random(20, 80, 10)" + "%", top: "random(0, 100, 10)" + "%", scale: 1 });
  }
  gsap.timeline()
    .to(caminoBox, { scale: "-=0.03", rotation: i => dir[i].dirNo + "3", opacity: 1, duration: 0.8, ease: "power1.inOut" })
    .addLabel("walk")
    .to(caminos, { x: 0, y: 0, left: i => pos[i].left, top: i => pos[i].top, scale: 1, duration: scaleTime, ease: "power2.inOut", delay: 0.3 }, "walk")
    .to(names, { opacity: 1, duration: scaleTime, ease: "power2.inOut", delay: 0.9 }, "walk")
    .set(caminoImg, { className: i => dir[i].clase, delay: 1 }, "walk")
    .to(caminoBox, { scale: "random(0.95, 1.25)", duration: scaleTime, transformOrigin: "50% 50%", ease: "power2.inOut", delay: 0.3 }, "walk")
    .to(caminoBox, { rotation: i => dir[i].dirSi + "random(150, 200)", duration: "random(2.8, 3.8)", transformOrigin: "50% 50%", ease: "power2.inOut" }, "walk")
    .set(caminoBox, { className: "trama" })
    .call(menuParall)
    ;
}

function dragPos(who) {
  let Xpercent = String(Math.round(((who.x / ulWidth) * 100) + ((who.target.offsetLeft / ulWidth) * 100)) + "%");
  let Ypercent = String(Math.round(((who.y / ulHeight) * 100) + ((who.target.offsetTop / ulHeight) * 100)) + "%");
  gsap.timeline()
    .to(who.target, { x: 0, y: 0, left: Xpercent, top: Ypercent, duration: 0.5, ease: "power2.out" })
    .call(menuParall, null, "+=1")
    ;
};

/* function caminoOut() {
  gsap.to(descripciones, { height: 0, opacity: 0, duration: 0.5, ease: "power2.out" });
  gsap.to(backDivs, { opacity: 0, duration: 0.5, ease: "power2.out" });
  caminos.forEach(camino => {
    gsap.to(camino, { opacity: 1, duration: 0.5, ease: "power2.out" });
    if(camino.tl.play()) {
      camino.tl.reverse();
    }
  })
} */


document.querySelector(".menu-close").addEventListener("click", function () {
  menuClose();
});
document.querySelector("#menu-toggle").addEventListener("click", function () {
  openMenu(true);
});
document.querySelector(".menu-change").addEventListener("click", function () {
  openMenu(false);
});
document.querySelector(".menu-change").addEventListener("touchstart", function () {
  caminoOut();
});
document.querySelector("#backImg").addEventListener("touchstart", caminoOut);



/* for (i of caminos) {
  i.addEventListener("mouseover", function (event) {
    caminoOver(this);
  }, false);
  i.addEventListener("mouseout", function (event) {
    caminoOut(this);
  }, false);
} */







