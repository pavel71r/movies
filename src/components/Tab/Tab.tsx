import React from 'react';
import { Tabs } from 'antd';
import './Tab.css';
import type { TabsProps } from 'antd';

import ItemList from '../ItemList/ItemList';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import SearchPanel from '../SearchPanel/SearchPanel';
import Spinner from '../Spinner/Spinner';
import Paginal from '../Paginal/Paginal';
import type { DataType, TabType } from '../../Types';

const Tab = ({ props, onChangeTabs, onChangePage, onSearch, onLike }: TabType) => {
  const spinner = props.loading ? <Spinner /> : null;

  const errorMessage = props.error || props.notFound ? <ErrorMessage props={props} /> : null;

  const pagination =
    props.totalPage && !props.loading && !props.error ? <Paginal props={props} onChangePage={onChangePage} /> : null;

  let newData: Array<DataType> = [];
  if (props.valueTabs === '1') {
    newData = props.data;
  }
  if (props.valueTabs === '2') {
    newData = props.likeData;
  }

  const App = (
    <React.Fragment>
      {props.valueTabs === '1' && <SearchPanel onSearch={onSearch} />}
      {spinner}
      {errorMessage}
      <ItemList props={newData} onLike={onLike} />
      {pagination}
    </React.Fragment>
  );

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Search',
      children: App,
    },
    {
      key: '2',
      label: 'Rated',
      children: App,
    },
  ];

  return <Tabs destroyInactiveTabPane defaultActiveKey="1" items={items} centered onChange={onChangeTabs} />;
};

export default Tab;
