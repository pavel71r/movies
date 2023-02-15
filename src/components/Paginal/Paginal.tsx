import React from 'react';
import { Pagination } from 'antd';

import type { PaginalType } from '../../Types';
import './Paginal.css';

const Paginal = ({ props, onChangePage }: PaginalType) => {
  const totalPage = props.valueTabs === '1' ? props.totalPage : props.totalLikePage;
  const defaultPage: number = props.valueTabs === '1' ? props.valuePaginationSearch : props.valuePaginationRated;

  return (
    <Pagination
      defaultCurrent={defaultPage}
      total={totalPage}
      defaultPageSize={20}
      showSizeChanger={false}
      hideOnSinglePage
      onChange={onChangePage}
    />
  );
};

export default Paginal;
