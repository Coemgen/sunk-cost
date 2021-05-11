function main(gameName: GameName) {
  const games = new Games(GAMES);
  const drawings = new Drawings(DRAWINGS);

  let ball: string;
  let bonus: string;
  const game = gamesObj[gameName];

  $("#drawings thead tr th:eq(2)").html(game.ballText);
  $("#drawings thead tr th:eq(3)").html(game.bonusText);

  if (gameName === "massCash" || gameName === "megabucksDoubler") {
    $("#drawings thead tr th.ball").attr("hidden", "hidden");
  } else {
    $("#drawings thead tr th.ball").removeAttr("hidden");
  }

  if (
    gameName === "massCash" ||
    gameName === "luckyForLife" ||
    gameName === "megabucksDoubler"
  ) {
    $("#drawings thead tr th.bonus").attr("hidden", "hidden");
  } else {
    $("#drawings thead tr th.bonus").removeAttr("hidden");
  }

  if (gameName === "megabucksDoubler") {
    $("#drawings thead tr th:eq(1)").attr("colspan", 6);
  } else {
    $("#drawings thead tr th:eq(1)").attr("colspan", 5);
  }

  game.bonusText;
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

      if (gameName === "massCash" || gameName === "megabucksDoubler") {
        $("#drawings tbody tr:eq(" + index + ") td.ball").attr(
          "hidden",
          "hidden"
        );
      } else {
        $("#drawings tbody tr:eq(" + index + ") td.ball").removeAttr("hidden");
      }

      if (
        gameName === "massCash" ||
        gameName === "luckyForLife" ||
        gameName === "megabucksDoubler"
      ) {
        $("#drawings tbody tr:eq(" + index + ") td.bonus").attr(
          "hidden",
          "hidden"
        );
      } else {
        $("#drawings tbody tr:eq(" + index + ") td.bonus").removeAttr("hidden");
      }

      if (gameName === "megabucksDoubler") {
        $("#drawings tbody tr:eq(" + index + ") td:eq(6)").removeAttr("hidden");
      } else {
        $("#drawings tbody tr:eq(" + index + ") td:eq(6)").attr(
          "hidden",
          "hidden"
        );
      }

      gameDraw.winningNumbers.forEach((num: number, idx: number) =>
        $("#drawings tbody tr:eq(" + index + ") td:eq(" + (idx + 1) + ")").html(
          num.toString().padStart(2, "0")
        )
      );
      ball = gameDraw.ball === 0 ? "" : gameDraw.ball.toString();
      $("#drawings tbody tr:eq(" + index + ") td:eq(7)").html(ball);
      bonus = gameDraw.bonus === 0 ? "" : gameDraw.bonus.toString();
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
