import { gamesList, gamesDetails } from "./gamesApiMockData";
const gamesBaseApiUrl = "http://localhost:3005/api/games";

export function getGamesApiCalls() {
    return fetch(gamesBaseApiUrl);
}

export function getGameDetailsApiCalls(id) {
    console.log(gamesBaseApiUrl + "/" + id);
    return fetch(`${gamesBaseApiUrl}/${id}`);
}

export function addGameApiCalls(game){
    const gameString = JSON.stringify(game);
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: gameString,
    }
    const promise = fetch(gamesBaseApiUrl, options);
    console.log(gameString);
    return promise;
}

export function updateGameApiCalls(id, game) {
    const gameString = JSON.stringify({ id: game.id, name: game.name, description: game.description, length: game.length, release_date: game.release_date });
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: gameString,
    }
    const promise = fetch(`${gamesBaseApiUrl}/${id}`, options);
    console.log(gameString);
    return promise;
}