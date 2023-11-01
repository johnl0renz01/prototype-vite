import axios from 'axios';

var EquationGeneratorDifficult = (function () {
  const lhsSchemas = [
    // ORIGINAL
    '2x @ 2x @ 3 @ 3',
    '2x @ 3 @ 2x @ 3',
    '2x @ 3 @ 3 @ 2x',
    '3 @ 2x @ 3 @ 2x',
    '3 @ 2x @ 2x @ 3',

    '3(2x)',
    '3(2x @ 3)',
    '3(3 @ 2x @ 3)',

    '3(2x)',
    '3(3 @ 2x)',
    '3(3 @ 3 @ 2x)',

    '3(2x(3(3(3))))',

    '3(3 @ 3(2x) @ 3)',
    '3(3 @ 3(2x) @ 2x)',
    '3(3 @ 3(2x) @ 3(2x))',

    '3(3 @ 3 @ 3(2x))',

    '3(3 @ 2x(3(3(3))))',
    '3(2x @ 3(3(3(3))))',
    '3(2x @ 3 @ 3(3(3(3))))',
    '3(3 @ 2x @ 3(3(3(3))))',
    '3(3 @ 3 @ 2x(3(3(3))))',

    '3(3(3 @ 2x(3(3))))',
    '3(3(2x @ 3(3(3))))',
    '3(3(3 @ 3 @ 2x(3(3))))',

    '3(3(2x))',
    '3(2x(3))',
    '3(3 @ 2x(3))',
    '3(2x @ 3(3))',
    '3(3 @ 3(2x))',
    '3(3 @ 3(2x @ 3))',
    '3(3 @ 3(3 @ 2x))',
    '3(3 @ 3(2x @ 2x))',
    '3(3 @ 3(3 @ 2x @ 2x))',
    '3(3 @ 3(2x @ 3 @ 2x))',

    '3(3 @ 2x(3 @ 3))',
    '3(3 @ 2x(3 @ 3 @ 3))',
    '3(3 @ 2x(3(3 @ 3)))',
    '3(3 @ 2x(3(3 @ 3 @ 3)))',
    '3(3 @ 2x(3(3)))',
  ];

  /* 
  //WORKING  but removed too hard
  '3(3(3(3 @ 2x(3))))',
    '3(3(3(2x @ 3(3))))',
    '3(3(3(2x @ 3 @ 3(3))))',
    '3(3(3(3 @ 2x @ 3(3))))',
    '3(3(3(3 @ 3 @ 2x(3))))',

    '3(3(3(3(3 @ 2x))))',
    '3(3(3(3(2x @ 3))))',
    '3(3(3(3(2x @ 3 @3))))',
    '3(3(3(3(3 @ 2x @ 3))))',
    '3(3(3(3(3 @ 3 @ 2x))))',

    '3(3(3(3(3 @ 2x @ 2x))))',
    endend

    
  //FIX THESE TWO
  '3(2x @ 2x)', //CORRECT test
    '3(2x @ 2x @ 2x)', //CORRECT wrong

  "3(2x @ 3(2x) @ 3)", /WRONG
    "3(2x @ 3(2x) @ 2x)", //CORRECT wrong
    "3(2x @ 3(2x) @ 3(2x))", /CORRECT wrong

    "3(3 @ 3(2x) @ 3)", /CORRECT 
    "3(3 @ 3(2x) @ 2x)", /CORRECT 
    "3(3 @ 3(2x) @ 3(2x))",/CORRECT

    "3(3 @ 3 @ 3(2x))", /CORRECT
    "3(3 @ 2x @ 3(2x))", /WRONG



    
  "3(3 @ 2x(3(3(3))))", /CORRECT
    "3(2x @ 3(3(3(3))))", /CORRECT
    "3(2x @ 3 @ 3(3(3(3))))", /CORRECT
    "3(3 @ 2x @ 3(3(3(3))))", /CORRECT
    "3(3 @ 3 @ 2x(3(3(3))))", /CORRECT

    "3(3(3 @ 2x(3(3))))", /CORRECT
    "3(3(2x @ 3(3(3))))", /CORRECT
    "3(3(2x @ 3 @ 3(3(3))))", /CORRECT wrong
    "3(3(3 @ 2x @ 3(3(3))))", /CORRECT wrong
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

    "3(3(2x @ 2x(3(3))))", /CORRECT wrong
    "3(3(3 @ 2x @ 2x(3(3))))", /CORRECT wrong

    "3(3(3(3 @ 2x @ 2x(3))))", /CORRECT wrong

    "3(3(3(3(3 @ 2x @ 2x))))", /CORRECT

    "3(3(2x))", /CORRECT
    "3(2x(3))", /CORRECT
    "3(3 @ 2x(3))", /CORRECT
    "3(2x @ 3(3))", /CORRECT
    "3(2x @ 2x(3))", /CORRECT wrong
    "3(3 @ 3(2x))", /CORRECT
    "3(3 @ 3(2x @ 3))", /CORRECT
    "3(3 @ 3(3 @ 2x))", /CORRECT
    "3(3 @ 3(2x @ 2x))", /CORRECT
    "3(3 @ 3(3 @ 2x @ 2x))", /CORRECT
    "3(3 @ 3(2x @ 3 @ 2x))", /CORRECT 
    "3(3 @ 3(2x @ 2x @ 3))", /CORRECT  wrong
    "3(3 @ 3(2x @ 2x @ 2x))", /CORRECT wrong

    "3(3 @ 2x(3 @ 3))", /CORRECT
    "3(3 @ 2x(3 @ 3 @ 3))", /CORRECT
    "3(3 @ 2x(3(3 @ 3)))", /CORRECT
    "3(3 @ 2x(3(3 @ 3 @ 3)))", /CORRECT
    "3(3 @ 2x(3(3)))", /CORRECT
  */

  const rhsSchemas = lhsSchemas;

  const additionalSchemas = [
    '2x @ 3',
    '2x @ 3 @ 3',
    '3 @ 2x',
    '3 @ 2x @ 3',
    '3 @ 2x',

    '2x @ 3',
    '2x @ 3 @ 3',
    '3 @ 2x',
    '3 @ 2x @ 3',
    '3 @ 2x',

    '2x @ 3',
    '2x @ 3 @ 3',
    '3 @ 2x',
    '3 @ 2x @ 3',
    '3 @ 2x',

    '2x @ 3 @ 2x',
    '3 @ 2x @ 2x',
    '2x @ 2x @ 3',
    '2x @ 2x @ 3 @ 3',
    '2x @ 3 @ 2x @ 3',
    '2x @ 3 @ 3 @ 2x',
    '3 @ 2x @ 3 @ 2x',
    '3 @ 2x @ 2x @ 3',
    '3 @ 3 @ 2x @ 2',

    '3(3)',
    '3(3 @ 3)',
    '3(3 @ 3 @ 3)',

    '3(3(3))',
    '3(3(3(3)))',
    '3(3(3))',
    '3(3(3(3(3))))',

    '3(3 @ 3(3))',
    '3(3 @ 3 @ 3(3))',
    '3(3(3 @ 3))',
    '3(3(3 @ 3 @ 3))',
    '3(3 @ 3(3 @ 3))',
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
  function generateEquations(
    quantity,
    minimumValue,
    maximumValue,
    differentVariables
  ) {
    //Equation storage
    difficultEquationList = [];
    var customEquations = [];

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
        difficultEquationList.push(combinedSchema);
      }
      const availableOperations = ['+', '-']; //Double addition to increase chance

      addOperations();
      changeValues();

      function addOperations() {
        for (let i = 0; i < difficultEquationList.length; i++) {
          let limit = Math.floor(difficultEquationList[i].length / 4); //Quantity of operation symbol
          ////console.log(limit);

          for (let j = 0; j < limit; j++) {
            const operation =
              availableOperations[
                Math.floor(Math.random() * availableOperations.length)
              ];
            difficultEquationList[i] = difficultEquationList[i].replace(
              '@',
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
        let minimumRange = minimumValue;
        let maximumRange = maximumValue;
        let rndInt = 0;

        function randomPercentage() {
          rndInt = randomIntFromInterval(minimumRange, maximumRange);
        }

        for (let i = 0; i < difficultEquationList.length; i++) {
          if (difficultEquationList[i].includes('1x')) {
            difficultEquationList[i] = difficultEquationList[i].replace(
              /1x/g,
              'x'
            );
          }
          if (difficultEquationList[i].includes('-1x')) {
            difficultEquationList[i] = difficultEquationList[i].replace(
              /-1x/g,
              '-x'
            );
          }

          let limit = Math.floor(difficultEquationList[i].length / 2);

          var tempEquation = difficultEquationList[i];

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
              difficultEquationList[i] =
                difficultEquationList[i].substring(0, constant) +
                rndInt.toString() +
                difficultEquationList[i].substring(constant + 1);
              tempEquation =
                tempEquation.substring(0, constant) +
                hashSymbols +
                tempEquation.substring(constant + 1);
            } else if (coefficient >= 0) {
              difficultEquationList[i] =
                difficultEquationList[i].substring(0, coefficient) +
                rndInt.toString() +
                difficultEquationList[i].substring(coefficient + 1);
              tempEquation =
                tempEquation.substring(0, coefficient) +
                hashSymbols +
                tempEquation.substring(coefficient + 1);
            } else {
              break;
            }
          }

          if (difficultEquationList[i].includes('1x')) {
            var count = (difficultEquationList[i].match(/1x/g) || []).length;
            difficultEquationList[i] = difficultEquationList[i].replace(
              /1x/g,
              '@@'
            );
            for (let counter = 0; counter < count; counter++) {
              let indexChar = difficultEquationList[i].indexOf('@@');
              try {
                if (difficultEquationList[i][indexChar - 1].match(/[\(]/)) {
                  difficultEquationList[i] = difficultEquationList[i].replace(
                    '@@',
                    'x'
                  );
                  continue;
                }

                try {
                  if (difficultEquationList[i][indexChar - 1].match(/[\-]/)) {
                    difficultEquationList[i] = difficultEquationList[i].replace(
                      '@@',
                      'x'
                    );
                    continue;
                  }
                } catch (err) {}

                if (
                  difficultEquationList[i][indexChar - 2].match(/[\+\-\*\/\=]/)
                ) {
                  difficultEquationList[i] = difficultEquationList[i].replace(
                    '@@',
                    'x'
                  );
                } else {
                  difficultEquationList[i] = difficultEquationList[i].replace(
                    '@@',
                    '1x'
                  );
                }
              } catch (err) {
                difficultEquationList[i] = difficultEquationList[i].replace(
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

      //console.log(difficultEquationList);
    }
  }

  var getEquationList = function (
    quantity,
    minimumValue,
    maximumValue,
    differentVariables
  ) {
    generateEquations(quantity, minimumValue, maximumValue, differentVariables);
    return difficultEquationList;
  };

  return {
    getEquationList: getEquationList,
  };
})();

export default EquationGeneratorDifficult;
