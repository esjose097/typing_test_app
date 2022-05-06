/**
 * eventsModule.js
 * Date: 05 - 04 - 2022
 * @author: José Casal 
 * Módulo encargado de todo lo que este relacionado con eventos dentro de la aplicación*/

var eventsModule = (function(dModule, uModule, cModule, wModule){
    
    var addEventListeners = function(){
        //idk
        uModule.getDOMElements().textInput.addEventListener('keydown', function(event){
            console.log(event);
            if(dModule.testEnded == true)
            {
                return;
            }
            //Revisamos si se presiona enter
            var key = event.keyCode;
            if(key == 13)
            {
                uModule.getDOMElements().textInput.value += dModule.getLineReturn() + ' ';

                //Creamos un nuevo evento input
                var inputEvent = new Event('input');
                uModule.getDOMElements().textInput.dispatchEvent(inputEvent);
            }
        });

        //Evento de escritura de caracteres
        uModule.getDOMElements().textInput.addEventListener('input',function(event){
            //Revisamos si el test ya ha terminado
            if(dModule.testEnded())
            {
                return; //Esto sirve para salir completamente de la función.
            }
            //Revisamos si el test aun no ha empezado.
            if(!dModule.testStarted())
            {
                //Iniciamos el test en el "dataModule"
                dModule.startTest();

                var b = setInterval(function(){
                    //calculamos los resultados en el "dataModule"
                    
                    //Actualizamos el wpm, wpmChange "dataModule"

                    //Actualizamos el cpm, cpmChange "dataModule"

                    //Actualizamos el accuracy, accuracyChange "dataModule"

                    //Actualizamos los resultados en el "UIModule"
                }, 1000);
            }

            //Obtenemos el "typed word" del "UIModule"
            var typedWord = uModule.getTypedWord();

            //Actualizamos la palabra actual en el "dataModule"
            dModule.updateCurrentWord(typedWord);

            //Damos formato a la palabra activa
            var currentWord = dModule.getCurrentWord();
            uModule.formatWord(currentWord);
            
            //Revisamos si el usuario ha presionado la tecla de espacio o enter
            if(uModule.spacePressed(event) || uModule.enterPressed(dModule.getLineReturn()))
            {
                //Vaciamos el texto dentro de input
                uModule.emptyInput();

                //Desactivamos la palabra actual
                uModule.deactiveCurrentWord();

                //Movemos a la siguiente palabra en el "dataModule"
                dModule.moveToNewWord();
                //Activamos la palabra actual en el "UIModule"
                var index = dModule.getCurrentWordIndex();
                uModule.setActiveWord(index);
                //Formateamos la palabra activa dentro del "UIModule"
                var currentWord = dModule.getCurrentWord();
                uModule.formatWord(currentWord);
                //Realizamos un scroll dentro de la vista media
                uModule.scroll();
            }
        });

        //Evento de click en el botón "download"

    };

    //realiza un scroll dentro de la vista media de la ventana sobre la palabra activa
    window.addEventListener('resize', uModule.scroll)

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
