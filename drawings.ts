declare const DRAWINGS: any;

class Drawing {
  gameName: GameName;
  drawDate: Date;
  winningNumbers: number[];
  jackpot: number;
  ball: number;
  bonus: number;
  nextDrawDate: Date;
  estimatedJackpot: number;

  constructor(gameName: GameName, rawData: string[]) {
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
  constructor(rawData) {
    //         ["draw_date", "winning_num", "jackpot", "ball", "not_used", "next_draw_date", "estimated_jackpot"],
  }
  getData(game: GameName) {
    return this[game].slice(1);
  }
  getHeader(game: GameName) {
    return this[game][0];
  }
}
