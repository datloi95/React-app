import React, { Component } from 'react';
import { Media } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
  CardTitle } from 'reactstrap';

class DishDetail extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedDish: null
    }
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
      const comment = commentsList.map((val, index) => {
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

  render(){
    return(
      <div className="row">
        <div class="col-sm">
          renderDish()
        </div>
        <div class="col-sm">
          renderComment()
        </div>
      </div>
    )
  }
}

export default DishDetail;