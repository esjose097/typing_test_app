/**
 * eventsModule.js
 * Date: 05 - 04 - 2022
 * @author: José Casal 
 * Módulo encargado de todo lo que este relacionado con eventos dentro de la aplicación*/

var eventsModule = (function(dModule, uModule, cModule, wModule){
    
    var addEventListeners = function(){
        //Evento de escritura de caracteres

        //Evento de click en el botón "download"

    };

    return {
        //Función init que inicializa el "test" antes de empezar
        init: function(duration, textNumber){
            //Llenamos la lista de palabras en el "dataModule"
            var words = wModule.getWords(textNumber);
            dModule.fillListOfTestWords(textNumber,words);

            //Llenamos la caja de texto del html con la lista de palabras
            var testWords = dModule.getListOfTestWords();
            var lineReturn = dModule.getLineReturn();
            uModule.fillContent(testWords, lineReturn);

            //Establecemos el total de tiempo del test en el "dataModule"
            dModule.setTestTime(duration);

            //Actualizamos el tiempo restante en el "dataModule"
            dModule.initializeTimeLeft();

            //Actualizamos el tiempo restante en el "UIModule"
            var timeLeft = dModule.getTimeLeft();
            uModule.updateTimeLeft(timeLeft);

            //Movemos hacia la siguiente palabra
            dModule.moveToNewWord();

            //Cambiamos la palabra activa o actual en el "UIModule"
            var index = dModule.getCurrentWordIndex();
            uModule.setActiveWord(index);

            //Formateamos la palabra activa en el "UIModule"
            var currentWord = dModule.getCurrentWord();
            uModule.formatWord(currentWord);

            //Resaltamos sobre el text input en el "UIModule"
            uModule.inputFocus();

            addEventListeners();
        }
    };
})(dataModule, UIModule, certificateModule, wordsModule);
