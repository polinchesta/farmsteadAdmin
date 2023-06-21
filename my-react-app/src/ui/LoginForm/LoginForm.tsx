import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.sass';
import useTranslation from '../../hooks/useTranslation';
import { useState } from 'react';

export function LoginForm() {
    const { t } = useTranslation();
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    async function handleLogin() {
        try {
            const adminLogin = import.meta.env.VITE_ADMIN_LOGIN;
            const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

            if (login === adminLogin && password === adminPassword) {
                navigate("/product");
            } else {
                setLogin("");
                setPassword("");
                setIsError(true);
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className={styles.loginForm}>
            <div className={styles.formWrapper}>
                <form className={styles.form}>
                    <label htmlFor="email" className={styles.label}>
                        {t.sign.email}
                    </label>
                    <div className={styles.inputWrapper}>
                        <input
                            value={login}
                            type="text"
                            className={styles.input}
                            onChange={(e) => setLogin(e.target.value)}
                        />
                    </div>
                    <label htmlFor="password" className={styles.label}>
                        {t.sign.password}
                    </label>
                    <div className={styles.inputWrapper}>
                        <input
                            value={password}
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}
                        />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        {isError && <p className="text-red-500">{t.sign.error}</p>}
                        <button
                            className={styles.button}
                            onClick={handleLogin}
                        >
                            {t.sign.signIn}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
