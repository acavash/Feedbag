import React, { Component } from "react";
import { withUser } from '../../services/withUser'
import AuthFailedPage from "../AuthFailedPage"
import Grocerytron from "../../components/Grocerytron";
import API from "../../utils/API";
import DeleteBtn from "../../components/DeleteBtn";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import SiteNav from "../../components/SiteNav";
import Jumbotron from "../../components/Jumbotron";


class Groceries extends Component {
  state = {
    groceries: [],
    title: "",
    author: "",
    synopsis: ""
  };

  componentDidMount() {
    if(!this.props.user){
      return;
    }

    this.loadGroceries(this.props.user.id)
  }

  loadGroceries = (userid) => {

    API.getGroceries(userid)
      .then(res => this.setState({ groceries: res.data, title: "", author: "", synopsis: "" })
    )
      .catch(err => console.log(err));
  };

  deleteGroceries = (userid, id) => {
    API.deleteGroceries(userid, id)
      .then(res => this.loadGroceries(this.props.user.id))
      .catch(err => console.log(err));
  }

  handleInputChange = event => {
    const {name, value} =event.target;
    this.setState({
      [name]:value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if(this.state.title && this.state.author) {
      API.saveGroceries(this.props.user.id, {
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis,
        User: this.props.user.id

      })
      .then(res => this.loadGroceries(this.props.user.id))
      .catch(err => console.log(err))
    }
  }

  render() {
    const { user } = this.props.user.id


    return (
      <Container fluid>
        <div className = "container">
          <Jumbotron />
          <SiteNav />

        </div>
        <Row>
        <Col size="md-6">
          <Grocerytron>
            <h1>What do I need?</h1>
          </Grocerytron>
          <form>
            <Input
              value={this.state.title}
              onChange={this.handleInputChange}
              name="title"
              placeholder="Title (required)"
            />
            <Input
              value={this.state.author}
              onChange={this.handleInputChange}
              name="author"
              placeholder="Author (required)"
            />
            <TextArea
              value={this.state.synopsis}
              onChange={this.handleInputChange}
              name="synopsis"
              placeholder="Synopsis (Optional)"
            />
            <FormBtn
              disabled={!(this.state.author && this.state.title)}
              onClick={this.handleFormSubmit}
            >
              Add Grocery
            </FormBtn>
          </form>
        </Col>
          <Col size="md-6 sm-12">
            <Grocerytron>
              <h1>Shopping List</h1>
            </Grocerytron>
            {this.state.groceries.length ? (
              <List>
                {this.state.groceries.map(groceries => {
                  return (
                  <ListItem key={groceries._id}>
                    <a href={"/Groceries/"+ this.props.user.id + "/" + groceries._id}>
                      <strong>
                        {groceries.title} by {groceries.author}
                      </strong>
                    </a>
                    <DeleteBtn onClick={() => this.deleteGroceries(this.props.user.id, groceries._id)}/>
                  </ListItem>
                );
              })}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withUser(Groceries);
