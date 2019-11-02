import React, { Component } from 'react';
import { Media } from 'reactstrap';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
  Button, Modal, ModalHeader, ModalBody,
  Form, FormGroup, Input, Label,
  Card, CardImg, CardText, CardBody,
  CardTitle, Breadcrumb, BreadcrumbItem, Col } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
  
function RenderDish({dish}) {
  if (dish != null){
    return(
      <FadeTransform
      in
      transformProps={{
          exitTransform: 'scale(0.5) translateY(-50%)'
      }}>
        <Card>
            <CardImg top src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
      </FadeTransform>
    );
  } else{
    return(
        <div></div>
    );
  }
}

function RenderComments({comments, postComment, dishId}) {
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
          <CommentForm dishId={dishId} postComment={postComment} />
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
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(values) {
    this.toggleModal();
    this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
  }

  render(){
    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);
    return(
      <div>
        <Button outline onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg"></span> Submit Comment</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label htmlFor="rating">Rating </Label>
                <Col>
                  <Control.select model=".rating" id="rating">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Control.select>
                </Col>  
              </FormGroup>
              <FormGroup>
                <Label htmlFor="author">Your Name</Label>
                <Col>
                  <Control.text model=".author" id="author" name="author" 
                      placeholder="Your Name"
                      className="form-control"
                      validators={{
                          required, minLength: minLength(3), maxLength: maxLength(15)
                      }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                        required: 'Required',
                        minLength: 'Must be greater than 3 characters',
                        maxLength: 'Must be 15 characters or less'
                    }}
                    />
                </Col>
                </FormGroup>
              <Label htmlFor="comment">Comment</Label>
                <FormGroup>
                  <Col>
                    <Control.textarea model=".comment" id="comment" rows="6" 
                                      className="form-control"/>
                  </Col>
                </FormGroup>
              <Button type="submit" value="submit" color="primary">Submit</Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    )
  }


}


const  DishDetail = (props) => {
  if (props.isLoading) {
    return(
        <div className="container">
            <div className="row">            
                <Loading />
            </div>
        </div>
    );
  }
  else if (props.errMess) {
      return(
          <div className="container">
              <div className="row">            
                  <h4>{props.errMess}</h4>
              </div>
          </div>
      );
  }
  else if (props.dish != null) {
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
              <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id}/>
            </div>
        </div>
      </div>
    );
  }
  else{
    return (
      <div className="col-12" />
    )
  }
}

export default DishDetail;