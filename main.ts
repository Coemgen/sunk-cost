declare const DRAWINGS: any;

/**
 * @namespace Utils
 */
const Utils = (function () {
  /**
   * @function usdToNum
   * @param {string} usd
   * @memberof! Utils
   * @returns {number}
   */
  function usdToNum(usd: string): number {
    let matchArr: RegExpMatchArray | null;
    matchArr = usd.match(/^\$(\d+)(,(\d{3}))*(.\d+)?\sBillion$/);
    if (matchArr) {
      return (
        Number(
          (matchArr[1] || "") + (matchArr[3] || "") + (matchArr[4] || "")
        ) * 1000000000
      );
    }
    matchArr = usd.match(/^\$(\d+)(,(\d{3}))*(.\d+)?\sMillion$/);
    if (matchArr) {
      return (
        Number(
          (matchArr[1] || "") + (matchArr[3] || "") + (matchArr[4] || "")
        ) * 1000000
      );
    }
    matchArr = usd.match(/^\$(\d+)(,(\d{3}))*(.\d+)?$/);
    if (matchArr) {
      return Number(
        (matchArr[1] || "") + (matchArr[3] || "") + (matchArr[4] || "")
      );
    }
    matchArr = usd.match(/^\d+$/);
    if (matchArr) {
      return Number(matchArr[0]);
    }

    return Number(usd);
  }
  return Object.freeze({
    usdToNum,
  });
})();

class Drawing {
  gameName: string;
  drawDate: Date;
  winningNumbers: number[];
  jackpot: number;
  nextDrawDate: Date;
  estimatedJackpot: number;

  constructor(
    gameName: string,
    drawDate: string,
    winningNumbers: string,
    jackpot: string,
    nextDrawDate: string,
    estimatedJackpot: string
  ) {
    this.gameName = gameName;
    this.drawDate = new Date(drawDate);
    this.winningNumbers = winningNumbers
      .split("-")
      .map((numStr) => Number(numStr));
    this.jackpot = Utils.usdToNum(jackpot);
    this.nextDrawDate = new Date(nextDrawDate);
    this.estimatedJackpot = Utils.usdToNum(estimatedJackpot);
  }
}

class PowerballDrawing extends Drawing {
  ball: number;
  bonus: number;

  constructor(rawData: string[]) {
    const gameName = "powerball";
    const drawDate = rawData[0];
    const winningNumbers = rawData[1];
    const jackpot = rawData[2];
    const ball = rawData[3];
    const bonus = rawData[4];
    const nextDrawDate = rawData[5];
    const estimatedJackpot = rawData[6];
    super(
      gameName,
      drawDate,
      winningNumbers,
      jackpot,
      nextDrawDate,
      estimatedJackpot
    );
    this.ball = Number(ball);
    this.bonus = Number(bonus);
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
  getData(
    game:
      | "luckyForLife"
      | "massCash"
      | "megaMillions"
      | "megabucksDoubler"
      | "powerball"
  ) {
    return this[game].slice(1);
  }
  getHeader(
    game:
      | "luckyForLife"
      | "massCash"
      | "megaMillions"
      | "megabucksDoubler"
      | "powerball"
  ) {
    return this[game][0];
  }
}

const drawings = new Drawings(DRAWINGS);
drawings
  .getData("powerball")
  .slice(-10)
  .forEach(function (arr, index) {
    const gameDraw = new PowerballDrawing(arr);
    $("tbody tr:eq(" + index + ") td:eq(0)").html(
      gameDraw.drawDate.toDateString()
    );
    $("tbody tr:eq(" + index + ") td:eq(2)").html(
      gameDraw.jackpot.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })
    );
  });
