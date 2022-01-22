import React from "react";
import { useTranslation } from "react-i18next";

export default function Header() {
    const { t } = useTranslation();
    return (
        <>
        {/* <div>
            <div className="login">
                <h3>Login as: </h3>
                <div>
                    <span></span>
                </div>
            </div>
        </div> */}
            <header>
                <h1>{ t('main-page.title') }</h1>
                <img src="/img/logo.jpeg" alt="logo" />
            </header>
        </>
    )
}