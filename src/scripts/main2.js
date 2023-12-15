// Criamos uma variavel que dentro dele iremos colocas objetos.
var state = {
     // Esse objetos iram fazer o gerenciamento de estados globais.
    // view altera os elemnetos visuais da tela.
    view: {
          //vai capitura a classe enime o ALL poque temos mais de uma classe.
      squares: document.querySelectorAll(".square"),
          // vamos capitura a classe enemy que sera a do personagem que tem a imagem.
      enemy: document.querySelector(".enemy"),
         // Capiturandoo o id Time-left
      timeLeft: document.querySelector("#time-left"),
         // Capiturando o id score
      score: document.querySelector("#score"),
          // Capiturando o id life
      life: document.querySelector("#life"),
    },
    //Esse objeto tem contem os valores de configurações. ex:do tempo de movimneto.
    values: {
        gameVelocity: 1000, // Tempo de movimento 
        hitPosition: 0, // posição  inicia em 0 
        result: 0, // Ponto de click inicia em zero
        curretTime: 60, // o tempo inicia em 60 segunddos
        life:3, // a vida começa com 3
      },
       // Fazem as ações de reiniciar o app. 
    actions: {
      timerId: null,
      countDownTimerId: null,
    },
  };
  
  function countDown() {
    state.values.currentTime--;//Diminui o tempo 
    state.view.timeLeft.textContent = state.values.currentTime;
    
    if (state.values.currentTime <= 0) {
      clearInterval(state.actions.countDownTimerId);
      clearInterval(state.actions.timerId);
       // Se o temopo chegar a 0 
      if (state.values.result === 0) {
        alert("Game Over! Você não marcou pontos.");
      } else {
        alert("Game Over! Seu resultado foi: " + state.values.result);
      }
    }
  }
   // Tocando a musica quando ouver um click no class que tem enemy
  function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
  }
   // Essa função remove  
  function randomSquare() {
     //De inicio vai remove onde o inimigo vai ficar.
    state.view.squares.forEach((square) => {
      square.classList.remove("enemy");
    });
    // Essa variavel vai adicionar em lugares aleatorios para onde o inimigo vai 
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
  }
   // Essa função fica esprando uma ação 
  function addListenerHitBox() {
    state.view.squares.forEach((square) => {
      square.addEventListener("mousedown", () => {
        // Se usuario clicar onde o enemy tiver vai somar mais um ao result
        if (square.id === state.values.hitPosition) {
          state.values.result++;
          state.view.score.textContent = state.values.result;
           // voltamos a posição dele para nulo para que não fique espamando tempo.
          state.values.hitPosition = null;
          // Chama a função playsoud quando você clicar no inimigo
          playSound("hit");
        }
      });
    });
  }
  // Função que vai inicializar
  function initialize() {
    addListenerHitBox();
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
  }
   // Chamando a função que vai inicializar as funciomalidade.  
  initialize();
