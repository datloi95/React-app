import React, { Component } from 'react';
import { Media } from 'reactstrap';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
  Button, Modal, ModalHeader, ModalBody,
  Form, FormGroup, Input, Label,
  Card, CardImg, CardText, CardBody,
  CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';

  
  function RenderDish({dish}) {
    if (dish != null){
      return(
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      );
    }else{
      return(
          <div></div>
      );
  }
}

  function RenderComments({comments}){
    if (comments != null) {

      const showComment = comments.map((val) => {
        return(
                <div>
                  <div>{val.comment}</div>
                  <div>-- {val.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(val.date)))}</div>
                </div>
        )
      })
      return(
        <div>
          <h4>Comments</h4>
          <ul class = "list-unstyled">
            {showComment}
          </ul>
        </div>
      )
    } else{
      return (
        <div></div>
      )
    }
  }


class CommentForm extends Component {

  constructor(props) {
    super(props);

    this.toggleNav = this.toggleNav.bind(this);
    this.state = {
      isNavOpen: false,
      isModalOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleLogin(event) {
    this.toggleModal();
    alert("Rating: " + this.name.value + " Name: " + this.name.value
        + " Comment: " + this.comment.value);
    event.preventDefault();
  }

  render(){
    return(
      <div>
        <Button outline onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg"></span> Submit Comment</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                  <Label htmlFor="rating">Rating</Label>
                  <Input type="number" id="rating" name="rating"
                    min="0" max="10" innerRef={(input) => this.rating = input} />
              </FormGroup>
              <FormGroup>
                  <Label htmlFor="name">Your Name</Label>
                  <Input type="name" id="name" name="name"
                      innerRef={(input) => this.name = input}  />
              </FormGroup>
              <FormGroup>
                  <Label htmlFor="comment">Comment</Label>
                  <textarea model=".comment" id="comment"
                                        rows="6" className="form-control" 
                                        innerRef={(input) => this.comment = input}/>
              </FormGroup>
              <Button type="submit" value="submit" color="primary">Submit</Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    )
  }


}



const  DishDetail = (props) => {

  if(props.dish){
    return (
      <div className="container">
        <div className="row">
            <Breadcrumb>
                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
            </div>                
        </div>
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                <RenderDish dish={props.dish} />
            </div>
            <div className="col-12 col-md-5 m-1">
                <RenderComments comments={props.comments} />
                <CommentForm />
            </div>
        </div>
      </div>
  );
  } else{
    return (
      <div className="col-12" />
    )
  }
}

export default DishDetail;