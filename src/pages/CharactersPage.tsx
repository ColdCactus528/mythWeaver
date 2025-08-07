import React, { useState, useEffect } from 'react';
import type { Character} from '../interfaces/Character';
import CharacterModal from './CharacterModal';

import { getCharacters, addCharacter, deleteCharacter } from '../services/CharacterService';

import './CharactersPage.css';

const CharactersPage: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const existing = getCharacters();
    if (existing.length === 0) {
      const defaultChar = addCharacter({
        name: 'Архетип',
      race: 'Человек',
      class: 'Бродяга',
      description: 'Его Легенда только начинается...',
      });
      setCharacters([defaultChar]);
    } else {
      setCharacters(existing);
    }
  }, []);

  const handleCreateCharacter = () => {
    const newCharData = {
      name: '',
      race: '',
      class: '',
      description: ''
    };

    const createdChar = addCharacter(newCharData);
    setCharacters(prev => [...prev, createdChar]);
  };

  const handleSaveCharacter = (updated: Character) => {
    const updatedList = characters.map(c => c.id === updated.id ? updated : c);
    localStorage.setItem('characters', JSON.stringify(updatedList));
    setCharacters(updatedList);
    setEditingCharacter(null);
  }

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
        {characters.map(char => (
          <div 
            key={char.id} 
            className="character-card"
            onClick={() => setEditingCharacter(char)}
          >
            <div className="card-header">
              <h2>{char.name}</h2>
              <button
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteCharacter(char.id)
                }}
                title="Удалить персонажа"
              >
                ×
              </button>
            </div>
            <p className="character-meta">{char.race}, {char.class}</p>
            {char.description && <p className="description">{char.description}</p>}
          </div>
        ))}
    
        <button className="character-card create-new-card" onClick={handleCreateCharacter}>
          +
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