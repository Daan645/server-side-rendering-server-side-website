/*** Express setup & start ***/

// 1. Opzetten van de webserver

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

// Importeer het npm pakket express uit de node_modules map
import express, {response} from 'express'

// Stel het basis endpoint in
const apiUrl = 'https://fdnd-agency.directus.app/items'
const items = apiUrl + '/oba_item'
const families = apiUrl + '/oba_family'
const profiles = apiUrl + '/oba_profile'

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

// Middleware toevoegen om JSON-gegevens van het formulier te parsen
app.use(express.json());

let reviews = [];

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
            items: items.data,
            reviews: reviews
        });
    });
});

// post
app.post('/submit-review', function(req, res) {
    try {
        // Haal de ingediende recentiegegevens op uit het formulier
        const { name, message } = req.body;

        // Voeg de recentie toe aan de array
        reviews.push({ name, message });

        // Stuur een succesbericht terug naar de client
        res.send('Recentie succesvol toegevoegd!');
    } catch (error) {
        console.error('Fout bij het verwerken van het recentieformulier:', error);
        res.status(500).send('Er is een interne serverfout opgetreden bij het verwerken van het recentieformulier.');
    }
});


// chooseprofile GET route
// chooseProfile GET route
app.get('/chooseProfile', function (request, response) {
    // Maak twee afzonderlijke fetch-aanroepen naar families en profiles
    Promise.all([fetchJson(families), fetchJson(profiles)])
        .then(([families, profiles]) => {
            // families en profiles bevatten de opgehaalde data van de API
            // Je kunt hier de gewenste bewerkingen uitvoeren voordat je ze doorgeeft aan de view
            console.log(families);
            console.log(profiles);

            // Render de chooseProfile view en geef de opgehaalde data mee
            response.render('chooseProfile', {
                families: families.data,
                profiles: profiles.data
            });
        })
        .catch((error) => {
            // Behandel eventuele fouten die optreden tijdens het ophalen van de data
            console.error('Error fetching data:', error);
            // Stuur een foutbericht naar de client
            response.status(500).send('Error fetching data');
        });
});

// Personal GET route
app.get('/personal/:id', function (request, response) {
    // Gebruik de request parameter id en haal de juiste persoon uit de WHOIS API op
    fetchJson(items).then((items) => {
        // Plaats de console.log hier om de items te bekijken

        // Render person.ejs uit de views map en geef de opgehaalde data mee als variable, genaamd person
        response.render('personal', {
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