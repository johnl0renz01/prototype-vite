import axios from 'axios';

var EquationGeneratorAverage = (function () {
  const lhsSchemas = [
    '2x @ 3',
    '2x @ 3 @ 3',
    '2x @ 3 @ 3 @ 3',
    '3 @ 2x',
    '3 @ 3 @ 2x',
    '3 @ 3 @ 3 @ 2x',
    '3 @ 2x @ 3',
    '3 @ 3 @ 2x @ 3',
    '3 @ 2x @ 3 @ 3',
    '2x @ 2x @ 3',
    '3 @ 2x @ 2x',
    '2x @ 2x @ 2x',
    '3 @ 2x @ 3 @ 2x',
    '2x @ 3 @ 2x @ 3',
  ];
  const rhsSchemas = lhsSchemas;

  /*
  const lhsSchemas = [
    '2x * 3',
    '2x * 3 * 3',
    '3 * 2x',
    '3 * 2x * 3',
    '3 * 2x',
    '3 * 3 * 2x',

    '2x * 3 @ 2x',
    '2x @ 3 * 2x',
    '3 * 2x @ 2x',
    '2x @ 2x * 3',
    '2x @ 2x * 3 @ 3',
    '2x @ 2x @ 3 * 3',
    '2x @ 2x * 3 * 3',

    '2x * 3 @ 2x @ 3',
    '2x @ 3 * 2x @ 3',
    '2x @ 3 @ 2x * 3',
    '2x * 3 @ 2x * 3',
    '2x @ 3 * 2x * 3',

    '2x * 3 @ 3 @ 2x',
    '2x @ 3 @ 3 * 2x',
    '2x @ 3 * 3 @ 2x',
    '2x * 3 * 3 @ 2x',
    '2x @ 3 * 3 * 2x',
    '2x * 3 @ 3 * 2x',

    '3 * 2x @ 3 @ 2x',
    '3 @ 2x * 3 @ 2x',
    '3 @ 2x @ 3 * 2x',
    '3 * 2x * 3 @ 2x',
    '3 * 2x @ 3 * 2x',

    '3 * 2x @ 2x @ 3',
    '3 @ 2x @ 2x * 3',
    '3 * 2x @ 2x * 3',

    '3 * 3 @ 2x @ 2',
    '3 @ 3 @ 2x * 2',
    '3 @ 3 * 2x @ 2',
    '3 * 3 * 2x @ 2',
    '3 @ 3 * 2x * 2',
    '3 * 3 * 2x * 2',
  ];

  const rhsSchemas = lhsSchemas;
  */

  var averageEquationList = [];
  function generateEquations(quantity) {
    //Equation storage
    averageEquationList = [];
    var customEquations = [];

    getEquations();
    function getEquations() {
      axios
        .get(
          `http://localhost:80/Prototype-Vite/my-project/api/getEquation/Average`
        )
        .then(function (response) {
          console.log(response.data);
          let responseData = response.data;
          var newArray = [];
          for (let i = 0; i < responseData.length; i++) {
            var tempArray = [];
            var result = Object.keys(responseData[i]).map(key => [
              key,
              responseData[i][key],
            ]);

            for (let j = 0; j < result.length; j++) {
              tempArray.push(result[j][1]);
            }
            console.log(tempArray);

            let data = JSON.stringify(tempArray[0]);
            data = data.replace(/"/g, '');

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
        var combinedSchema = '';
        var percentage = Math.random() * 100;
        var item1 = lhsSchemas[Math.floor(Math.random() * lhsSchemas.length)];
        var item2 = rhsSchemas[Math.floor(Math.random() * rhsSchemas.length)];
        if (percentage <= 30) {
          item1 = '-' + item1;
        }
        percentage = Math.random() * 100;
        if (percentage <= 30) {
          item2 = '-' + item2;
        }

        percentage = Math.random() * 100;
        if (percentage <= 50) {
          combinedSchema = ' ' + item1 + ' = ' + item2 + ' ';
        } else {
          combinedSchema = ' ' + item2 + ' = ' + item1 + ' ';
        }
        //console.log(combinedSchema)
        averageEquationList.push(combinedSchema);
      }
      const availableOperations = ['+', '+', '-']; //Double operation to increase chance
      const anotherOperations = ['+', '-', '*', '*', '*', '*', '*']; //With multiplication

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
              '@',
              operation
            );
            averageEquationList[i] = averageEquationList[i].replace(
              '*',
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
          if (averageEquationList[i].includes('1x')) {
            averageEquationList[i] = averageEquationList[i].replace(/1x/g, 'x');
          }
          if (averageEquationList[i].includes('-1x')) {
            averageEquationList[i] = averageEquationList[i].replace(
              /-1x/g,
              '-x'
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
              minimumRange = 100;
              maximumRange = 999;
            }
            rndInt = randomIntFromInterval(minimumRange, maximumRange);
          }

          let limit = Math.floor(averageEquationList[i].length / 2);

          for (let j = 1; j < limit; j++) {
            for (let k = 1; k < 10; k++) {
              replaceDigit(k);
              replaceDigit('-' + k);
              replaceDigitCoefficient(k);
              replaceDigitCoefficient('-' + k);
            }
          }

          function replaceDigit(digit) {
            let negativeSymbol = '';

            if (parseInt(digit) < 0) {
              negativeSymbol = '-';
            }
            if (averageEquationList[i].includes(digit)) {
              let search1 = ' ' + digit + ' ';
              let search2 = '\\(' + digit + ' ';
              let search3 = ' ' + digit + '\\)';
              let search4 = '\\(' + digit + '\\)';

              let find1 = new RegExp(search1, '');
              let find2 = new RegExp(search2, '');
              let find3 = new RegExp(search3, '');
              let find4 = new RegExp(search4, '');

              randomPercentage();
              averageEquationList[i] = averageEquationList[i].replace(
                find1,
                ' ' + negativeSymbol + rndInt.toString() + ' '
              );
              randomPercentage();
              averageEquationList[i] = averageEquationList[i].replace(
                find2,
                '(' + negativeSymbol + rndInt.toString() + ' '
              );
              randomPercentage();
              averageEquationList[i] = averageEquationList[i].replace(
                find3,
                ' ' + negativeSymbol + rndInt.toString() + ')'
              );
              randomPercentage();
              averageEquationList[i] = averageEquationList[i].replace(
                find4,
                '(' + negativeSymbol + rndInt.toString() + ')'
              );
            }
          }

          function replaceDigitCoefficient(digit) {
            let negativeSymbol = '';

            if (parseInt(digit) < 0) {
              negativeSymbol = '-';
            }
            if (averageEquationList[i].includes(digit)) {
              let search1 = ' ' + digit + 'x ';
              let search2 = '\\(' + digit + 'x ';
              let search3 = ' ' + digit + 'x\\)';
              let search4 = '\\(' + digit + 'x\\)';

              let find1 = new RegExp(search1, '');
              let find2 = new RegExp(search2, '');
              let find3 = new RegExp(search3, '');
              let find4 = new RegExp(search4, '');

              randomPercentage();
              averageEquationList[i] = averageEquationList[i].replace(
                find1,
                ' ' + negativeSymbol + rndInt.toString() + 'x '
              );
              randomPercentage();
              averageEquationList[i] = averageEquationList[i].replace(
                find2,
                '(' + negativeSymbol + rndInt.toString() + 'x'
              );
              randomPercentage();
              averageEquationList[i] = averageEquationList[i].replace(
                find3,
                ' ' + negativeSymbol + rndInt.toString() + 'x)'
              );
              randomPercentage();
              averageEquationList[i] = averageEquationList[i].replace(
                find4,
                '(' + negativeSymbol + rndInt.toString() + 'x)'
              );
            }
          }

          if (averageEquationList[i].includes('1x')) {
            averageEquationList[i] = averageEquationList[i].replace(/1x/g, 'x');
          }
        }
      }

      const availableVariables = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'k',
        'm',
        'n',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
      ];
      changeVariables();
      function changeVariables() {
        for (let i = 0; i < averageEquationList.length; i++) {
          const variable =
            availableVariables[
              Math.floor(Math.random() * availableVariables.length)
            ];
          averageEquationList[i] = averageEquationList[i].replace(
            /x/g,
            variable
          );
        }
      }

      var indexes = [];
      for (let i = 0; i < averageEquationList.length; i++) {
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
            averageEquationList[index] = equation;

            //REMOVE ITEM FROM ARRAY
            const itemIndex = customEquations.indexOf(equation);
            if (itemIndex > -1) {
              // only splice array when item is found
              customEquations.splice(itemIndex, 1); // 2nd parameter means remove one item only
            }
            console.log('equations');
            console.log(customEquations);
          }
        }
      }

      console.log(averageEquationList);
    }
  }

  var getEquationList = function (quantity) {
    generateEquations(quantity);
    return averageEquationList;
  };

  return {
    getEquationList: getEquationList,
  };
})();

export default EquationGeneratorAverage;
