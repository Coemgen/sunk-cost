declare const GAMES: any;

interface Game {
  name: string;
  id: string | number;
  ball: string;
  bonus: string;
  price: number;
  threshold: number;
  match: any;
}

type GameName =
  | "luckyForLife"
  | "massCash"
  | "megaMillions"
  | "megabucksDoubler"
  | "powerball";

class Game {
  name: GameName;
  rules: string[];
  ballText: string;
  bonusText: string;
  constructor(
    name: GameName,
    rules: string[],
    ballText: string,
    bonusText: string
  ) {
    this.name = name;
    this.rules = rules;
    this.ballText = ballText;
    this.bonusText = bonusText;
  }
  getBallText() {
    this.ballText;
  }
  getBonusText() {
    this.bonusText;
  }
}

const gamesObj = {
  luckyForLife: new Game("luckyForLife", [], "Lucky Ball", ""),
  massCash: new Game("massCash", [], "", ""),
  megaMillions: new Game("megaMillions", [], "Mega Ball", "Megaplier"),
  megabucksDoubler: new Game("megabucksDoubler", [], "", "ST Doubler"),
  powerball: new Game("powerball", [], "Power Ball", "Powerplay"),
};

class Games {
  constructor(rawData: any) {}
}
