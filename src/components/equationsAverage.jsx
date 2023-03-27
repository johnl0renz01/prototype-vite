var EquationGeneratorAverage = (function () {
  var averageEquationList = [];
  function generateEquations() {
    averageEquationList = [];
    const lhsSchemas = [
      "2x * 3",
      "2x * 3 * 3",
      "3 * 2x",
      "3 * 2x * 3",
      "3 * 2x",
      "3 * 3 * 2x",

      "2x * 3 @ 2x",
      "2x @ 3 * 2x",
      "3 * 2x @ 2x",
      "2x @ 2x * 3",
      "2x @ 2x * 3 @ 3",
      "2x @ 2x @ 3 * 3",
      "2x @ 2x * 3 * 3",

      "2x * 3 @ 2x @ 3",
      "2x @ 3 * 2x @ 3",
      "2x @ 3 @ 2x * 3",
      "2x * 3 @ 2x * 3",
      "2x @ 3 * 2x * 3",

      "2x * 3 @ 3 @ 2x",
      "2x @ 3 @ 3 * 2x",
      "2x @ 3 * 3 @ 2x",
      "2x * 3 * 3 @ 2x",
      "2x @ 3 * 3 * 2x",
      "2x * 3 @ 3 * 2x",

      "3 * 2x @ 3 @ 2x",
      "3 @ 2x * 3 @ 2x",
      "3 @ 2x @ 3 * 2x",
      "3 * 2x * 3 @ 2x",
      "3 * 2x @ 3 * 2x",

      "3 * 2x @ 2x @ 3",
      "3 @ 2x @ 2x * 3",
      "3 * 2x @ 2x * 3",

      "3 * 3 @ 2x @ 2",
      "3 @ 3 @ 2x * 2",
      "3 @ 3 * 2x @ 2",
      "3 * 3 * 2x @ 2",
      "3 @ 3 * 2x * 2",
      "3 * 3 * 2x * 2",
    ];

    const rhsSchemas = lhsSchemas;

    // GENERATE 10 EQUATIONS
    for (let i = 0; i < 10; i++) {
      var combinedSchema = "";
      var percentage = Math.random() * 100;
      var item1 = lhsSchemas[Math.floor(Math.random() * lhsSchemas.length)];
      var item2 = rhsSchemas[Math.floor(Math.random() * rhsSchemas.length)];
      if (percentage <= 30) {
        item1 = "-" + item1;
      }
      percentage = Math.random() * 100;
      if (percentage <= 30) {
        item2 = "-" + item2;
      }

      percentage = Math.random() * 100;
      if (percentage <= 50) {
        combinedSchema = " " + item1 + " = " + item2 + " ";
      } else {
        combinedSchema = " " + item2 + " = " + item1 + " ";
      }
      //console.log(combinedSchema)
      averageEquationList.push(combinedSchema);
    }
    const availableOperations = ["+", "+", "-"]; //Double operation to increase chance
    const anotherOperations = ["+", "-", "*", "*", "*", "*", "*"]; //With multiplication

    addOperations();
    changeValues();

    function addOperations() {
      for (let i = 0; i < averageEquationList.length; i++) {
        let limit = Math.floor(averageEquationList[i].length / 4); //Quantity of operation symbol
        //console.log(limit);

        for (let j = 0; j < limit; j++) {
          const operation =
            availableOperations[
              Math.floor(Math.random() * availableOperations.length)
            ];
          const anotherOperation =
            anotherOperations[
              Math.floor(Math.random() * anotherOperations.length)
            ];
          averageEquationList[i] = averageEquationList[i].replace(
            "@",
            operation
          );
          averageEquationList[i] = averageEquationList[i].replace(
            "*",
            anotherOperation
          );
        }
      }
    }

    function randomIntFromInterval(min, max) {
      // min and max included
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function changeValues() {
      for (let i = 0; i < averageEquationList.length; i++) {
        if (averageEquationList[i].includes("1x")) {
          averageEquationList[i] = averageEquationList[i].replace(/1x/g, "x");
        }
        if (averageEquationList[i].includes("-1x")) {
          averageEquationList[i] = averageEquationList[i].replace(/-1x/g, "-x");
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
            minimumRange = 1;
            maximumRange = 99;
          } else {
            // 96-100
            minimumRange = 11;
            maximumRange = 99;
          }
          rndInt = randomIntFromInterval(minimumRange, maximumRange);
        }

        let limit = Math.floor(averageEquationList[i].length / 2);

        for (let j = 1; j < limit; j++) {
          for (let k = 1; k < 10; k++) {
            replaceDigit(k);
            replaceDigit("-" + k);
            replaceDigitCoefficient(k);
            replaceDigitCoefficient("-" + k);
          }
        }

        function replaceDigit(digit) {
          let negativeSymbol = "";

          if (parseInt(digit) < 0) {
            negativeSymbol = "-";
          }
          if (averageEquationList[i].includes(digit)) {
            let search1 = " " + digit + " ";
            let search4 = "\\(" + digit + " ";
            let search5 = " " + digit + "\\)";
            let search6 = "\\(" + digit + "\\)";

            let find1 = new RegExp(search1, "");
            let find4 = new RegExp(search4, "");
            let find5 = new RegExp(search5, "");
            let find6 = new RegExp(search6, "");

            randomPercentage();
            averageEquationList[i] = averageEquationList[i].replace(
              find1,
              " " + negativeSymbol + rndInt.toString() + " "
            );
            randomPercentage();
            averageEquationList[i] = averageEquationList[i].replace(
              find4,
              "(" + negativeSymbol + rndInt.toString() + " "
            );
            randomPercentage();
            averageEquationList[i] = averageEquationList[i].replace(
              find5,
              " " + negativeSymbol + rndInt.toString() + ")"
            );
            randomPercentage();
            averageEquationList[i] = averageEquationList[i].replace(
              find6,
              "(" + negativeSymbol + rndInt.toString() + ")"
            );
          }
        }

        function replaceDigitCoefficient(digit) {
          let negativeSymbol = "";

          if (parseInt(digit) < 0) {
            negativeSymbol = "-";
          }
          if (averageEquationList[i].includes(digit)) {
            let search1 = " " + digit + "x ";
            let search4 = "\\(" + digit + "x ";
            let search5 = " " + digit + "x\\)";
            let search6 = "\\(" + digit + "x\\)";

            let find1 = new RegExp(search1, "");
            let find4 = new RegExp(search4, "");
            let find5 = new RegExp(search5, "");
            let find6 = new RegExp(search6, "");

            randomPercentage();
            averageEquationList[i] = averageEquationList[i].replace(
              find1,
              " " + negativeSymbol + rndInt.toString() + "x "
            );
            randomPercentage();
            averageEquationList[i] = averageEquationList[i].replace(
              find4,
              "(" + negativeSymbol + rndInt.toString() + "x"
            );
            randomPercentage();
            averageEquationList[i] = averageEquationList[i].replace(
              find5,
              " " + negativeSymbol + rndInt.toString() + "x)"
            );
            randomPercentage();
            averageEquationList[i] = averageEquationList[i].replace(
              find6,
              "(" + negativeSymbol + rndInt.toString() + "x)"
            );
          }
        }

        if (averageEquationList[i].includes("1x")) {
          averageEquationList[i] = averageEquationList[i].replace(/1x/g, "x");
        }
      }
    }

    console.log(averageEquationList);
  }

  var getEquationList = function () {
    generateEquations();
    return averageEquationList;
  };

  return {
    getEquationList: getEquationList,
  };
})();

export default EquationGeneratorAverage;
