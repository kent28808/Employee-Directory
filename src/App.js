import React from "react";
import EmployeeCard from "./components/EmployeeCard";
import SearchForm from "./components/Search";
import Wrapper from "./components/Wrapper";
import Col from "./components/Column";
import API from "./utils/API";
import "./App.css";

class App extends React.Component {
  state = { employees: [], search: '' };

  componentDidMount() {
    API.search()
      .then((res) => {
        console.log(res);
        this.setState({
          employees: res.data.results.map((e, i) => ({
            firstName: e.name.first,
            lastName: e.name.last,
            picture: e.picture.large,
            email: e.email,
            phone: e.phone,
            city: e.location.city,
            key: i,
          })),
        });
      })
      .catch((err) => console.log(err));
  }

  searchEmployee = (filter) => {
    console.log('Search', filter);
    const filteredList = this.state.employees.filter((employee) => {
      let values = Object.values(employee).join('').toLowerCase();
      return values.indexOf(filter.toLowerCase()) !== -1;
    });
    this.setState({ employees: filteredList });
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log('Handle ', this.state.search);
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Button Clicked', this.state.search, e);
    this.searchEmployee(this.state.search);
  };

  render() {
    return (
      <Wrapper>
        <div className="container">
          <div className="row">
            <Col size="md-4">
              <h2>Employee Directory</h2>
              <SearchForm
                value={this.state.search}
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
              />
            </Col>
          </div>

          <div className="row">
            <Col size="md-12">
              <table className="table">
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>City</th>
                  </tr>
                </thead>
                {[...this.state.employees].map((item) => (
                  <EmployeeCard
                    picture={item.picture}
                    firstName={item.firstName}
                    lastName={item.lastName}
                    email={item.email}
                    phone={item.phone}
                    city={item.city}
                    key={item.key}
                  />
                ))}
              </table>
            </Col>
          </div>
        </div>
      </Wrapper>
    );
  }
}
export default App;