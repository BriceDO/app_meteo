const joursSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

let ajd = new Date();
let options = {weekday: 'long'};
let jourActuel = ajd.toLocaleDateString('fr-FR', options);

// Met une majuscule au début de mot du jour
jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1);

// Le tableau des jours de la semaine avec en premier le jour actuel
let tabJoursEnOrdre = 

    // Découpe un morceau de joursSemaine avec au début l'index du jour actuel
    joursSemaine.slice(joursSemaine.indexOf(jourActuel))

    // On va venir rajouter un nouveau tableau avec les jours qui manquent (pour avoir 7 jours)
    // Concate une nouvelle portion du tableau de base qui va de 0 jusqu'au jour actuel
    .concat(joursSemaine.slice(0, joursSemaine.indexOf(jourActuel)));

export default tabJoursEnOrdre;