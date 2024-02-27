// 1. opzetten van de webserver
// Importeer het npm pakket express uit de node_modules map
import express from 'express'

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

// Stel het basis endpoint in
const apiUrl = 'https://fdnd.directus.app/items'

// Haal alle squads uit de WHOIS API op
const squadData = await fetchJson(apiUrl + '/squad')

const persoonlijkeData = await fetchJson('https://fdnd.directus.app/items/person/13')
console.log(persoonlijkeData)

// Maak een nieuwe express app aan
const app = express()

const messages = []

// 2. http requests

// Stel ejs in als template engine
app.set('view engine', 'ejs')

// Stel de map met ejs templates in
app.set('views', './views')

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))


// einde opzetten van server



// Maak een GET route voor de index
// vraagt iets op van de server wanneer localhost/
app.get('/', function (request, response) {
  // Haal alle personen uit de WHOIS API op
  // fect de json van de whoisapi
  fetchJson(apiUrl + '/person/?filter={"squad_id":3}').then((apiData) => {
    // apiData bevat gegevens van alle personen uit alle squads
    // Je zou dat hier kunnen filteren, sorteren, of zelfs aanpassen, voordat je het doorgeeft aan de view
    // zet de data en index in elkaar en geef deze door aan de browser
    // Render index.ejs uit de views map en geef de opgehaalde data mee als variabele, genaamd persons
    response.render('index', {persons: apiData.data, squads: squadData.data, messages: messages})
  console.log(messages)
  })

})

// Maak een POST route voor de index
app.post('/', function (request, response) {
  // Er is nog geen afhandeling van POST, redirect naar GET op
  console.log(request)
  messages.push(request.body.bericht)
  // messages.push(request.body.bericht)
  response.redirect(303, '/')
})

// Maak een GET route voor een detailpagina met een request parameter id
app.get('/person/:id', function (request, response) {
  // Gebruik de request parameter id en haal de juiste persoon uit de WHOIS API op
  fetchJson(apiUrl + '/person/' + request.params.id).then((apiData) => {
    // Render person.ejs uit de views map en geef de opgehaalde data mee als variable, genaamd person
    response.render('person', {person: apiData.data, squads: squadData.data})
  })
})

// 3. start de webserver

// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})


// Custom routes
//game
// Custom routes
//game
app.get('/app', function(req, res) {
  fetchJson(apiUrl + '/person?filter={"avatar":{"_nempty":""}}').then((apiData) => {
    // apiData bevat gegevens van alle personen uit alle squads
    // Je zou dat hier kunnen filteren, sorteren, of zelfs aanpassen, voordat je het doorgeeft aan de view

    // Render index.ejs uit de views map en geef de opgehaalde data mee als variabele, genaamd persons
    res.render('app', {persons: apiData.data, squads: squadData.data})
  })
});

