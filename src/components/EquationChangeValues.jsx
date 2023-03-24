function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

for (let i = 0; i < easyEquationList.length; i++) {
  if (easyEquationList[i].includes("1x")) {
    easyEquationList[i] = easyEquationList[i].replace(/1x/g, "x");
  }

  let rndInt = 0;
  let percentage = 0;
  let minimumRange = 0;
  let maximumRange = 0;
  function randomPercentage() {
    percentage = Math.random() * 100;
    if (percentage <= 85) {
      // 0-85
      minimumRange = 10;
      maximumRange = 99;
    } else if (percentage <= 95) {
      // 86-95
      minimumRange = 2;
      maximumRange = 99;
    } else {
      // 96-100
      minimumRange = 11;
      maximumRange = 99;
    }
    rndInt = randomIntFromInterval(minimumRange, maximumRange);
  }

  for (let j = 1; j < 10; j++) {
    replaceDigit(j);
    replaceDigitCoefficient(j);
  }

  function replaceDigit(digit) {
    if (easyEquationList[i].includes(digit)) {
      let search1 = " " + digit + " ";
      let search2 = digit + " ";
      let search3 = " " + digit;
      let search4 = "\\(" + digit + " ";
      let search5 = " " + digit + "\\)";
      let search6 = "\\(" + digit + "\\)";

      let find1 = new RegExp(search1, "g");
      let find2 = new RegExp(search2, "g");
      let find3 = new RegExp(search3, "g");
      let find4 = new RegExp(search4, "g");
      let find5 = new RegExp(search5, "g");
      let find6 = new RegExp(search6, "g");

      randomPercentage();
      easyEquationList[i] = easyEquationList[i].replace(
        find1,
        rndInt.toString()
      );
      randomPercentage();
      easyEquationList[i] = easyEquationList[i].replace(
        find2,
        rndInt.toString()
      );
      randomPercentage();
      easyEquationList[i] = easyEquationList[i].replace(
        find3,
        rndInt.toString()
      );
      randomPercentage();
      easyEquationList[i] = easyEquationList[i].replace(
        find4,
        rndInt.toString()
      );
      randomPercentage();
      easyEquationList[i] = easyEquationList[i].replace(
        find5,
        rndInt.toString()
      );
      randomPercentage();
      easyEquationList[i] = easyEquationList[i].replace(
        find6,
        rndInt.toString()
      );
    }
  }

  function replaceDigitCoefficient(digit) {
    if (easyEquationList[i].includes(digit)) {
      let search1 = " " + digit + "x ";
      let search2 = digit + "x ";
      let search3 = " " + digit + "x";
      let search4 = "\\(" + digit + "x ";
      let search5 = " " + digit + "x\\)";
      let search6 = "\\(" + digit + "x\\)";

      let find1 = new RegExp(search1, "g");
      let find2 = new RegExp(search2, "g");
      let find3 = new RegExp(search3, "g");
      let find4 = new RegExp(search4, "g");
      let find5 = new RegExp(search5, "g");
      let find6 = new RegExp(search6, "g");

      randomPercentage();
      easyEquationList[i] = easyEquationList[i].replace(
        find1,
        rndInt.toString() + "x"
      );
      randomPercentage();
      easyEquationList[i] = easyEquationList[i].replace(
        find2,
        rndInt.toString() + "x"
      );
      randomPercentage();
      easyEquationList[i] = easyEquationList[i].replace(
        find3,
        rndInt.toString() + "x"
      );
      randomPercentage();
      easyEquationList[i] = easyEquationList[i].replace(
        find4,
        rndInt.toString() + "x"
      );
      randomPercentage();
      easyEquationList[i] = easyEquationList[i].replace(
        find5,
        rndInt.toString() + "x"
      );
      randomPercentage();
      easyEquationList[i] = easyEquationList[i].replace(
        find6,
        rndInt.toString() + "x"
      );
    }
  }
}
