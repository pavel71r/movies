import React from 'react';
import './ItemList.css';

import Item from '../Item/Item';
import { Consumer } from '../App/App';
import type { DataType } from '../Item/Item';

type PropsType = {
  onLike: (id: number, rate: number) => void;
  props: DataType[];
};

const ItemList = ({ props, onLike }: PropsType) => {
  const elements = props.map((item) => {
    return (
      <li key={item.id}>
        <Consumer>
          {(genre) => {
            return (
              <Item
                props={item}
                onLike={(id, rate) => {
                  onLike(id, rate);
                }}
                genre={genre}
              ></Item>
            );
          }}
        </Consumer>
      </li>
    );
  });

  return <ul className="ItemList">{elements}</ul>;
};

export default ItemList;
