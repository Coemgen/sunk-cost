declare const DRAWINGS: any;

function getGameDrawing(gameName: GameNames, drawArray: string[]) {
  if (gameName === "megaMillions") {
    return new MegaMillionsDrawing(drawArray);
  }
  if (gameName === "powerball") {
    return new PowerballDrawing(drawArray);
  }
  return new LuckyForLifeDrawing(drawArray);
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

/** functions */

const drawings = new Drawings(DRAWINGS);

function main(gameName: GameNames) {
  drawings
    .getData(gameName)
    .slice(-10)
    .reverse()
    .forEach(function (drawArray, index) {
      const gameDraw = getGameDrawing(gameName, drawArray);
      $("#drawings tbody tr:eq(" + index + ") td:eq(0) span").html(
        gameDraw.drawDate.toDateString()
      );
      gameDraw.winningNumbers.forEach((num: number, idx: number) =>
        $("#drawings tbody tr:eq(" + index + ") td:eq(" + (idx + 1) + ")").html(
          num.toString().padStart(2, "0")
        )
      );
      $("#drawings tbody tr:eq(" + index + ") td:eq(7) span").html(
        Utils.numToUsd(gameDraw.jackpot)
      );
    });
}

function handler() {
  main("luckyForLife");
}

$(handler);
