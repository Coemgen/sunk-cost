declare const GAMES: string[][][];

interface Game {
  name: string;
  id: string | number;
  ball: string;
  bonus: string;
  price: number;
  threshold: number;
  match: any;
}

const gameUtils = (function () {
  function set(GAMES: string[][][]) {
    let gamesObj: any = {};
    let gameObj: any = {};
    GAMES.forEach((gameArr) => {
      gameObj = {};
      gameObj.match = {};
      gameArr.forEach((ele: string[]) => {
        let key = ele[0];
        let subKey;
        if (key === "match") {
          subKey = ele[1];
          gameObj[key][subKey] = ele[2];
        } else {
          gameObj[key] = ele[1];
        }
      });
      gamesObj[gameObj.identifier] = gameObj;
    });
    return gamesObj;
  }

  return Object.freeze({
    set,
  });
})();
