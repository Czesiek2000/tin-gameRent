import { useState, useEffect, useLayoutEffect } from "react"
import { getGamesApiCalls } from "../../api/gamesApiCalls";
import { getUsersApiCalls } from "../../api/userApiCalls";
import formMode from "../../helpers/formHelper";
import FormButton from "../form/FormButtons";
import FormInput from "../form/FormInput";
import { checkRequired, checkDate } from "../../helpers/validationCommon";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { addGameRentApiCalls, getGameRentApiCalls, getGameRentDetailsApiCalls, updateGameRentApiCalls } from "../../api/gameRentApiCalls";
import { useTranslation } from "react-i18next";
import { isAuthenticated } from "../../helpers/authHelper";

export default function GameRentForm(){
    const location = useLocation();
    const { id } = useParams();
    const { push } = useHistory();
    const { t } = useTranslation();
    // const [id, setId] = useState(rentId);
    const [gameId, setGameId] = useState('');
    const [userId, setUserId] = useState('');
    const [to_when, setToWhen] = useState('');
    const [game_count, setGameCount] = useState('');
    const [userIdError, setUserIdError] = useState('');
    const [gameIdError, setGameIdError] = useState('');
    const [toWhenError, setToWhenErrorError] = useState('');
    const [gameCountError, setGameCountError] = useState('');
    const [globalErrorMessage, setGlobalErrorMessage] = useState('');
    const [games, setGames] = useState([]);
    const [users, setUsers] = useState([]);
    const [rentDetails, setRentDetails] = useState({});
    const [loadingUser, setLoadingUser] = useState(true);
    const [loadingGame, setLoadingGame] = useState(true);
    const [loadingRent, setLoadingRent] = useState(true);

    useEffect(() => {
        getGamesApiCalls()
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setGames(data);
                setLoadingGame(false);
                getGameRentDetailsApiCalls(id)
                    .then(res => res.json())
                    .then(d => {
                        console.log(data, d);
                        if(id){
                            setGameId(data.find(g => g.id === d.game_id).id);
                        }
                    })
            
                // setGameId(data.find(x => x.id === rentDetails.game_id).id);
            })
            .catch(error => {
                console.log(error);
                setLoadingGame(false);
            });


        getUsersApiCalls()
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setUsers(data);
                getGameRentDetailsApiCalls(id)
                    .then(res => res.json())
                    .then(d => {
                        if(id){
                            setUserId(data.find(u => u.id === d.user_id).id);
                        }
                    })
            })
            .catch(error => {
                console.log(error);
            });

        if(id){
            getGameRentDetailsApiCalls(id)
                .then(res => res.json())
                .then(data => {
                    setRentDetails(data)
                    setToWhen(`${new Date(data?.to_when).getFullYear()}-${addZero(new Date(data.to_when).getMonth() + 1)}-${addZero(new Date(data.to_when).getDate())}`);
                    // setToWhen(data.to_when);
                    setGameCount(data.game_count || '');
                })
        }
    
        // if (!rentDetails.id) {
        //     setGameId(games.find(x => x.id === rentDetails.game_id).id);
        // }
    }, []);
        
    const addZero = (i) => {
        return i < 10 ? `0${i}` : i;
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validateForm();
        const rent = {user_id: userId, game_id: gameId, to_when: to_when, game_count: game_count};
        if(isValid){
            const currentFormMode = id ? formMode.EDIT : formMode.NEW;
            let promise;
            let response;
            if(currentFormMode === formMode.NEW){
                promise = addGameRentApiCalls(rent);
            } else {
                console.log(rent);
                promise = updateGameRentApiCalls(id, rent);
            }
            console.log(promise);
            if(promise){
                promise
                .then(res => {
                    response = res;
                    if(response.status === 201 || response.status === 500){
                        return res.json();
                    }
                })
                .then(data => {
                    if(!response.ok && response.status === 500){
                        setGlobalErrorMessage('Jest blad w formularzu sprawdz dane');
                        console.log(data);
                    }else {
                        push({
                            pathname: "/gameRent",
                            state: {
                                message: currentFormMode === formMode.NEW ? "Dodano wypozyczenie" : "Zaktualizowano wypozyczenie"
                            }
                        })
                    }
                })
                .catch(error => {
                    setGlobalErrorMessage(error);
                })
            }
        }
    }

    const handleSelectChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value);
        if(name == 'user_id'){
            setUserId(value);
        }else {
            setGameId(value);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        if(name == 'to_when'){
            setToWhen(value);
        }else {
            setGameCount(value);
        }
    }

    const validateForm = () => {
        let valid = true;
        if(!checkRequired(userId)){
            setUserIdError('User id is required');
            valid = false;
        }else {
            setUserIdError('');
            valid = true;
        }

        if(!checkRequired(gameId)){
            setGameIdError('Game id is required');
            valid = false;
        }else {
            setGameIdError('');
        }

        if(!checkRequired(to_when)){
            setToWhenErrorError('To when is required');
            valid = false;
        }else {
            setToWhenErrorError('');
            valid = true;
        }

        if(!checkRequired(game_count)){
            setGameCountError('Game count is required');
            valid = false;
        }else {
            setGameCountError('');
            valid = true;
        }

        if(!valid){
            setGlobalErrorMessage('Form has errors');
        }else {
            setGlobalErrorMessage('');
        }

        return valid;
    }

    const pageTitle = (id ? formMode.EDIT : formMode.NEW) === formMode.NEW ? t('rentals.new') : t('rentals.edit');
    if(isAuthenticated()){
        return (
        <main>
            <h2>{pageTitle}</h2>
            <form className='form' onSubmit={handleSubmit}>
                <label htmlFor='user_id'>{ t('rentals.placeholders.form.chooseUser') }:</label>
                {!id && <select name='user_id' onChange={handleSelectChange} className={userIdError.length > 0 ? 'error-input' : ''}>
                    <option value="">{ t('rentals.placeholders.form.chooseUser') }</option>
                    { 
                        users.map(user => (
                            <option key={user.id} value={user.id}>{user.firstname} {user.lastname}</option>
                            ))
                        }
                </select>}
                {
                    id && <select name='user_id' onChange={handleSelectChange} className={userIdError.length > 0 ? 'error-input' : ''}>
                        <option value={users.find(x => x.id === rentDetails.user_id)?.id}>{users.find(x => x.id === rentDetails.user_id)?.firstname} {users.find(x => x.id === rentDetails.user_id)?.lastname}</option>
                        {
                            users.filter(x => x.id !== rentDetails.user_id).map(user => (
                                <option key={user.id} value={user.id}>{user.firstname} {user.lastname}</option>
                            ))
                        }
                    </select>
                }
                <span id='error-user_id' className='errors-text'>{userIdError}</span>
                <label htmlFor='game_id'>{ t('rentals.placeholders.form.chooseGame') }:</label>
                {!id && <select name='game_id' onChange={handleSelectChange} className={gameIdError.length > 0 ? 'error-input' : ''}>
                    <option value="">{ t('rentals.placeholders.form.chooseGame') }</option>
                    { 
                        games.map(game => (
                            <option key={game.id} value={game.id}>{game.name}</option>
                        ))
                    }
                </select>}
                {
                    id && <select name='game_id' onChange={handleSelectChange} className={gameIdError.length > 0 ? 'error-input' : ''}>
                        <option value={games.find(x => x.id === rentDetails.game_id)?.id}>{games.find(x => x.id === rentDetails.game_id)?.name}</option>
                        {
                            games.filter(x => x.id !== rentDetails.game_id).map(game => (
                                <option key={game.id} value={game.id}>{game.name}</option>
                            ))
                        }
                    </select>
                }
                <span id="error-game_id" className='errors-text'>{gameIdError}</span>
                <FormInput type="date" label={ t('rentals.placeholders.form.toWhenDate') } name="to_when" value={to_when} onChange={handleChange} error={toWhenError} required />
                <FormInput type="number" label={ t('rentals.placeholders.form.gameCount') } name="game_count" value={game_count } onChange={handleChange} error={gameCountError} required placeholder={ t('rentals.placeholders.form.gameCount') }/>
                <FormButton mode={id ? formMode.EDIT : formMode.NEW} error={globalErrorMessage} cancelPath="/gameRent" />
            </form>
        </main>
    )
    }else {
        return (
            <main>
                <h2>{pageTitle}</h2>
                <p>{ t('auth.blocked') }</p>
            </main>
        )
    }
}