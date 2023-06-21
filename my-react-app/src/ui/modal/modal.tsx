import React, { useState } from 'react';
import styles from './modal.module.sass';
import useTranslation from '../../hooks/useTranslation';

interface ModalProps {
    title: string;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, onClose }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('+375');
    const [email, setEmail] = useState('');
    const { t } = useTranslation();

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        value = value.replace(/\D/g, '');
        if (value.startsWith('+')) {
            value = '+' + value.slice(1, 13);
        } else {
            value = '+' + value.slice(0, 12);
        }

        setPhone(value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Name:', name);
        console.log('Phone:', phone);
        console.log('Email:', email);
        onClose();
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>
                    &times;
                </button>
                <h2>{title}</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">{t.modal.name}</label>
                        <input type="text" id="name" value={name} onChange={handleNameChange} />
                    </div>
                    <div>
                        <label htmlFor="phone">{t.modal.phone}</label>
                        <input type="tel" id="phone" value={phone} onChange={handlePhoneChange} />
                    </div>
                    <div>
                        <label htmlFor="email">{t.modal.email}</label>
                        <input type="email" id="email" value={email} onChange={handleEmailChange} />
                    </div>
                    <div className={styles.containerButton}>
                        <button className={styles.buttonCall} type="submit">
                            {t.modal.call}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
