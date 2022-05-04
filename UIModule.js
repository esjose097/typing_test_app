/**
 * UIModule.js
 * Date: 05 - 04 - 2022
 * @author: José Casal 
 * Módulo encargado de todo lo que este relacionado con UI o interfaz de usuario de la aplicación*/

var UIModule = (function(){
    //Clases utilizadas para seleccionar elementos HTML
    var DOMElements = 
    {
        //Indicadores - test control
        timeLeft, //Elemento HTML que anuncia el tiempo faltante
        //Resultados de test
        wpm, wpmChange, cpm, cpmChange, accuracy, accuracyChange,
        //User input
        textInput,nameInput,
        //Test words
        content, activeWord,
        //modal
        modal
    };

    return {
        
        //Obtiene elementos del DOM
        getDOMElements: function(){},

        //Indicadores - test control
        updateTimeLeft: function(){},

        //resultados
        updateResults: function(){},

        fillModal: function(){},

        showModal: function(){},

        //User input
        inputFocus: function(){},

        isNameEmpty: function(){},

        flagNameInput: function(){},

        spacePressed: function(){},

        enterPressed: function(){},

        emptyInput: function(){},

        getTypedWord: function(){},

        //test Words
        fillContent: function(){},

        formatWord: function(wordObject, wordHTML){},

        setActiveWord: function(index){},

        deactiveCurrentWord: function(){},

        scroll: function(){},
    }
})();