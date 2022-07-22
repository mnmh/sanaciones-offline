function calculateTotalValue(length) {
  var minutes = Math.floor(length / 60),
    seconds_int = length - minutes * 60,
    seconds_str = seconds_int.toString(),
    seconds = seconds_str.substr(0, 2),
    time = minutes + ':' + seconds

  return time;
}

function calculateCurrentValue(currentTime) {
  var current_hour = parseInt(currentTime / 3600) % 24,
    current_minute = parseInt(currentTime / 60) % 60,
    current_seconds_long = currentTime % 60,
    current_seconds = current_seconds_long.toFixed(),
    current_time = (current_minute < 10 ? "0" + current_minute : current_minute) + ":" + (current_seconds < 10 ? "0" + current_seconds : current_seconds);

  return current_time;
}

function initProgressBar() {


  var elemento = document.getElementsByClassName('audio-player')
  for (let index = 0; index < elemento.length; index++) {
    let botonReproducir = elemento[index].getElementsByClassName("btn-reproducir")[0]
    var player = elemento[index].getElementsByClassName("reproductor-class")[0]
    var length = player.duration
    var current_time = player.currentTime;
    let time = current_time / length
    if (current_time !== 0) {
      var progressbar = elemento[index].getElementsByClassName("seekObj")[0];
      if (progressbar) {
        progressbar.setAttribute("value", time)
        if (player.currentTime == player.duration) {
          botonReproducir.classList.remove("pause")
        }
      }
    }
    // Desabilidado porque el nivel de carga se x2 por cada click
    function seek(evt) {
      var percent = evt.offsetX / this.offsetWidth;
      player.currentTime = percent * player.duration;
      progressbar.value = percent / 100;
    }
  }
};

function initPlayers(num) {
  // pass num in if there are multiple audio players e.g 'player' + i
  for (var i = 0; i < num; i++) {
    (function () {
      // Variables

      let isPlaying = []
      // ----------------------------------------------------------
      // audio embed object
      var elemento = document.getElementsByClassName('audio-player')
      for (let index = 0; index < elemento.length; index++) {
        let botonReproducir = elemento[index].getElementsByClassName("btn-reproducir")
        let reproductor = elemento[index].getElementsByClassName("reproductor-class")
        if (botonReproducir[0]) {
          botonReproducir[0].addEventListener('click', () => {
            isPlaying[index] = false
            togglePlay({ botonReproducir, index, reproductor })
          })
        }

      }

      // Controls & Sounds Methods
      // ----------------------------------------------------------
      function togglePlay({ botonReproducir, index, reproductor }) {
        var elemento = document.getElementsByClassName('audio-player')

        for (let i = 0; i < elemento.length; i++) {
          let botonReproducir1 = elemento[i].getElementsByClassName("btn-reproducir")
          let reproductor1 = elemento[i].getElementsByClassName("reproductor-class")

          if (botonReproducir1[0] !== botonReproducir[0]) {
            reproductor1[0].pause();
            isPlaying[index] = false;
            botonReproducir1[0].classList.remove("pause")
          }
        }

        var bodyRect = document.body.getBoundingClientRect();
        var elemRect = botonReproducir[0].getBoundingClientRect();
        let offset = elemRect.top - bodyRect.top;


        window.onscroll = function () {
          if (window.scrollY+100 !== offset) {
            reproductor[0].pause();
            isPlaying[index] = false;
            botonReproducir[0].classList.remove("pause")
          }
        };
        if (reproductor[0].paused === false) {
          reproductor[0].pause();
          isPlaying[index] = false;
          botonReproducir[0].classList.remove("pause")

        } else {
          reproductor[0].play();
          botonReproducir[0].classList.add("pause")
          isPlaying[index] = true;
        }
      }
    }());
  }
}

initPlayers(jQuery('#player-container').length);