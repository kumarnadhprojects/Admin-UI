import { Component } from "react";
import Loader from "react-loader-spinner";

import DisplayAdminDetails from "../DisplayAdminDetails";
import "./index.css";
import Paginate from '../Paginate'

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  inProgress: "IN_PROGRESS",
};

const apiUrl =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

class AdminUi extends Component {
  state = {
    searchInput: "",
    UsersDetails: apiUrl,
    apiStatus: apiStatusConstants.initial,
    limit:10, 
    offset: 0, 
    setPageNumber: 0 , 
    selectedList: []
  };

  onChangeSearchInput = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  onChangePage = (number) => {
    console.log(number)
  this.setState({setPageNumber: number, offset: number * 10})
}

  onSelectAll = () => {
    this.setState((prevState) => ({
      UsersDetails: prevState.UsersDetails.map((each) => ({...each, isChecked: !each.isChecked}))
    }), ) 
   }

   onCheckboxSelect = (id) => {
    this.setState((prevState) => ({
      UsersDetails: prevState.UsersDetails.map(eachItem => {
        if (id === eachItem.id  ){
          return {...eachItem, isChecked: !eachItem.isChecked}
        }
         return eachItem
      })
    }))
  }

  deleteUserDetails = (id) => {
    const { UsersDetails } = this.state;
    const updatedUsersList = UsersDetails.filter(
      (eachUser) => eachUser.id !== id
    );

    this.setState({
      UsersDetails: updatedUsersList,
    });
  };

  OnDeleteSelected = () => {
    const{UsersDetails} = this.state
    const deletedList = UsersDetails.filter((eachItem) => eachItem.isChecked === false)

    this.setState({UsersDetails: deletedList})

  }

  componentDidMount() {
    this.getUsersDetails();
  }

  getUsersDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    });

    const options = {
      method: "GET",
    };

    const response = await fetch(apiUrl, options);
    const data = await response.json();
    const updatedData = data.map((each) => ({
      id: each.id,
      name: each.name,
      email: each.email,
      role: each.role,
      isChecked: false,
    }));

    if (response.ok === true) {
      this.setState({
        UsersDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      });
    }
  };

  renderUsersDetailsList = () => {
    const { searchInput, UsersDetails, limit, offset,} = this.state;


    const searchResults = UsersDetails.filter(
      (each) =>
        each.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        each.email.toLowerCase().includes(searchInput.toLowerCase()) ||
        each.role.toLowerCase().includes(searchInput.toLowerCase())
    );

    const searchInfo = searchResults.slice(offset , limit+offset);

    const pageCount = Math.ceil(UsersDetails.length / limit)

    return (
      <div className="admin-panel-container">
        <input
          className="search-box"
          type="search"
          placeholder="Search by name, email or role"
          value={searchInput}
          onChange={this.onChangeSearchInput}
        />
        {searchResults.length > 0 ? (
          <table>
            <tr>
              <th className="check-box">
                <input className="check-box-styles" type="checkbox" 
                onChange={this.onSelectAll} />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
            {searchInfo.map((eachUserDetails) => (
              <DisplayAdminDetails
                userData={eachUserDetails}
                key={eachUserDetails.id}
                deleteUserDetails={this.deleteUserDetails}
                onCheckboxSelect={this.onCheckboxSelect}
              />
            ))}
            <tr className="user-footer">
              <td>
                <button className="user-multiple-delete-icon" onClick={this.OnDeleteSelected}>
                  Delete Selected
                </button>
              </td>
              <td className="pagination-buttons" colSpan="4">
              <Paginate pageCount={pageCount} onChangePage={this.onChangePage}/>
              </td>
            </tr>
          </table>
        ) : (
          <>
            <p className="empty-admin-data">There is no data to show</p>
            <button className="user-delete-icon-hide" 
            onClick={this.OnDeleteSelected}>
            Delete Selected</button>
          </>
        )}
      </div>
    );
  };

  renderLoadingView = () => (
    <div className="users-loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  );

  renderUsersDetails = () => {
    const { apiStatus } = this.state;
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderUsersDetailsList();
      case apiStatusConstants.inProgress:
        return this.renderLoadingView();
      default:
        return null;
    }
  };

  render() {
    return <>{this.renderUsersDetails()}</>;
  }
}

export default AdminUi;
