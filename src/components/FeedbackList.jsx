var FeedbackList = (function () {
  var helpResponse = "";

  var GenerateMessage = function (condition) {
    let message = "";
    // HINT RESPONSE
    // HINT RESPONSE// HINT RESPONSE// HINT RESPONSE
    if (condition == "stepFinal") {
      var messageArray = [
        "Now that the equation is in its simplest form, divide the constant by the coefficient.",
        "With the equation simplified, perform constant divided by the coefficient to solve it.",
        "The equation has been reduced to its simplest form, allowing you to divide the constant by the coefficient.",
        "Since the equation is now at its simplest form, it's time to perform constant divided by the coefficient.",
        "Divide the constant by the coefficient now that the equation is simplified.",
        "Perform constant divided by the coefficient since the equation has been simplified.",
        "You can now safely divide the constant by the coefficient, as the equation is in its simplest form.",
        "Simplify the equation by dividing the constant by the coefficient.",
        "The equation has been simplified, enabling the division of the constant by the coefficient.",
        "Now that you've reduced the equation to its simplest form, perform constant divided by the coefficient.",
        "It's time to divide the constant by the coefficient, as the equation has been simplified.",
        "Now that the equation is simplified, divide the constant by the coefficient.",
        "Perform constant divided by the coefficient to solve the equation, now that it's in its simplest form.",
        "Since the equation has been reduced to its simplest form, it's time to perform constant divided by the coefficient.",
        "After the equation have been simplified, the constant can be divided by the coefficient to solve it.",
        "The equation has been simplified, allowing for the division of the constant by the coefficient to solve it.",
        "Divide the constant by the coefficient. Because equation has been simplified to its simplest form.",
        "Divide the constant by the coefficient to solve the equation.",
        "The equation has been simplified, enabling the division of the constant by the coefficient to solve it.",
        "Perform constant divided by the coefficient to solve the equation, now that it's at its simplest form.",
      ];
      message = messageArray[Math.floor(Math.random() * messageArray.length)];
    } else if (condition == "stepSimplify") {
      var messageArray = [
        "Look for ways to simplify both expressions in the equation.",
        "Try to simplify the expressions on both sides of the equation.",
        "Check if there are any common factors in both expressions that can be simplified.",
        "Simplify both sides of the equation as much as possible.",
        "Try to simplify each term on both sides of the equation.",
        "Look for opportunities to reduce the complexity of both expressions in the equation.",
        "Check if any of the terms in both expressions can be rewritten in a simpler form.",
        "Try to simplify each expression and continue with the process.",
        "Make sure to simplify both expressions before attempting to solve the equation.",
        "You must simplify both expressions as much as possible.",
        "Make simplifying both expressions a priority before proceeding with the equation.",
        "Be sure to simplify both sides of the equation before trying to solve it.",
        "Reduce the expressions on both sides of the equation.",
        "Simplification of both expressions is important to solve the equation.",
        "Pay attention to simplifying both expressions, it may help you solve the equation faster.",
        "Start by simplifying both expressions and then see how they relate to each other.",
        "Try to simplify both expressions by factoring or combining like terms.",
        "Always simplify both sides of the equation before attempting to solve for the unknown variable.",
        "Be sure to simplify all terms on both sides of the equation before proceeding to solve.",
        "Examine the equation for opportunities to make it simpler on both sides.",

        "Simplify the terms on both sides of the equation, if possible.",
        "Identify any similarities in the expressions and simplify accordingly on both sides of the equation.",
        "Look for common factors or terms that can be simplified on both sides of the equation.",
        "Simplify both sides of the equation to their simplest form.",
        "Simplify each term on both sides of the equation to reduce its complexity.",
        "Find ways to make both expressions in the equation simpler.",
        "Check if any terms on both sides of the equation can be rewritten in a more straightforward form.",
        "Prioritize simplifying both expressions in solving the equation.",
        "Next condition is to simplify both expressions in the equation.",
        "Make sure to simplify both expressions before attempting to solve the equation.",
        "You must simplify both sides of the equation.",
        "Simplifying both expressions is essential to solving the equation.",
        "Keep in mind that simplifying both expressions may speed up the equation-solving process.",
        "Start by simplifying both expressions.",
        "Factor or combine like terms to simplify both expressions in the equation.",
        "Always simplify both sides of the equation before solving for the unknown variable.",
        "Before proceeding with solving, simplify all terms on both sides of the equation.",
      ];
      message = messageArray[Math.floor(Math.random() * messageArray.length)];
    } else if (condition == "stepArithmetic") {
      var messageArray = [
        "Both variables and constants must be subject to arithmetic operations to simplify the equation.",
        "Simplification requires performing arithmetic operations on both the variables and the constants.",
        "To simplify the equation, you need to use arithmetic operations on both the variables and constants.",
        "Use arithmetic operations to simplify both the variables and constants in the equation.",
        "Both variables and constants must undergo arithmetic operations to simplify the equation.",
        "Simplifying the equation involves performing arithmetic operations on both the variables and constants.",
        "To simplify the equation, you must use arithmetic operations on both variables and constants.",
        "Perform arithmetic operations on both the variables and constants to simplify the equation.",
        "Use arithmetic operations to simplify both the variables and constants in the equation.",
        "Simplify the equation by performing arithmetic operations on both variables and constants.",
        "Perform arithmetic operations on both variables and constants to make the equation simpler.",
        "Both variables and constants require arithmetic operations to simplify the equation.",
        "Performing arithmetic operations on both variables and constants will simplify the equation.",
        "Simplify the equation by performing arithmetic operations on both variables and constants.",
        "Arithmetic operations must be performed on both variables and constants to simplify the equation.",
        "Performing arithmetic operations on both variables and constants is necessary to simplify the equation.",
        "To simplify the equation, you need to perform arithmetic operations on both variables and constants.",
        "Both variables and constants must be simplified using arithmetic operations to simplify the equation.",
        "Arithmetic operations on both variables and constants will make the equation simpler.",

        "Perform arithmetic operations on both variables and constants to simplify the equation.",
        "Both variables and constants should be manipulated using arithmetic operations to simplify the equation.",
        "Arithmetic operations must be performed on both variables and constants to make the equation simpler.",
        "Simplification of the equation requires the use of arithmetic operations on both variables and constants.",
        "To simplify the equation, manipulate both variables and constants using arithmetic operations.",
        "Both variables and constants need to undergo arithmetic operations for the equation to be simplified.",
        "Simplify the equation by using arithmetic operations on both variables and constants.",
        "Use arithmetic operations on both variables and constants to make the equation simpler.",
        "To make the equation simpler, perform arithmetic operations on both variables and constants.",
        "Arithmetic operations must be used on both variables and constants for the equation to be simplified.",
        "Both variables and constants should be subject to arithmetic operations to simplify the equation.",
        "To simplify the equation, use arithmetic operations on both variables and constants.",
        "Manipulate both variables and constants using arithmetic operations to simplify the equation.",
        "To simplify the equation, perform arithmetic operations on both variables and constants.",
        "Use arithmetic operations on both variables and constants to simplify the equation.",
        "Simplify the equation by manipulating both variables and constants using arithmetic operations.",
        "Both variables and constants must be manipulated using arithmetic operations to simplify the equation.",
      ];
      message = messageArray[Math.floor(Math.random() * messageArray.length)];
    } else if (condition == "stepArrange") {
      var messageArray = [
        "Consider rearranging the equation so that all variables are on one side and all constants are on the other.",
        "Try to move all the variables to one side of the equation and all the constants to the other side.",
        "Reorder the equation so that the variables are isolated on one side and the constants are isolated on the other.",
        "Try to isolate the variables by moving all the constants to the other side of the equation.",
        "Consider switching the sides of the equation so that all variables are on the left and all constants are on the right.",
        "Arrange the equation so that all variables appear on the left-hand side and all constants appear on the right-hand side.",
        "Move all the constants to the right side of the equation and all the variables to the left.",
        "Put all the variables on one side of the equation and all the constants on the other side.",
        "Try to group all the variables together on one side of the equation and all the constants together on the other side.",
        "Reorganize the equation so that all variables are grouped on one side and all constants are grouped on the other.",
        "Shift all the constants to one side of the equation and all the variables to the other side.",
        "Arrange the equation so that all variables are on one side and all constants are on the other side.",
        "Isolate the variables by moving all the constants to the other side of the equation.",
        "Rearrange the equation so that all the variables are together and all the constants are together.",
        "Put all the variables together on one side of the equation and all the constants together on the other side.",
        "Try to separate the variables from the constants by arranging them on opposite sides of the equation.",
        "Organize the equation so that all variables are on the left side and all constants are on the right side.",
        "Consider switching the order of the equation so that variables come before constants.",
        "Move all the constants to one side and all the variables to the other side of the equation.",
        "Try to rearrange the equation so that all variables are on the left-hand side and all constants are on the right-hand side.",

        "Move all of the variables to one side of the equation, and all of the constants to the other side.",
        "Isolate the variables by relocating all of the constants to the opposite side of the equation.",
        "Organize the equation so that all the variables are on the left side, and all the constants are on the right side.",
        "Relocate all of the constants to the right side of the equation, and all of the variables to the left side.",
        "Group all of the variables together on one side of the equation, and all of the constants together on the other side.",
        "Move all of the constants to one side of the equation, and all of the variables to the other side to isolate the variables.",
        "Rearrange the equation so that all of the variables are on one side, and all of the constants are on the other side.",
        "Isolate the variables by transferring all of the constants to the other side of the equation.",
        "Modify the equation so that all the variables are together and all the constants are together.",
        "Put all the variables together on one side of the equation, and all the constants together on the other side.",
        "Attempt to separate the variables and the constants by placing them on opposite sides of the equation.",
        "Arrange the equation such that all the variables are on the left side, and all the constants are on the right side.",
        "Consider swapping the order of the equation so that the variables come before the constants.",
        "Move all the constants to one side and all the variables to the other side to isolate the variables.",
      ];
      message = messageArray[Math.floor(Math.random() * messageArray.length)];
    }

    // CORRECT ANSWER RESPONSE
    // CORRECT ANSWER RESPONSE// CORRECT ANSWER RESPONSE// CORRECT ANSWER RESPONSE// CORRECT ANSWER RESPONSE
    else if (condition == "correct1") {
      var messageArray = [
        "Your solution is correct.",
        "Your solution is right.",
        "You got the solution right.",
        "Well done! Your solution is accurate.",
        "Your solution is accurate.",
        "Your solution is on point.",
        "Your solution is accurate.",
        "Your solution is absolutely on the mark.",
        "Your solution is right on target.",
        "You got the solution right.",
        "Your solution is precisely accurate.",
        "Your solution is exactly what was needed.",
        "Your solution is spot-on!",
      ];
      message = messageArray[Math.floor(Math.random() * messageArray.length)];
    } else if (condition == "correct2") {
      var messageArray = [
        "You really understand this problem.",
        "You did a fantastic job understanding the concepts.",
        "You're doing a brilliant job comprehending this problem.",
        "You understand this problem deeply.",
        "You're doing well and getting a good grasp on this problem.",
        "You're starting to understand this problem.",
        "You clearly understand this problem.",
        "You're making great progress in understanding this problem.",
        "You're seeing the big picture of this problem.",
        "You did an impressive job understanding this problem.",
        "You're mastering this problem.",
        "You have a high level of understanding of this problem.",
        "You've shown great comprehension of this problem.",
        "You're doing an excellent job of understanding this problem.",
        "You've got a good handle on this problem.",
        "You're doing a fantastic job understanding this problem.",
        "You're making real progress in understanding this problem.",
        "You're making great strides in understanding this problem.",
        "You're starting to understand the complexities of this problem.",
        "You're starting to understand the subtle details of this problem.",
      ];
      message = messageArray[Math.floor(Math.random() * messageArray.length)];
    } else if (condition == "correct3") {
      var messageArray = [
        "You have successfully solved the given equation.",
        "You've managed to solve the equation.",
        "You solved the equation correctly.",
        "You have solved the equation as expected.",
        "You have solved the equation correctly.",
        "You have found the solution to the given equation.",
        "You correctly solved the given equation.",
        "You've managed to solve the equation.",
        "You've solved the equation correctly.",
        "You've solved the equation accurately.",
        "You've solved the equation perfectly.",
        "You solved the given equation.",
        "You have solved the given equation.",
        "You've successfully solved the equation.",
        "You have solved the given equation.",
        "You've solved the equation accurately.",
        "You've solved the equation as expected.",
        "You've successfully found the solution to the equation.",
      ];
      message = messageArray[Math.floor(Math.random() * messageArray.length)];
    }

    // CORRECT ANSWER SUBRESPONSE
    // CORRECT ANSWER SUBRESPONSE// CORRECT ANSWER SUBRESPONSE// CORRECT ANSWER SUBRESPONSE// CORRECT ANSWER SUBRESPONSE
    else if (condition == "subCorrect1") {
      var messageArray = [
        "Nice!",
        "Great work!",
        "Fantastic!",
        "Amazing job!",
        "Well done!",
        "Bravo!",
        "Good work!",
        "Splendid!",
        "Splendid job!",
        "Splendid work!",
        "Outstanding work!",
        "Fabulous!",
        "Fabulous work!",
        "Nice work!",
        "Keep it up!",
        "Excellent!",
        "Excellent job!",
        "Amazing work!",
        "Bravo!",
        "Great effort!",
        "Fantastic job!",
        "Impressive work!",
        "Perfectly done!",
        "Outstanding effort!",
        "Awesome!",
        "Nice job!",
        "Keep up the good work!",
        "Incredible!",
        "Brilliantly done!",
        "Fantastic work!",
        "Fantastic!",
        "Great job!",
        "Superb!",
        "Outstanding job!",
        "Nice work!",
        "Good job!",
        "Way to go!",
        "Super job!",
      ];
      message = messageArray[Math.floor(Math.random() * messageArray.length)];
    } else if (condition == "subCorrect2") {
      var messageArray = [
        "Excellent effort!",
        "Brilliant job!",
        "Excellent work!",
        "Brilliant work!",
        "Brilliant effort!",
        "Very well done!",

        "Great work!",
        "Fantastic!",
        "Amazing job!",
        "Splendid!",
        "Splendid job!",
        "Splendid work!",
        "Outstanding work!",
        "Fabulous work!",
        "Keep it up!",
        "Excellent!",
        "Amazing work!",
        "Bravo!",
        "Great effort!",
        "Fantastic job!",
        "Impressive work!",
        "Perfectly done!",
        "Outstanding effort!",
        "Keep up the good work!",
        "Incredible!",
        "Brilliantly done!",
        "Fantastic work!",
        "Fantastic!",
        "Great job!",
        "Superb!",
        "Outstanding job!",
        "Way to go!",
        "Super job!",
      ];
      message = messageArray[Math.floor(Math.random() * messageArray.length)];
    }

    // WRONG ANSWERS
    // WRONG ANSWERS// WRONG ANSWERS// WRONG ANSWERS// WRONG ANSWERS// WRONG ANSWERS
    else if (condition == "wrong1") {
      var messageArray = [
        "Oops, looks like there's a mistake in your answer.",
        "Unfortunately, your answer is incorrect.",
        "I'm sorry, but your answer is not right.",
        "Your answer is not accurate.",
        "Sorry, your answer is incorrect.",
        "Your answer doesn't match the expected solution.",
        "There's an error in your answer.",
        "Your answer is not accurate.",
        "Your solution is incorrect.",
        "Sorry, that's not the correct answer.",
        "Your answer doesn't match the correct solution.",
        "Your answer is wrong.",
        "That's not the right answer.",
        "Your answer isn't quite right.",
        "Your answer needs to be revised as it is wrong.",
        "Your answer is mistaken.",
        "It seems like there's a mistake in your response.",
        "Unfortunately, your answer is incorrect.",
        "Unfortunately, that is not the correct solution.",
      ];
      message = messageArray[Math.floor(Math.random() * messageArray.length)];
    }

    // MOTIVATION
    // MOTIVATION// MOTIVATION// MOTIVATION// MOTIVATION// MOTIVATION// MOTIVATION
    else if (condition == "motivation1") {
      var messageArray = [
        "You have the strength to overcome any obstacle, don't give up!",
        "Challenges are opportunities to discover your hidden potential, keep pushing!",
        "Believe in yourself and your abilities, you are capable of achieving great things!",
        "Every challenge you face is a chance to grow stronger and more resilient.",
        "Setbacks are temporary, your determination is permanent.",
        "You have the power to turn your weaknesses into strengths, keep striving!",
        "Don't let obstacles discourage you, let them motivate you to succeed!",
        "Success is not final, failure is not fatal, keep moving forward!",
        "Perseverance is the key to unlocking your true potential, keep going!",
        "Don't be afraid to fail, it's a stepping stone to success.",
        "The greatest glory in living lies not in never falling, but in rising every time we fall.",
        "You are stronger than you think, keep pushing yourself to new heights!",
        "With hard work and determination, anything is possible!",
        "Your struggles today will become your strengths tomorrow, keep fighting!",
        "Believe in the power of your dreams and the strength of your will.",
        "In the face of adversity, you have the power to rise above and conquer!",
        "Difficulties in life are not roadblocks, they are opportunities to learn and grow.",
        "Strength doesn't come from what you can do, it comes from overcoming the things you thought you couldn't.",
        "You are capable of achieving greatness, don't let anyone or anything hold you back!",
        "The only limit to what you can accomplish is the extent of your determination.",
        "Believe in yourself and your abilities, and you can accomplish anything you set your mind to!",

        "Never give up, you are strong enough to conquer any obstacle!",
        "View challenges as opportunities to unveil your hidden potential, keep striving!",
        "Have faith in yourself and your abilities, you are capable of achieving great things!",
        "Every challenge you encounter is an opportunity to become stronger and more resilient.",
        "Remember that setbacks are only temporary, your perseverance is permanent.",
        "Transform your weaknesses into strengths, keep pushing yourself!",
        "Don't let obstacles dishearten you, let them motivate you to succeed!",
        "Success is not the end, failure is not the end, keep moving forward!",
        "Perseverance is the key to unlocking your true potential, keep going!",
        "Don't be afraid to fail, it's a stepping stone to success.",
        "The greatest glory in life is not never falling, but rising every time you fall.",
        "You are more powerful than you think, keep pushing yourself to new heights!",
        "With hard work and determination, everything is possible!",
        "Your struggles today are your strengths tomorrow, keep fighting!",
        "Believe in the power of your dreams and the strength of your determination.",
        "In the face of adversity, you have the power to rise above and conquer!",
        "Difficulties in life are not obstructions, they are opportunities to learn and grow.",
        "Strength does not arise from what you can do, it arises from overcoming the things you thought you couldn't do.",
        "You are capable of achieving greatness, never let anyone or anything hold you back!",
        "The extent of your determination is the only limit to what you can accomplish.",
        "Trust in yourself and your abilities, and you can achieve anything you set your mind to!",

        "Don't worry, just keep moving forward and you will eventually arrive at the right answer!",
        "Mistakes are opportunities for growth. Try again with a new approach or idea.",
        "You are getting closer to the solution with every attempt, so keep going!",
        "Challenge yourself and keep pushing, and you will eventually find the answer.",
        "Don't get discouraged. Keep trying and you will eventually arrive at the correct answer.",
        "Stay optimistic and keep trying different approaches. The right answer will come!",
        "Perseverance is key to success, so keep at it until you find the answer.",
        "Success takes effort and hard work. Keep working hard and you will eventually find the answer.",
        "Don't be discouraged by a single mistake. Keep trying until you succeed!",
        "With more practice, you will be able to solve this problem. Keep practicing!",
        "Believe in yourself and stay positive. You can do this!",
        "Keep your focus on the end goal and try again. You will eventually find the answer.",
        "Stay determined and don't give up until you find the solution.",
        "Remember, progress is progress no matter how small. Keep going!",
        "Don't give up hope. Keep trying and you will eventually arrive at the right answer.",
        "Have faith in yourself and keep trying. You will eventually get the right answer!",
        "Never give up until you find the solution. Keep trying and you will get there!",
        "Stay attentive and try again. The right answer is just within your reach!",
        "Stay motivated and keep trying. Your success is just around the corner!",
      ];
      message = messageArray[Math.floor(Math.random() * messageArray.length)];
    } else if (condition == "motivation2") {
      var messageArray = [
        "Don't worry, we can figure this out together.",
        "Mistakes happen, let's go through the problem step by step.",
        "Don't be discouraged, let's work on this together.",
        "Let's keep trying and we'll solve this problem.",
        "Let's work together to find the right answer.",
        "Don't give up, let's tackle this challenge together.",
        "We can do this together, let's keep going.",
        "Don't worry, we'll work through this problem until we get it right.",
        "Let's approach this problem from a different angle together.",
        "Keep your head up, we'll solve this together.",
        "Don't feel overwhelmed, we'll figure this out together.",
        "Let's work together to find the solution to this problem.",
        "Don't give up, we'll keep trying until we solve this problem.",
        "We can do this, let's work through the problem together.",
        "Don't let this problem defeat you, let's work on it together.",
        "We'll find the right answer, let's work on this problem together.",
        "Don't worry, we'll get through this problem together.",
        "Let's keep working on this problem until we solve it together.",
        "Don't lose hope, we'll work through this problem together.",
        "We'll figure this out, let's work on this problem together.",

        "Good effort, let's try it again and see if we can get the right answer!",
        "Don't get discouraged, mistakes happen. Let's work through this together!",
        "Close, but not quite. Keep practicing and you'll get it!",
        "Nice try, let's review and try again.",
        "Keep going, you're making progress. Let's keep working on it!",
        "Don't give up, we're almost there!",
        "That's a good start, let's keep going and get it right.",
        "You're on the right track, let's keep going and see if we can find the right answer.",
        "Great attempt, let's review the problem and try again.",
        "It's okay to make mistakes, we learn from them. Let's keep trying!",
        "Almost there, keep pushing!",
        "That's a good effort, let's keep going and try to find the correct answer.",
        "Don't be discouraged, we'll work through this together and find the right answer.",
        "Good job on getting this far, let's keep going and get the answer!",
        "Close, but not quite. Let's work together to find the solution!",
        "Let's not give up now, we're making progress!",
        "You're doing great, let's keep going and figure out the right answer!",
        "Keep trying, we'll get there!",
        "Let's review the problem together and try again. Don't give up!",
        "Don't worry, we'll keep working on it until we get it right!",
      ];
      message = messageArray[Math.floor(Math.random() * messageArray.length)];
    } else if (condition == "motivation3") {
      var messageArray = [
        "Great effort, but let's try again and work through this together!",
        "Mistakes happen, let's learn from them and keep going!",
        "Don't be discouraged by this mistake, we can work together to find the right answer.",
        "Let's tackle this challenge together and keep pushing forward!",
        "Don't give up, we can work on this until we get it right!",
        "Keep trying, you're making progress even with this mistake.",
        "I believe in you, we can work together to find the correct answer.",
        "This is a learning opportunity, let's work together and figure it out!",
        "Let's work on this problem together, we'll get it right!",
        "We all make mistakes, let's learn from this one and keep going!",
        "Don't worry, we can solve this problem together!",
        "Don't give up yet, we'll keep working together until we succeed!",
        "Keep your head up, we can work on this and find the correct answer!",
        "You're capable of finding the right answer, let's work together!",
        "This is just a small setback, we'll work together to overcome it!",
        "Let's work on this problem step by step until we get it right!",
        "Don't be afraid to ask for help, we'll work on this together!",
        "Keep going, we can work together to find the solution!",
        "You're doing great, we just need to keep working together until we get the right answer!",
        "Don't let this mistake discourage you, we'll work on this together until we succeed!",
      ];
      message = messageArray[Math.floor(Math.random() * messageArray.length)];
    } else if (condition == "motivation4") {
      var messageArray = [
        "You're making progress, keep going!",
        "Great effort, let's keep working on it!",
        "Your hard work is paying off, keep practicing!",
        "Don't give up, you're getting closer!",
        "Keep trying, you're on the right track!",
        "Perseverance is key, keep practicing!",
        "Your dedication to learning is admirable, keep going!",
        "Keep up the good work, you'll get it with more practice!",
        "Every mistake is an opportunity to learn, keep trying!",
        "Your determination will help you succeed, keep practicing!",
        "Practice makes perfect, keep going!",
        "Don't be discouraged, you're making strides!",
        "Keep at it, you're making improvements!",
        "You're getting better with each attempt, keep practicing!",
        "Don't give up now, you're almost there!",
        "You're making great strides, keep it up!",
        "Don't let this setback discourage you, keep trying!",
        "You're capable of achieving your goals, keep practicing!",
        "Believe in yourself, you're on the right path!",

        "Don't worry, keep going and you'll get there!",
        "Mistakes happen, try again with a fresh perspective.",
        "Don't give up, you're getting closer with each attempt!",
        "Keep pushing yourself, you'll figure it out soon enough!",
        "Keep your head up and try again, you'll get it eventually!",
        "Stay positive and keep trying, you'll get the right answer!",
        "Perseverance is key, keep at it!",
        "Keep working hard, you'll find the right answer eventually!",
        "Don't let mistake discourage you, keep trying!",
        "Keep at it, you'll be able to solve it with more practice!",
        "Keep your spirits up and try again, you've got this!",
        "Keep your eyes on the prize and try again, you can do it!",
        "Stay determined and keep trying, you'll get the answer!",
        "Keep going, you're making progress!",
        "Don't lose hope, you'll figure it out with more effort!",
        "Believe in yourself and keep trying, you'll get the right answer!",
        "Don't give up, keep trying until you get it right!",
        "Stay focused and try again, you can do this!",
        "Keep trying, the right answer is within reach!",
        "Stay motivated and keep trying, success is just around the corner!",

        "Challenges are opportunities for growth, keep pushing yourself!",
        "Don't be afraid of mistakes, they help you learn and improve!",
        "Believe in yourself, you are capable of overcoming any challenge!",
        "Keep persevering, success is within your reach!",
        "Stay positive and keep working towards your goal!",
        "Every obstacle is a chance to develop your resilience, keep going!",
        "Keep trying, you will find a way to overcome this challenge!",
        "Trust in your abilities and keep moving forward!",
        "Don't give up, you have the strength to overcome this challenge!",
        "Stay motivated and keep pushing yourself to achieve your goals!",
        "You have the power to turn this setback into a success, keep trying!",
        "Your determination will help you overcome any obstacle, keep going!",
        "Keep your head up, you can overcome this challenge!",
        "Don't let this setback define you, keep striving towards your goals!",
        "Stay focused and keep working hard, success is within your reach!",
        "Remember that challenges are opportunities for growth, keep pushing yourself!",

        "I can see your improvement, keep pushing yourself!",
        "Your resilience is inspiring, keep going!",
        "Don't be afraid to make mistakes, they help you learn and grow!",
        "Success is just around the corner, keep practicing!",
        "Your efforts will pay off, keep persevering!",
        "You're capable of achieving great things, keep practicing!",
        "Remember why you started, keep working towards your goals!",
        "Small steps lead to big results, keep taking them!",
        "Challenges are opportunities for growth, keep facing them!",
        "Keep striving, you have the potential to achieve it!",
        "I believe in your abilities, keep practicing!",
        "Your dedication to improvement is admirable, keep it up!",
        "Remember to take your time when you need, but don't give up!",
        "Keep your focus on your goals, you'll get there with persistence!",
        "You're capable of overcoming obstacles, keep trying!",
        "Every effort counts towards your success, keep putting in the work!",
        "Your progress is inspiring, keep up the momentum!",
      ];
      message = messageArray[Math.floor(Math.random() * messageArray.length)];
    }

    // FINISH SESSION FEEDBACK
    // FINISH SESSION FEEDBACK// FINISH SESSION FEEDBACK// FINISH SESSION FEEDBACK// FINISH SESSION FEEDBACK
    else if (condition == "abandonHighest") {
      var messageArray = [
        [
          "Great effort on attempting the questions! Even though you only answered a few, remember that every effort counts. Keep up the good work!",
          "Don't be discouraged by the number of questions you answered. Focus on the ones you attempted and give yourself credit for that. Remember to take your time and review each question carefully.",
          "It's normal to not know everything, so don't worry about the questions you couldn't answer. Keep persevering and try your best. Keep up the good work!",
          "Remember that quality is more important than quantity. Even if you only answered a few questions, make sure you answered them well. Keep up the good work!",
          "Good job on making an attempt at the questions! Remember to take your time and give each question your best shot. Don't worry about the questions you couldn't answer. Keep up the good work!",
          "Every attempt counts, so great job on trying to answer the questions! Don't worry about the ones you couldn't answer. Remember to take your time and review each question carefully. Keep up the good work!",
          "Don't let the number of questions you answered discourage you. Remember that you gave it your best shot, and that's what counts. Keep up the good work!",
          "Even if you only answered a few questions, that's still a great effort! Don't worry about the ones you couldn't answer. Remember to take your time and review each question carefully. Keep up the good work!",
          "Remember that progress takes time and effort. Keep trying your best and don't worry about the questions you couldn't answer. Keep up the good work!",
          "Good job on attempting the questions! Don't be too hard on yourself for the ones you couldn't answer. Remember to take your time and review each question carefully. Keep up the good work!",
        ],
      ];
      message = messageArray[Math.floor(Math.random() * messageArray.length)];
    } else if (condition == "abandonHigh") {
      var messageArray = [
        "Your effort in solving some of the answers correctly is commendable. Keep in mind to allocate sufficient time and focus on each question to ensure accuracy.",
        "Good session! It's essential to take the time to understand each question's requirements to increase your chances of answering correctly.",
        "Your progress is impressive! Remember to review the questions thoroughly to identify the correct answer and avoid errors.",
        "Don't be discouraged if you didn't answer all the questions correctly. Keep practicing and working hard to improve your skills!",
        "Well done on attempting the questions! It's crucial to read each question carefully to identify what is being asked before selecting your response.",
        "Good job on solving some of the answers! Take advantage of the available resources, such as hints or examples, to assist you in comprehending the questions.",
        "Remember to stay focused and avoid rushing through the questions. Taking your time will help you identify and solve the problems more accurately.",
        "Keep practicing! With dedication and effort, you can improve your precision and solve more questions correctly.",

        "Good effort on solving some of the answers correctly. Make sure to take your time and review the questions thoroughly to ensure precision.",
        "Taking your time to review the questions carefully will help improve your accuracy. Well done on getting some answers right!",
        "Keep up the good work, even if you didn't get all the answers right. Remember to review the questions carefully for better performance.",
        "It's important to take your time and review each question thoroughly. Well done on getting some answers correct!",
        "Keep striving for accuracy and take your time to review each question. Even if you didn't get them all right, your effort is commendable.",
        "You're on the right track with some correct answers. Keep reviewing the questions carefully for good performance.",
        "Good job on getting some answers correct! Remember to take your time and review the questions thoroughly for improved accuracy.",
        "Even though you didn't get all the answers right, your effort is appreciated. Keep reviewing the questions carefully for great outcome.",
        "Well done on getting some answers right! Remember to take your time and review each question thoroughly to improve your accuracy.",
        "Your effort is commendable, even if you didn't get all the answers right. Keep reviewing the questions carefully for better precision.",

        "I can see you're putting effort into your work! Remember to take your time and carefully go through each question to ensure accuracy.",
        "Great job on the questions you answered correctly! Make sure to thoroughly review the ones you didn't to improve your understanding.",
        "Keep up the good work! It's important to pay close attention to each question and think through your answers.",
      ];
      message = messageArray[Math.floor(Math.random() * messageArray.length)];
    } else if (condition == "abandonNormal") {
      var messageArray = [
        "Well done on your performance! You have answered most of the questions correctly and left only a few unanswered. Keep up the good work!",
        "You're doing a great job with the questions you answered! Don't forget to review the unanswered questions and take your time to ensure precision.",
        "Your effort is impressive! Continue to take your time with each question and review them thoroughly. This will help you to improve your accuracy.",
        "Keep up the great work! You are doing an excellent job at tackling most of the questions with precision.",
        "You're on the right track! Remember to double-check your answers and take your time with each question to ensure accuracy.",
        "Congratulations on your progress! Keep going and don't give up on the questions you couldn't answer.",
        "Your dedication to answering the questions is impressive! Remember to take your time and carefully review each question.",
        "Great job on the questions you answered! Don't worry about the unanswered questions, just keep pushing forward.",
        "You're doing an excellent job of answering most of the questions. Keep practicing and reviewing to improve your precision.",
        "Your hard work is paying off! Keep persevering and taking your time with each question to ensure accuracy.",
      ];
      message = messageArray[Math.floor(Math.random() * messageArray.length)];
    } else if (condition == "abandonLow") {
      var messageArray = [
        "Great job on answering most of the questions correctly and only leaving a few unanswered! Your effort and attention to detail are commendable. Keep up the good work!",
        "Your hard work and dedication are paying off! You've answered most of the questions correctly and only left a few unanswered. Keep reviewing the questions carefully to improve your precision.",
        "Congratulations on your progress! You've answered most of the questions correctly and left only a few unanswered. Remember to take your time and carefully review each question to ensure accuracy.",
        "Well done on answering most of the questions correctly! Your perseverance and focus are impressive. Continue taking your time and reviewing questions carefully to avoid any errors.",
        "I'm impressed by your performance! You've answered most of the questions correctly and only left a few unanswered. Keep up the good work.",
        "Your progress is commendable! You've answered most of the questions correctly and only left a few unanswered. Remember to take your time and think through each question.",
        "Excellent work on answering most of the questions correctly! Your dedication and attention to detail are apparent. Continue to review the questions carefully to avoid any mistakes.",
        "Your effort is paying off! You've answered most of the questions correctly and only left a few unanswered. Keep up the good work by staying focused and reviewing each question thoroughly.",
        "Great job on your performance! You've answered most of the questions correctly and only left a few unanswered. Remember to take your time and avoid rushing through the questions.",
        "I'm proud of your progress! You've answered most of the questions correctly and only left a few unanswered. Keep up the good work by reviewing each question carefully and avoiding any careless errors.",
      ];
      message = messageArray[Math.floor(Math.random() * messageArray.length)];
    } else if (condition == "abandonLowest") {
      var messageArray = [
        "Congratulations on your progress! You've answered most of the questions and left only one unanswered. Keep up the good work!",
        "Well done on answering most of the questions accurately and thoughtfully. Keep doing fantastic Work!",
        "Your efforts have paid off! You have done a great job at answering most of the questions and leaving only one unanswered. Keep up the superb work!",
        "Kudos to you for answering most of the questions correctly and showing perseverance throughout. Don't forget to review questions carefully to ensure precision!",
        "I'm impressed by your performance! You have answered most of the questions and left only one unanswered. Keep up the great effort and attention to detail.",
        "Fantastic job on answering most of the questions! Your careful consideration and attention to detail is admirable. Keep up the great work!",
        "Great work on answering most of the questions with accuracy and thoughtfulness. Remember to take your time and review questions carefully to avoid errors.",
        "Your dedication is paying off! You have answered most of the questions and left only one unanswered. Keep up the good work!",
        "I'm pleased to see your progress in answering most of the questions with accuracy and thoughtfulness. Keep reviewing questions carefully to improve your performance!",
        "You have done a commendable job at answering most of the questions with care and precision. Keep up the excellent work!",
      ];
      message = messageArray[Math.floor(Math.random() * messageArray.length)];
    } else if (condition == "abandonNone") {
      var messageArray = [
        "Wow, you've completed all 20 questions without leaving any unanswered! You're showing excellent perseverance and attention to detail.",
        "Your hard work has paid off with a perfect score on the session! Keep up the great effort and continue reviewing questions carefully.",
        "Congratulations on completing the session with 100% accuracy! Your dedication to accuracy and attention to detail is impressive.",
        "Amazing job on finishing the session with a flawless score! Keep up the exceptional work and remember to take your time on each question.",
        "You've done an outstanding job on this session, completing all questions without leaving any unanswered. Keep up the excellent work!",
        "Great work on answering all the questions with precision and care! Your attention to detail and perseverance is highly commendable.",
        "You've nailed every question on the session, demonstrating exceptional skill and attention to detail. Keep up the phenomenal effort!",
        "Excellent work on completing the session with a perfect score! Your dedication to precision and attention to detail is highly impressive.",
        "Outstanding performance on the session, with all questions answered correctly! Your hard work and focus are truly admirable.",
        "Congratulations on acing the session with 100% accuracy! Your commitment to precision and attention to detail is truly remarkable.",
      ];
      message = messageArray[Math.floor(Math.random() * messageArray.length)];
    } else if (condition == "advanceLevel") {
      var messageArray = [
        "Excellent job on answering the questions correctly and moving forward in the game! Keep up the momentum by taking your time and carefully reviewing each question.",
        "Your hard work paid off as you answered the questions correctly and advanced to the next level! Keep up the good work and maintain your progress by reviewing each question carefully.",
        "Great job on advancing to the next level by answering the questions correctly! Remember to take your time and carefully review the questions to continue your progress.",
        "You did a great job on answering the questions correctly and progressing to the next level! Keep up the good work by reviewing each question carefully.",
        "Congratulations on advancing to the next level by answering the questions correctly! Remember to take your time and carefully review each question to continue your success.",
        "Good job on answering the questions correctly and advancing in the game! Keep up the progress by reviewing each question carefully.",
        "Nice work on moving forward by answering the questions correctly! Remember to take your time and carefully review each question to maintain your progress.",
        "Well done on advancing to the next level by answering the questions correctly! Keep up the good work and continue to review each question carefully.",
        "Congratulations on answering the questions correctly and progressing to the next level! Keep up the momentum by reviewing each question carefully.",
        "Great job on advancing in the game by answering the questions correctly! Remember to take your time and review each question carefully to continue your success.",
      ];

      message = messageArray[Math.floor(Math.random() * messageArray.length)];
    }

    //
    //
    //
    return message;
  };

  return {
    GenerateMessage: GenerateMessage,
  };
})();

export default FeedbackList;
