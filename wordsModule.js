/**
 * wordsModule.js
 * Date: 05 - 04 - 2022
 * @author: José Casal 
 * Módulo encargado de todo lo que este relacionado con "words" y su manejo dentro de la aplicación*/

var wordsModule = (function(){
    //Lista de palabras
    var words = 
    [
        //Texto sin comas ni puntos para niños
        "Me llamaste a las nueve y treinta de la noche y me dijiste ya voy a tu casa deja la puerta abierta la dejo abierta para que entres no se para que si ya estas dentro de mi corazón y mi piel y mis entrañas igual viniste te hice un te primero me abrazaste fuerte muy fuerte y me contaste que un chico que pusiste como pasante en la fabrica del parque industrial había perdido tres dedos culpa de él igual lloraste sobre mi hombro y yo también te abrace fuerte después de tomar el té nos dirigimos a mi habitación y como hacía mucho frio me metí en la cama vos te desvestiste y te metiste en mi cama y en mis entrañas ya estabas desde hace mucho nos besamos apasionados como hace siete años nuestras piernas se enredaron hacia mucho frio y me sentí feliz luego te vestiste y te fuiste porque no podes dejar la casa sola en la mitad de la nada pero si podes dejarme a mi sola en la mitad de mi misma",
        //Texto con comas y puntos
        "Astronomers beamed the first radio message designed for alien ears from the Arecibo Observatory in Puerto Rico in 1974. The series of 1s and 0s was designed to convey simple information about humanity and biology and was sent toward the globular cluster M13. Since M13 is 25,000 light-years away, you shouldn’t hold your breath for a reply.",
        //Texto con todos los poderes
        "North America is home to dozens of turtle species, from the soda can-sized bog turtle to the devastatingly handsome alligator snapping turtle. Each spring, countless turtles emerge from the sleepy winter months ready to nest, find food, and resume their more active warm-weather lifestyles. Unfortunately, these journeys toward favored habitats and ideal nesting spots often involve treacherous trips across roads. "
    ];

    return {
        //Método encargado de devolver una palabra de la lista en base a un index externo.
        getWords(textNumber){
            return words[textNumber];
        }
    }
})();
