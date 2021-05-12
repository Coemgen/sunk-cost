function mainX(gameId: string) {
  const drawings = new Drawings(DRAWINGS);
  const gamesObj = gameUtils.set(GAMES);

  let ball: string;
  let bonus: string;
  const game = gamesObj[gameId];

  $("#drawings thead tr th:eq(2)").html(game.ball);
  $("#drawings thead tr th:eq(3)").html(game.bonus);

  if (gameId === "mass_cash" || gameId === "megabucks_doubler") {
    $("#drawings thead tr th.ball").attr("hidden", "hidden");
  } else {
    $("#drawings thead tr th.ball").removeAttr("hidden");
  }

  if (
    gameId === "mass_cash" ||
    gameId === "lucky_for_life" ||
    gameId === "megabucks_doubler"
  ) {
    $("#drawings thead tr th.bonus").attr("hidden", "hidden");
  } else {
    $("#drawings thead tr th.bonus").removeAttr("hidden");
  }

  if (gameId === "megabucks_doubler") {
    $("#drawings thead tr th:eq(1)").attr("colspan", 6);
  } else {
    $("#drawings thead tr th:eq(1)").attr("colspan", 5);
  }

  game.bonusText;
  drawings
    .getData(gameId)
    .slice(-10)
    .reverse()
    .forEach(function (drawArray, index) {
      const gameDraw = new Drawing(gameId, drawArray);
      $("#drawings tbody tr:eq(" + index + ") td.num").empty();
      $("#drawings tbody tr:eq(" + index + ") td:eq(0) span").html(
        gameDraw.drawDate.toDateString()
      );

      if (gameId === "mass_cash" || gameId === "megabucks_doubler") {
        $("#drawings tbody tr:eq(" + index + ") td.ball").attr(
          "hidden",
          "hidden"
        );
      } else {
        $("#drawings tbody tr:eq(" + index + ") td.ball").removeAttr("hidden");
      }

      if (
        gameId === "mass_cash" ||
        gameId === "lucky_for_life" ||
        gameId === "megabucks_doubler"
      ) {
        $("#drawings tbody tr:eq(" + index + ") td.bonus").attr(
          "hidden",
          "hidden"
        );
      } else {
        $("#drawings tbody tr:eq(" + index + ") td.bonus").removeAttr("hidden");
      }

      if (gameId === "megabucks_doubler") {
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

const main = (function () {
  function displayNavPills(gamesArr: string[], gamesObj: any) {
    gamesArr.forEach((name) => gamesObj[name]);
  }

  return {
    displayNavPills,
  };
})();

function handler() {
  // const gamesObj = gameUtils.set(GAMES);
  // const gamesArr = Object.keys(gamesObj);
  // main.displayNavPills(gamesArr, gamesObj);
  debugger;
  $.getJSON("data/games.json", function (data) {
    let items: string[] = [];
    $.each(data, function (key: string, val) {
      items.push("<li id='" + key + "'>" + val + "</li>");
    });

    $("<ul/>", {
      class: "my-new-list",
      html: items.join(""),
    }).appendTo("body");
  });
}

$(handler);
