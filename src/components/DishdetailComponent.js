import React, { Component } from 'react';
import { Media } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
  CardTitle } from 'reactstrap';

class DishDetail extends Component {
  constructor(props) {
    super(props);
  }
  
  renderDish(dish) {
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

  renderComment(commentsList){
    if (commentsList != null) {
      const comment = commentsList.map((val) => {
        return(
                <div>
                  <div>{val.comment}</div>
                  <div>-- {val.author}, {val.date}</div>
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

  render() {
    var comm = null
    if(this.props.chosenDish != null){
      comm = this.props.chosenDish.comments
    }
    
    return (
      <div className="row">
        <div  className="col-12 col-md-5 m-1">
          {this.renderDish(this.props.chosenDish)}    
        </div>
        <div  className="col-12 col-md-5 m-1">
          {this.renderComment(comm)}
        </div>
      </div> 
    );
  }

}

export default DishDetail;