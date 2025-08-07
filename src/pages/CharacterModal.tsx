import type { Character } from "../interfaces/Character";
import React, { useState } from 'react';
import './CharacterModal.css';

interface CharacterModalProps {
  character: Character;
  onClose: () => void;
  onSave: (updated: Character) => void;
}

const CharacterModal: React.FC<CharacterModalProps> = ({ character, onClose, onSave }) => {
  const [form, setForm] = useState(character);

  const handleChange = (field: keyof Character, value:string) => {
    setForm((prev: Character) => ({...prev, [field]: value }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Редактировать персонажа</h2>
        <input value={form.name} onChange={e => handleChange('name', e.target.value)} placeholder="Имя" />
        <input value={form.race} onChange={e => handleChange('race', e.target.value)} placeholder="Раса" />
        <input value={form.class} onChange={e => handleChange('class', e.target.value)} placeholder="Класс" />
        <textarea value={form.description} onChange={e => handleChange('description', e.target.value)} placeholder="Описание" />
        <button onClick={() => onSave(form)}>Сохранить</button>
        <button onClick={onClose}>Отмена</button>
      </div>
    </div>
  );
};

export default CharacterModal;