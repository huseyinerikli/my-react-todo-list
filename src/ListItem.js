import React from 'react';

const ListItem = ({list, deleteItem}) => {
    const itemDisplay = list.map(item => (
    <li key={item.id} onClick={() => deleteItem(item.id)}>
      {item.text}
    </li>
  ));
  return (<>{itemDisplay}</>)
};

export default ListItem