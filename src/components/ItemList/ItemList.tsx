import React from 'react';
import './ItemList.css';

import Item from '../Item/Item';
import { Consumer } from '../../context/Context';
import type { ItemListPropsType } from '../../Types';

const ItemList = ({ props, onLike }: ItemListPropsType) => {
  const elements = props.map((item) => {
    return (
      <li key={item.id}>
        <Consumer>
          {(genre) => {
            return <Item props={item} onLike={onLike} genre={genre} />;
          }}
        </Consumer>
      </li>
    );
  });

  return <ul className="ItemList">{elements}</ul>;
};

export default ItemList;
