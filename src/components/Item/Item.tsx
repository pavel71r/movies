import React from 'react';
import './Item.css';
import { Card, Rate } from 'antd';
import { format } from 'date-fns';
import { truncate } from 'lodash';

type PropsType = {
  genre: {
    id: number;
    name: string;
  }[];
  onLike: (id: number, value: number) => void;
  props: DataType;
};

export type DataType = {
  adult: boolean;
  backdrop_path: null | string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: null | string;
  release_date: string;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
  rating?: number | undefined;
};

export default class Item extends React.Component<PropsType, {}> {
  urlImg: string = this.props.props.poster_path
    ? `https://image.tmdb.org/t/p/original${this.props.props.poster_path}`
    : 'https://img.freepik.com/premium-vector/error-404-landing-page-with-a-file-in-flat-design_249405-162.jpg?w=1380';

  onChangeLike = (value: number) => {
    this.props.onLike(this.props.props.id, value);
    sessionStorage.setItem(String(this.props.props.id), String(value));
  };

  render() {
    let rate = this.props.props.rating;
    if (sessionStorage.getItem(String(this.props.props.id))) {
      rate = Number(sessionStorage.getItem(String(this.props.props.id)));
    }

    let colorRate = 'Rate';

    if (this.props.props.vote_average < 3) {
      colorRate = 'Rate Rate3';
    }

    if (this.props.props.vote_average >= 3 && this.props.props.vote_average < 5) {
      colorRate = 'Rate Rate5';
    }

    if (this.props.props.vote_average >= 5 && this.props.props.vote_average < 7) {
      colorRate = 'Rate Rate7';
    }

    if (this.props.props.vote_average >= 7) {
      colorRate = 'Rate Rate10';
    }

    const genre = [];
    this.props.props.genre_ids.forEach((item) => {
      this.props.genre.forEach((el) => {
        if (item === el.id) {
          genre.push(
            <button key={el.id} className="Genre">
              {el.name}
            </button>
          );
        }
      });
    });

    if (!genre.length) {
      genre.push(
        <button key={Math.random()} className="GenreFake">
          pattern
        </button>
      );
    }

    return (
      <Card className="Item">
        <div className="Container">
          <img className="Img" src={this.urlImg} alt="poster"></img>
          <div className="ItemWrapper">
            <h1 className="Title">{this.props.props.title}</h1>
            <div className={colorRate}>{Math.round(this.props.props.vote_average * 10) / 10}</div>
            <span className="Date">
              {this.props.props.release_date ? format(new Date(this.props.props.release_date), 'PP') : null}
            </span>
            <div className="WrapperGenre">{genre}</div>
            <p className="Text">
              {truncate(this.props.props.overview, {
                length: 150,
                separator: ' ',
              })}
            </p>
            <Rate
              allowHalf
              defaultValue={rate}
              count={10}
              onChange={(value) => {
                this.onChangeLike(value);
              }}
            />
          </div>
        </div>
      </Card>
    );
  }
}
