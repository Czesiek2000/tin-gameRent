import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { isAdmin, isAuthenticated } from "../../helpers/authHelper";

export default function Navigation({ handleLogout }) {
    const { pathname } = useLocation();
    const { t, i18n } = useTranslation();
    
    const handleLanguageChange = (lang) => {
        localStorage.setItem('language', lang);
        i18n.changeLanguage(lang, (err, t) => {
            if(err) {
                console.log('something went wrong in change language', err);
            }
        });
    }

    const loginLogoutLink = isAuthenticated() ? <button onClick={handleLogout}>{t('form.actions.logout')}</button> : <Link to="/login" className={pathname.includes('login') ? 'active': ''} style={{ marginRight: pathname.includes("login") ? '5px' : ''}}>{t('form.actions.login')}</Link>;
    const checkLocalStorage = localStorage.getItem('user') == null ? false : true;
    const loggedAs = checkLocalStorage ? JSON.parse(localStorage.getItem('user')).name : '';

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/" className={ pathname === '/' ? 'active' : '' }>{ t('navLinks.home') }</Link>
                </li>
                <li>
                    <Link to="/users" className={ pathname.includes('users') ? 'active' : '' }>{ t('navLinks.users') }</Link>
                </li>
                <li>
                    <Link to="/games" className={ pathname.includes('games') ? 'active' : '' }>{ t('navLinks.games') }</Link>
                </li>
                <li>
                    <Link to="/gameRent" className={ pathname.includes('gameRent') ? 'active' : '' }>{ t('navLinks.rentals') }</Link>
                </li>
                <li>
                    <Link to="/history" className={ pathname.includes('history') ? 'active' : '' }>{ t('navLinks.history') }</Link>
                </li>
                <li style={{ marginLeft: 'auto' }}>
                    {checkLocalStorage && <span style={{ backgroundColor: isAdmin() ? '#8e24aa' : '' }}>{t('auth.loginAs')}: {loggedAs}</span>}
                </li>
                <li>
                    {loginLogoutLink}
                </li>
                <li className={i18n.language == 'pl' ? 'active' : ''}>
                    <button onClick={() => handleLanguageChange('pl')}>PL</button>
                </li>
                <li className={i18n.language == 'en' ? 'active' : ''}>
                    <button onClick={() => handleLanguageChange('en')}>EN</button>
                </li>
            </ul>
        </nav>
    )
}