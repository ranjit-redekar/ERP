import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const App: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Link to={'/home'} type="primary">Back Home</Link>}
  />
);

export default App;