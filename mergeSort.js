// Importation du module 'fs' pour lire des fichiers
const fs = require('fs');

// Fonction pour fusionner deux sous-tableaux triés
function merge(left, right) {
    let result = []; // Tableau résultant qui contiendra les éléments triés
    let leftIndex = 0; // Index pour parcourir le tableau 'left'
    let rightIndex = 0; // Index pour parcourir le tableau 'right'
    let comparisons = 0; // Compteur pour suivre le nombre de comparaisons effectuées

    // Comparer les éléments des deux tableaux jusqu'à ce que l'un des deux soit entièrement parcouru
    while (leftIndex < left.length && rightIndex < right.length) {
        comparisons++; // Incrémenter le compteur à chaque comparaison
        if (left[leftIndex] < right[rightIndex]) {
            // Si l'élément de gauche est plus petit, on l'ajoute au tableau résultant
            result.push(left[leftIndex]);
            leftIndex++; // Passer au prochain élément du tableau 'left'
        } else {
            // Sinon, on ajoute l'élément de droite
            result.push(right[rightIndex]);
            rightIndex++; // Passer au prochain élément du tableau 'right'
        }
    }

    // Ajouter les éléments restants du tableau 'left' s'il en reste
    // Ajouter les éléments restants du tableau 'right' s'il en reste
    return {
        result: result.concat(left.slice(leftIndex), right.slice(rightIndex)), // Fusion des tableaux
        comparisons // Retourner également le nombre de comparaisons effectuées
    };
}

// Fonction de tri fusion (merge sort) récursif
function mergeSort(arr) {
    // Cas de base : si le tableau contient un seul élément ou est vide, il est déjà trié
    if (arr.length <= 1) return { result: arr, comparisons: 0 };

    // Diviser le tableau en deux parties égales
    const middle = Math.floor(arr.length / 2); // Calcul de l'index du milieu
    const left = mergeSort(arr.slice(0, middle)); // Tri récursif de la moitié gauche
    const right = mergeSort(arr.slice(middle)); // Tri récursif de la moitié droite

    // Fusionner les deux moitiés triées
    const merged = merge(left.result, right.result);

    // Retourner le tableau trié et le nombre total de comparaisons
    return {
        result: merged.result,
        comparisons: left.comparisons + right.comparisons + merged.comparisons // Additionner les comparaisons des deux moitiés et de la fusion
    };
}

// Lecture du fichier contenant les nombres en entrée
const fileName = process.argv[2]; // Le nom du fichier est passé comme argument dans la ligne de commande
const input = fs.readFileSync(fileName, 'utf-8') // Lire le contenu du fichier
    .split(/\s+/) // Diviser le contenu par des espaces ou sauts de ligne
    .map(Number); // Convertir chaque élément en un nombre

// Exécuter le tri fusion sur le tableau lu depuis le fichier
const { result, comparisons } = mergeSort(input);

// Afficher le résultat dans la console
console.log(`Tri fusion: ${comparisons} comparaisons`); // Afficher le nom de l'algorithme et le nombre de comparaisons
console.log(result.join(' ')); // Afficher le tableau trié
