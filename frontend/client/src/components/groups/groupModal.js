/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/jsx-filename-extension */
import Jumbotron from 'react-bootstrap/Jumbotron';
import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import '../../styles/groupPage.css';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { connect } from 'react-redux';
import API from '../../config';
import { getConfig, getCurrentUserData } from '../../utils/commonUtils';
import { addExpense } from '../../redux/actions/groupAction';

class ExpenseModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      amount: 'adf',
      description: 'asdf',
    };
  }

  handleClose = () => this.setState({ show: false });

  handleShow = () => this.setState({ show: true });

  onChangeAmount = (amount) => this.setState({ amount: amount.target.value });
  // // console.log();

  onChangeDesc = (description) => this.setState({ description: description.target.value });

  handleSave = async () => {
    console.log(this.state.amount);
    console.log(this.state.description);
    const { groupName } = this.props;
    const { description, amount } = this.state;
    const config = getConfig();
    const currentUser = getCurrentUserData();
    const payload = {
      groupName,
      description,
      amount,
      email: currentUser.email,
      name: currentUser.name,
    };
    // const addExpenseRes = await axios.post
    // (`${API.host}/group-management/group/${groupName}/expense`,
    //  reqBody, config);
    // console.log(addExpenseRes);
    this.props.addExpense(payload);
  }

  render() {
    return (
      <>
        <Container className="shadow p-3 mb-5 bg-white rounded" className="justify-content-md-center-group">
          <Jumbotron className="jumbotron-group" style={{ marginLeft: '200px' }}>
            <Row className="rrow">
              <Col><Button id="expense_button" onClick={this.handleShow}>Add an Expense</Button></Col>
            </Row>
          </Jumbotron>
        </Container>

        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add An Expense</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img className="category" alt="usrprofile" src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png" />
            <input type="text" className="description" name="description" placeholder="Enter a description" onChange={(e) => this.onChangeDesc(e)} />
            <div className="cost_container">
              <span className="currency_code">$</span>
              <input type="text" className="cost" placeholder="0.00" name="amount" onChange={(e) => this.onChangeAmount(e)} />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="light" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" id="save" onClick={this.handleSave}>Save</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addExpense: (payload) => dispatch(addExpense(payload)),
});

export default connect(null, mapDispatchToProps)(ExpenseModal);
