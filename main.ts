declare const DRAWINGS: any;
const drawings = new Drawings(DRAWINGS);

function main(gameName: GameNames) {
  let ball: string;
  let bonus: string;
  drawings
    .getData(gameName)
    .slice(-10)
    .reverse()
    .forEach(function (drawArray, index) {
      const gameDraw = new Drawing(gameName, drawArray);
      $("#drawings tbody tr:eq(" + index + ") td.num").empty();
      $("#drawings tbody tr:eq(" + index + ") td:eq(0) span").html(
        gameDraw.drawDate.toDateString()
      );
      gameDraw.winningNumbers.forEach((num: number, idx: number) =>
        $("#drawings tbody tr:eq(" + index + ") td:eq(" + (idx + 1) + ")").html(
          num.toString().padStart(2, "0")
        )
      );
      ball = gameDraw.ball === 0 ? "n/a" : gameDraw.ball.toString();
      $("#drawings tbody tr:eq(" + index + ") td:eq(7)").html(ball);
      bonus = gameDraw.bonus === 0 ? "n/a" : gameDraw.bonus.toString();
      $("#drawings tbody tr:eq(" + index + ") td:eq(8)").html(bonus);
      $("#drawings tbody tr:eq(" + index + ") td:eq(9) span").html(
        Utils.numToUsd(gameDraw.jackpot)
      );
    });
}

function handler() {
  main("luckyForLife");
}

$(handler);
