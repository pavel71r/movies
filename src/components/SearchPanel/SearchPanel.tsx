import React from 'react';
import { Input } from 'antd';

import './SearchPanel.css';
import type { SearchPanelPropsType, SearchPanelStateType } from '../../Types';

export default class SearchPanel extends React.Component<SearchPanelPropsType, SearchPanelStateType> {
  state = {
    value: '',
  };

  onChange = (event: React.BaseSyntheticEvent<any>) => {
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
      <form className="SearchPanel" onSubmit={this.onSubmit}>
        <Input autoFocus={false} placeholder="Type to search..." value={this.state.value} onChange={this.onChange} />
      </form>
    );
  }
}
