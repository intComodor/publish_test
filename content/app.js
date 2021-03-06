var aa = false;
function end() {
  aa = true;
  console.log("wsh")
  var h_cv = document.getElementById('cv').offsetHeight;
      var h_jeu = document.getElementById('ss').offsetHeight;
      document.getElementById('progress_bar').style.top = `${h_jeu + ((h_cv/2)-(h_jeu/2)) + 15}px`;
      
      var w_jeu = document.getElementById('progress_bar').offsetWidth;
      var left_pbar = (window.innerWidth/2) - (w_jeu/2);
      document.getElementById('progress_bar').style.right = `${left_pbar}px`;
}

function resize() {
  var w_dispo = window.innerWidth;
  var h_dispo = window.innerHeight;

  var cv_w = w_dispo - (w_dispo*0.1);
  var cv_h = cv_w * (30/21);

  while (cv_h > (h_dispo - 27)*0.9) {
      cv_w -= 1;
      cv_h = cv_w * (30/21);
  } 

  if (w_dispo < 800) {
      document.getElementById('cv').style.height = `${cv_h}px`
      document.getElementById('cv').style.width = `${cv_w}px`
      document.getElementById('cv').style.marginTop = `${(h_dispo - cv_h - 60)/2}px`
      
  }

  /**************** */
  if (window.innerWidth <= 800) {
      var h_cv = document.getElementById('cv').offsetHeight;
      var h_jeu = document.getElementById('ss').offsetHeight;
      document.getElementById('progress_bar').style.top = `${h_jeu + ((h_cv/2)-(h_jeu/2)) + 15}px`;
      var w_jeu = document.getElementById('ss').offsetWidth;
      var left_pbar = (w_dispo/2) - (w_jeu/2);
      document.getElementById('progress_bar').style.right = `${left_pbar}px`;
      

      document.getElementById('jeu').style.top = `${(h_cv/2) - (h_jeu/2)}px`;
      document.getElementById('jeu').style.left = `${(window.innerWidth/2) - (h_jeu/2)}px`;
  }
}

window.onload = function () {
  var w_dispo = window.innerWidth;
  var h_dispo = window.innerHeight;

  var cv_w = w_dispo - (w_dispo*0.1);
  var cv_h = cv_w * (30/21);

  while (cv_h > (h_dispo - 27)*0.9) {
      cv_w -= 1;
      cv_h = cv_w * (30/21);
  } 

  if (w_dispo < 800) {
      document.getElementById('cv').style.height = `${cv_h}px`
      document.getElementById('cv').style.width = `${cv_w}px`
      document.getElementById('cv').style.marginTop = `${(h_dispo - cv_h - 60)/2}px`
      
  }

  /**************** */
  if (window.innerWidth <= 800) {
      var h_cv = document.getElementById('cv').offsetHeight;
      var h_jeu = document.getElementById('ss').offsetHeight;
      document.getElementById('progress_bar').style.top = `${h_jeu + ((h_cv/2)-(h_jeu/2)) + 15}px`;
      document.getElementById('jeu').style.top = `${(h_cv/2) - (h_jeu/2)}px`;
      document.getElementById('jeu').style.left = `${(window.innerWidth/2) - (h_jeu/2)}px`;
  }
  
  window.addEventListener("resize", function(event) {
      var w_dispo = window.innerWidth;
      var h_dispo = window.innerHeight;
  
      var cv_w = w_dispo - (w_dispo*0.1);
      var cv_h = cv_w * (30/21);

      while (cv_h > (h_dispo - 27)*0.9) {
          cv_w -= 1;
          cv_h = cv_w * (30/21);
      } 
  
      if (w_dispo < 800) {
          document.getElementById('cv').style.height = `${cv_h}px`
          document.getElementById('cv').style.width = `${cv_w}px`
          document.getElementById('cv').style.marginTop = `${(h_dispo - cv_h - 60)/2}px`   
      }
      else {
          document.getElementById('cv').style.height = 'unset'
          document.getElementById('cv').style.width = 'unset'
          document.getElementById('cv').style.marginTop = 'unset'
      }
  })   
}

var smallScreen;
if (window.innerWidth > 800)
  smallScreen = false;
else 
  smallScreen = true;

var initialX = null;
var initialY = null;
if (window.innerWidth > 800)
  var eg = document.getElementById("root").offsetWidth / 2;
else 
  var eg = document.getElementById("root").offsetWidth;

let start = false;
let score = 0;
var nb_game = 0;
var win = false;
const UNVEIL_DIV = [
  'cv_pp',
  'cv_name',
  'cv_contacts',
  'cv_location',
  'cv_search',
  'cv_pace',
  'cv_formation',
  'cv_xp_pro',
  'skills'];

var CANVAS_SIZE = [eg*0.8, eg*0.8];
const SNAKE_START = [
  [6, 5],
  [6, 6]
];
const APPLE_START = [0, 0];
var SCALE = (eg*0.8)/10;
var SPEED = 200;
const DIRECTIONS = {
  38: [0, -1],  // up
  40: [0, 1],   // down
  37: [-1, 0],  // left
  39: [1, 0]    // right
};

window.addEventListener("resize", function(event) {
  if (window.innerWidth > 800)
    smallScreen = false;
  else 
    smallScreen = true;
  
  if (window.innerWidth > 800)
    if (document.getElementById('ss') && document.getElementById('ss').style.display == 'none')
      document.getElementById('ss').style.display = 'unset';

  if (window.innerWidth > 800) {
    if (window.offsetWidth > 800)
      eg = document.getElementById("root").offsetWidth / 2;
    else 
      eg = document.getElementById("root").offsetWidth;
    eg = document.getElementById("root").offsetWidth / 2;
    CANVAS_SIZE[0] = eg*0.8;
    CANVAS_SIZE[1] = eg*0.8;
    SCALE = (eg*0.8)/10;
    this.document.getElementById('ss').style.height = `${CANVAS_SIZE[1]}px`;
    this.document.getElementById('ss').style.width = `${CANVAS_SIZE[0]}px`;
    var e = document.getElementById("root").offsetHeight / 2;
    e -= CANVAS_SIZE[1]/2;
    e -= 20;
    
    this.document.getElementById('progress_bar').style.top = 'unset';
    this.document.getElementById('progress_bar').style.bottom = `${e}px`;
    this.document.getElementById('progress_bar').style.width = `${CANVAS_SIZE[0]}px`;
    if (this.document.getElementById('score_text'))
      this.document.getElementById('score_text').style.top = `${e - 150}px`;
  }
  else {
    var h_cv = this.document.getElementById('cv').offsetHeight;
    var h_jeu = this.document.getElementById('ss').offsetHeight;
    this.document.getElementById('progress_bar').style.top = `${h_jeu + ((h_cv/2)-(h_jeu/2)) + 15}px`;
    this.document.getElementById('jeu').style.top = `${(h_cv/2) - (h_jeu/2)}px`;
    this.document.getElementById('jeu').style.left = `${(this.window.innerWidth/2) - (h_jeu/2)}px`;

    eg = document.getElementById("root").offsetWidth;
    CANVAS_SIZE[0] = eg*0.8;
    CANVAS_SIZE[1] = eg*0.8;
    SCALE = (eg*0.8)/10;
    this.document.getElementById('ss').style.height = `${CANVAS_SIZE[1]}px`;
    this.document.getElementById('ss').style.width = `${CANVAS_SIZE[0]}px`;
    this.document.getElementById('progress_bar').style.width = `${CANVAS_SIZE[0]}px`;
  }
})


const tab = [1, 2];
let a = tab.map(title =>
  <div key={title}></div>
);


const SCORE_TEXT = [
  'Ma photo',
  'Mon nom',
  'Mes contacts',
  'Ma disponnibilit?? g??ographique',
  'Ce que je recherche',
  'Mon rythme d\'alternance',
  'Mes formations',
  'Mes experiences professionnelles',
  'Mes comp??tences'
];


function useInterval(callback, delay) {
  const savedCallback = React.useRef();

  // Remember the latest callback.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const App = () => {
  const canvasRef = React.useRef();
  const [snake, setSnake] = React.useState(SNAKE_START);
  const [apple, setApple] = React.useState(APPLE_START);
  const [dir, setDir] = React.useState([0, -1]);
  const [speed, setSpeed] = React.useState(null);
  const [gameOver, setGameOver] = React.useState(false);

  useInterval(() => gameLoop(), speed);

  /**
   * FIN PARTIE
   */
  const endGame = () => {
    setSpeed(null);
    setGameOver(true);
    document.getElementById("btn").style.display = 'unset';
    document.getElementById("ss").style.filter = 'blur(3px)';
    if (score >= 9)
      win = true;
    start = false;

    if (window.innerWidth <= 800) {
      var h_cv = document.getElementById('cv').offsetHeight;
      var h_jeu = document.getElementById('ss').offsetHeight;
      document.getElementById('progress_bar').style.top = `${h_jeu + ((h_cv/2)-(h_jeu/2)) + 15}px`;
      
      var w_jeu = document.getElementById('progress_bar').offsetWidth;
      var left_pbar = (window.innerWidth/2) - (w_jeu/2);
      document.getElementById('progress_bar').style.right = `${left_pbar}px`;
    }
  };

  /**
   * DEPLACEMENT 
   */
  const moveSnake = ({ keyCode }) =>
    keyCode >= 37 && keyCode <= 40 && setDir(DIRECTIONS[keyCode]);

  /**
   * APP POMME
   */
  const createApple = () =>
    apple.map((_a, i) => Math.floor(Math.random() * (CANVAS_SIZE[i] / SCALE)));

  /**
   * COLLISSION
   */
  const checkCollision = (piece, snk = snake) => {
    if (
      piece[0] * SCALE >= CANVAS_SIZE[0] ||
      piece[0] < 0 ||
      piece[1] * SCALE >= CANVAS_SIZE[1] ||
      piece[1] < 0
    )
      return true;

    for (const segment of snk) {
      if (piece[0] === segment[0] && piece[1] === segment[1]) 
        return true;
    }
    return false;
  };

  /**
   * MANGER
   */
  const checkAppleCollision = newSnake => {
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple = createApple();
      while (checkCollision(newApple, newSnake)) {
        newApple = createApple();
      }
      setApple(newApple);
      score++;
      return true;
    }
    return false;
  };

  function startTouch(e) {    
    initialX = e.touches[0].clientX;    
    initialY = e.touches[0].clientY;  
  };     
  
  function moveTouch(e) {    
    if (initialX === null || initialY === null)      
      return;        
    
    var currentX = e.touches[0].clientX;    
    var currentY = e.touches[0].clientY;       
    var diffX = initialX - currentX;    
    var diffY = initialY - currentY;           
    
    if (Math.abs(diffX) > Math.abs(diffY)) {      
      if (diffX > 0)        
        setDir(DIRECTIONS[37])      
      else        
        setDir(DIRECTIONS[39])    
    }     
    else {      
      if (diffY > 0)        
        setDir(DIRECTIONS[38])       
      else        
        setDir(DIRECTIONS[40])    
    }       
    
    initialX = null;    
    initialY = null;         
    e.preventDefault();  
    
  };

  /**
   * BOUCLE JEU
   */
  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    snakeCopy.unshift(newSnakeHead);
    if (checkCollision(newSnakeHead)) endGame();
    if (!checkAppleCollision(snakeCopy)) snakeCopy.pop();
    setSnake(snakeCopy);

      if (score >= 1 && score <= 9)
        document.getElementById(UNVEIL_DIV[score - 1]).style.filter = "blur(0)";
      
      SPEED = 200 - (score * 5);
      setSpeed(SPEED);      
  };

  /**
   * DEBUT PARTIE
   */
  const startGame = () => {
    setSnake(SNAKE_START);
    setApple(APPLE_START);
    setDir([0, -1]);
    setSpeed(SPEED);
    setGameOver(false);
    nb_game++;
    score = 0;
    win = false;

    UNVEIL_DIV.forEach(e => {
      document.getElementById(e).style.filter = 'blur(4px)';
    });
    document.getElementById("ss").style.filter = 'blur(0)';
    document.getElementById("btn").style.display = 'none';
    document.getElementById("jeu").focus();

    document.getElementById('root').addEventListener("touchstart", startTouch, false);      
    document.getElementById('root').addEventListener("touchmove", moveTouch, false);

    start = true;


    if (window.innerWidth > 800) {
      var e = document.getElementById("root").offsetHeight / 2;
      e -= CANVAS_SIZE[1]/2;
      e -= 20;
      document.getElementById('progress_bar').style.bottom = `${e}px`;
      document.getElementById('progress_bar').style.width = `${CANVAS_SIZE[0]}px`;
      document.getElementById('progress_bar').style.display = 'unset';
    }
    else {
      var h_cv = document.getElementById('cv').offsetHeight;
      var h_jeu = document.getElementById('ss').offsetHeight;
      document.getElementById('progress_bar').style.top = `${h_jeu + ((h_cv/2)-(h_jeu/2)) + 15}px`;
      document.getElementById('progress_bar').style.width = `${CANVAS_SIZE[0]}px`;
      document.getElementById('progress_bar').style.display = 'unset';
    }
    aa = false;
  };

  const restartGame = () => {
    document.getElementById('btn1').style.display = 'none';
    if (document.getElementById('btn2'))
      document.getElementById('btn2').style.display = 'none';
    if (document.getElementById('btn3'))
    document.getElementById('btn3').style.display = 'none';
    document.getElementById('ss').style.display = 'unset';
    startGame();
  };

  if (window.innerWidth > 800 ) {
    var z = document.getElementById("root").offsetHeight / 2;
    z -= CANVAS_SIZE[1]/2;
    z -= 20;
    if (document.getElementById('score_text'))
    document.getElementById('score_text').style.top = `${z - 150}px`;
  }

  if ((win || (gameOver && !win)) && smallScreen) {
    document.getElementById('btn').style.display = 'none';
    document.getElementById('ss').style.display = 'none';
    //document.getElementById('win').style.display = 'none';
    //TODO regler affichage progress
  }


  /**
   * AFFICHAGE
   */
  React.useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    if (start) {
      context.fillStyle = "#72a9dc";
      snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
      var head_img = new Image();
      head_img.src = 'img/head.png';
        context.drawImage(head_img, apple[0] - 0.2, apple[1], 1.3, 1.3);
    }

  }, [snake, apple, gameOver]);

  return (
    <div>   
    <div className="main" id="main">
    {win && [...Array(13).keys()].map(i =><span className="confetti" key={i}></span>)}
    {smallScreen && gameOver && !aa && end()}
    {smallScreen && (win || (gameOver && !win)) && <button id="btn1" onClick={restartGame}>Rejouer</button>}
    {smallScreen && win && <button id="btn2"><a href="img/cv.pdf" target="_blank">Voir mon CV</a></button>}
    {smallScreen && (gameOver && !win) && <button id="btn3"><a href="img/cv.pdf" target="_blank">Tricher et voir mon CV</a></button>}
        <div className="left_side">
            <div id="game_area" className="game_area">
                <div id="jeu" className="jeu" role="button" tabIndex="0" onKeyDown={e => moveSnake(e)}>
                  <button id="btn" onClick={startGame}>{(nb_game < 1) ? 'Commencer' : 'Rejouer'}</button>
                  {!nb_game && <div id="rule">Bienvenue sur le SNAKARIM!<br/>Pour d??couvrir mon CV attrapez<br/>le plus de ??t??te de Karim??.<br/>Bonne chance!</div>}
                  {!smallScreen && gameOver && !win && <div id="loose">Perdu!<br/>Mauvais perdant?<br/>Vous pouvez consulter mon CV <a href="img/cv.pdf" target="_blank">ici</a><br/>ou retenter votre chance.</div>}
                  {!smallScreen && win && <div id="win">BRAVO !<br/>Vous pouvez consulter mon CV<br/><a href="img/cv.pdf" target="_blank">ici</a>.</div>}
                  <canvas
                    id="ss"
                    style={start && { border: "1px solid black", backgroundColor: "#72a9dc57"} || { backgroundColor: "#72a9dc"}}
                    ref={canvasRef}
                    width={`${CANVAS_SIZE[0]}px`}
                    height={`${CANVAS_SIZE[1]}px`}
                  />
                  <progress id="progress_bar" max="9" value={score} ></progress>
                  {score > 0 && score < 9 && <div key={score} id="score_text" >+{SCORE_TEXT[score-1]}</div>}
                  </div>
                  
            </div>
            
        </div>

        <div className="right_side">
        <div className="cv_area" tabIndex="0" id="cv" onLoad={resize}>
            <div className="cv_header">
                <div id="cv_pp" className="cv_pp" tabIndex="0"><img src="img/pp.png" alt="" id="pp"></img></div>
                <div id="cv_name" className="cv_name">BOUALI Karim</div>
            </div>
            <div className="cv_body">
                <div className="cv_side_infos">
                    <div id="cv_contacts" className="cv_contacts">
                        <ul>
                            <li>N?? le 9 d??cembre 1999</li>
                            <li>22 rue de Brant??me</li>
                            <li>67100 Strasbourg</li>
                            <li><a href="mailto:karim.bouali@outlook.fr">karim.bouali@outlook.fr</a></li>
                            <li>07 53 56 16 36</li>
                        </ul>
                    </div>
                    <div id="cv_location" className="cv_location"><p>Titulaire du permis B et v??hicul??. Je suis pr??t ?? me d??placer dans tout le Grand Est.</p></div>
                    <div id="cv_search" className="cv_search"><p>?? la recherche d???une alternance en informatique pour ao??t/septembre 2021 dans le cadre du master SIL.</p></div>
                    <div id="cv_pace" className="cv_pace">
                        <p>Rythme d'alternance:</p>
                        <ul>
                            <li>M1: 2 jours en formation et 3 jours en entreprise.</li>
                            <li>M2: 1 semaine en formation et 3 semaines en entreprise.</li>
                        </ul>
                    </div>
                </div>
                
                <div className="cv_main">
                    <div id="cv_formation" className="cv_formation">
                    <h2>Formations</h2>
                        <h3>Licence 3 Informatique (en cours)</h3>
                        <p><b>?? l'Universit?? de Strasbourg</b></p>
  
                        <h3>Formation DISRUPT 4.0 (en cours)</h3>
                        <p><b>?? l'Universit?? de Haute-Alsace</b>, en parall??le de la licence.</p>
                        <p>Formation visant ?? l???acquisition de comp??tences techniques et manag??riales indispensables pour accompagner la transformation num??rique des entreprises.</p>
                        
                        <h3>Baccalaur??at Scientifique sp??cialit?? S.V.T (2017)</h3>
                        <p><b>Au lyc??e Marie Curie, ?? Strasbourg.</b></p>
                    </div>
                    
                    <div id="cv_xp_pro" className="cv_xp_pro">
                    <h2>Exp??rience professionnelles</h2>
                        <h3>Employ?? polyvalent (Job ??tudiant en 2020)</h3>
                        <p><b>Dans le restaurant Eden Food Maineau, ?? Strasbourg.</b></p>
                        <p>Fonctions: encaissement des clients, pr??paration des commandes, accueil des clients, plonge???</p>
  
                        <h3>Cours particuliers (depuis 2018)</h3>
                        <p></p>
                        <p>Donn?? ?? domicile pour des lyc??ens (niveau 1??re et Tale), en Physique et Math??matiques. Pr??paration de cours et exercices.</p>
                    
                        <h3>Missions ponctuelles (depuis 2017)</h3>
                        <ul>
                            <li><b>Job d'??t??:</b> Ouvrier d'entretien (en 2018) dans la soci??t?? Habitation Moderne.</li>
                            <li><b>En interim:</b> Manutentionnaire, ouvrier sanitaire sur chantier, agent de rayon en supermarch??.</li>
                            <li><b>Volontariat:</b> Courses pour personnes isol??es ?? la suite de la crise du COVID-19.</li>
                        </ul>
                    </div>
                    
                    <div id="skills" className="skills">
                    <h2>Comp??tences</h2>
                        <ul>
                            <li><b>Langue:</b> Anglais: oral: niveau scolaire, ??crit: niveau courant.</li>
                            <li><b>Comp??tences informatiques:</b> Programmation, m??thode Agile et comp??tences en r??seau et SGBD</li>
                            <li><b>Langages informatiques maitris??s:</b> C, Python, C++, Java, Shell, SQL et d??veloppement web : HTML/CSS/PHP/JS et React JS</li>
                            <li><b>Outils informatiques maitris??s:</b> Qt, Git, SQL Developer, Apache</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </div>
      </div>
      <footer><a href="index.html">Mon CV</a> <a href="content/about.html">?? propos</a> <a href="content/projects.html">Mes projets</a></footer>
      </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
