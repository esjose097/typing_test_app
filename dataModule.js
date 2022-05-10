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
            currentWordIndex: -1, testWords: [], currentWords: {}
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
        //Inicia la prueba
        startTest: function(){
            appData.indicators.testStarted = true;
        },

        //Termina la prueba
        endTest: function(){
            appData.indicators.testEnded = true;
        },

        //Regresa el tiempo restante de la prueba
        getTimeLeft: function(){
            return appData.indicators.timeLeft;
        },

        //Reduce el tiempo segundo por segundo
        reduceTime: function(){
            appData.indicators.timeLeft --;
            return appData.indicators.timeLeft;
        },
        //Revisa su aun hay tiempo para continuar la pruebas
        timeLeft: function(){
            return appData.indicators.timeLeft != 0;
        },
        //Revisa si la prueba ya se ha terminado
        testEnded: function(){
            return appData.indicators.testEnded;
        },
        //Comienza el test
        testStarted: function(){
            return appData.indicators.testStarted;
        },

        //Indicadores

        //Calcula el "wpm" y el "wpmChange" y los actualiza en "dataApp"
        calculateWpm: function(){
            //Se obtiene la cantidad de wpm anterior
            var wpmOld = appData.results.wpm;
            //Se obtienen la cantidad de palabras correctas
            var numOfCorrectWords = appData.results.numOfCorrectWords;
            //Verificamos que aun quede tiempo
            if(appData.indicators.timeLeft != appData.indicators.totalTestTime)
            {
                appData.results.wpm = Math.round(
                    60*numOfCorrectWords / (appData.indicators.totalTestTime - appData.indicators.timeLeft)
                );
            }
            else
            {
                appData.results.wpm = 0;
            }
            appData.results.wpmChange = (appData.results.wpm - wpmOld);

            return [appData.results.wpm, appData.results.wpmChange];
        },
        //calcula el "cpm" y el "cpmChange" y los actualiza en "dataApp"
        calculateCpm: function(){
            //Se obtiene la cantidad de cpm anterior
            var cpmOld = appData.results.cpm;
            //Se obtienen la cantidad de caracteres correctos
            var numOfCorrectCharacters = appData.results.numOfCorrectCharacters;
            //Verificamos que aun quede tiempo
            if(appData.indicators.timeLeft != appData.indicators.totalTestTime)
            {
                appData.results.cpm = Math.round(
                    60 * numOfCorrectCharacters / (appData.indicators.totalTestTime - appData.indicators.timeLeft)
                );
            }
            else
            {
                appData.results.cpm = 0;
            }
            appData.results.cpmChange = (appData.results.cpm - cpmOld);

            return [appData.results.cpm, appData.results.cpmChange];
        },
        //calcula el "accuracy" y el "accuracyChange" y los actualiza en "dataApp"
        calculateAccuracy: function(){
            //Se obtiene la cantidad de accuracy anterior
            var accuracyOld = appData.results.accuracy;
            //Se obtienen la cantidad de caracteres correctos
            var numOfCorrectCharacters = appData.results.numOfCorrectCharacters;
            //Obtenemos el número de caracteres ya probados
            var numOfTestCharacters = appData.results.numOfTestCharacters;
            //Verificamos que aun quede tiempo
            if(appData.indicators.timeLeft != appData.indicators.totalTestTime)
            {
                if(numOfTestCharacters != 0)
                {
                    appData.results.accuracy = Math.round(
                        (numOfCorrectCharacters / numOfTestCharacters)) * 100;    
                }
                else
                {
                    appData.results.accuracy = 0;    
                }
            }
            else
            {
                appData.results.accuracy = 0;
            }
            appData.results.accuracyChange = (appData.results.accuracy - accuracyOld);

            return [appData.results.accuracy, appData.results.accuracyChange];            
        },

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
                if(appData.words.currentWords.value.isCorrect == true)
                {
                    appData.results.numOfCorrectWords ++;
                }
                //Actualizamos el número de caracteres correctos
                appData.results.numOfCorrectCharacters += appData.words.currentWords.characters.totalCorrect;

                //Actualizamos el número de caracteres probados
                appData.results.numOfTestCharacters += appData.words.currentWords.characters.totalTest;
            }
            appData.words.currentWordIndex++;
            var currentIndex = appData.words.currentWordIndex;
            var newWord = new word(currentIndex);
            appData.words.currentWords = newWord;
        },

        getCurrentWordIndex: function(){
            return appData.words.currentWordIndex;
        },

        //Regresa la palabra actual
        getCurrentWord: function(){
            var currentWord = appData.words.currentWords;
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
            appData.words.currentWords.update(value);
        },

        getLineReturn(){
            return lineReturn;
        },

        returnData(){
            console.log(appData);
        },

        getCertificateData(){
            return {
                wpm: appData.results.wpm,
                accuracy: appData.results.accuracy,

            }
        }
    }

})();