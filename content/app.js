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

const CANVAS_SIZE = [600, 600];
const SNAKE_START = [
  [6, 5],
  [6, 6]
];
const APPLE_START = [0, 0];
const SCALE = 60;
var SPEED = 200;
const DIRECTIONS = {
  38: [0, -1], // up
  40: [0, 1], // down
  37: [-1, 0], // left
  39: [1, 0] // right
};

const tab = [1, 2];
let a = tab.map(title =>
  <div key={title}></div>
);

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
      
      SPEED = 200 - (score * 10);
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

    start = true;
  };

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
      head_img.src = '../img/head.png';
        context.drawImage(head_img, apple[0] - 0.2, apple[1], 1.3, 1.3);
    }

  }, [snake, apple, gameOver]);

  return (
    <div>   
    <div className="main" id="main">
    {win && [...Array(13).keys()].map(i =><span className="confetti" key={i}></span>)}
        <div className="left_side">
            <div className="game_area">
                <div id="jeu" className="jeu" role="button" tabIndex="0" onKeyDown={e => moveSnake(e)}>
                  <button id="btn" onClick={startGame}>{(nb_game < 1) ? 'Commencer' : 'Rejouer'}</button>
                  {!nb_game && <div id="rule">Bienvenu sur le SNAKARIM !<br/>Pour de découvrir mon CV attrapez le plus de «tête de Karim»<br/>Bonne chance !</div>}
                  {gameOver && !win && <div id="loose">Perdu!<br/>Mauvais perdant? vous pouvez consulter mon CV sur mon profil Linkedin ou<br/>retentez vôtre chance.</div>}
                  {win && <div id="win">BRAVO !</div>}
                  
                  <canvas
                    id="ss"
                    style={{ border: "1px solid black"}}
                    ref={canvasRef}
                    width={`${CANVAS_SIZE[0]}px`}
                    height={`${CANVAS_SIZE[1]}px`}
                  />
                    
                    
                  </div>
            </div>
        </div>

        <div className="right_side">
        <div className="cv_area" tabIndex="0">
            <div className="cv_header">
                <div id="cv_pp" className="cv_pp" tabIndex="0"><img src="../img/pp.png" alt="" id="pp"></img></div>
                <div id="cv_name" className="cv_name">BOUALI Karim</div>
            </div>
            <div className="cv_body">
                <div className="cv_side_infos">
                    <div id="cv_contacts" className="cv_contacts">
                        <ul>
                            <li>Né le 9 décembre 1999</li>
                            <li>22 rue de Brantôme</li>
                            <li>67100 Strasbourg</li>
                            <li><a href="mailto:karim.bouali@outlook.fr">karim.bouali@outlook.fr</a></li>
                            <li>07 53 56 16 36</li>
                        </ul>
                    </div>
                    <div id="cv_location" className="cv_location"><p>Titulaire du permis B et véhiculé. Je suis prêt à me déplacer dans tout le Grand Est.</p></div>
                    <div id="cv_search" className="cv_search"><p>À la recherche d’une alternance en informatique pour août/septembre 2021 dans le cadre du master SIL.</p></div>
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
                        <p><b>À l'Université de Strasbourg</b></p>
  
                        <h3>Formation DISRUPT 4.0 (en cours)</h3>
                        <p><b>À l'Université de Haute-Alsace</b>, en parallèle de la licence.</p>
                        <p>Formation visant à l’acquisition de compétences techniques et managériales indispensables pour accompagner la transformation numérique des entreprises.</p>
                        
                        <h3>Baccalauréat Scientifique spécialité S.V.T (2017)</h3>
                        <p><b>Au lycée Marie Curie, à Strasbourg.</b></p>
                    </div>
                    
                    <div id="cv_xp_pro" className="cv_xp_pro">
                    <h2>Expérience professionnelles</h2>
                        <h3>Employé polyvalent (Job étudiant en 2020)</h3>
                        <p><b>Dans le restaurant Eden Food Maineau, à Strasbourg.</b></p>
                        <p>Fonctions: encaissement des clients, préparation des commandes, accueil des clients, plonge…</p>
  
                        <h3>Cours particuliers (depuis 2018)</h3>
                        <p></p>
                        <p>Donné à domicile pour des lycéens (niveau 1ère et Tale), en Physique et Mathématiques. Préparation de cours et exercices.</p>
                    
                        <h3>Missions ponctuelles (depuis 2017)</h3>
                        <ul>
                            <li><b>Job d'été:</b> Ouvrier d'entretien (en 2018) dans la société Habitation Moderne.</li>
                            <li><b>En interim:</b> Manutentionnaire, ouvrier sanitaire sur chantier, agent de rayon en supermarché.</li>
                            <li><b>Volontariat:</b> Courses pour personnes isolées à la suite de la crise du COVID-19.</li>
                        </ul>
                    </div>
                    
                    <div id="skills" className="skills">
                    <h2>Compétences</h2>
                        <ul>
                            <li><b>Langue:</b> Anglais: orale: niveau scolaire, écrit: niveau courant.</li>
                            <li><b>Compétences informatiques:</b> Programmation, méthode Agile et compétences en réseau et SGBD</li>
                            <li><b>Langages informatiques maitrisés:</b> C, Python, C++, Java, Shell, SQL et développement web : HTML/CSS/PHP/JS et React JS</li>
                            <li><b>Outils informatiques maitrisés:</b> Qt, Git, SQL Developer, Apache</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </div>
      </div>
      <footer><a href="../index.html">Mon CV</a> <a href="about.html">À propos</a> <a href="projects.html">Mes projets</a> <a href="soon.html">Prochainement</a></footer>
      </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));