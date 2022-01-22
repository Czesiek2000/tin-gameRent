export const usersList = [
    {
        id: 1,
        firstname: "Jan",
        lastname: "Kowalski",
        email: "jan.kowalski@pjwstk.edu.pl",
        phonenumber: "123456789",
    },
    {
        id: 2,
        firstname: "Anna",
        lastname: "Kowalska",
        email: "anna.kowalska@pjwstk.edu.pl",
        phonenumber: "987654321",
    },
    {
        id: 3,
        firstname: "Andrzej",
        lastname: "Pietruszka",
        email: 'apietruszka@pjwstk.edu.pl', 
        phonenumber: '145234678',
    }
];

export const userDetails = [
    {
        id: 1,
        firstname: "Jan",
        lastname: "Kowalski",
        email: "jan.kowalski@pjwstk.edu.pl",
        phonenumber: "123456789",
        games: [
            {
                id: 1,
                user_id: 1,
                game_id: 1,
                game_count: 1,
                to_when: '2021-12-14T23:00:00.000Z',
                games: {
                    id: 1,
                    name: 'Wiedźmin 3 dziki gon',
                    description: 'Gra action RPG, stanowiąca trzecią część przy',
                    release_date: '2015-05-17T22:00:00.000Z',
                    length: 100
                }
            },
            {
                id: 2,
                user_id: 1,
                game_id: 2,
                game_count: 2,
                to_when: '2022-01-09T23:00:00.000Z',
                games: {
                    id: 2,
                    name: 'Grand theft auto v',
                    description: 'GTA 5 to piąta pełnoprawna odsłona niezwykle ',
                    release_date: '2013-09-12T22:00:00.000Z',
                    length: 50
                }
            },
        ]
    },
    {
        id: 2,
        firstname: "Anna",
        lastname: "Kowalska",
        email: "anna.kowalska@pjwstk.edu.pl",
        phonenumber: "987654321",
        games: [
            {
                id: 4,
                user_id: 1,
                game_id: 4,
                game_count: 4,
                to_when: '2021-12-07T23:00:00.000Z',
                games: {
                    id: 4,
                    name: 'Uncharted 4: Kres Złodzieja',
                    description: 'Bohaterem Uncharted 4 studia Naughty Dog jest',
                    release_date: '2016-05-15T22:00:00.000Z',
                    length: 40
                }
            }
        ]
    },
    {
        id: 3,
        firstname: "Andrzej",
        lastname: "Pietruszka",
        email: 'apietruszka@pjwstk.edu.pl', 
        phonenumber: '145234678',
        games: []
    }
]