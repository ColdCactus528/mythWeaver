import React, { useState, useEffect } from 'react';
import type { Character } from '../interfaces/Character';
import CharacterModal from './CharacterModal';
import { getCharacters, addCharacter, deleteCharacter } from '../services/CharacterService';
import './CharactersPage.css';

const BASE = import.meta.env.BASE_URL;

const PortraitPlaceholder = `${BASE}images/portrait-placeholder.svg`;
const HoodedPlaceholder   = `${BASE}images/hooded-portrait-placeholder.png`;

const isComplete = (c: Character) => Boolean(c.name && c.race && c.class);

const cardBg = (url?: string) =>
  url
    ? {
        backgroundImage: `
          linear-gradient(180deg, rgba(10,20,27,0) 0%, rgba(10,20,27,.55) 45%, rgba(10,20,27,.85) 68%),
          url(${url})
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat'
      }
    : {};

const CharactersPage: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const existing = getCharacters();
    if (existing.length === 0) {
      const defaultChar = addCharacter({ name: 'Артур', race: 'Человек', class: 'Бродяга' });
      setCharacters([defaultChar]);
    } else {
      setCharacters(existing);
    }
  }, []);

  const handleCreateCharacter = () => {
    const createdChar = addCharacter({ name: '', race: '', class: '' });
    setCharacters(prev => [...prev, createdChar]);
  };

  const handleSaveCharacter = (updated: Character) => {
    const updatedList = characters.map(c => (c.id === updated.id ? updated : c));
    localStorage.setItem('characters', JSON.stringify(updatedList));
    setCharacters(updatedList);
    setEditingCharacter(null);
  };

  const handleDeleteCharacter = (id: string) => {
    deleteCharacter(id);
    setCharacters(prev => prev.filter(char => char.id !== id));
  };

  return (
    <div className="characters-page">
      <header className="page-header">
        <h1>Мои Персонажи</h1>
      </header>

      <div className="character-grid">
        {characters.map(char => {
          const media = isComplete(char) ? HoodedPlaceholder : PortraitPlaceholder;

          return (
            <div
              key={char.id}
              className="character-card card-has-media"
              style={cardBg(media)}
              onClick={() => setEditingCharacter(char)}
            >
              <button
                className="delete-button"
                onClick={e => {
                  e.stopPropagation();
                  handleDeleteCharacter(char.id);
                }}
                title="Удалить персонажа"
              >
                ×
              </button>

              <div className="card-text">
                <h2 className="card-title">{char.name || 'Немо'}</h2>

                <div className="character-tags">
                  {char.race ? <span className="pill">{char.race}</span> : null}
                  {char.class ? <span className="pill">{char.class}</span> : null}
                </div>

                <p className="character-desc">
                  {char.description?.trim() ||
                    (isComplete(char) ? null : 'Описание не задано...')}
                </p>
              </div>
            </div>
          );
        })}

        <button
          className="character-card create-new-card"
          onClick={handleCreateCharacter}
          aria-label="Создать персонажа"
        >
          <span className="big-plus">+</span>
        </button>
      </div>

      {characters.length === 0 && (
        <div className="no-characters-view">
          <p>У вас пока нет созданных персонажей. Нажмите на +, чтобы создать первого.</p>
        </div>
      )}

      {editingCharacter && (
        <CharacterModal
          character={editingCharacter}
          onClose={() => setEditingCharacter(null)}
          onSave={handleSaveCharacter}
        />
      )}
    </div>
  );
};

export default CharactersPage;
