import React, { useState } from 'react';
import styles from '../../../ui/modal/modal.module.sass';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useTranslation from '../../../hooks/useTranslation';


interface CustomModalProps {
  title: string;
  onClose: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ title, onClose }) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('+375');
  const [surname, setSurname] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    value = value.replace(/\D/g, '');
    if (value.startsWith('+')) {
      value = '+' + value.slice(1, 13);
    } else {
      value = '+' + value.slice(0, 12);
    }

    setPhoneNumber(value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('Name:', name);
    console.log('Surname:', surname);
    console.log('Phone Number:', phoneNumber);
    console.log('Selected Date:', selectedDate);

    setName('');
    setSurname('');
    setPhoneNumber('');
    setSelectedDate(null);

    onClose();
  };
  const minDate = new Date();
  const maxDate = new Date(minDate.getFullYear(), minDate.getMonth() + 1, minDate.getDate() - 1);

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
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="phoneNumber">{t.modal.phone}</label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={handlePhoneChange}
              required
            />
          </div>
          <div>
            <label htmlFor="date">{t.modal.date}</label>
            <DatePicker
              id="date"
              selected={selectedDate}
              minDate={minDate}
              maxDate={maxDate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              required
            />
          </div>
          <div className={styles.containerButton}>
            <button className={styles.buttonCall} type="submit">{t.modal.order}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomModal;
