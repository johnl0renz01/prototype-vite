var EquationSolver = (function () {
  var questionString = '';
  var equation = '';
  var equationSteps = [];
  var currentCoefficientLetter = '';

  var equationFraction = '';

  var getEquationAnswer = function () {
    try {
      //Power or raise to is not yet implemented, therefore consider as invalid
      if (equation.indexOf('^') > -1) {
        equation = 'invalid';
        return equation;
      }
      equation = equation.replace(/\s/g, '');
      if (equation.split('=').length - 1 > 1) {
        equation = 'invalid';
        return equation;
      }

      //console.log("equation: " + equation + "\n\n");

      // Separate the left-hand and right-hand side of the equation
      var [lhs, rhs] = equation.split('=').map(side => side.trim());

      var checkLHS = false;
      var checkRHS = false;

      if (lhs[0].match(/[\-]/)) {
        lhs = ['0', lhs, '='].join('');
      } else {
        lhs = ['0+', lhs, '='].join('');
      }

      if (rhs[0].match(/[\-]/)) {
        rhs = ['0', rhs, '='].join('');
      } else {
        rhs = ['0+', rhs, '='].join('');
      }

      var coefficientLetter = '';
      var errorOccured = false;

      checkLHS = true;
      checkParenthesis(lhs);
      checkRHS = true;
      checkParenthesis(rhs);

      currentCoefficientLetter = coefficientLetter;

      for (let i = 1; i < equation.length; i++) {
        let firstCharacter = equation[i - 1];
        let secondCharacter = equation[i];
        if (firstCharacter == coefficientLetter) {
          if (secondCharacter == coefficientLetter) {
            errorOccured = true;
            break;
          } else if (secondCharacter.match(/[0-9]/)) {
            errorOccured = true;
            break;
          }
        }
      }

      if (errorOccured) {
        equation = 'invalid';
        return equation;
      }

      function checkParenthesis(currentString) {
        for (let i = 1; i < currentString.length; i++) {
          if (currentString[i].match(/[a-z]/)) {
            let coeffLetter = currentString[i];
            if (currentString[i - 1].match(/[\+\-\*\/\(]/)) {
              currentString =
                currentString.substring(0, i) +
                '1' +
                coeffLetter +
                currentString.substring(i + 1);
            }
          }
        }

        let coefficientSymbol = '';
        for (let i = 1; i < currentString.length; i++) {
          if (currentString[i].match(/[a-z]/)) {
            if (coefficientLetter == '') {
              coefficientSymbol = currentString[i];
              coefficientLetter = coefficientSymbol;
            } else if (coefficientLetter != currentString[i]) {
              errorOccured = true;
              break;
            }
          }

          if (currentString[i].match(/[\(]/) && i > 0) {
            if (
              currentString[i - 1].match(/^[a-z]+$/) ||
              currentString[i - 1].match(/^[0-9]+$/)
            ) {
              currentString =
                currentString.substring(0, i) +
                '*(' +
                currentString.substring(i + 1);
            }
          }

          if (currentString[i].match(/[\)]/) && i > 0) {
            if (currentString[i + 1].match(/^[0-9]+$/)) {
              currentString =
                currentString.substring(0, i) +
                ')*' +
                currentString.substring(i + 1);
            }
          }

          if (currentString[i].match(/[=]/)) {
            //ABC //console.log("break");
            break;
          }
        }

        if (checkLHS) {
          //ABC //console.log(currentString);
          lhs = currentString;
          checkLHS = false;
        } else if (checkRHS) {
          //ABC //console.log(currentString);
          rhs = currentString;
          checkRHS = false;
        }
      }

      //  //console.log(lhs);
      // //console.log(rhs);

      //Positive symbol for the first digit if not negative
      /*
        function checkSymbol (currentString) {
            let tempString = currentString;
            if (currentString[0] != "-") {
                currentString = "+";
                currentString = currentString.concat(tempString);
                if (checkLHS) {
                    lhs = currentString;
                    checkLHS = false;
                } else if (checkRHS) {
                    rhs = currentString;
                    checkRHS = false;
                }
            }
        }

        checkSymbol(lhs);
        checkSymbol(rhs);
        */

      //ABC //console.log("lhs: " + lhs);
      //ABC //console.log("rhs: " + rhs);
      //ABC //console.log("************");

      var lhsFinalCoefficient = '';
      var lhsFinalConstant = '';
      var rhsFinalCoefficient = '';
      var rhsFinalConstant = '';

      var LHScoefficientSymbol = '';
      var RHScoefficientSymbol = '';
      var coefficientSymbol = '';

      var computeLHS = false;
      var computeRHS = false;

      computeLHS = true;
      getValues(lhs, lhsFinalCoefficient, lhsFinalConstant);

      //ABC //console.log("lhs coefficient: " + lhsFinalCoefficient);
      //ABC //console.log("lhs constant: " + lhsFinalConstant);

      // FOR LHS
      function getValues(currentString, currentCoefficient, currentConstant) {
        // //console.log("\n================\n================\n================\n================\n================");
        var coefficient = '';
        //Multiplication or Division Symbol Index
        var MDindex = 0;
        var coefficientIndex = currentString.length;
        var resetCoefficientIndex = false;
        var MDsymbol = false;
        var MDsymbolAfter = false;
        var symbolType = '';

        var isCoefficient = false;
        var sliceIndex = 0;
        var index = 0;
        var lastIndex = 0;

        // Check if equal symbol is in first set of digit
        var equalOccurence = true;

        // Check if negative symbol is in first set of digit
        var negativeCoefficient = false;

        // Temporary FOR MULTIPLICATION '*'
        var tempCoefficient = '';
        var coefficientTerm = '';

        var coefficientString = '';
        var coefficientQuantity = 0;
        var evaluateCoefficient = false;

        // value of i, passed to count variable
        var count = 0;
        var firstCoefficientFinish = false;

        // PARENTHESIS
        var openParenthesis = false;
        var closeParenthesis = false;

        var parenthesisTally = 0;

        var parenthesisCase = 0;
        var firstParenthesisIndex = null;
        var insideParenthesisIndex = null;
        var insideParenthesisTally = 0;
        var isInsideParenthesis = false;

        var lastParenthesisIndex = null;
        var closeParenthesisIndex = null;
        //tally for coefficient inside parenthesis
        var coeffInsideTally = 0;
        var firstOccurence = true;

        for (let i = 1; i < currentString.length; i++) {
          count = i;

          if (!isCoefficient) {
            isCoefficient = true;
            sliceIndex = lastIndex;
          }

          if (currentString[i].match(/^[0-9]+$/) === null) {
            // CHECK IF symbol is present

            if (currentString[i].match(/[\(]/)) {
              //ABC //console.log("YEHEY TUMAMA KA IIDOL");
              openParenthesis = true;
              parenthesisTally++;

              if (firstParenthesisIndex === null) {
                firstParenthesisIndex = i;
                coeffInsideTally = 0;
              }
            } else if (currentString[i].match(/[\)]/)) {
              //ABC //console.log("KATAPUSAN MO NA IDOLO");
              let isFinished = true;
              closeParenthesis = true;

              let parenthesisExpression;
              if (parenthesisCase === 1) {
                //  //console.log("CASE 1: " + currentString);

                i += parenthesisTally;
                let closeParenthesisIndex = i;

                parenthesisExpression = [
                  '*',
                  currentString.slice(
                    firstParenthesisIndex,
                    closeParenthesisIndex
                  ),
                ].join('');

                /*
                            for (let j = 0; j < parenthesisTally; j++) {
                                parenthesisExpression = parenthesisExpression.concat(")");
                            }
                            */
                /*
                            //console.log("START OF ASD: " + currentCoefficient);
                            //console.log("START OF ASD: " + currentConstant);
                            //console.log("PARR EXPREFASCS : " + parenthesisExpression);
                            */
                currentCoefficient = currentCoefficient.concat(
                  parenthesisExpression
                );
                currentConstant = currentConstant.replace(
                  parenthesisExpression,
                  ''
                );
                /*
                            //console.log("END OF ASD: " + currentCoefficient);
                            //console.log("END OF ASD: " + currentConstant);
                            //console.log("INDEXINDEIXINDEX: " + coefficientIndex);
                            //console.log("main index: " + i);
                            //console.log("mgdg 232: " + currentString[i]);
                            */

                if (currentString[i].match(/[*]/)) {
                  MDindex = i;
                  MDsymbolAfter = true;
                  symbolType = '*';
                }
                parenthesisCase = 0;
              } else if (parenthesisCase === 2) {
                //   //console.log("Curr coeff: " + currentCoefficient)
                // //console.log("Curr const: " + currentConstant)
                //   //console.log("CASE 2: " + currentString);

                i += parenthesisTally;
                let closeParenthesisIndex = i;

                parenthesisExpression = [
                  '*',
                  currentString.slice(
                    insideParenthesisIndex,
                    closeParenthesisIndex
                  ),
                ].join('');

                let closingParenthesis = '';
                //  //console.log("insideParenthesisTally: " + insideParenthesisTally)
                for (let j = 0; j < insideParenthesisTally; j++) {
                  closingParenthesis = closingParenthesis.concat(')');
                }

                //   //console.log("currentCoefficient: " + currentCoefficient)

                currentCoefficient = currentCoefficient.concat(
                  parenthesisExpression
                );

                //  //console.log("currentCoefficient: " + currentCoefficient)

                currentConstant = currentConstant.replace(
                  parenthesisExpression,
                  closingParenthesis
                );

                insideParenthesisIndex = 0;

                //ABC //console.log("ASD @#@)_ @#(JGKDGKDGK:   " + currentString[i]);
                if (currentString[i].match(/[*]/)) {
                  MDindex = i;
                  MDsymbolAfter = true;
                  symbolType = '*';
                }

                isInsideParenthesis = true;
                parenthesisCase = 0;
              } else if (coeffInsideTally > 0) {
                //  //console.log("CASE 3:")
                let closeParenthesisSymbol = '';
                //  //console.log(currentString[i+1])
                if (currentString[i + 1].match(/[\+\-\*]/)) {
                  ////console.log("???");
                  parenthesisTally--;

                  isFinished = false;
                  insideParenthesisTally--;
                  ////console.log("Inside parenthesis tally: " + insideParenthesisTally);

                  for (let j = 0; j < insideParenthesisTally; j++) {
                    closeParenthesisSymbol = closeParenthesisSymbol.concat(')');
                  }

                  if (closeParenthesisSymbol == '') {
                    closeParenthesisSymbol = ')';
                  }

                  //    //console.log("Close parenth symbol: " + closeParenthesisSymbol);
                  closeParenthesisIndex = i;
                } else {
                  //     //console.log("IN ELSE: " + insideParenthesisTally)
                  i += parenthesisTally;
                  for (let j = 0; j < insideParenthesisTally; j++) {
                    closeParenthesisSymbol = closeParenthesisSymbol.concat(')');
                  }
                  isInsideParenthesis = true;
                  coeffInsideTally = 0;
                }

                //   //console.log("CASE 3: " + currentString);
                //   //console.log("CASE 3 with i: " + currentString[i]);

                currentCoefficient = currentCoefficient.concat(
                  closeParenthesisSymbol
                );

                if (currentString[i].match(/[*]/)) {
                  MDindex = i;
                  MDsymbolAfter = true;
                  symbolType = '*';
                }

                //ABC //console.log("sURRENT COEFFIICIENT: " + currentCoefficient);
              }

              //  //console.log(firstParenthesisIndex);

              for (let j = currentConstant.length - 1; j > 0; j--) {
                if (currentConstant[j] == '(') {
                  if (currentConstant[j + 1] == ')') {
                    currentConstant =
                      currentConstant.substring(0, j) +
                      '(0' +
                      currentConstant.substring(j + 1);
                    break;
                  }
                }
              }

              if (isFinished) {
                parenthesisTally = 0;
                openParenthesis = false;
                firstParenthesisIndex = null;
                lastParenthesisIndex = null;
                closeParenthesisIndex = null;
              }

              currentCoefficient = currentCoefficient.replace(
                coefficientSymbol,
                ''
              );
              //  //console.log("Curr coeff: " + currentCoefficient)
              //  //console.log("Curr const: " + currentConstant)
            }

            if (!openParenthesis) {
              if (currentString[i].match(/[\+\-\*\/]/)) {
                //ABC //console.log("63479063434906437063406903467904390:   " + currentString[i]);
                if (
                  resetCoefficientIndex &&
                  currentString[i - 1].match(/[*]/) === null
                ) {
                  coefficientIndex = currentString.length;
                  resetCoefficientIndex = false;
                } else if (resetCoefficientIndex) {
                  coefficientIndex = currentString.length;
                  resetCoefficientIndex = false;
                }

                /*
                            //console.log(": ");
                            //console.log("I ^@^@^@: " + (i));
                            //console.log("Current COEFF ^@^@^@: " + (coefficientIndex));
                            //console.log(": ");
                            */
                if (currentString[i].match(/[*]/) && i < coefficientIndex) {
                  MDindex = i;
                  //ABC //console.log("THE MD INDEX IS @#@#@#@#@: " + MDindex);
                }
                equalOccurence = false;
                //ABC //console.log("Checking COEFFICIENT: " + currentCoefficient);
                replaceOperators();
                //ABC //console.log("Checking COEFFICIENT 2222: " + currentCoefficient);
              }
            }

            if (currentString[i].match(/=/)) {
              if (equalOccurence) {
                currentConstant = currentString.replace('=', '');
              } else if (currentConstant === '') {
                currentConstant = currentString;
              }
              //ABC //console.log(currentConstant);
              //ABC //console.log(currentCoefficient);
              //replaceOperators();
              currentConstant = currentConstant.replace('=', '');
              currentCoefficient = currentCoefficient.replace('=', '');
            }

            if (!equalOccurence) {
              isCoefficient = false;
              index++;
              lastIndex = i + 1;
            }

            if (currentString[i].match(/[a-z]/)) {
              //ABC //console.log("sURRENT COEFFIICIENT: " + currentCoefficient);
              //ABC //console.log("ETO PASOK SA BANGA!!!!!!!!!!!!!!!!!!:  " + currentString[i]);
              if (currentString[sliceIndex] === '-' && !negativeCoefficient) {
                //ABC //console.log("IS NEGATIVE!! ");
                negativeCoefficient = true;
              }

              // IF coefficient inside parenthesis, increment.
              if (openParenthesis && parenthesisTally > 0) {
                coeffInsideTally++;
                if (insideParenthesisTally === 0) {
                  insideParenthesisTally = parenthesisTally;
                }
              }
              // Perform coefficient Inside function
              coefficientInside();

              coefficientIndex = i;
              coefficientQuantity++;
              evaluateCoefficient = true;
              equalOccurence = false;

              // IF THE NEXT symbol of coefficient have parenthesis
              // Expression with parenthesis have a minimum length of 4 ex. "2(3)"
              if (currentString.length >= 4) {
                // //console.log("IN LENGTH");
                // //console.log(currentString[i + 2]);
                if (currentString[i + 2] == '(' && parenthesisTally === 0) {
                  if (currentString[i + 1] == '*') {
                    //  //console.log("PASOK SA BANGA LODS IIDOL");
                    openParenthesis = true;
                    parenthesisCase = 1;
                  }
                } else if (
                  currentString[i + 2] == '(' &&
                  parenthesisTally > 0
                ) {
                  if (currentString[i + 1] == '*') {
                    insideParenthesisIndex = i + 2;
                    openParenthesis = true;
                    parenthesisCase = 2;
                  }
                }
              }

              let coefficientFirstIndex = sliceIndex - 1;

              /*
                        //console.log("Slice Indeex: " + sliceIndex);
                        //console.log("Last Inddex: " + lastIndex);
                        //console.log("Coeff SYMBOL: " + coefficientFirstIndex);
                        //console.log("Coeff SYMBOLgdgd: " + (coefficientFirstIndex + 1));
                        
                        if (coefficientFirstIndex > 0) {
                            currentCoefficient = currentCoefficient.concat(currentString.slice(coefficientFirstIndex, (coefficientFirstIndex + 1)));
                        }
                        */

              // CURRENT COEFFICIENT EVALUATED
              coefficientTerm = currentString.slice(
                coefficientFirstIndex,
                lastIndex
              );
              coefficientTerm = coefficientTerm.replace('(', '');
              // //console.log("ZXC: " + coefficientTerm);
              coefficientString = coefficientString.concat(coefficientTerm);
              // //console.log("QWE: " + coefficientString);

              ////console.log("FIRST CURRENT COEFFIICIENT: " + currentCoefficient);
              if (
                currentString
                  .slice(coefficientFirstIndex, coefficientFirstIndex + 1)
                  .match(/[(]/)
              ) {
                coefficientFirstIndex++;
              }

              ////console.log("\nfirst index: " + coefficientFirstIndex);
              ////console.log("\n: " + currentCoefficient);
              currentCoefficient = currentCoefficient.concat(
                currentString.slice(coefficientFirstIndex, lastIndex)
              );

              ////console.log("CURRENT COEFFIICIENT TOP: " + currentCoefficient);
              coefficient = currentCoefficient.slice(-1);

              coefficientSymbol = coefficient;

              // GLOBAL VARIABLE COEFFICIENT
              coefficientLetter = coefficient;

              ////console.log("CURRENT CONSTANT asdad: " + currentConstant);
              if (currentConstant === '') {
                ////console.log("CONSTANT is equal");
                currentConstant = currentString.replace(coefficientTerm, '');
                currentConstant = currentConstant.replace('=', '');
              } else {
                ////console.log("CONSTANT is else");
                ////console.log("coeff term: " + coefficientTerm)
                currentConstant = currentConstant.replace(coefficientTerm, '');
              }
              ////console.log("coeff term: " + coefficientTerm)
              ////console.log("COEFFICIENT:  " + currentCoefficient);
              ////console.log("CURRENT CONSTANT: " + currentConstant);

              currentCoefficient = currentCoefficient.replace(coefficient, '');
              ////console.log("LAST CURRENT COEFFIICIENT: " + currentCoefficient);
              //ABC //console.log
              // PROCEED TO NEXT INDEX, AFTER coefficient
              lastIndex++;
              replaceOperators();
            }
          }

          /*
                //console.log("BORDER=======");
            //console.log("IM IN MDSYMBOL AFTER'''''''!!!!asdsada:" + currentString[i]);
            //console.log("IM IN MDSYMBOL AFTER'''''''!!!! I:" + i);
            //console.log("IM IN MDSYMBOL AFTER'''''''!!!! coefficientIndex:" + (coefficientIndex + 1));
            //console.log("BORDER=======");
            */
          if (coefficientIndex + 1 === i) {
            resetCoefficientIndex = true;
            //ABC //console.log("ARSJFHSAJKFSJ RAF ARFA RAF ARFARAF=======");
            if (currentString[i].match(/[*]/)) {
              //ABC //console.log("MD SYMBOL IS NOW TRUE ");
              symbolType = '*';
              MDsymbolAfter = true;
            } else if (currentString[i].match(/[\+\-\/]/)) {
              //ABC    //console.log("RESET RESET RESET RESET RESET RESET=======");

              if (coefficientQuantity === 1) {
                firstCoefficientFinish = true;
              }
            }
          }

          if (parenthesisCase != 1 && parenthesisCase != 2) {
            if (MDsymbolAfter) {
              //ABC //console.log("IM IN MDSYMBOL AFTER'''''''!!!!")
              if (closeParenthesis) {
                for (let j = i + 1; j < currentString.length; j++) {
                  if (currentString[j].match(/[\+\-\/\=]/)) {
                    tempCoefficient = currentString.slice(i, j);

                    if (!isInsideParenthesis) {
                      currentConstant = currentConstant.replace(
                        tempCoefficient,
                        ''
                      );
                    }
                    isInsideParenthesis = false;
                    break;
                  }
                }
                closeParenthesis = false;
              } else {
                //ABC //console.log("IM IN ELSE!@!@!@!@!")
                for (
                  let j = coefficientIndex + 1;
                  j < currentString.length;
                  j++
                ) {
                  if (currentString[j].match(/[\+\-\/\=]/)) {
                    //ABC    //console.log("J index:  " + j);
                    //ABC   //console.log("coeff Index " + coefficientIndex);

                    //ABC    //console.log("BEFORE curr coeff: " + currentCoefficient );
                    tempCoefficient = currentString.slice(
                      coefficientIndex + 1,
                      j
                    );
                    //ABC    //console.log("temp coeff " + tempCoefficient);
                    currentConstant = currentConstant.replace(
                      tempCoefficient,
                      ''
                    );
                    //ABC //console.log("TEMP COEFF: " + tempCoefficient);
                    break;
                  }
                }
              }

              if (symbolType === '*') {
                currentCoefficient = currentCoefficient.concat(tempCoefficient);
                //ABC    //console.log("AFTER curr coeff: " + currentCoefficient );
              }

              if (coefficientQuantity === 1) {
                firstCoefficientFinish = true;
              }

              //coefficientIndex = currentString.length;
            }
          }
          //ABC   //console.log("Current COEFF ^@^@^@: " + (coefficientIndex));
          tempCoefficient = '';

          /*
                    //console.log("evaluateCoefficient :+_+_+_+_+: " + evaluateCoefficient);
                    //console.log("MDsymbol :+_+_+_+_+: " + MDsymbol);
                    //console.log("MDindex :+_+_+_+_+: " + MDindex);
                    */
          let tempConstant = currentConstant;
          if (evaluateCoefficient) {
            if (MDsymbol && MDindex != 0) {
              //ABC //console.log("BEFORE MD SYMBOL LETSZFXZFOZPGO: ");
              /*
                        //console.log(" ");
                        //console.log("IM IN MDSYMBOL!!!!");
                        //console.log(" ");
                        //console.log("MDindex :" + MDindex);
                        //console.log("currentCoefficient: " + currentCoefficient );
                        */
              // FOR MULTIPLICATION
              let isParenthesis = false;
              let parenthesisCount = 0;
              let firstParenthesisIndex = 0;

              for (let j = MDindex; j >= 0; j--) {
                if (currentString[j].match(/[\)]/)) {
                  isParenthesis = true;
                  parenthesisCount++;
                }

                if (currentString[j].match(/[\(]/)) {
                  parenthesisCount--;
                  if (parenthesisCount === 0) {
                    firstParenthesisIndex = j;
                    isParenthesis = false;
                  }
                }

                if (!isParenthesis) {
                  // //console.log("IM HERE!" + currentString);
                  if (currentString[j].match(/[\+\-\/]/)) {
                    tempCoefficient = currentString.slice(j, MDindex);
                    //ABC //console.log("LOOB NG FOR temp coeff: " + tempCoefficient );
                    currentConstant = currentConstant.replace(
                      tempCoefficient,
                      ''
                    );
                    //ABC //console.log("CURRENT COSNTNASTN: " + currentConstant );
                    break;
                  }
                }
              }
              if (symbolType === '*') {
                //!@#$% //console.log("coefficientIndex : " + coefficientIndex );
                if (coefficientIndex === 1) {
                  coefficientIndex = 0;
                }
                //removeLastTerm();
                if (tempConstant != currentConstant) {
                  if (firstCoefficientFinish) {
                    // PALATANDAAN
                    removeLastTerm();
                    currentCoefficient =
                      currentCoefficient.concat(tempCoefficient);

                    //currentCoefficient = currentCoefficient.concat(tempCoefficient);
                  } else {
                    removeLastTerm();
                    currentCoefficient = tempCoefficient;
                  }
                }

                //ABC //console.log("AFTER curr coeff: " + currentCoefficient );
              }
            }
            MDsymbol = false;
            evaluateCoefficient = false;
          }
          MDsymbolAfter = false;

          tempCoefficient = '';

          ////console.log("ASDASDCURRSTRING:  " + currentString[i])
          // CHECK for previous parenthesis and expression before opening parenthesis
          function coefficientInside() {
            ////console.log("\n\nPERFORMED COEFF INSIDE\n");
            if (coeffInsideTally >= 1 || closeParenthesisIndex != null) {
              //  //console.log("coeffinsidetally === TRUE")
              //console.log("asdad coeff: " + currentCoefficient);
              let coeffParenthesisIndex = firstParenthesisIndex;
              //expression before the opening parenthesis
              let expBeforeIndex = 0;

              for (let j = i; j > firstParenthesisIndex; j--) {
                if (currentString[j].match(/[\(]/)) {
                  coeffParenthesisIndex = j;
                  break;
                }
              }

              for (let j = firstParenthesisIndex; j > 0; j--) {
                if (currentString[j].match(/[\+\-\/]/)) {
                  expBeforeIndex = j;
                  break;
                }
              }

              // //console.log("CURRSTRING3535235325235:  " + currentString[i + 1])
              if (firstOccurence || closeParenthesisIndex == null) {
                //console.log("FIRST IF ")
                firstOccurence = false;
                tempCoefficient = currentString.slice(
                  expBeforeIndex,
                  coeffParenthesisIndex + 1
                );
                removeConstant();
                ////console.log("AWAWAWA: " + tempCoefficient)
              } else {
                //console.log("SECOND IF ");

                if (currentString[i + 1].match(/[\)]/)) {
                  if (closeParenthesisIndex != null) {
                    let expressionBeforeParenthesis = '';
                    let newParenthesisIndex = 0;
                    for (
                      let j = closeParenthesisIndex + 1;
                      j < currentString.length;
                      j++
                    ) {
                      if (currentString[j].match(/[\(]/)) {
                        newParenthesisIndex = j;
                        break;
                      }
                    }

                    for (
                      let j = newParenthesisIndex;
                      j > firstParenthesisIndex;
                      j--
                    ) {
                      if (currentString[j].match(/[\+\-\/]/)) {
                        expBeforeIndex = j;
                        break;
                      }
                    }

                    tempCoefficient = [
                      currentCoefficient,
                      currentString.slice(
                        expBeforeIndex,
                        newParenthesisIndex + 1
                      ),
                    ].join('');

                    //console.log("3123: " + tempCoefficient)
                  }
                }
              }

              //console.log("temp coeff: " + tempCoefficient);
              // mark
              // CHECK IF THERE IS CONSTANT INSIDE PARENTHESIS
              //  //console.log("parenthesisTally: "+ parenthesisTally)
              if (tempCoefficient.slice(-1).match(/[\(]/)) {
              } else {
                if (parenthesisTally > 1) {
                  removeConstant();
                  //  //console.log("TRUETRUETEUREUTEURE")
                }
              }
              if (firstOccurence) {
                //console.log("SDSDS: " + currentCoefficient);
                currentCoefficient = currentCoefficient.concat(tempCoefficient);
              } else {
                //console.log("ZXCZXCCX: " + currentCoefficient);
                if (currentCoefficient > 1) {
                  //console.log("ASDAS");
                  currentCoefficient =
                    currentCoefficient.concat(tempCoefficient);
                } else if (tempCoefficient == '') {
                  currentCoefficient = currentCoefficient;
                } else {
                  //console.log("AGFGFGDAS");
                  currentCoefficient = tempCoefficient;
                }
              }

              // //console.log("CURRE FVEOCEOFCOEFF: " + currentCoefficient);

              function removeConstant() {
                let insideParenthesis = false;
                let firstIndex = 0;
                for (let k = 0; k < tempCoefficient.length; k++) {
                  if (tempCoefficient[k].match(/[\(]/)) {
                    insideParenthesis = true;
                    firstIndex = k + 1;
                    continue;
                  }
                  if (insideParenthesis && firstIndex != k) {
                    let constantTerm = '';
                    let endIndex = 0;

                    // REPLACE THE CONSTANT VALUE TO '!' exclamation symbol
                    // THEN REPLACE exclamation symbol to blank
                    if (tempCoefficient[k].match(/[\+\-\/]/)) {
                      if (tempCoefficient[k - 1].match(/[x]/)) {
                        break;
                      }
                      let anotherTerm = '';
                      //endIndex = k + 1;
                      endIndex = k;
                      constantTerm = tempCoefficient.slice(
                        firstIndex,
                        endIndex
                      );
                      ////console.log("CONSTANTASDASDASDAS: " + constantTerm)
                      for (let l = 0; l < constantTerm.length; l++) {
                        anotherTerm = anotherTerm.concat('!');
                      }
                      constantTerm = anotherTerm;

                      tempCoefficient = [
                        tempCoefficient.substring(0, firstIndex),
                        constantTerm,
                        tempCoefficient.substring(endIndex),
                      ].join('');

                      // //console.log("CONSTANT TERM:" + tempCoefficient);
                      tempCoefficient = tempCoefficient.replace(/!/g, '');
                      // //console.log("CONSTANT TERM:" + tempCoefficient);
                    }
                  }
                }
              }
            }
            /*else if (coeffInsideTally > 1 ) {
                
                if ()
                //console.log("IT'S GREATER THAN ONE")
                 let coeffParenthesisIndex = firstParenthesisIndex;
              //expression before the opening parenthesis
              let expBeforeIndex = 0;

              for (let j = i; j > firstParenthesisIndex; j--) {
                if (currentString[j].match(/[\(]/)) {
                  coeffParenthesisIndex = j;
                  break;
                } else if (currentString[j].match(/[\)]/)) {
                  coeffParenthesisIndex = j;
                  break;
                }
              }

              for (let j = firstParenthesisIndex; j > 0; j--) {
                if (currentString[j].match(/[\+\-\/]/)) {
                  expBeforeIndex = j;
                  break;
                }
              }

              tempCoefficient = currentString.slice(
                expBeforeIndex,
                coeffParenthesisIndex + 1
              );
              //console.log("temp coeff: " + tempCoefficient);
             // //console.log("PARENTHESIS TALLY: " + parenthesisTally)
                if (parenthesisTally > 1) {
                //  //console.log("TRUETRUETEUREUTEURE")
                let insideParenthesis = false;
                let firstIndex = 0;
                
                }
                currentCoefficient = tempCoefficient;
            }
            */

            //REMOVE last term in the coefficient
            //removeLastTerm();
          }

          //REMOVE THE LAST VALUE OF COEFFICIENT, in order to concatenate the temporary coeff
          function removeLastTerm() {
            let coefficient = coefficientTerm.slice(-1);
            var coeffValue = coefficientTerm.replace(coefficient, '');
            let coefficientIndex = currentCoefficient.lastIndexOf(coeffValue);
            //ABC //console.log("TESgsdgsdg : " + currentCoefficient)
            currentCoefficient = currentCoefficient.slice(0, coefficientIndex);
            //ABC //console.log("TESgsdgsdg : " + currentCoefficient)
            tempCoefficient = tempCoefficient.concat(coeffValue);
            //ABC //console.log("TEMPTEMPTEMTPEM: " + tempCoefficient);
          }
        }

        //ABC  //console.log("MD SYMBOL IS : " + MDsymbol);

        function replaceOperators() {
          ////console.log("CURREEEEEEEEEEEEEEEEENTT: " + currentCoefficient);
          // //console.log("CURREEEEEEEEEEEEEEEEENTT: " + coefficientTerm);
          let coefficientLetter = '';
          if (currentCoefficient.slice(-1).match(/[a-z]/)) {
            coefficientLetter = currentCoefficient.slice(-1);
          } else if (currentCoefficient.slice(-1).match(/[+]/)) {
            currentCoefficient = currentCoefficient.replace('+', '');
          } else if (currentCoefficient.slice(-1).match(/[-]/)) {
            currentCoefficient = currentCoefficient.replace('-', '');
          } else if (currentCoefficient.slice(-1).match(/[*]/)) {
            currentCoefficient = currentCoefficient.replace('*', '');
          } else if (currentCoefficient.slice(-1).match(/[/]/)) {
            MDsymbol = true;
            symbolType = '/';
            currentCoefficient = currentCoefficient.replace('/', '');
          }

          //currentString[count - 1] != coefficientLetter &&
          //ABC //console.log("COEFFICIENT  LETTER: " + currentString[count - 1]);
          if (coefficientTerm[0] === '*') {
            // //console.log("ANG PASKO AY SUMAPIT");
            //ABC //console.log("FGASGASGA  count: " + (count - 1));
            MDsymbol = true;
            symbolType = '*';
          } else if (coefficientTerm[0] === '/') {
            MDsymbol = true;
            symbolType = '/';
            currentCoefficient = currentCoefficient.replace('/', '');
          }

          currentCoefficient = currentCoefficient.replace(
            coefficientLetter,
            ''
          );
          //currentConstant = currentConstant.replace(coefficientLetter, "");
        }

        // FOR MULTIPLICATION

        if (computeLHS) {
          if (negativeCoefficient) {
            if (currentCoefficient > 0) {
              lhsFinalCoefficient = currentCoefficient * -1;
            } else {
              lhsFinalCoefficient = currentCoefficient;
            }
          } else {
            ////console.log(lhsFinalCoefficient);
            lhsFinalCoefficient = eval(currentCoefficient);
          }
          LHScoefficientSymbol = coefficient;
          lhsFinalConstant = currentConstant;
          computeLHS = false;
        } else if (computeRHS) {
          if (negativeCoefficient) {
            if (currentCoefficient > 0) {
              rhsFinalCoefficient = currentCoefficient * -1;
            } else {
              rhsFinalCoefficient = currentCoefficient;
            }
          } else {
            ////console.log(rhsFinalCoefficient);
            rhsFinalCoefficient = eval(currentCoefficient);
          }
          RHScoefficientSymbol = coefficient;
          rhsFinalConstant = currentConstant;
          computeRHS = false;
        }
      }

      computeRHS = true;
      getValues(rhs, rhsFinalCoefficient, rhsFinalConstant);
      ////console.log("rhs coefficient: " + rhsFinalCoefficient);
      ////console.log("rhs constant: " + rhsFinalConstant);

      // Solving Process
      //ABC //console.log("*************************");
      // //console.log(rhsFinalConstant);
      lhsFinalConstant = eval(lhsFinalConstant);
      rhsFinalConstant = eval(rhsFinalConstant);

      //ABC //console.log(lhsFinalConstant)
      //ABC //console.log(rhsFinalConstant)

      if (lhsFinalCoefficient === undefined) {
        lhsFinalCoefficient = 0;
      }

      if (rhsFinalCoefficient === undefined) {
        rhsFinalCoefficient = 0;
      }

      if (lhsFinalConstant === undefined) {
        lhsFinalConstant = 0;
      }

      if (rhsFinalConstant === undefined) {
        rhsFinalConstant = 0;
      }

      //ABC //console.log("lhs final constant: " + lhsFinalConstant);
      //ABC //console.log("rhs final constant: " + rhsFinalConstant);

      //ABC //console.log("*************************");

      // FOR STEPS TO GENERATE
      function checkSymbol(currentString) {
        let tempString = currentString;
        if (currentString != '' && currentString != undefined) {
          if (currentString[0].match(/^[0-9]+$/)) {
            currentString = '+';
            currentString = currentString.concat(tempString);
          }
          return currentString;
        }
      }

      var simpleTranspose = false;
      var stepsArray = [];

      function containsMultiplyConstant(str) {
        return /[0-9]\(/.test(str);
      }
      function containsMultiplyCoefficient(str) {
        return /[a-zA-Z]\(/.test(str);
      }

      //console.log(!containsMultiplyConstant(equation) &&!containsMultiplyCoefficient(equation))

      //STARTCODE
      if (
        !containsMultiplyConstant(equation) &&
        !containsMultiplyCoefficient(equation)
      ) {
        simpleTranspose = true;
        var [lhs, rhs] = equation.split('=').map(side => side.trim());
        var tempLHS = '';
        var tempRHS = '';

        var tempConst = '';
        var tempCoeff = '';

        var prevIndex = 0;

        var isCoefficient = false;

        for (let i = 0; i < lhs.length; i++) {
          if (lhs[i].match(/[\+\-]/) && i != 0) {
            if (isCoefficient) {
              tempLHS = tempLHS + lhs.substring(prevIndex, i);
              prevIndex = i;

              isCoefficient = false;
              continue;
            } else {
              tempConst = tempConst + lhs.substring(prevIndex, i);
              prevIndex = i;
            }
          } else if (lhs[i].match(/[a-z]/)) {
            isCoefficient = true;
          }

          if (i == lhs.length - 1) {
            if (!isCoefficient) {
              tempConst = tempConst + lhs.substring(prevIndex, i + 1);
            } else {
              tempLHS = tempLHS + lhs.substring(prevIndex, i + 1);
            }
            break;
          }
        }

        isCoefficient = false;
        prevIndex = 0;

        for (let i = 0; i < rhs.length; i++) {
          if (rhs[i].match(/[\+\-]/) && i != 0) {
            if (isCoefficient) {
              tempCoeff = tempCoeff + rhs.substring(prevIndex, i);
              prevIndex = i;
              isCoefficient = false;
            } else {
              tempRHS = tempRHS + rhs.substring(prevIndex, i);
              prevIndex = i;
            }
          } else if (rhs[i].match(/[a-z]/)) {
            isCoefficient = true;
          }

          if (i == rhs.length - 1) {
            if (isCoefficient) {
              tempCoeff = tempCoeff + rhs.substring(prevIndex, i + 1);
            } else {
              tempRHS = tempRHS + rhs.substring(prevIndex, i + 1);
            }
            break;
          }
        }

        function changeSign(str) {
          if (str == '') {
            return '';
          }
          let tempString = str;
          tempString = tempString.replace(/\-/g, '@');
          tempString = tempString.replace(/\+/g, '-');
          tempString = tempString.replace(/\@/g, '+');
          if (/^[A-Za-z0-9]*$/.test(tempString[0])) {
            tempString = '-' + tempString;
          }

          var inside = false;
          for (let i = 0; i < tempString.length; i++) {
            if (inside) {
              if (tempString[i].match(/[\+]/)) {
                tempString =
                  tempString.slice(0, i) + '-' + tempString.slice(i + 1);
              } else if (tempString[i].match(/[\-]/)) {
                tempString =
                  tempString.slice(0, i) + '+' + tempString.slice(i + 1);
              }
            }

            if (tempString[i].match(/[\(]/)) {
              inside = true;
            }
            if (tempString[i].match(/[\)]/)) {
              inside = false;
            }
          }
          return tempString;
        }

        tempCoeff = changeSign(tempCoeff);
        tempConst = changeSign(tempConst);

        tempLHS = tempLHS + tempCoeff;
        tempRHS = tempRHS + tempConst;

        if (tempLHS.length < 1) {
          tempLHS = '0';
        }

        if (tempRHS.length < 1) {
          tempRHS = '0';
        }

        if (tempLHS[0].match(/[\+]/)) {
          tempLHS = tempLHS.slice(1);
        }

        if (tempRHS[0].match(/[\+]/)) {
          tempRHS = tempRHS.slice(1);
        }

        // FIRST STEP
        stepsArray.push([tempLHS, '=', tempRHS].join(''));
      }

      //ENDCODE

      var lhsCoefficient = lhsFinalCoefficient.toString();
      var lhsConstant = lhsFinalConstant.toString();
      var rhsCoefficient = rhsFinalCoefficient.toString();
      var rhsConstant = rhsFinalConstant.toString();

      /*
      //console.log('lhsCoefficient: ' + lhsCoefficient);
      //console.log('lhsConstant: ' + lhsConstant);
      //console.log('rhsCoefficient: ' + rhsCoefficient);
      //console.log('rhsConstant: ' + rhsConstant);
      */

      if (lhsCoefficient == '0' || lhsCoefficient === undefined) {
        lhsCoefficient = '';
      }

      if (rhsCoefficient == '0' || rhsCoefficient === undefined) {
        rhsCoefficient = '';
      }

      if (lhsConstant == '0' || lhsConstant === undefined) {
        lhsConstant = '';
      }

      if (rhsConstant == '0' || rhsConstant === undefined) {
        rhsConstant = '';
      }

      // FIX SYMBOLS
      if (lhsCoefficient != '' && lhsConstant != '') {
        lhsConstant = checkSymbol(lhsConstant);
      }

      if (rhsCoefficient != '' && rhsConstant != '') {
        rhsConstant = checkSymbol(rhsConstant);
      }

      function reverseOperation(currentString) {
        if (currentString != '' && currentString != undefined) {
          var tempString = currentString.replace('+', '');
          var tempValue = '';
          if (parseInt(currentString) > 0) {
            tempValue = '-';
            tempValue = tempValue.concat(tempString);
          } else {
            tempString = currentString.replace('-', '');
            tempValue = '+';
            tempValue = tempValue.concat(tempString);
          }
          return tempValue;
        }
      }

      function removePlusSymbol(currentString) {
        if (currentString != '' && currentString != undefined) {
          var tempString = currentString.replace('+', '');
          return tempString;
        }
      }

      let checkSimilarity = [
        lhsCoefficient,
        LHScoefficientSymbol,
        lhsConstant,
        '=',
        rhsCoefficient,
        RHScoefficientSymbol,
        rhsConstant,
      ].join('');

      //console.log(checkSimilarity);
      if (!simpleTranspose) {
        if (
          checkSimilarity != equation &&
          !stepsArray.includes(checkSimilarity)
        ) {
          //Push first step, simplify stuffs
          stepsArray.push(
            [
              lhsCoefficient,
              LHScoefficientSymbol,
              lhsConstant,
              '=',
              rhsCoefficient,
              RHScoefficientSymbol,
              rhsConstant,
            ].join('')
          );
        }
      }

      if (rhsCoefficient != '') {
        rhsCoefficient = reverseOperation(rhsCoefficient);
      }
      if (lhsConstant != '') {
        lhsConstant = reverseOperation(lhsConstant);
      }

      if (lhsCoefficient === '') {
        rhsCoefficient = rhsCoefficient.replace('+', '');
      }
      if (rhsConstant === '') {
        lhsConstant = lhsConstant.replace('+', '');
      }

      lhsCoefficient = removePlusSymbol(lhsCoefficient);
      rhsConstant = removePlusSymbol(rhsConstant);

      //Push second step, add/minus to opposite
      checkSimilarity = [
        lhsCoefficient,
        LHScoefficientSymbol,
        lhsConstant,
        '=',
        rhsCoefficient,
        RHScoefficientSymbol,
        rhsConstant,
      ].join('');

      if (rhsConstant == '' || rhsConstant == undefined) {
        if (lhsConstant == '' || lhsConstant == undefined) {
          lhsConstant = '0';
        }
      }

      if (!simpleTranspose) {
        if (checkSimilarity != equation) {
          if (
            checkSimilarity != stepsArray[0] &&
            !stepsArray.includes(checkSimilarity)
          ) {
            stepsArray.push(
              [
                lhsCoefficient,
                LHScoefficientSymbol,
                rhsCoefficient,
                RHScoefficientSymbol,
                '=',
                rhsConstant,
                lhsConstant,
              ].join('')
            );
          }
        }
      }

      ////console.log("lhsFinalCoefficient " + lhsFinalCoefficient)
      ////console.log("lhsFinalConstant " + lhsFinalConstant)
      ////console.log("rhsFinalCoefficient " + rhsFinalCoefficient)
      ////console.log("rhsFinalConstant " + rhsFinalConstant)

      const coefficientDifference = rhsFinalCoefficient - lhsFinalCoefficient;
      const constantDifference = lhsFinalConstant - rhsFinalConstant;

      var finalCoefficient = [lhsCoefficient, rhsCoefficient].join('');
      var finalConstant = [rhsConstant, lhsConstant].join('');
      finalCoefficient = eval(finalCoefficient);
      finalConstant = eval(finalConstant);

      //Push third step, simplify

      checkSimilarity = [
        finalCoefficient,
        coefficientSymbol,
        '=',
        finalConstant,
      ].join('');

      if (checkSimilarity != equation) {
        if (
          checkSimilarity != stepsArray[0] &&
          checkSimilarity != stepsArray[1] &&
          !stepsArray.includes(checkSimilarity)
        ) {
          if (finalCoefficient == '1') {
            stepsArray.push([coefficientSymbol, '=', finalConstant].join(''));
          } else {
            stepsArray.push(
              [finalCoefficient, coefficientSymbol, '=', finalConstant].join('')
            );
          }
        }
      }
      var x = constantDifference / coefficientDifference;

      equationFraction =
        constantDifference * -1 + '/' + coefficientDifference * -1;

      x = Math.round(x * 100 + Number.EPSILON) / 100;
      ////console.log(`The solution for ${equation} is: x = ${x}`);

      //Check if the equation is similar to solution
      let finalAnswer = coefficientSymbol + '=' + x;
      if (equation == finalAnswer) {
        equation = 'solved';
        return equation;
      }

      //REVERSED
      finalAnswer = x + '=' + coefficientSymbol;
      if (equation == finalAnswer) {
        equation = 'solved';
        return equation;
      }

      //Push fourth step, final answer

      if (!stepsArray.includes([coefficientSymbol, '=', x].join(''))) {
        stepsArray.push([coefficientSymbol, '=', x].join(''));
      }

      let search1 = '1' + coefficientLetter;
      let search2 = '-1' + coefficientLetter;
      let find1 = new RegExp(search1, 'gi');
      let find2 = new RegExp(search2, 'gi');

      for (let i = 0; i < stepsArray.length; i++) {
        let index1 = stepsArray[i].indexOf(search1);
        let index2 = stepsArray[i].indexOf(search2);

        if (index1 >= 0) {
          if (index1 == 0) {
            stepsArray[i] = stepsArray[i].replace(find1, coefficientLetter);
          } else {
            let currentStep = stepsArray[i];
            if (currentStep[index1 - 1].match(/[\+\-\=]/)) {
              stepsArray[i] = stepsArray[i].replace(find1, coefficientLetter);
            }
          }
        }

        if (index2 >= 0) {
          if (index2 == 0) {
            stepsArray[i] = stepsArray[i].replace(
              find2,
              '-' + coefficientLetter
            );
          } else {
            let currentStep = stepsArray[i];
            if (currentStep[index2 - 1].match(/[\+\-\=]/)) {
              stepsArray[i] = stepsArray[i].replace(
                find2,
                '-' + coefficientLetter
              );
            }
          }
        }
      }

      x = x.toString();
      equation = x;
      equationSteps = stepsArray;
      //console.log(equationSteps)
      return equation;
    } catch {
      equation = 'invalid';
      // console.log("NAG INVALID lods");
      return equation;
    }
  };

  var setEquation = function (string) {
    equation = string;
  };

  var getEquationFraction = function () {
    return equationFraction;
  };

  var getEquationSteps = function () {
    return equationSteps;
  };

  var getCoefficientLetter = function () {
    return currentCoefficientLetter;
  };

  return {
    getEquationAnswer: getEquationAnswer,
    setEquation: setEquation,
    getEquationFraction: getEquationFraction,
    getEquationSteps: getEquationSteps,
    getCoefficientLetter: getCoefficientLetter,
  };
})();

export default EquationSolver;
