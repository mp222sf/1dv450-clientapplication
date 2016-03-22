# Pizzakartan
Applikationen är en samlingsplats för pizzeriaägare och pizzakonsumenter.
Tanken är att man som pizzeriaägare ska kunna lägga in sin pizzeria och alla dess menyer/maträtter.
Som användare ska man kunna bläddra runt bland pizzerior och se deras olika maträtter, samt finna information om pizzerian.
Applikationen är skapad då jag som själv är en pizzakonsument inte alltid hittar menyer till pizzerior på nätet.

## Installation
1. Kör igång API:et. [Ladda ner här](https://github.com/mp222sf/1dv450-mp222sf). Hur man startar står under "Installation>Steg-för-steg".
2. När API är igång så kommer en ruta upp med API-länken.
3. Ladda ner detta repot.
4. Lägg till det i ett workspace på Cloud9.
5. I filen Service > PizzaKartaService.js ändrar du variabeln APIpath till API-länken som du fick i steg 2.
6. I Cloud 9, välj Run > Run with > Apache httpd (PHP,HTML).
7. Du får upp en ruta med länken till klientapplikationen som du klickar på.
8. Applikationen är startad.

### Inloggningsuppgifter i appliaktionen
**Användarnamn:** admin

**Lösenord:** secret

### Ändringar i API
- La till koordinater till Pizzerias All.
- La till Id till Tags All.
- La till koordinater till Tags Pizzerias (Id).
- Vid skapande av pizzeria anges nu Adress istället för Latitude och Longitude.
- Pizzeria All, la till ID.
- Pizzeria All, la till Adress.
- Pizzeria (id), la till Adress.
- Pizzeria (id), la till Taggar.
- Position Update, ändrade så att man ändra på Adress istället för Latitude och Longitude.
- Tags Pizzerias, la till Adress.
- Pizzerias Menus (Id), la till Id till både Menu och Dish.
- Menus (Id), la till Id till både Menu och Dish.
- Hämta en specifik Dish.
- La till Menu och Dish i All Pizzerias.
