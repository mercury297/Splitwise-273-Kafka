/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import '../App.css';
import '../styles/profilePage.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { connect } from 'react-redux';
import SideNavbar from './Navbar';
import API from '../config';

import { setProfile, profileUpdate } from '../redux/actions/profileAction';
// import { getCurrentUserData, updateCurrentUserData } from '../utils/commonUtils';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      currentUser: {},
      loggedIn: false,
    };
  }

  componentDidMount = () => {
    const currentUser = [];
    console.log('this should solve problems: ', this.props.tempUser);
    this.props.setProfile(this.props.tempUser);
    // getCurrentUserData();
    if (currentUser === false) {
      this.setState({ loggedIn: false });
    } else {
      this.setState({ currentUser });
    }
  }

  handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const currency = e.target.default_currency.value === '' ? this.props.tempUser.currency : e.target.default_currency.value;
      const timezone = e.target.timezone.value === '' ? this.props.tempUser.timezone : e.target.timezone.value;
      const language = e.target.language.value === '' ? this.props.tempUser.language : e.target.language.value;
      const name = e.target.name.value === '' ? this.props.tempUser.name : e.target.name.value;
      const email = e.target.email.value === '' ? this.props.tempUser.email : e.target.email.value;
      const phone = e.target.phone_number.value === '' ? this.props.tempUser.phone : e.target.phone_number.value;
      const photoURL = e.target.photo_URL.files[0];
      // eslint-disable-next-line no-unused-vars
      const updateData = {
        currency,
        timezone,
        language,
        name,
        email,
        phone,
        photoURL: '',
      };
      console.log('form data: ', updateData);
      console.log(photoURL);
      if (photoURL !== '' && photoURL !== undefined) {
        const reader = new FileReader();
        reader.readAsDataURL(photoURL);
        const bodyParameters = new FormData();
        bodyParameters.append('file', photoURL);
        for (const key of bodyParameters.entries()) {
          console.log(`${key[0]}, ${key[1]}`);
        }

        let token = JSON.parse(localStorage.getItem('token'));
        token = token.split(' ');
        // token = token[1];
        console.log(token[1]);
        const config = {
          headers: { Authorization: `Bearer ${token[1]}` },
        };
        // eslint-disable-next-line no-underscore-dangle
        const resPhotoUrl = await axios.put(`${API.host}/picture/profile/${this.props.tempUser._id}`, bodyParameters, config);
        console.log('photoURL res: ', resPhotoUrl);
        updateData.photoURL = resPhotoUrl.data.photoURL;
      }
      this.props.profileUpdate(updateData);
      console.log('user auth', this.props.authUser);
      console.log('current user from auth red', this.props.currentUser);
      console.log('current user from profile red', this.props.profile);
    //   this.props.profileUpdate(updateData);
    } catch (err) {
      console.log(err);
      alert('Could not update profile!');
    }
  }

  render() {
    const { authUser, profile } = this.props;
    console.log(authUser, profile);
    const currentUser = profile;
    // if(currentUser !=== auth)
    let redirectVar = null;
    let currentURL = '';
    if (authUser === true && currentUser !== null) {
      // eslint-disable-next-line no-underscore-dangle
      currentURL = `https://splitwise-273.s3.us-east-2.amazonaws.com/${currentUser._id}`;
    //   currentURL = 'https://splitwise-273.s3.us-east-2.amazonaws.com/2e71c4a0-931b-11eb-ae51-cf63c6287ca9';
    } else {
      redirectVar = <Redirect to="/" />;
    }

    return (
      <div>
        {redirectVar}
        <SideNavbar />
        <div className="content-block-1">
          <img className="profile_picture" src={currentURL} alt="No img" width="200" height="200" />
          <form id="new_profile" className="form" method="post" onSubmit={this.handleSubmit}>
            <div id="photo_avatar_upload">
              <input name="photo_URL" type="file" id="profile_picture" onChange={this.onFileChange} />
            </div>
            <div className="input_1">
              <label>Your default currency</label>
              <br />
              <select defaultValue={currentUser.default_currency} name="default_currency" className="form-select" id="currency">
                <option value="USD">USD </option>
                <option value="KWD">KWD </option>
                <option value="BHD">BHD </option>
                <option value="GPB">GPB </option>
                <option value="EUR">EUR </option>
                <option value="CAD">CAD </option>
              </select>
              <br />
              <label>Your Time Zone</label>
              <br />
              <select name="timezone" className="form-select" id="Time Zone">
                <option value="PST">PST </option>
                <option value="EST">EST </option>
                <option value="IST">IST </option>
                <option value="PMT">PMT </option>
              </select>
              <br />
              <label>Language</label>
              <br />
              <select name="language" className="form-select" id="Language">
                <option value="English">English </option>
                <option value="Spanish">Spanish </option>
              </select>
            </div>
            <div className="input_2">
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>User Name</Form.Label>
                <Form.Control name="name" placeholder={currentUser.name} />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control name="email" type="email" placeholder={currentUser.email} />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control name="phone_number" type="number" placeholder={currentUser.phone ? currentUser.phone : 'Update phone number'} />
              </Form.Group>
            </div>
            <Button type="submit" style={{ backgroundColor: '#ff652f' }} className="btn btn-secondary btn-lg submit">SAVE</Button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authUser: state.auth.authUser,
  tempUser: state.auth.tempUser,
  profile: state.profile.user,
});

const mapDispatchToProps = (dispatch) => ({
  setProfile: (payload) => dispatch(setProfile(payload)),
  profileUpdate: (payload) => dispatch(profileUpdate(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
