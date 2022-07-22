gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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

const eventsAll = Array.from(document.querySelectorAll(".events li"));
const eventsDay = document.querySelectorAll(".eventDay");
const whereBox = document.querySelector("ul#filters-where");
const typeBox = document.querySelector("ul#filters-type");
const checkTodos = document.querySelector("#alls");
const calendarBox = document.querySelector("#eventos");
const filterBox = document.querySelector("#filters");
const iFilter = document.querySelector("#iFilter");
let whereList = [];
let typeList = [];
let typeShow = [];
let classType = [];
//let posOff = eventsDay[eventsDay.length - 1];
let eventsShow;
let checks;
let now = new Date();
const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
let colorsType = ["type0", "type1", "type2", "type3", "type4", "type5", "type6", "type7", "type8"];
gsap.utils.shuffle(colorsType);

eventsAll.forEach(evento => {
  gsap.set(evento, { maxWidth: "random(60, 75, 1)" + "%" })
  let typesTemp = evento.dataset.type;
  typesTemp = typesTemp.split(" ");
  typesTemp.forEach(tipo => {
    classType.push(tipo);
  })
})
classType = classType.filter((t, j) => { return classType.indexOf(t) === j; });
gsap.utils.shuffle(classType);

eventsAll.forEach((evento, index1) => {
  let types = evento.dataset.type;
  types = types.split(" ");
  let typeDiv = evento.querySelector(".type");
  types.forEach((x, index2) => {
    let span = document.createElement("span");
    span.dataset.popoverTarget = String("#popo-" + index1 + index2);
    span.classList.add("popo");
    span.classList.add(colorsType[classType.indexOf(x)]);
    let div = document.createElement("div");
    div.id = String("popo-" + index1 + index2);
    div.innerHTML = x;
    typeDiv.appendChild(span);
    span.appendChild(div);
  })
  let iWhere = document.createElement("i");
  iWhere.ariaHidden = "true";
  iWhere.dataset.feather = "map-pin";
  iWhere.classList.add("pinF");
  let iCheck = document.createElement("i");
  iCheck.ariaHidden = "true";
  iCheck.dataset.feather = "check";
  iCheck.classList.add("checkF");
  evento.querySelector(".where span").prepend(iWhere);
  evento.querySelector(".where span").appendChild(iCheck);
  gsap.set(iCheck, { scale: 3, right: "random(10, 70)" + "px", y: "random(-20, 5)" + "px", rotation: "random(-5, 7)" });
    
  let eventoDate = new Date(evento.getAttribute("datetime"));
  eventoDate.toUTCString();
  if (eventoDate < now) {
    evento.classList.add("past");
    evento.querySelector(".add").style.display = "none";
    let finalizado = document.createElement("span");
    finalizado.classList.add("finalizado");
    finalizado.innerHTML = "Finalizado";
    evento.prepend(finalizado);
  }
})
eventsDay.forEach((day, index) => {
  let fechaBox = day.querySelector("h3 time");
  let fecha = new Date(fechaBox.getAttribute("datetime"));
  fecha = Array.from([days[fecha.getDay()], ("0" + fecha.getDate()).slice(-2), months[fecha.getMonth()]]);
  let span0 = document.createElement("span");
  span0.innerHTML = fecha[0];
  let span1 = document.createElement("span");
  span1.innerHTML = fecha[1];
  let span2 = document.createElement("span");
  span2.innerHTML = fecha[2];
  fechaBox.appendChild(span0);
  fechaBox.appendChild(span1);
  fechaBox.appendChild(span2);
  let repeat = document.createElement("span");
  repeat.ariaHidden = "true";
  repeat.classList.add("repeater");
  day.appendChild(repeat);
  //
  let dayEvents = Array.from(day.querySelectorAll("ul.events li"));
  let eventsPast = dayEvents.filter(x => x.classList.contains("past"));
  if (dayEvents.length === eventsPast.length) {
    day.classList.add("past");
  }
})

eventsDay[eventsDay.length - 1].querySelector(".repeater").style.display = "none";
let events = eventsAll.filter(x => !x.classList.contains("past"));
let eventsHide = eventsAll.filter(x => x.classList.contains("past"));
if (eventsAll.length === eventsHide.length) {
  events = eventsHide;
} else {
  gsap.set(eventsHide, { display: "none" });
}
eventsShow = events;
gsap.set(eventsShow, { height: "auto", overflowY: "visible" });
gsap.to(eventsShow, { opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.8 });
let posOff = eventsShow[eventsShow.length - 1].closest(".eventDay");

function createLi(donde, nombre, group) {
  let li = document.createElement("li");
  let label = document.createElement("label");
  label.classList.add(colorsType[classType.indexOf(nombre)]);
  let span = document.createElement("span");
  span.classList.add("fBorder");
  let iX = document.createElement("i");
  iX.ariaHidden = "true";
  iX.classList.add("fClose");
  iX.dataset.feather = "x";
  let iPlus = document.createElement("i");
  iPlus.ariaHidden = "true";
  iPlus.classList.add("fPlus");
  iPlus.dataset.feather = "plus";
  label.htmlFor = nombre;
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = nombre;
  checkbox.name = group;
  checkbox.value = nombre;
  donde.appendChild(li);
  li.appendChild(checkbox);
  li.appendChild(label);
  label.appendChild(span);
  label.appendChild(iPlus);
  label.appendChild(iX);
  label.appendChild(document.createTextNode(nombre));
  checkbox.addEventListener("change", function () {
    clickCheck(this);
  });
  feather.replace();
}

function createTypes(tipo) {
  typeBox.innerHTML = "";
  tipo.forEach(x => {
    let a = x.dataset.type;
    a = a.split(" ");
    a.forEach(y => { typeList.push(y); });
  })
  typeList = typeList.filter((t, j) => { return typeList.indexOf(t) === j; });
  typeList.forEach(z => { createLi(typeBox, z, "type"); });
}

// Create filters
if (events.length >= 2) {
  checkTodos.disabled = true;
  checkTodos.checked = true;
  //checkTodos.closest("label").style.display = "inline";
  checkTodos.addEventListener("change", function () {
    whereChecks.forEach(un => {
      un.checked = false;
    });
    checkTodos.disabled = true;
    refreshTypes();
  });
  events.forEach(evento => {
    whereList.push(evento.dataset.where);
    if (evento.hasAttribute("data-stream")) {
      whereList.push("virtual");
    }
  })
  whereList = whereList.filter((w, i) => {
    return whereList.indexOf(w) === i;
  });
  let vacio = whereList.indexOf("");
  while (vacio > -1) {
    whereList.splice(vacio, 1);
    vacio = whereList.indexOf("");
  }
  whereList.push(whereList.splice(whereList.indexOf("virtual"), 1)[0]);
  whereList.forEach(where => {
    createLi(whereBox, where,  "where");
  })
  if (whereList.length <= 1) {
    whereBox.style.display = "none";
  }
  createTypes(events);
  const whereChecks = whereBox.querySelectorAll("input");
} else {
  document.querySelector("#filters").style.display = "none";
}
//

function refreshTypes() {
  eventsShow = [];
  typeList = [];
  whereList = Array.from(whereBox.querySelectorAll("input:checked")).map(x => x.id);
  if (whereList.length === 0) {
    iFilter.classList.remove("fill");
    checkTodos.disabled = true;
    checkTodos.checked = true;
    eventsShow = Array.from(events);
  } else {
    iFilter.classList.add("fill");
    events.forEach(evento => {
      whereList.forEach(wher => {
        if (evento.dataset.where == wher || evento.dataset.stream == wher) {
          eventsShow.push(evento);
        }
      })
    })
    eventsShow = eventsShow.filter((w, i) => {
      return eventsShow.indexOf(w) === i;
    });
  }
  createTypes(eventsShow);
  showEvents(eventsShow);
}

// Crea los listeners dde los filtros
function clickCheck(check) {
  //console.log("check " + check.id);
  if (checkTodos.checked == true) {
    iFilter.classList.remove("fill");
    checkTodos.disabled = false;
    checkTodos.checked = false;
  }
  if (check.name === "where") {
    refreshTypes();
  } else {
    if (check.name === "type") {
      let tChecked = Array.from(typeBox.querySelectorAll("input:checked")).map(x => x.id);
      if (tChecked.length === 0) {
        let whereTemp = whereBox.querySelectorAll("input:checked");
        if (whereTemp.length === 0) {
          checkTodos.disabled = true;
          checkTodos.checked = true;
          iFilter.classList.remove("fill");
        }
        showEvents(eventsShow);
      } else {
        iFilter.classList.add("fill");
        check.closest("li").querySelector("label").style.backgroundColor = colorsType[classType.indexOf(check.id)];
        typeShow = [];
        eventsShow.forEach(show => {
          let typeTemp = show.dataset.type;
          typeTemp = typeTemp.split(" ");
          tChecked.forEach(check => {
            if (typeTemp.includes(check)) {
              typeShow.push(show);
            }
          })
        })
        typeShow = typeShow.filter((w, i) => {
          return typeShow.indexOf(w) === i;
        });
        showEvents(typeShow);
      }
    }
  }
}

// Muestra los eventos de acuerdo al filtro selecionado y oculta los demas
function showEvents(toShow) {
  posOff = toShow[toShow.length - 1].closest(".eventDay");
  let others = events.filter(x => !toShow.includes(x));
  let parentsShow = [];
  let parentsHide = [];
  if (others.length >= 1) {
    gsap.to(others, { opacity: 0, duration: 0.3, ease: "power2.out" });
    gsap.to(others, { height: 0, onComplete: function () { gsap.set(others, { overflowY: "hidden" }); }, duration: 0.6, delay: 0.1 });
    others.forEach(otro => {
      otro.dataset.hide = "hide";
      parentsHide.push(otro.closest(".eventDay"));
    })
  }
  toShow.forEach(show => {
    show.dataset.hide = "visible";
    parentsShow.push(show.closest(".eventDay"));
  })
  parentsShow = parentsShow.filter((w, i) => {
    return parentsShow.indexOf(w) === i;
  });
  parentsHide = parentsHide.filter((w, i) => {
    return parentsHide.indexOf(w) === i;
  });
  parentsHide = parentsHide.filter(val => !parentsShow.includes(val));
  if (parentsHide.length >= 1) {
    //gsap.to(parentsHide, { opacity: 0.4, duration: 0.6, ease: "power2.out" });
    parentsHide.forEach(padre => {
      padre.classList.add("hide");
    })
  }
  parentsShow.forEach(padre => {
    padre.classList.remove("hide");
  })
  gsap.to(toShow, { height: "auto", onComplete: function () { gsap.set(toShow, { overflowY: "visible" }); }, duration: 0.6, onComplete: function () { ScrollTrigger.refresh(); }, ease: "power2.out" });
  gsap.to(toShow, { opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.3 });
  gsap.to(window, { duration: 1, scrollTo: { y: parentsShow[0], offsetY: filterBox.offsetHeight + 18 }, ease: "power2.inOut", delay: 0.6 });
}

// Inicia el popOver de los tipos de eventos


// sticky filters
ScrollTrigger.create({
  //markers: true,
  trigger: "#filters",
  pin: true,
  start: "top top",
  //end: () => `+=${calendarBox.offsetHeight - (filterBox.offsetHeight + posOff.offsetHeight)}`,
  endTrigger: () => posOff,
  end:() => `top +=${filterBox.offsetHeight + 18}`,
  pinSpacing: false
});

PopoverComponent.init({
  ele: '.popo',
  position: 'top',
  margin: 10,
  //hideArrowIcon: true,
  //showOnHover: true
});
