import type { Character } from '../interfaces/Character';

const STORAGE_KEY = 'my-characters';

export const getCharacters = (): Character[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      return JSON.parse(data) as Character[];
    } catch (error) {
      console.error("Ошибка парсинга персонажей из localStorage:", error);
      return [];
    }
  }
  return [];
};

export const saveCharacters = (characters: Character[]): void => {
  try {
    const data = JSON.stringify(characters);
    localStorage.setItem(STORAGE_KEY, data);
  } catch (error) {
    console.error("Ошибка сохранения персонажей в localStorage:", error);
  }
};

export const addCharacter = (newCharacterData: Omit<Character, 'id'>): Character => {
  const characters = getCharacters();
  
  const characterWithId: Character = {
    ...newCharacterData,
    id: new Date().toISOString() + Math.random(),
  };

  const updatedCharacters = [...characters, characterWithId];

  saveCharacters(updatedCharacters);

  return characterWithId;
};

export const deleteCharacter = (characterId: string): void => {
  const characters = getCharacters();

  const updatedCharacters = characters.filter(char => char.id !== characterId);
  saveCharacters(updatedCharacters);
}

export const updateCharacter = (updatedCharacter: Character): void => {
  const characters = getCharacters();

  const index = characters.findIndex(char => char.id === updatedCharacter.id);

  if (index !== -1) {
    characters[index] = updatedCharacter;
    saveCharacters(characters);
  } else {
    console.warn(`Персонаж с id: ${updatedCharacter.id} не найден для обновления.`);
  }
};