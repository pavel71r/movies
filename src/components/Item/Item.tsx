import React from 'react';
import './Item.css';
import { Card, Rate } from 'antd';
import { format } from 'date-fns';
import { truncate } from 'lodash';

export default class Item extends React.Component<any> {
  urlImg: string = this.props.props.poster_path
    ? `https://image.tmdb.org/t/p/original${this.props.props.poster_path}`
    : 'https://img.freepik.com/premium-vector/error-404-landing-page-with-a-file-in-flat-design_249405-162.jpg?w=1380';

  onChangeLike = (value: number) => {
    this.props.onLike(this.props.props.id, value);
    sessionStorage.setItem(this.props.props.id, String(value));
  };

  render() {
    let rate: number = this.props.props.rating;
    if (sessionStorage.getItem(this.props.props.id)) {
      rate = Number(sessionStorage.getItem(this.props.props.id));
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

    const genre: Array<any> = [];
    this.props.props.genre_ids.forEach((item: any) => {
      this.props.genre.forEach((el: any) => {
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
