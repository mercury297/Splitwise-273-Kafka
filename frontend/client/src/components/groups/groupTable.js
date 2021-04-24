/* eslint-disable react/button-has-type */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import '../../styles/myGroups.css';
import '../../styles/groupPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Table extends Component {
  render() {
    // console.log('this props data', this.props.data);
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
        {/* <tbody>
          {this.props.data.map((expense) => (
            <tr>
              <td>{expense.Description}</td>
              <td>{expense.EmailId}</td>
              <td>{expense.Amount}</td>
              <td>{expense.createdAt.slice(0, 10)}</td>
            </tr>
          ))}
        </tbody> */}
        <tbody>
          <tr>
            <td className="Description">Expense description</td>
            <td className="PaidBy">Paid By</td>
            <td>Amount</td>
            <td>Date</td>
            <td>
              <ul className="list-group noteslist">
                <li className="list-group-item notes">
                  Maine daru nahi piya be
                  <button type="button" className="btn btn-warning btn-sm deletenote">Delete</button>
                </li>
                <li className="list-group-item notes">
                  Maine daru nahi piya be
                  <button type="button" className="btn btn-warning btn-sm deletenote">Delete</button>
                </li>
                <li className="list-group-item notes">
                  Maine daru nahi piya be
                  <button type="button" className="btn btn-warning btn-sm deletenote">Delete</button>
                </li>
              </ul>
            </td>
            <td>
              <textarea placeholder="Add your comments"> </textarea>
              <button className="btn btn-small btn-orange post">Post</button>
            </td>
          </tr>
        </tbody>
      </table>

    );
  }
}

export default Table;
