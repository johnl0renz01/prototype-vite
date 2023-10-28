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
  function generateEquations(
    quantity,
    minimumValue,
    maximumValue,
    differentVariables
  ) {
    //Equation storage
    averageEquationList = [];

    equationProcess();

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
        ////console.log(combinedSchema)
        averageEquationList.push(combinedSchema);
      }
      const availableOperations = ['+', '+', '-']; //Double operation to increase chance
      const anotherOperations = ['+', '-', '*', '*', '*', '*', '*']; //With multiplication

      addOperations();
      changeValues();

      function addOperations() {
        for (let i = 0; i < averageEquationList.length; i++) {
          let limit = Math.floor(averageEquationList[i].length / 4); //Quantity of operation symbol
          ////console.log(limit);

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
        let minimumRange = minimumValue;
        let maximumRange = maximumValue;
        let rndInt = 0;

        function randomPercentage() {
          rndInt = randomIntFromInterval(minimumRange, maximumRange);
        }

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

          let limit = Math.floor(averageEquationList[i].length / 2);

          var tempEquation = averageEquationList[i];

          for (let j = 1; j < limit; j++) {
            //console.log(tempEquation);
            let hashSymbols = '';
            let constant = tempEquation.lastIndexOf('3');
            let coefficient = tempEquation.lastIndexOf('2');

            if (constant > coefficient) {
              coefficient = -1;
            } else {
              constant = -1;
            }

            randomPercentage();
            for (let z = 0; z < rndInt.toString().length; z++) {
              hashSymbols = hashSymbols + '#';
            }

            if (constant >= 0) {
              averageEquationList[i] =
                averageEquationList[i].substring(0, constant) +
                rndInt.toString() +
                averageEquationList[i].substring(constant + 1);
              tempEquation =
                tempEquation.substring(0, constant) +
                hashSymbols +
                tempEquation.substring(constant + 1);
            } else if (coefficient >= 0) {
              averageEquationList[i] =
                averageEquationList[i].substring(0, coefficient) +
                rndInt.toString() +
                averageEquationList[i].substring(coefficient + 1);
              tempEquation =
                tempEquation.substring(0, coefficient) +
                hashSymbols +
                tempEquation.substring(coefficient + 1);
            } else {
              break;
            }
          }

          if (averageEquationList[i].includes('1x')) {
            var count = (averageEquationList[i].match(/1x/g) || []).length;
            averageEquationList[i] = averageEquationList[i].replace(
              /1x/g,
              '@@'
            );
            for (let counter = 0; counter < count; counter++) {
              let indexChar = averageEquationList[i].indexOf('@@');
              try {
                if (averageEquationList[i][indexChar - 1].match(/[\(]/)) {
                  averageEquationList[i] = averageEquationList[i].replace(
                    '@@',
                    'x'
                  );
                  continue;
                }

                try {
                  if (averageEquationList[i][indexChar - 1].match(/[\-]/)) {
                    averageEquationList[i] = averageEquationList[i].replace(
                      '@@',
                      'x'
                    );
                    continue;
                  }
                } catch (err) {}

                if (
                  averageEquationList[i][indexChar - 2].match(/[\+\-\*\/\=]/)
                ) {
                  averageEquationList[i] = averageEquationList[i].replace(
                    '@@',
                    'x'
                  );
                } else {
                  averageEquationList[i] = averageEquationList[i].replace(
                    '@@',
                    '1x'
                  );
                }
              } catch (err) {
                averageEquationList[i] = averageEquationList[i].replace(
                  '@@',
                  'x'
                );
              }
            }
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

      if (differentVariables == 'TRUE') {
        changeVariables();
      }

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
    }
  }

  var getEquationList = function (
    quantity,
    minimumValue,
    maximumValue,
    differentVariables
  ) {
    generateEquations(quantity, minimumValue, maximumValue, differentVariables);
    return averageEquationList;
  };

  return {
    getEquationList: getEquationList,
  };
})();

export default EquationGeneratorAverage;
