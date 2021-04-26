/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import '../../styles/myGroups.css';
import '../../styles/groupPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';
import { connect } from 'react-redux';
// import API from '../../config';
import { getCurrentUserData, getDayOfWeek } from '../../utils/commonUtils';
import { deleteNote, addNote } from '../../redux/actions/groupAction';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: '',
    };
  }

    handleDelete = async (expenseID, noteID) => {
      console.log(expenseID, noteID);
      // eslint-disable-next-line no-restricted-globals
      if (confirm('Are you sure you want to delete this node?')) {
        // const config = getConfig();
        const currentUser = getCurrentUserData();
        const { email, name } = currentUser;
        const { groupName } = this.props.expenses[0];
        // const reqBody = { email, name };
        // console.log(reqBody);
        // console.log(config);
        // const deleteRes =
        // await axios.delete(`${API.host}/group-management/group/${groupName}
        // /expense/${expenseID}/note/${noteID}`, config, reqBody);
        // if (deleteRes.status === 200) {
        //   alert('Note deleted ');
        // } else {
        //   alert('Problem in deleting note');
        // }
        const payload = {
          groupName, expenseID, email, name, noteID,
        };
        this.props.deleteNote(payload);
      } else {
        console.log('Well you did not');
      }
    }

    handlePostNote = async (expenseID) => {
      console.log(expenseID);
      console.log(this.state.note);
      const { note } = this.state;
      // const config = getConfig();
      const currentUser = getCurrentUserData();
      const { email, name } = currentUser;
      const { groupName } = this.props.expenses[0];
      // const reqBody = { email, name, note };
      // const addNoteRes = await axios.post(`${API.host}/group-management/group
      // /${groupName}/expense/${expenseID}/note`, reqBody, config);
      // if (addNoteRes.status === 201) {
      //   alert('Note added successfully!');
      // }
      const payload = {
        groupName, expenseID, email, name, note,
      };
      this.props.addNote(payload);
    }

    handleNoteChange = (event) => {
    //   console.log(event.target.value);
      this.setState({ note: event.target.value });
    }

    render() {
      console.log('this props data', this.props.expenses);
      return (
        <table className="table" id="grouppagetable" style={{ marginLeft: '200px' }}>
          <thead>
            <tr>
              <th>Expense description</th>
              <th>Paid By</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Notes</th>
              <th>Add Note</th>
            </tr>
          </thead>
          <tbody>
            {this.props.expenses.map((expense) => (
              <tr>
                <td className="Description">{expense.description}</td>
                <td className="PaidBy">{expense.paidName}</td>
                <td>{expense.amount}</td>
                <td>{getDayOfWeek(expense.date)}</td>
                <td>
                  <ul className="list-group noteslist">
                    {expense.notes.map((note) => (
                      <li className="list-group-item notes">
                        <span style={{ fontWeight: 'bold' }}>{note.name}</span>
                        :
                        {' '}
                        {note.note}
                        <button type="button" className="btn btn-warning btn-sm deletenote" onClick={() => this.handleDelete(expense._id, note._id)}>Delete</button>
                      </li>
                    ))}
                  </ul>
                </td>
                <td>
                  <textarea placeholder="Add your comments" onChange={(e) => this.handleNoteChange(e)}> </textarea>
                  <button className="btn btn-small btn-orange post" onClick={() => this.handlePostNote(expense._id)}>Post</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      );
    }
}

const mapDispatchToProps = (dispatch) => ({
  deleteNote: (payload) => dispatch(deleteNote(payload)),
  addNote: (payload) => dispatch(addNote(payload)),
});

export default connect(null, mapDispatchToProps)(Table);
