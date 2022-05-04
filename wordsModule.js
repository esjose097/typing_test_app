/**
 * wordsModule.js
 * Date: 05 - 04 - 2022
 * @author: José Casal 
 * Módulo encargado de todo lo que este relacionado con "words" y su manejo dentro de la aplicación*/

var wordsModule = (function(){
    //Lista de palabras
    var words = 
    [
        "word1 word2 word3 etc",
        "word1 word2 word3 etc",
        "word1 word2 word3 etc"
    ];

    return {
        //Método encargado de devolver una palabra de la lista en base a un index externo.
        getWords(textNumber){
            return words[textNumber];
        }
    }
})();
