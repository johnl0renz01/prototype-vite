import axios from 'axios';
import { replace } from 'formik';

var EquationGeneratorEasy = (function () {
  const lhsSchemas = ['2x', '2x @ 3', '2x @ 3 @ 3', '3 @ 2x', '3 @ 2x @ 3'];
  const rhsSchemas = ['2x', '3 ', '3 @ 3 ', '3 @ 3 @ 3'];
  var easyEquationList = [];

  function generateEquations(
    quantity,
    teacherTable,
    occurrenceValue,
    prioritize,
    minimumValue,
    maximumValue,
    differentVariables
  ) {
    console.log(quantity);
    console.log(teacherTable);
    console.log(occurrenceValue);
    console.log(prioritize);
    console.log(minimumValue);
    console.log(maximumValue);
    console.log(differentVariables);

    //Equation storage
    easyEquationList = [];
    var customEquations = [];

    getEquations();
    function getEquations() {
      axios
        .get(`https://pia-sfe.online/api/getEquation/Easy@${teacherTable}`)
        .then(function (response) {
          //console.log(response.data);
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
            //console.log(tempArray);

            let data = JSON.stringify(tempArray[0]);
            data = data.replace(/"/g, '');

            newArray.push(data);
          }

          //console.log(newArray);
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
        ////console.log(combinedSchema)
        easyEquationList.push(combinedSchema);
      }
      const availableOperations = ['+', '-']; //Double addition to increase chance

      addOperations();
      changeValues();

      function addOperations() {
        for (let i = 0; i < easyEquationList.length; i++) {
          let limit = Math.floor(easyEquationList[i].length / 4); //Quantity of operation symbol
          ////console.log(limit);

          for (let j = 0; j < limit; j++) {
            const operation =
              availableOperations[
                Math.floor(Math.random() * availableOperations.length)
              ];
            easyEquationList[i] = easyEquationList[i].replace('@', operation);
          }
        }
      }

      function randomIntFromInterval(min, max) {
        // min and max included
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      function changeValues() {
        for (let i = 0; i < easyEquationList.length; i++) {
          if (easyEquationList[i].includes('1x')) {
            easyEquationList[i] = easyEquationList[i].replace(/1x/g, 'x');
          }

          if (easyEquationList[i].includes('-1x')) {
            easyEquationList[i] = easyEquationList[i].replace(/-1x/g, '-x');
          }

          let rndInt = 0;
          let minimumRange = minimumValue;
          let maximumRange = maximumValue;
          function randomPercentage() {
            rndInt = randomIntFromInterval(minimumRange, maximumRange);
          }

          let limit = Math.floor(easyEquationList[i].length / 2);

          var tempEquation = easyEquationList[i];

          for (let j = 1; j < limit; j++) {
            let hashSymbols = '';
            let constant = tempEquation.lastIndexOf('3');
            let coefficient = tempEquation.lastIndexOf('2');

            randomPercentage();
            for (let z = 0; z < rndInt.toString().length; z++) {
              hashSymbols = hashSymbols + '#';
            }

            if (constant >= 0) {
              easyEquationList[i] =
                easyEquationList[i].substring(0, constant) +
                rndInt.toString() +
                easyEquationList[i].substring(constant + 1);
              tempEquation =
                tempEquation.substring(0, constant) +
                hashSymbols +
                tempEquation.substring(constant + 1);
            } else if (coefficient >= 0) {
              easyEquationList[i] =
                easyEquationList[i].substring(0, coefficient) +
                rndInt.toString() +
                easyEquationList[i].substring(coefficient + 1);
              tempEquation =
                tempEquation.substring(0, coefficient) +
                hashSymbols +
                tempEquation.substring(coefficient + 1);
            } else {
              break;
            }
          }

          if (easyEquationList[i].includes('1x')) {
            easyEquationList[i] = easyEquationList[i].replace(/1x/g, 'x');
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
        for (let i = 0; i < easyEquationList.length; i++) {
          const variable =
            availableVariables[
              Math.floor(Math.random() * availableVariables.length)
            ];
          easyEquationList[i] = easyEquationList[i].replace(/x/g, variable);
        }
      }

      var indexes = [];
      for (let i = 0; i < easyEquationList.length; i++) {
        indexes.push(i);
      }

      let customArrayLength = customEquations.length;
      for (let i = 0; i < customArrayLength; i++) {
        let index = indexes[Math.floor(Math.random() * indexes.length)];
        let equation =
          customEquations[Math.floor(Math.random() * customEquations.length)];
        let percentage = Math.random() * 100;
        //chance of custom equation
        if (percentage <= occurrenceValue) {
          if (equation !== undefined) {
            //ADD ITEM TO STORAGE ARRAY
            //IF PRIORITIZED OR NOT
            if (prioritize == 'TRUE') {
              easyEquationList[i] = equation;
            } else {
              easyEquationList[index] = equation;
            }

            //REMOVE ITEM FROM ARRAY
            const itemIndex = customEquations.indexOf(equation);
            if (itemIndex > -1) {
              // only splice array when item is found
              customEquations.splice(itemIndex, 1); // 2nd parameter means remove one item only
            }
          }
        }
      }

      //console.log(easyEquationList);
    }
  }
  var getEquationList = function (
    quantity,
    teacherTable,
    occurrenceValue,
    prioritize,
    minimumValue,
    maximumValue,
    differentVariables
  ) {
    generateEquations(
      quantity,
      teacherTable,
      occurrenceValue,
      prioritize,
      minimumValue,
      maximumValue,
      differentVariables
    );
    return easyEquationList;
  };

  return {
    getEquationList: getEquationList,
  };
})();

export default EquationGeneratorEasy;
