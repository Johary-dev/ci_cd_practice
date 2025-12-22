# Explication des Tests Jest

## Pourquoi pas d'imports pour `it`, `beforeEach`, `expect` ?

Ces fonctions sont des **fonctions globales** fournies automatiquement par **Jest** (le framework de test).

Quand vous exécutez `npm test` (qui lance `jest`), Jest :
1. Charge votre fichier de test
2. **Injecte automatiquement** ces fonctions dans l'environnement global
3. C'est comme si elles étaient déjà importées, mais invisiblement !

## Les fonctions globales de Jest

### `it()` ou `test()` - Définir un test
```javascript
it("description du test", () => {
  // Code du test
});
```
- `it` = "it should..." (ça devrait...)
- Premier paramètre : description du test
- Deuxième paramètre : fonction qui contient le test

### `beforeEach()` - Avant chaque test
```javascript
beforeEach(() => {
  // Code exécuté AVANT chaque test
  app.resetTasks(); // Réinitialise les données
});
```
- Utile pour nettoyer/réinitialiser l'état entre les tests
- Garantit que chaque test part d'un état propre

### `expect()` - Faire des assertions
```javascript
expect(valeur).toBe(valeurAttendue);
expect(valeur).toBeTruthy();
expect(tableau).toHaveLength(3);
```
- Vérifie que quelque chose est vrai
- Si l'assertion échoue, le test échoue

## Exemple complet commenté

```javascript
// Ces imports sont nécessaires car ce sont des modules externes
const request = require("supertest");  // Pour tester les routes HTTP
const app = require("../app");         // Notre application Express

// beforeEach est une fonction GLOBALE de Jest (pas besoin d'import)
beforeEach(() => {
  // Cette fonction s'exécute AVANT chaque test
  // On réinitialise les tâches pour que chaque test parte de zéro
  app.resetTasks();
});

// it est une fonction GLOBALE de Jest (pas besoin d'import)
it("GET /tasks return array", async () => {
  // Ce test vérifie que GET /tasks retourne un tableau
  
  const response = await request(app).get("/tasks");
  
  // expect est une fonction GLOBALE de Jest (pas besoin d'import)
  expect(response.statusCode).toBe(200);           // Le status doit être 200
  expect(Array.isArray(response.body)).toBe(true); // Le body doit être un tableau
});
```

## Comment Jest fonctionne

1. **Installation** : Jest est dans `devDependencies` du `package.json`
2. **Configuration** : Quand vous lancez `npm test`, Node.js exécute Jest
3. **Injection globale** : Jest modifie l'environnement global pour ajouter ses fonctions
4. **Exécution** : Jest trouve tous les fichiers `*.test.js` et les exécute

## Équivalent avec imports explicites (si vous préférez)

Si vous voulez être explicite, vous pourriez faire :
```javascript
const { it, beforeEach, expect } = require('@jest/globals');
```

Mais ce n'est **pas nécessaire** car Jest les fournit déjà globalement !

## Autres fonctions globales de Jest

- `describe()` : Grouper des tests
- `afterEach()` : Après chaque test
- `beforeAll()` : Avant tous les tests
- `afterAll()` : Après tous les tests
- `test()` : Alias de `it()`

