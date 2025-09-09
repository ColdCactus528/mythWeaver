import type { Character } from "../interfaces/Character";
import React, { useState } from "react";
import "./CharacterModal.css";

interface CharacterModalProps {
  character: Character;
  onClose: () => void;
  onSave: (updated: Character) => void;
}

const CharacterModal: React.FC<CharacterModalProps> = ({ character, onClose, onSave }) => {
  const [form, setForm] = useState<Character>({
    ...character,
    name: character.name ?? "",
    race: character.race ?? "",
    class: character.class ?? "",
    description: character.description ?? "",
  });

  const handleChange = (field: keyof Character, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <div className="modal">
        <h2 id="modalTitle" className="modal-title">Редактировать персонажа</h2>

        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="charName">Имя</label>
            <input
              id="charName"
              value={form.name}
              onChange={e => handleChange("name", e.target.value)}
              placeholder="Артур"
              autoFocus
            />
          </div>

          <div className="form-field">
            <label htmlFor="charRace">Раса</label>
            <input
              id="charRace"
              value={form.race}
              onChange={e => handleChange("race", e.target.value)}
              placeholder="Человек"
            />
          </div>

          <div className="form-field">
            <label htmlFor="charClass">Класс</label>
            <input
              id="charClass"
              value={form.class}
              onChange={e => handleChange("class", e.target.value)}
              placeholder="Бродяга"
            />
          </div>

          <div className="form-field form-field--full">
            <label htmlFor="charDesc">Описание</label>
            <textarea
              id="charDesc"
              value={form.description}
              onChange={e => handleChange("description", e.target.value)}
              placeholder="Краткая заметка о персонаже…"
              rows={4}
            />
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn primary" onClick={() => onSave(form)}>Сохранить</button>
          <button className="btn" onClick={onClose}>Отмена</button>
        </div>
      </div>
    </div>
  );
};

export default CharacterModal;
