class Drawing {
  gameName: GameNames;
  drawDate: Date;
  winningNumbers: number[];
  jackpot: number;
  ball: number;
  bonus: number;
  nextDrawDate: Date;
  estimatedJackpot: number;

  constructor(gameName: GameNames, rawData: string[]) {
    this.gameName = gameName;
    this.drawDate = new Date(rawData[0]);
    this.winningNumbers = rawData[1].split("-").map((numStr) => Number(numStr));
    this.jackpot = Utils.usdToNum(rawData[2]);
    this.ball = rawData[3] ? Number(rawData[3]) : 0;
    this.bonus = rawData[4] ? Number(rawData[4]) : 0;
    this.nextDrawDate = new Date(rawData[5]);
    this.estimatedJackpot = Utils.usdToNum(rawData[6]);
  }
}

class Drawings {
  luckyForLife: string[][];
  massCash: string[][];
  megaMillions: string[][];
  megabucksDoubler: string[][];
  powerball: string[][];
  constructor(rawData: {
    luckyforlife: string[][];
    masscash: string[][];
    megamillions: string[][];
    megabucksdoubler: string[][];
    powerball: string[][];
  }) {
    this.luckyForLife = rawData.luckyforlife;
    this.massCash = rawData.masscash;
    this.megaMillions = rawData.megamillions;
    this.megabucksDoubler = rawData.megabucksdoubler;
    this.powerball = rawData.powerball;
  }
  getData(game: GameNames) {
    return this[game].slice(1);
  }
  getHeader(game: GameNames) {
    return this[game][0];
  }
}
