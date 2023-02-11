import { Alert, Space } from 'antd';

import './ErrorMessage.css';
import type { StateType } from '../App/App';

type ErrorMessageType = { props: StateType };

const ErrorMessage = ({ props }: ErrorMessageType) => {
  let description;
  let typeError: 'error' | 'info' | 'success' | 'warning' | undefined;
  let message;

  if (props.notFound) {
    description = '«Упс… Мы не можем найти то, что Вы ищете»';
    typeError = 'info';
    message = ' Info message';
  }

  if (props.error) {
    description = 'ERR_INTERNET_DISCONNECTED';
    typeError = 'error';
    message = 'Error';
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Alert message={message} description={description} type={typeError} showIcon />
    </Space>
  );
};

export default ErrorMessage;
