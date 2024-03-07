/*** Express setup & start ***/

// 1. Opzetten van de webserver

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

// Importeer het npm pakket express uit de node_modules map
import express, {response} from 'express'

// Stel het basis endpoint in
const apiUrl = 'https://fdnd-agency.directus.app/items'
const items = apiUrl + '/oba_item'

// Maak een nieuwe express app aan
const app = express()

// Stel ejs in als template engine
// View engine zorgt ervoor dat data die je ophaalt uit de api , waar je in je code dingen mee doet, daar html van maakt
app.set('view engine', 'ejs')

// Stel de map met ejs templates in
app.set('views', './views')

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static('public'))

// Zorg dat werken met request data makkelijker wordt
app.use(express.urlencoded({ extended: true }));


//routes
// index GET route
app.get('/', function (request, response) {
    fetchJson(items).then((items) => {
        // apiData bevat gegevens van alle personen uit alle squads
        // Je zou dat hier kunnen filteren, sorteren, of zelfs aanpassen, voordat je het doorgeeft aan de view
        // Stap 3
        // Render index.ejs uit de views map en geef de opgehaalde data mee als variabele, genaamd persons

        // Stap 4
        // HTML maken op basis van JSON data
        response.render('index', {
            items: items.data})
    })
})

// Details GET route
app.get('/detail/:id', function (request, response) {
    // Gebruik de request parameter id en haal de juiste persoon uit de WHOIS API op
    fetchJson(apiUrl + '/oba_item/' + request.params.id).then((items) => {
        // Plaats de console.log hier om de items te bekijken
        console.log(items);

        // Render person.ejs uit de views map en geef de opgehaalde data mee als variable, genaamd person
        response.render('detail', {
            items: items.data
        });
    });
});




// 3. Start de webserver

// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
    // Toon een bericht in de console en geef het poortnummer door
    console.log(`Application started on http://localhost:${app.get('port')}`)
})