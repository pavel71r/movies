import React from 'react';
import './Item.css';
import { Card, Rate } from 'antd';
import { format } from 'date-fns';
import { truncate } from 'lodash';

import type { ItemPropsType } from '../../Types';

const Item = ({ props, genre, onLike }: ItemPropsType) => {
  const urlImg: string = props.poster_path
    ? `https://image.tmdb.org/t/p/original${props.poster_path}`
    : 'https://img.freepik.com/premium-vector/error-404-landing-page-with-a-file-in-flat-design_249405-162.jpg?w=1380';

  const onChangeLike = (value: number) => {
    onLike(props.id, value);
    sessionStorage.setItem(String(props.id), String(value));
  };

  let rate = props.rating;
  if (sessionStorage.getItem(String(props.id))) {
    rate = Number(sessionStorage.getItem(String(props.id)));
  }

  let colorRate = 'Rate';

  if (props.vote_average < 3) {
    colorRate = 'Rate Rate3';
  }

  if (props.vote_average >= 3 && props.vote_average < 5) {
    colorRate = 'Rate Rate5';
  }

  if (props.vote_average >= 5 && props.vote_average < 7) {
    colorRate = 'Rate Rate7';
  }

  if (props.vote_average >= 7) {
    colorRate = 'Rate Rate10';
  }

  const genreList = [];
  props.genre_ids.forEach((item) => {
    genre.forEach((el) => {
      if (item === el.id) {
        genreList.push(
          <button key={el.id} className="Genre">
            {el.name}
          </button>
        );
      }
    });
  });

  if (!genreList.length) {
    genreList.push(
      <button key={1} className="GenreFake">
        pattern
      </button>
    );
  }

  return (
    <Card className="Item">
      <div className="Container">
        <img className="Img" src={urlImg} alt="poster"></img>
        <div className="ItemWrapper">
          <h1 className="Title">{props.title}</h1>
          <div className={colorRate}>{Math.round(props.vote_average * 10) / 10}</div>
          <span className="Date">{props.release_date ? format(new Date(props.release_date), 'PP') : null}</span>
          <div className="WrapperGenre">{genreList}</div>
          <p className="Text">
            {truncate(props.overview, {
              length: 150,
              separator: ' ',
            })}
          </p>
          <Rate allowHalf defaultValue={rate} count={10} onChange={onChangeLike} />
        </div>
      </div>
    </Card>
  );
};

export default Item;
