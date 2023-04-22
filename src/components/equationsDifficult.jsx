import axios from "axios";

var EquationGeneratorDifficult = (function () {
  const lhsSchemas = [
    // ORIGINAL
    "3(2x)",
    "3(2x @ 3)",
    "3(3 @ 2x @ 3)",

    "3(2x)",
    "3(3 @ 2x)",
    "3(3 @ 3 @ 2x)",

    "3(2x)",
    "3(2x @ 2x)",
    "3(2x @ 2x @ 2x)",

    "3(2x(3(3(3))))",
  ];

  /*  "13 WRONGS" fxifxifxifxifxi

  "3(2x @ 3(2x) @ 3)", /WRONG
    "3(2x @ 3(2x) @ 2x)", //CORRECT
    "3(2x @ 3(2x) @ 3(2x))", /CORRECT

    "3(3 @ 3(2x) @ 3)", /CORRECT
    "3(3 @ 3(2x) @ 2x)", /CORRECT
    "3(3 @ 3(2x) @ 3(2x))",/WRONG

    "3(3 @ 3 @ 3(2x))", /CORRECT
    "3(3 @ 2x @ 3(2x))", /WRONG



    
  "3(3 @ 2x(3(3(3))))", /CORRECT
    "3(2x @ 3(3(3(3))))", /CORRECT
    "3(2x @ 3 @ 3(3(3(3))))", /CORRECT
    "3(3 @ 2x @ 3(3(3(3))))", /CORRECT
    "3(3 @ 3 @ 2x(3(3(3))))", /CORRECT

    "3(3(3 @ 2x(3(3))))", /CORRECT
    "3(3(2x @ 3(3(3))))", /CORRECT
    "3(3(2x @ 3 @ 3(3(3))))", /CORRECT
    "3(3(3 @ 2x @ 3(3(3))))", /CORRECT
    "3(3(3 @ 3 @ 2x(3(3))))", /CORRECT

    "3(3(3(3 @ 2x(3))))", /CORRECT
    "3(3(3(2x @ 3(3))))", /CORRECT
    "3(3(3(2x @ 3 @ 3(3))))", /CORRECT
    "3(3(3(3 @ 2x @ 3(3))))", /CORRECT
    "3(3(3(3 @ 3 @ 2x(3))))", /CORRECT

    "3(3(3(3(3 @ 2x))))", /CORRECT
    "3(3(3(3(2x @ 3))))", /CORRECT
    "3(3(3(3(2x @ 3 @3))))", /CORRECT
    "3(3(3(3(3 @ 2x @ 3))))", /CORRECT
    "3(3(3(3(3 @ 3 @ 2x))))", /CORRECT

    "3(3(2x @ 2x(3(3))))", /WRONG
    "3(3(3 @ 2x @ 2x(3(3))))", /WRONG

    "3(3(3(3 @ 2x @ 2x(3))))", /WRONG

    "3(3(3(3(3 @ 2x @ 2x))))", /WRONG

    "3(3(2x))", /CORRECT
    "3(2x(3))", /CORRECT
    "3(3 @ 2x(3))", /CORRECT
    "3(2x @ 3(3))", /CORRECT
    "3(2x @ 2x(3))", /WRONG
    "3(3 @ 3(2x))", /CORRECT
    "3(3 @ 3(2x @ 3))", /CORRECT
    "3(3 @ 3(3 @ 2x))", /CORRECT
    "3(3 @ 3(2x @ 2x))", /WRONG
    "3(3 @ 3(3 @ 2x @ 2x))", /WRONG
    "3(3 @ 3(2x @ 3 @ 2x))", /WRONG
    "3(3 @ 3(2x @ 2x @ 3))", /WRONG
    "3(3 @ 3(2x @ 2x @ 2x))", /WRONG

    "3(3 @ 2x(3 @ 3))", /CORRECT
    "3(3 @ 2x(3 @ 3 @ 3))", /CORRECT
    "3(3 @ 2x(3(3 @ 3)))", /CORRECT
    "3(3 @ 2x(3(3 @ 3 @ 3)))", /CORRECT
    "3(3 @ 2x(3(3)))", /CORRECT
  */

  const rhsSchemas = lhsSchemas;

  const additionalSchemas = [
    "2x @ 3",
    "2x @ 3 @ 3",
    "3 @ 2x",
    "3 @ 2x @ 3",
    "3 @ 2x",

    "2x @ 3",
    "2x @ 3 @ 3",
    "3 @ 2x",
    "3 @ 2x @ 3",
    "3 @ 2x",

    "2x @ 3",
    "2x @ 3 @ 3",
    "3 @ 2x",
    "3 @ 2x @ 3",
    "3 @ 2x",

    "2x @ 3 @ 2x",
    "3 @ 2x @ 2x",
    "2x @ 2x @ 3",
    "2x @ 2x @ 3 @ 3",
    "2x @ 3 @ 2x @ 3",
    "2x @ 3 @ 3 @ 2x",
    "3 @ 2x @ 3 @ 2x",
    "3 @ 2x @ 2x @ 3",
    "3 @ 3 @ 2x @ 2",

    "3(3)",
    "3(3 @ 3)",
    "3(3 @ 3 @ 3)",

    "3(3(3))",
    "3(3(3(3)))",
    "3(3(3))",
    "3(3(3(3(3))))",

    "3(3 @ 3(3))",
    "3(3 @ 3 @ 3(3))",
    "3(3(3 @ 3))",
    "3(3(3 @ 3 @ 3))",
    "3(3 @ 3(3 @ 3))",
  ];

  /*OPTIONAL
    "3(3 @ 3 @ 3 (3 @ 3))",
    "3(3 @ 3 @ 3 (3 @ 3 @ 3))",

    "3(3(3 @ 3(3)))",
    "3(3(3 @ 3 @ 3(3)))",
    "3(3(3 @ 3(3 @ 3)))",
    "3(3(3(3 @ 3 @ 3)))",

    "3(3 @ 3(3 @ 3(3(3 @ 3))))",
    "3(3(3 @ 3(3 @ 3(3 @ 3))))",
    "3(3(3 @ 3(3(3 @ 3))))",
    "3(3 @ 3(3(3 @ 3(3 @ 3 @ 3))))",
    */

  var difficultEquationList = [];
  function generateEquations(quantity) {
    //Equation storage
    difficultEquationList = [];
    var customEquations = [];

    getEquations();
    function getEquations() {
      axios
        .get(
          `http://localhost:80/Prototype-Vite/my-project/api/getEquation/Difficult`
        )
        .then(function (response) {
          console.log(response.data);
          let responseData = response.data;
          var newArray = [];
          for (let i = 0; i < responseData.length; i++) {
            var tempArray = [];
            var result = Object.keys(responseData[i]).map((key) => [
              key,
              responseData[i][key],
            ]);

            for (let j = 0; j < result.length; j++) {
              tempArray.push(result[j][1]);
            }
            console.log(tempArray);

            let data = JSON.stringify(tempArray[0]);
            data = data.replace(/"/g, "");

            newArray.push(data);
          }

          console.log(newArray);
          customEquations = newArray;
          equationProcess();
        });
    }

    function equationProcess() {
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
        difficultEquationList.push(combinedSchema);
      }
      const availableOperations = ["+", "-"]; //Double addition to increase chance

      addOperations();
      changeValues();

      function addOperations() {
        for (let i = 0; i < difficultEquationList.length; i++) {
          let limit = Math.floor(difficultEquationList[i].length / 4); //Quantity of operation symbol
          //console.log(limit);

          for (let j = 0; j < limit; j++) {
            const operation =
              availableOperations[
                Math.floor(Math.random() * availableOperations.length)
              ];
            difficultEquationList[i] = difficultEquationList[i].replace(
              "@",
              operation
            );
          }
        }
      }

      function randomIntFromInterval(min, max) {
        // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
      }

      function changeValues() {
        for (let i = 0; i < difficultEquationList.length; i++) {
          if (difficultEquationList[i].includes("1x")) {
            difficultEquationList[i] = difficultEquationList[i].replace(
              /1x/g,
              "x"
            );
          }
          if (difficultEquationList[i].includes("-1x")) {
            difficultEquationList[i] = difficultEquationList[i].replace(
              /-1x/g,
              "-x"
            );
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

          let limit = Math.floor(difficultEquationList[i].length / 2);

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
            if (difficultEquationList[i].includes(digit)) {
              let search1 = " " + digit + " ";
              let search4 = "\\(" + digit + " ";
              let search5 = " " + digit + "\\)";
              let search6 = "\\(" + digit + "\\)";

              let find1 = new RegExp(search1, "");
              let find4 = new RegExp(search4, "");
              let find5 = new RegExp(search5, "");
              let find6 = new RegExp(search6, "");

              randomPercentage();
              difficultEquationList[i] = difficultEquationList[i].replace(
                find1,
                " " + negativeSymbol + rndInt.toString() + " "
              );
              randomPercentage();
              difficultEquationList[i] = difficultEquationList[i].replace(
                find4,
                "(" + negativeSymbol + rndInt.toString() + " "
              );
              randomPercentage();
              difficultEquationList[i] = difficultEquationList[i].replace(
                find5,
                " " + negativeSymbol + rndInt.toString() + ")"
              );
              randomPercentage();
              difficultEquationList[i] = difficultEquationList[i].replace(
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
            if (difficultEquationList[i].includes(digit)) {
              let search1 = " " + digit + "x ";
              let search4 = "\\(" + digit + "x ";
              let search5 = " " + digit + "x\\)";
              let search6 = "\\(" + digit + "x\\)";

              let find1 = new RegExp(search1, "");
              let find4 = new RegExp(search4, "");
              let find5 = new RegExp(search5, "");
              let find6 = new RegExp(search6, "");

              randomPercentage();
              difficultEquationList[i] = difficultEquationList[i].replace(
                find1,
                " " + negativeSymbol + rndInt.toString() + "x "
              );
              randomPercentage();
              difficultEquationList[i] = difficultEquationList[i].replace(
                find4,
                "(" + negativeSymbol + rndInt.toString() + "x"
              );
              randomPercentage();
              difficultEquationList[i] = difficultEquationList[i].replace(
                find5,
                " " + negativeSymbol + rndInt.toString() + "x)"
              );
              randomPercentage();
              difficultEquationList[i] = difficultEquationList[i].replace(
                find6,
                "(" + negativeSymbol + rndInt.toString() + "x)"
              );
            }
          }

          if (difficultEquationList[i].includes("1x")) {
            difficultEquationList[i] = difficultEquationList[i].replace(
              /1x/g,
              "x"
            );
          }
        }
      }

      const availableVariables = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "k",
        "m",
        "n",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
      ];
      changeVariables();
      function changeVariables() {
        for (let i = 0; i < difficultEquationList.length; i++) {
          const variable =
            availableVariables[
              Math.floor(Math.random() * availableVariables.length)
            ];
          difficultEquationList[i] = difficultEquationList[i].replace(
            /x/g,
            variable
          );
        }
      }

      var indexes = [];
      for (let i = 0; i < difficultEquationList.length; i++) {
        indexes.push(i);
      }

      let customArrayLength = customEquations.length;
      for (let i = 0; i < customArrayLength; i++) {
        let index = indexes[Math.floor(Math.random() * indexes.length)];
        let equation =
          customEquations[Math.floor(Math.random() * customEquations.length)];
        let percentage = Math.random() * 100;
        //65% chance custom equation
        if (percentage <= 65) {
          if (equation !== undefined) {
            //ADD ITEM TO STORAGE ARRAY
            difficultEquationList[index] = equation;

            //REMOVE ITEM FROM ARRAY
            const itemIndex = customEquations.indexOf(equation);
            if (itemIndex > -1) {
              // only splice array when item is found
              customEquations.splice(itemIndex, 1); // 2nd parameter means remove one item only
            }
          }
        }
      }

      console.log(difficultEquationList);
    }
  }

  var getEquationList = function (quantity) {
    generateEquations(quantity);
    return difficultEquationList;
  };

  return {
    getEquationList: getEquationList,
  };
})();

export default EquationGeneratorDifficult;
