import React from 'react';
import { Input } from 'antd';

import './SearchPanel.css';

type StateType = {
  value: string;
};

export default class SearchPanel extends React.Component<any, StateType> {
  state = {
    value: '',
  };

  onChange = (event: any) => {
    this.setState({ value: event.target.value });
    if (event.nativeEvent.data !== ' ' && event.nativeEvent.data !== null) {
      this.props.onSearch(event.target.value);
    }
  };

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({ value: '' });
  };

  render() {
    return (
      <form
        className="SearchPanel"
        onSubmit={(event) => {
          this.onSubmit(event);
        }}
      >
        <Input
          autoFocus={false}
          placeholder="Type to search..."
          value={this.state.value}
          onChange={(event) => {
            this.onChange(event);
          }}
        />
      </form>
    );
  }
}
