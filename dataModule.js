/**
 * dataModule.js
 * Date: 05 - 04 - 2022
 * @author: José Casal 
 * Módulo de datos de la aplicación este es un módulo que maneja todo lo que tenga que ver con datos dentro de la aplicación*/

var dataModule = (function(){
    var lineReturn = '|';
    //Método encargado de revolver los elementos de una lista para devolver otra mezclada.
    shuffle = function(array){
        var  newArray =[];
        var randomIndex;
        var randomElement;
        while(array.length > 0)
        {
            randomIndex = Math.floor(Math.random() * array.length);
            randomElement = array[randomIndex];
            newArray.push(randomElement);
            //Borramos el elemento que ya ha sido revuelto.
            array.splice(randomIndex, 1);
        }
        return newArray;
    };
    //Capitalizador de palabras
    String.prototype.capitalize = function(){
        var newString = '';
        var firstCharCap = this.charAt(0).toUpperCase();
        var remainingChar = this.slice(1);
        newString = firstCharCap + remainingChar;
        return newString;
    };
    //Capitalizador de palabras aleatorias
    var capitalizeRandom = function(arrayOfStrings){
        return arrayOfStrings.map(function(currentWord){
            var x = Math.floor(4 * Math.random());
            return (x == 3) ? currentWord.capitalize() : currentWord;
        })
    };
    //Agrega signos de puntuación aleatoriamente a una lista de elementos
    var addRandomPunctuation = function(arrayOfStrings){
        return arrayOfStrings.map(function(currentWord){
            var randomPunctuation;
            var items = [lineReturn,'?',',','.','!','','','','','','','',''];
            var randomIndex = Math.floor(Math.random() * items.length); 
            randomPunctuation = items[randomIndex];
            return currentWord + randomPunctuation;
        });
    };
    //es una callback utilizada para calcular el número de caracteres correctos dentro de la palabra actual
    var nbCorrectChar;
    var charCallBack = function(currentElement, index){
        nbCorrectChar += (currentElement == this.characters.user[index]) ? 1 : 0;
    };
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
    
    var word = function(index){
        this.value = 
        {
            correct : appData.words.testWords[index] + ' ',
            user:'',
            isCorrect:false
        },
        this.characters = 
        {
            correct : this.value.correct.split(''),
            user:[],
            totalCorrect:0,
            totalTest:this.value.correct.length
        }
    };
    //Método de actualización de un objeto tipo word
    word.prototype.update = function(value){
        //actualizamos lo puesto por el usuario
        word.prototype.update = function(value){
            this.value.user = value;

            //Actualizamos el estado de la palabra ya sea correcta o no.
            this.value.isCorrect = (this.value.correct == this.value.user);

            //update user characters
            this.characters.user = this.value.user.split('');

            //Calculamos el número de caracteres correctos
            nbCorrectChar = 0;
            charCallBack = charCallBack.bind(this);
            this.characters.correct.forEach(charCallBack);

            this.characters.totalCorrect = nbCorrectChar
        }

    };

    return {
        //Indicadores - control de testing
        // Establece el tiempo total de la prueba
        setTestTime: function(x){
            appData.indicators.totalTestTime = x;
        },

        //Función encargada de iniciar el tiempo restante del total de tiempo
        initializeTimeLeft: function(){
            appData.indicators.timeLeft = appData.indicators.totalTestTime;
        }, 

        startTest: function(){}, //Inicia la prueba

        endTest: function(){}, //Termina la prueba

        //Regresa el tiempo restante de la prueba
        getTimeLeft: function(){
            return appData.indicators.timeLeft;
        },

        reduceTime: function(){}, //Reduce el tiempo segundo por segundo
        //Revisa si la prueba ya se ha terminado
        testEnded: function(){
            return appData.indicators.testEnded;
        },
        //Comienza el test
        testStarted: function(){
            appData.indicators.testStarted = true;
        },

        //Indicadores

        calculateWpm: function(){}, //Calcula el "wpm" y el "wpmChange" y los actualiza en "dataApp"

        calculateCpm: function(){}, //calcula el "cpm" y el "cpmChange" y los actualiza en "dataApp"

        calculateAccuracy: function(){}, //calcula el "accuracy" y el "accuracyChange" y los actualiza en "dataApp"

        //palabras de prueba o "test words"
        //Llena "words.testWords"
        fillListOfTestWords: function(textNumber, words){
            //Separamos la lista de palabras en un array por espacios
            var results = words.split(" ");
            if(textNumber == 0)
            {
                //Mezclamos las palabras
                results = shuffle(results);
                results = capitalizeRandom(results);
                //Agregamos signos de punctuación aleatorios.
                results = addRandomPunctuation(results);
            }
                appData.words.testWords = results;
        },

        /**Obtiene la lista de palabras y la regresa. */
        getListOfTestWords: function(){
            return appData.words.testWords;
        },
        /*Incrementa el "currentWordIndex" - updates de las palabras restantes
        (appData.words.currentWord) creando una nueva instancia de la clase "word" - updates "numOfCorrectWords,
        "numOfCorrectCharacters y "numOfTestCharacters"*/
        moveToNewWord: function(){
            if(appData.words.currentWordIndex > -1)
            {
                //Actualizamos el número de palabras correctas

                //Actualizamos el número de caracteres correctos

                //Actualizamos el número de caracteres probados
            }
            var currentIndex = appData.words.currentWordIndex
            var newWord = new word(currentIndex);
            appData.words.currentWord = newWord; 
            appData.words.currentWordIndex++; //<--Esto por alguna razón se activa antes que el resto, solucionar despues
        },

        getCurrentWordIndex: function(){
            return appData.words.currentWordIndex;
        },

        //Regresa la palabra actual
        getCurrentWord: function(){
            var currentWord = appData.words.currentWord;
            return {
                value:
                {
                    correct: currentWord.value.correct,
                    user: currentWord.value.user
                }
            };
        },

        //Actualiza las palabras restantes utilizando "user input"
        updateCurrentWord: function(value){
            appData.words.currentWord.update(value);
        },

        getLineReturn(){
            return lineReturn;
        },

        returnData(){
            console.log(appData);
        }
    }

})();