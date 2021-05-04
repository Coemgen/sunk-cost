class Drawing {
  gameName: GameNames;
  drawDate: Date;
  winningNumbers: number[];
  jackpot: number;
  nextDrawDate: Date;
  estimatedJackpot: number;

  constructor(
    gameName: GameNames,
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

class LuckyForLifeDrawing extends Drawing {
  ball: number;
  bonus: number;

  constructor(rawData: string[]) {
    const gameName = "luckyForLife";
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

class MassCashDrawing extends Drawing {
  ball: number;
  bonus: number;

  constructor(rawData: string[]) {
    const gameName = "massCash";
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

class MegaMillionsDrawing extends Drawing {
  ball: number;
  bonus: number;
  constructor(rawData: string[]) {
    const gameName = "megaMillions";
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

class MegabucksDoublerDrawing extends Drawing {
  ball: number;
  bonus: number;

  constructor(rawData: string[]) {
    const gameName = "megabucksDoubler";
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
