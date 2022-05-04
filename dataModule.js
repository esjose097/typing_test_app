/**
 * dataModule.js
 * Date: 05 - 04 - 2022
 * @author: José Casal 
 * Módulo de datos de la aplicación este es un módulo que maneja todo lo que tenga que ver con datos dentro de la aplicación*/

var dataModule = (function(){
    //Instancia de un objeto con todos los datos que necesitará la aplicación para trabajar
    var appData = 
    {
        indicators: 
        {
            testStarted: false, testEnded: false, totalTestTime: 0, timeLeft: 0
        },
        results: 
        {
            wpm: 0, wpmChange: 0, cpm: 0, cpmChange: 0, accuracy: 0, accuracyChange: 0, 
            numOfCorrectWords: 0, numOfCorrectCharacters: 0, numOfTestCharacters: 0
        },
        words: 
        {
            currentWordIndex: 0, testWords: [], currentWords: {}
        },
    };

    //Word constructor
    /*
    {
        value: {correct: '', user: '', isCorrect: false},
        characters: {correct: [], user: [], totalCorrect: 0, totalTest: 0}
    }
    */
    
    var word = function(index){};
    //Método de actualización
    word.prototype.update = function(value){};

    return {
        //Indicadores - control de testing
        setTestTime: function(x){}, // Establece el tiempo total de la prueba

        initializeTimeLeft: function(){}, //Función encargada de iniciar el tiempo restante del total de tiempo

        startTest: function(){}, //Inicia la prueba

        endTest: function(){}, //Termina la prueba

        getTimeLeft: function(){}, //Regresa el tiempo restante de la prueba

        reduceTime: function(){}, //Reduce el tiempo segundo por segundo

        testEnded: function(){}, //Revisa si la prueba ya se ha terminado

        testStarted: function(){}, //Revisa si la prueba ya ha comenzado

        //Indicadores

        calculateWpm: function(){}, //Calcula el "wpm" y el "wpmChange" y los actualiza en "dataApp"

        calculateCpm: function(){}, //calcula el "cpm" y el "cpmChange" y los actualiza en "dataApp"

        calculateAccuracy: function(){}, //calcula el "accuracy" y el "accuracyChange" y los actualiza en "dataApp"

        //palabras de prueba o "test words"

        fillListOfTestWords: function(textNumber){}, //Llena "words.testWords"

        getListOfTestWords: function(){}, /*Incrementa el "currentWordIndex" - updates de las palabras restantes
        (appData.words.currentWord) creando una nueva instancia de la clase "word" - updates "numOfCorrectWords,
        "numOfCorrectCharacters y "numOfTestCharacters"*/

        updateCurrentWord: function(){}, //Actualiza las palabras restantes utilizando "user input"
    }

})();