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
        nameField: document.getElementById('name'),
        //Test words
        content:document.getElementById("content"),
        activeWord:'',
        //modal
        modal: $('#myModal'),
        download: document.getElementById('download')
    };
    //Realiza un split sobre un string es decir convierte un string en una lista
    var splitArray = function(string){
        return string.split('');
    };

    //Agrega un " " al final de cada elemento de una lista
    var addSpace = function(array){
        array.push(' ');
        return array;
    };
    //Agrega una lista de etiquetas "<span>" a una lista de caracteres
    var addSpanTags = function(array){
        return array.map(function(currentCharacter){
            return '<span>' + currentCharacter + '</span>';
        });
    };
    //Agrega etiquetas "<span>" a una lista de elementos
    var addWordsSpanTags = function(array){
        array.push('</span>');
        array.unshift('<span>');
        return array;
    };
    //Une todos los elementos de un arreglo en un solo string
    var joinEachWord = function(array){
        return array.join('');
    };
    //Devuelve la clase de un caracter(html) dependiendo si concuerda con lo que el usuario introdujo
    var userValue;
    var returnCharClass = function(currentCharacter, index){
        return (index < userValue.length) ? (currentCharacter == userValue[index] 
            ? 'correctCharacter' : 'wrongCharacter') : '0'
    };
    //Simplemente se encarga de dar un tono mas claro a la opacidad en base su valor
    var fadeElement = function(element){
        element.style.opacity = 1;
        setTimeout(function(){
            element.style.opacity = 0.9;
        }, 100);
    }

    //Se encarga de realizar una actualización visual en de los parametros que se le mandan.
    var updateChange = function(value, changeElement){
        var classToAdd, html;
        [classToAdd, html] = (value >= 0) ? ['scoreUp', '+' + value] : ['scoreDown', value];

        if(changeElement == DOMElements.accuracyChange)
        {
            html += '%';
        }

        //Actualiza el elemento a cambiar
        changeElement.innerHTML = html;
        //estilo de el elemento
        changeElement.removeAttribute('class');

        changeElement.className = classToAdd;

        //Fade elements
        fadeElement(changeElement);
    }

    return {
        
        //Obtiene elementos del DOM
        getDOMElements: function(){
            return {
                textInput: DOMElements.textInput,
                download: DOMElements.download
            };
        },

        //Indicadores - test control
        updateTimeLeft: function(x){
            DOMElements.timeLeft.innerHTML = x;
        },

        //resultados
        updateResults: function(results){
            //Actualizamos el wpm
            DOMElements.wpm.innerHTML = results.wpm;
            //Actualizamos el cpm
            DOMElements.cpm.innerHTML = results.cpm;
            //Actualizamos el Accuary
            DOMElements.accuracy.innerHTML = results.accuracy + '%';
            //Actualización de cambios o "changes"
            updateChange(results.wpmChange, DOMElements.wpmChange);
            updateChange(results.cpmChange, DOMElements.cpmChange);
            updateChange(results.accuracyChange, DOMElements.accuracyChange);
        },
        //Cargamos de datos el modal
        fillModal: function(wpm){
            var results;
            if(wpm <40)
            {
                results = 
                {
                    type: 'turtle',
                    image: 'tortuga.jpg',
                    level: 'beginner'
                };
            }
            else if(wpm < 70)
            {
                results = 
                {
                    type: 'hourse',
                    image: 'caballo.jpg',
                    level: 'Average'
                };
            }
            else
            {
                results = 
                {
                    type: 'puma',
                    image: 'puma.jpg',
                    level: 'Expert'
                };
            }
            var html = '<div class="results"><p>You are a %type%!</p><p>You type at a speed of %wpm% words per minute!</p><img width="300" height="200" class="rounded-circle" src="./Images/%image%" alt=%alt%></div>';
            html = html.replace('%type%', results.type);
            html = html.replace('%wpm%', wpm);
            html = html.replace('%image%', results.image);
            html = html.replace('%alt%', results.type);
            

            //Insertamos dentro del modal
            DOMElements.nameInput.insertAdjacentHTML('beforebegin',html);

            //Guardamos los datos en el boton de desarga
            DOMElements.download.setAttribute('level', results.level);
        },

        //Mostramos el modal es decir la pantalla final
        showModal: function(){
            DOMElements.modal.modal('show');
            
        },

        //User input
        inputFocus: function(){
            DOMElements.textInput.focus();
        },

        isNameEmpty: function(){
            return DOMElements.nameField == '';
        },

        flagNameInput: function(){
            DOMElements.nameField.style.borderColor = 'red';
        },

        spacePressed: function(event){
            return event.data == " ";
        },

        enterPressed: function(lineReturn){
            return DOMElements.textInput.value.includes(lineReturn + ' ');
        },

        emptyInput: function(){
            DOMElements.textInput.value = "";
        },

        //Obtiene el valor que se esta introduciendo en el "input"
        getTypedWord: function(){
            return DOMElements.textInput.value;
        },

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
            var correctValue = wordObject.value.correct;
            userValue = wordObject.value.user;
            //Realizamos una comparación de elementos entre la forma correcta y lo que introdujo el usuario
            var classes = Array.prototype.map.call(correctValue, returnCharClass);

            //obtenemos la palabra activa
            var activeWord = DOMElements.activeWord;
            //Obtenemos una colección html de los hijos de la palabra activa
            var characters = activeWord.children;

            //Agregamos las classes a los hijos de la palabra activa
            for(var i = 0; i < characters.length; i++)
            {
                characters[i].removeAttribute('class');
                characters[i].className = classes[i];
            }
        },

        setActiveWord: function(index){
            DOMElements.activeWord = DOMElements.content.children[index];
        },
        //Se encarga de remover el atributo classe del elemento html
        deactiveCurrentWord: function(){
            DOMElements.activeWord.removeAttribute('class');
        },
        //Realiza un scroll
        scroll: function(){
            var activeWord = DOMElements.activeWord;
            var top1 = activeWord.offsetTop;
            var top2 = DOMElements.content.offsetTop;
            var diff = top1 - top2;
            //Realiza un scroll de el contenido de la caja
            DOMElements.content.scrollTop = diff - 40;
        },
    }
})();