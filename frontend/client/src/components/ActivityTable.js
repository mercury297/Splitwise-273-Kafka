/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  MDBDataTable,
} from 'mdbreact';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import '../styles/myGroups.css';
// import Button from 'react-bootstrap/Button';

const TablePage = ({ data }) => (
  <Container className="justify-content-md-center-lower">
    <Row className="rrrow" style={{ marginLeft: '200px' }}>
      <MDBDataTable
        striped
        bordered
        small={true}
        searching
        data={data}
        hover
        entriesOptions={[2, 5, 10]}
      />
    </Row>
  </Container>
);

export default TablePage;
