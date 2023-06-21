import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './currency.module.sass';

interface Currency {
    code: string;
    rate: number;
}

const CurrencyConverter: React.FC = () => {
    const [amount, setAmount] = useState<string>('');
    const [fromCurrency, setFromCurrency] = useState<Currency | null>(null);
    const [toCurrency, setToCurrency] = useState<Currency | null>(null);
    const [convertedAmount, setConvertedAmount] = useState<number>(0);
    const [currencies, setCurrencies] = useState<Currency[]>([]);

    useEffect(() => {
        fetchExchangeRate();
    }, []);

    const fetchExchangeRate = async () => {
        try {
            const response = await axios.get(
                'https://v6.exchangerate-api.com/v6/9e01f749e605de6a06421c20/latest/BYN'
            );
            const data = response.data;

            const bynCurrency: Currency = {
                code: 'BYN',
                rate: 1,
            };

            const fetchedCurrencies: Currency[] = Object.entries(data.conversion_rates).map(
                ([code, rate]: [string, unknown]) => ({
                    code,
                    rate: rate as number,
                })
            );

            setCurrencies([bynCurrency, ...fetchedCurrencies]);
            setFromCurrency(bynCurrency);
            setToCurrency(fetchedCurrencies[0]);
        } catch (error) {
            console.error('Failed to fetch exchange rates:', error);
        }
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setAmount(value);
    };

    const handleFromCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCurrency = event.target.value;
        const currency = currencies.find((curr) => curr.code === selectedCurrency) || null;
        setFromCurrency(currency);
    };

    const handleToCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCurrency = event.target.value;
        const currency = currencies.find((curr) => curr.code === selectedCurrency) || null;
        setToCurrency(currency);
    };

    const handleAmountClick = () => {
        setAmount('');
    };

    useEffect(() => {
        if (fromCurrency && toCurrency) {
            const convertedValue = (parseFloat(amount) / fromCurrency.rate) * toCurrency.rate;
            setConvertedAmount(convertedValue);
        }
    }, [amount, fromCurrency, toCurrency]);

    return (
        <div className={styles.container}>
            <div>
                <label>
                    Amount:
                    <input
                        className={styles.input}
                        onClick={handleAmountClick}
                        type="number"
                        value={amount}
                        onChange={handleAmountChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    From:
                    <select
                        className={styles.select}
                        value={fromCurrency?.code || ''}
                        onChange={handleFromCurrencyChange}>
                        {currencies.map((currency, index) => (
                            <option key={index} value={currency.code}>
                                {currency.code}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div>
                <label>
                    To:
                    <select
                        className={styles.select}
                        value={toCurrency?.code || ''}
                        onChange={handleToCurrencyChange}>
                        {currencies.map((currency, index) => (
                            <option key={index} value={currency.code}>
                                {currency.code}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Amount:
                    <input
                        className={styles.input}
                        type="number"
                        value={String(convertedAmount.toFixed(2))}
                        readOnly
                    />
                </label>
            </div>
        </div>
    );
};

export default CurrencyConverter;
