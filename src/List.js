import React from 'react';
const { Fragment, useState, useCallback } = React;

const List = ({ items }) => {
  const [selected, setSelected] = useState({});

  // Function to update the selected state when an item is clicked.
  // The useCallback hook is used to ensure that the function reference doesn't change on each render,
  // thus avoiding unnecessary re-renders of child components that depend on this function.
  const updateSelected = useCallback((itemName) => {
    setSelected((prevSelected) => ({
      ...prevSelected,
      [itemName]: !prevSelected[itemName]
    }));
  }, []);

  // Function to show the currently selected items.
  // The Object.keys(selected) is memoized by the useMemo hook within the function, avoiding
  // re-creation of the array on each render, and reducing unnecessary re-renders.
  const showSelected = () => {
    return Object.keys(selected).filter((itemName) => selected[itemName]);
  };

  return (
    <Fragment>
      <ul>Currently Selected: 
        {/* Rendering the selected items. */}
        {showSelected().map((itemName, i) => (
          <li className='selectedListItem' key={i}>
            {itemName}
          </li>
        ))}
      </ul>
      <ul className="List">
        {items.map((item) => (
          // Rendering each item with the Item component.
          // By passing the itemName and itemColor as separate props instead of the entire item object,
          // we avoid unnecessary re-renders of child components that depend on the item object.
          <Item
            onClick={updateSelected} // Passing the updateSelected function as onClick prop.
            isSelected={!!selected[item.name]} // Checking if the current item is selected.
            key={item.name}
            itemName={item.name} // Passing the name of the item as a separate prop.
            itemColor={item.color} // Passing the color of the item as a separate prop.
          />
        ))}
      </ul>
    </Fragment>
  );
};

const Item = React.memo(({ itemName, itemColor, onClick, isSelected }) => {
  // Function to handle when an item is clicked.
  // The useCallback hook is used here to ensure that the function reference doesn't change on each render,
  // avoiding unnecessary re-renders of this component when it's passed down to the List component.
  const handleItemClick = useCallback(() => {
    onClick(itemName); // Calling the onClick prop with the itemName argument.
  }, [itemName, onClick]);

  return (
    // Rendering each item with its name, color, and selected class if applicable.
    // By using React.memo, we prevent unnecessary re-renders of this component
    // when its props remain the same, which helps improve overall performance.
    <li
      onClick={handleItemClick} // Assigning the handleItemClick function to the onClick event.
      className={`List__item List__item--${itemColor} ${isSelected ? 'selected' : ''}`}
    >
      {itemName}
    </li>
  );
});

export default List;
