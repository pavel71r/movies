import React from 'react';
import './ItemList.css';

import Item from '../Item/Item';
import { Consumer } from '../App/App';

export default class ItemList extends React.Component<any> {
  render() {
    const elements = this.props.props.map((item: any) => {
      return (
        <li key={item.id}>
          <Consumer>
            {(genre) => {
              return (
                <Item
                  props={item}
                  onLike={(id: string, rate: number) => {
                    this.props.onLike(id, rate);
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
  }
}
