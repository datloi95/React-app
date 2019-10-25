import React, { Component } from 'react';
import { Media } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
  CardTitle } from 'reactstrap';


  
  function RenderDish(dish) {
    if (dish != null)
      return(
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      );
    else
      return(
          <div></div>
      );
  }

  function RenderComments(commentsList){
    if (commentsList != null) {
      const comment = commentsList.map((val) => {
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
            {comment}
          </ul>
        </div>
      )
    } else{
      return (
        <div></div>
      )
    }
  }

const  DishDetail = (props) => {
  var comm = null
  if(props.chosenDish != null){
    comm = props.chosenDish.comments
  }
  
  return (
    <div className="container">
      <div className="row">
        <div  className="col-12 col-md-5 m-1">
          <RenderDish dish={props.chosenDish} />    
        </div>
        <div  className="col-12 col-md-5 m-1">
          <RenderComments commentsList={comm} />
        </div>
      </div> 
    </div>
  );
}


  



export default DishDetail;