/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-no-undef */
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import '../../App.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import '../../styles/dashboard.css';
import '../../styles/groupPage.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Select from 'react-select';
import { currencyFormatter, getConfig, getCurrentUserData } from '../../utils/commonUtils';
import API from '../../config';
import { getDashboard } from '../../redux/actions/dashboardAction';

class DashboardNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      userSelected: '',
    };
  }

  showModal = () => {
    this.setState({
      modal: true,
    });
  }

  handleClose = () => {
    this.setState({
      modal: false,
    });
  }

  handleSelectChange = (email) => {
    this.setState({ userSelected: email.value });
  }

  settleUp = async () => {
    const currentUser = getCurrentUserData();

    try {
      console.log(this.state.userSelected, currentUser.email);
      const config = getConfig();
      const settleRes = await axios.post(`${API.host}/dashboard/settle-up`, {
        currentUser: currentUser.email,
        settleUpUser: this.state.userSelected,
      }, config);
      console.log('settle res', settleRes);
      if (settleRes.status === 200) {
        alert('Settle up successful');
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const currentUser = getCurrentUserData();
    return (
      <Container className="shadow p-3 mb-5 bg-white rounded" className="justify-content-md-center">
        <Jumbotron className="jumbotron">
          <Row>
            <h3>Dashboard </h3>
            <Col>
              <Button id="settle_button" onClick={this.showModal}>Settle</Button>
              <Modal
        // eslint-disable-next-line react/destructuring-assignment
                show={this.state.modal}
                onHide={this.handleClose}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Settle up with users!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div type="text" className="description"> Enter email </div>
                  <div className="cost_container">
                    <Select
                      options={this.props.userList}
                      className="cost"
                      placeholder="johnDoe@123.com"
                      onChange={(opt) => this.handleSelectChange(opt)}
                    />
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="light" onClick={this.handleClose}>
                    Cancel
                  </Button>
                  <Button variant="primary" id="save" onClick={this.settleUp}>Settle Up</Button>
                </Modal.Footer>
              </Modal>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col className="grid">
              <span>Total balance</span>
              <br />
              <span>
                {currencyFormatter(currentUser.default_currency, this.props.totals.total)}
              </span>
            </Col>
            <Col className="grid">
              <span>You owe</span>
              <br />
              <span>
                {currencyFormatter(currentUser.default_currency, this.props.totals.owes)}
              </span>
            </Col>
            <Col className="grid">
              <span>You are owed</span>
              <br />
              <span>
                {currencyFormatter(currentUser.default_currency, this.props.totals.owed)}
              </span>
            </Col>
          </Row>
        </Jumbotron>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getDashboard: (payload) => dispatch(getDashboard(payload)),
});

export default connect(null, mapDispatchToProps)(DashboardNav);
