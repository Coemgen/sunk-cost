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
    let numArr: string[];
    matchArr = usd.match(/^\$(\d+)(,(\d{3}))?(.\d+)?\sBillion$/);
    if (matchArr) {
      return (
        Number(
          (matchArr[1] || "") + (matchArr[3] || "") + (matchArr[4] || "")
        ) * 1000000000
      );
    }
    matchArr = usd.match(/^\$(\d+)(,(\d{3}))?(.\d+)?\sMillion$/);
    if (matchArr) {
      return (
        Number(
          (matchArr[1] || "") + (matchArr[3] || "") + (matchArr[4] || "")
        ) * 1000000
      );
    }
    matchArr = usd.match(/^\$(\d+)(,(\d{3}))*(.\d+)?$/);
    if (matchArr) {
      numArr = usd.slice(1).split(",");
      return Number(numArr.join(""));
    }
    matchArr = usd.match(/^\d+$/);
    if (matchArr) {
      return Number(matchArr[0]);
    }

    return Number(usd);
  }

  /**
   * @function numToUsd
   * @param {number} num
   * @memberof! Utils
   * @returns {string}
   */
  function numToUsd(num: number): string {
    let matchArr: RegExpMatchArray | null;
    if (num < 1000000) {
      return num.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    }
    matchArr = num
      .toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact",
        compactDisplay: "short",
        minimumSignificantDigits: 3,
        maximumFractionDigits: 2,
      })
      .match(/^(\$\d+)(\.\d+)?([MB])$/);
    if (matchArr) {
      return matchArr[1] + (matchArr[2] || "") + " " + matchArr[3] + "illion  ";
    }
    return "";
  }

  return Object.freeze({
    numToUsd,
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

function main() {
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
        Utils.numToUsd(gameDraw.jackpot)
      );
    });
}

$(main);
