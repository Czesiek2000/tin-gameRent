export const gamesList = [
    {
        "id": 1,
        "name": "Wiedźmin 3 dziki gon",
        "description": "Gra action RPG, stanowiąca trzecią część przy",
        "release_date": "2015-05-17T22:00:00.000Z",
        "length": 100
    },
    {
        "id": 2,
        "name": "Grand theft auto v",
        "description": "GTA 5 to piąta pełnoprawna odsłona niezwykle ",
        "release_date": "2013-09-12T22:00:00.000Z",
        "length": 50
    },
    {
        "id": 3,
        "name": "Uncharted 4",
        "description": "Gra akcji, stanowiąca czwarta część przygody Nathan Drake",
        "release_date": "2016-05-10T22:00:00.000Z",
        "length": 60
    }
]

export const gamesDetails = [
    {
        "id": 1,
        "name": "Wiedźmin 3 dziki gon",
        "description": "Gra action RPG, stanowiąca trzecią część przy",
        "release_date": "2015-05-18",
        "length": 100,
        "users": [
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
                    "phonenumber": "123456789"
                }
            },
            {
                "id": 5,
                "user_id": 2,
                "game_id": 1,
                "game_count": 1,
                "to_when": "2022-02-03T23:00:00.000Z",
                "user": {
                    "id": 2,
                    "firstname": "Anna",
                    "lastname": "Kowalska",
                    "email": "anna.kowalska@pjwstk.edu.pl",
                    "phonenumber": "987654321"
                }
            },
        ]
    },

    {
        "id": 2,
        "name": "Grand theft auto v",
        "description": "GTA 5 to piąta pełnoprawna odsłona niezwykle ",
        "release_date": "2013-09-13",
        "length": 50,
        "users": [
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
                    "phonenumber": "123456789"
                }
            },
            {
                "id": 6,
                "user_id": 2,
                "game_id": 2,
                "game_count": 3,
                "to_when": "2021-12-12T23:00:00.000Z",
                "user": {
                    "id": 2,
                    "firstname": "Anna",
                    "lastname": "Kowalska",
                    "email": "anna.kowalska@pjwstk.edu.pl",
                    "phonenumber": "987654321"
                }
            }
        ]
    },
    {
        "id": 3,
        "name": "Uncharted 4",
        "description": "Gra akcji, stanowiąca czwarta część przygody Nathan Drake",
        "release_date": "2016-05-10T22:00:00.000Z",
        "length": 60,
        "users": []
    }
];