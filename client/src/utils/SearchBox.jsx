/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


import React from 'react';
import { Form } from 'react-bootstrap';

const SearchBox = ({ changeHandler }) => {
  return (
    <Form inline className="py-2">
      <Form.Control
        type="text"
        onChange={changeHandler}
        placeholder="Search Subject..."
      ></Form.Control>
      &nbsp;
      <i className="fas fa-search fa-2x"></i>
    </Form>
  );
};

export default SearchBox;
