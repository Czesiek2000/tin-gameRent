import { gameRentList, gameRentDetails } from "./gameRentApiMockData";
const gameRentApiUrl = "http://localhost:3005/api/gameRent";

export function getGameRentApiCalls() {
    return fetch(gameRentApiUrl);
}

export function getGameRentDetailsApiCalls(id) {
    return fetch(gameRentApiUrl + "/" + id);
}

export function addGameRentApiCalls(rent) {
    const rentString = JSON.stringify(rent);
    console.log(rentString);
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: rentString,
    }
    return fetch(gameRentApiUrl, options);
}

export function updateGameRentApiCalls(id, rent) {
    const rentString = JSON.stringify({ id, user_id: rent.user_id, game_id: rent.game_id, to_when: rent.to_when, game_count: rent.game_count });
    console.log(id, JSON.parse(rentString));
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: rentString,
    }
    return fetch(gameRentApiUrl + "/" + id, options);
}