/**
 * UIModule.js
 * Date: 05 - 04 - 2022
 * @author: José Casal 
 * Módulo encargado de todo lo que este relacionado con UI o interfaz de usuario de la aplicación*/

var UIModule = (function(){
    //Clases utilizadas para seleccionar elementos HTML
    var DOMElements = 
    {
      //  Indicadores - test control
        timeLeft: document.getElementById('timeLeft'), //Elemento HTML que anuncia el tiempo faltante
        //Resultados de test
        wpm: document.getElementById('wpm'), 
        wpmChange:document.getElementById('wpmChange'),
        cpm:document.getElementById('cpm'),
        cpmChange:document.getElementById('cpmChange'),
        accuracy: document.getElementById('accuracy'),
        accuracyChange:document.getElementById('accuracyChange'),
        //User input
        textInput: document.querySelector('#input'),
        nameInput: document.querySelector('.form-group'),
        //Test words
        content:document.getElementById("content"),
        activeWord:'',
        //modal
        modal: document.querySelector('#myModal')
    };
    var splitArray = function(string){
        return string.split('');
    };

    var addSpace = function(array){
        array.push(' ');
        return array;
    };

    var addSpanTags = function(array){
        return array.map(function(currentCharacter){
            return '<span>' + currentCharacter + '</span>';
        });
    };

    var addWordsSpanTags = function(array){
        array.push('</span>');
        array.unshift('<span>');
        return array;
    };

    var joinEachWord = function(array){
        return array.join('');
    };

    return {
        
        //Obtiene elementos del DOM
        getDOMElements: function(){},

        //Indicadores - test control
        updateTimeLeft: function(x){
            DOMElements.timeLeft.innerHTML = x;
        },

        //resultados
        updateResults: function(){},

        fillModal: function(){},

        showModal: function(){},

        //User input
        inputFocus: function(){
            DOMElements.textInput.focus();
        },

        isNameEmpty: function(){},

        flagNameInput: function(){},

        spacePressed: function(){},

        enterPressed: function(){},

        emptyInput: function(){},

        getTypedWord: function(){},

        //test Words
        /**Este método rellena la caja de texto con la lista de palabras */
        fillContent: function(array, lineReturn){
            //Se separá el arreglo de palabras por arreglos de letras
            var content = array.map(splitArray);
            //A cada arreglo de letras se le agrega un " " al final
            content = content.map(addSpace);
            //Hacemos que cada elemento del arreglo de letras tenga su propio "<span>"
            content = content.map(addSpanTags);
            //Agregamos un "<span>" por cada palabra
            content = content.map(addWordsSpanTags);
            //Juntamos todos los arreglos en un solo arreglo
            content = content.map(joinEachWord);
            //Unimos todo el contenido en un unico string
            content = content.join('');
            //Remplazamos el caracter "|" por el simbolo de enter
            content = content.split('<span>'+lineReturn+'</span>').join('<span>&crarr;</span>');
            //Agregamos el contenido al elemento HTML correspondiente.
            DOMElements.content.innerHTML = content;
        },
        //Método que da formato en el UI a un objeto de tipo "word"
        formatWord: function(wordObject){
            var activeWord = DOMElements.activeWord;
            //Resaltamos la palabra activa
            activeWord.className = 'activeWord';

            //Resaltamos los caracteres
        },

        setActiveWord: function(index){
            DOMElements.activeWord = DOMElements.content.children[index];
        },

        deactiveCurrentWord: function(){},

        scroll: function(){},
    }
})();