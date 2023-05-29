import React, { useState } from 'react';

function Tag() {
  const [inputValue, setInputValue] = useState('');
  const [tagList, setTagList] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleTagRemove = (tagName) => {
    const updatedTagList = tagList.filter((tag) => tag !== tagName);
    setTagList(updatedTagList);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setInputValue(inputValue.trim());
      if (inputValue !== '') {
        setTagList([...tagList, inputValue]);
        setInputValue('');
      }
    }
  };

  return (
    <div className="flex justify-between">
      <div className="left h-screen flex flex-col items-center justify-start w-3/5 pt-16">
        <div className="box relative">
          <input
            type="text"
            className="w-full h-12 bg-white border-2 border-purple-500 rounded-full px-4"
            placeholder="ENTER YOUR LANGUAGES OF INTEREST"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <span className="absolute top-0 left-2/4 transform -translate-x-2/4 -translate-y-full bg-white px-2 py-1 text-purple-500 font-semibold text-xs rounded-t-2xl">
            ENTER YOUR LANGUAGES OF INTEREST
          </span>
        </div>
        <div className="allTags flex items-center mt-4 space-x-2">
          {tagList.map((tag) => (
            <div key={tag} className="block bg-purple-500 px-4 py-2 text-white rounded-full">
              <b>{tag}</b>
              <div
                className="remove ml-2 cursor-pointer rounded-full transition-colors duration-300 hover:bg-purple-600"
                onClick={() => handleTagRemove(tag)}
              >
                x
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="right h-screen w-2/5 p-4 flex items-start justify-end max-w-md bg-gray-900 bg-opacity-60">
        <div className="pad">
          <h3>Selected Languages</h3>
          <div className="allSel">
            {/* Add your selected languages here */}
          </div>
          <button className="proceed">Proceed</button>
        </div>
      </div>
    </div>
  );
}

export default Tag;
