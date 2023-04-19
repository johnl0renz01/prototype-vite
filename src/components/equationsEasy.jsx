var EquationGeneratorEasy = (function () {
  var easyEquationList = [];
  function generateEquations(quantity) {
    easyEquationList = [];

    const lhsSchemas = ["2x", "2x @ 3", "2x @ 3 @ 3", "3 @ 2x", "3 @ 2x @ 3"];
    const rhsSchemas = ["2x", "3 ", "3 @ 3 ", "3 @ 3 @ 3"];

    // GENERATE # EQUATIONS through quantity
    for (let i = 0; i < quantity; i++) {
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
      easyEquationList.push(combinedSchema);
    }
    const availableOperations = ["+", "-"]; //Double addition to increase chance

    addOperations();
    changeValues();

    function addOperations() {
      for (let i = 0; i < easyEquationList.length; i++) {
        let limit = Math.floor(easyEquationList[i].length / 4); //Quantity of operation symbol
        //console.log(limit);

        for (let j = 0; j < limit; j++) {
          const operation =
            availableOperations[
              Math.floor(Math.random() * availableOperations.length)
            ];
          easyEquationList[i] = easyEquationList[i].replace("@", operation);
        }
      }
    }

    function randomIntFromInterval(min, max) {
      // min and max included
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function changeValues() {
      for (let i = 0; i < easyEquationList.length; i++) {
        if (easyEquationList[i].includes("1x")) {
          easyEquationList[i] = easyEquationList[i].replace(/1x/g, "x");
        }

        if (easyEquationList[i].includes("-1x")) {
          easyEquationList[i] = easyEquationList[i].replace(/-1x/g, "-x");
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

        let limit = Math.floor(easyEquationList[i].length / 2);

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
          if (easyEquationList[i].includes(digit)) {
            let search1 = " " + digit + " ";
            let search4 = "\\(" + digit + " ";
            let search5 = " " + digit + "\\)";
            let search6 = "\\(" + digit + "\\)";

            let find1 = new RegExp(search1, "");
            let find4 = new RegExp(search4, "");
            let find5 = new RegExp(search5, "");
            let find6 = new RegExp(search6, "");

            randomPercentage();
            easyEquationList[i] = easyEquationList[i].replace(
              find1,
              " " + negativeSymbol + rndInt.toString() + " "
            );
            randomPercentage();
            easyEquationList[i] = easyEquationList[i].replace(
              find4,
              "(" + negativeSymbol + rndInt.toString() + " "
            );
            randomPercentage();
            easyEquationList[i] = easyEquationList[i].replace(
              find5,
              " " + negativeSymbol + rndInt.toString() + ")"
            );
            randomPercentage();
            easyEquationList[i] = easyEquationList[i].replace(
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
          if (easyEquationList[i].includes(digit)) {
            let search1 = " " + digit + "x ";
            let search4 = "\\(" + digit + "x ";
            let search5 = " " + digit + "x\\)";
            let search6 = "\\(" + digit + "x\\)";

            let find1 = new RegExp(search1, "");
            let find4 = new RegExp(search4, "");
            let find5 = new RegExp(search5, "");
            let find6 = new RegExp(search6, "");

            randomPercentage();
            easyEquationList[i] = easyEquationList[i].replace(
              find1,
              " " + negativeSymbol + rndInt.toString() + "x "
            );
            randomPercentage();
            easyEquationList[i] = easyEquationList[i].replace(
              find4,
              "(" + negativeSymbol + rndInt.toString() + "x"
            );
            randomPercentage();
            easyEquationList[i] = easyEquationList[i].replace(
              find5,
              " " + negativeSymbol + rndInt.toString() + "x)"
            );
            randomPercentage();
            easyEquationList[i] = easyEquationList[i].replace(
              find6,
              "(" + negativeSymbol + rndInt.toString() + "x)"
            );
          }
        }

        if (easyEquationList[i].includes("1x")) {
          easyEquationList[i] = easyEquationList[i].replace(/1x/g, "x");
        }
      }
    }

    console.log(easyEquationList);
  }
  var getEquationList = function (quantity) {
    generateEquations(quantity);
    return easyEquationList;
  };

  return {
    getEquationList: getEquationList,
  };
})();

export default EquationGeneratorEasy;
