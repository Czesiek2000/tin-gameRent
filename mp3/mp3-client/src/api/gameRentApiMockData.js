export const gameRentList = [
    {
        "grid": 1,
        "game_count": 1,
        "to_when": "2021-12-14T23:00:00.000Z",
        "uid": 1,
        "email": "jan.kowalski@pjwstk.edu.pl",
        "firstname": "Jan",
        "lastname": "Kowalski",
        "phonenumber": "123456789",
        "gid": 1,
        "name": "Wiedźmin 3 dziki gon",
        "description": "Gra action RPG, stanowiąca trzecią część przy",
        "release_date": "2015-05-17T22:00:00.000Z",
        "length": 100
    },
    {
        "grid": 2,
        "game_count": 2,
        "to_when": "2022-01-09T23:00:00.000Z",
        "uid": 1,
        "email": "jan.kowalski@pjwstk.edu.pl",
        "firstname": "Jan",
        "lastname": "Kowalski",
        "phonenumber": "123456789",
        "gid": 2,
        "name": "Grand theft auto v",
        "description": "GTA 5 to piąta pełnoprawna odsłona niezwykle ",
        "release_date": "2013-09-12T22:00:00.000Z",
        "length": 50
    },
];

export const gameRentDetails = [
    {
        "id": 1,
        "user_id": 1,
        "game_id": 1,
        "game_count": 1,
        "to_when": "2021-12-14T23:00:00.000Z",
        "user": {
            "id": 1,
            "firstname": "Jan",
            "lastname": "Kowalski",
            "email": "jan.kowalski@pjwstk.edu.pl",
            "phonenumber": "123456789",
            "games": [
                {
                    "id": 1,
                    "game_count": 1,
                    "to_when": "2021-12-14T23:00:00.000Z",
                    "games": {
                        "id": 1,
                        "name": "Wiedźmin 3 dziki gon",
                        "description": "Gra action RPG, stanowiąca trzecią część przy",
                        "release_date": "2015-05-17T22:00:00.000Z",
                        "length": 100
                    }
                }
            ]
        }
    },
    {
        "id": 2,
        "user_id": 1,
        "game_id": 2,
        "game_count": 2,
        "to_when": "2022-01-09T23:00:00.000Z",
        "user": {
            "id": 1,
            "firstname": "Jan",
            "lastname": "Kowalski",
            "email": "jan.kowalski@pjwstk.edu.pl",
            "phonenumber": "123456789",
            "games": [
                {
                    "id": 2,
                    "game_count": 2,
                    "to_when": "2022-01-09T23:00:00.000Z",
                    "games": {
                        "id": 2,
                        "name": "Grand theft auto v",
                        "description": "GTA 5 to piąta pełnoprawna odsłona niezwykle ",
                        "release_date": "2013-09-12T22:00:00.000Z",
                        "length": 50
                    }
                }
            ]
        }
    }
];