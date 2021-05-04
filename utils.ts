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
        minimumFractionDigits: 0,
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
