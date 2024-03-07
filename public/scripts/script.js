// general
// laad alle data van items in
// voegt een eventlistener toe aan het document en wacht tot alle elementen etc zijn ingeladen
var itemsData = JSON.parse(document.getElementById('itemsData').value);
document.addEventListener('DOMContentLoaded', function() {
    // pakt de data uit het inputveld van html en zet deze om in een js object onder de variabele itemsData
    var itemsData = JSON.parse(document.getElementById('itemsData').value);

});

// Detail pagina
// Detail inklap/uitklap functie
const detailsButton = document.querySelector('.details-button');
const details = document.querySelector('.details');
let detailsCheck = false;

// Voer de functie uit
detailsButton.addEventListener('click', function() {
    if (detailsCheck === false) {
        detailsActive();
    } else {
        detailsNonActive();
    }
});

// Functie voor het tonen van details
function detailsActive() {
    detailsCheck = true;
    details.classList.add('details-active');
    detailsButton.style.borderBottomLeftRadius = '0';
    detailsButton.style.borderBottomRightRadius = '0';


}


