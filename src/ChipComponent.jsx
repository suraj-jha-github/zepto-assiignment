import React, { useState, useRef, useEffect } from 'react';
import './ChipComponent.css'; 

const ChipComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [chips, setChips] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const inputRef = useRef();

  const allItems = ['Narayan Garmer','Anita Gros','Mariana Augustine','Item1', 'Item2', 'Item3', 'Nick Giannopoulos',];

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim() === '') {
      setFilteredItems([]);
    } else {
      const filtered = allItems.filter(item => item.toLowerCase().includes(value.toLowerCase()));
      setFilteredItems(filtered);
    }
  };

  const handleItemClick = (item) => {
    setChips([...chips, item]);
    setInputValue('');
    setFilteredItems(filteredItems.filter(filteredItem => filteredItem !== item));
  };

  const handleChipRemove = (chip) => {
    setChips(chips.filter(existingChip => existingChip !== chip));
    setFilteredItems([...filteredItems, chip]);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Backspace' && inputValue === '') {
      const lastChip = chips[chips.length - 1];
      if (lastChip) {
        handleChipRemove(lastChip);
      }
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, [chips]);

  return (
    <div className="chip-container">
      <div className="chips">
        {chips.map(chip => (
          <div key={chip} className="chip">
            {chip}
            <span className="chip-remove" onClick={() => handleChipRemove(chip)}>X</span>
          </div>
        ))}
      </div>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
      <ul className="item-list">
        {filteredItems.map(item => (
          <li key={item} onClick={() => handleItemClick(item)}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChipComponent;