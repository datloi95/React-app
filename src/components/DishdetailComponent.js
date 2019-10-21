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

  render(dish){
    if (dish != null)
      return(
        <div className = "row col-12 col-md-5 m-1">
          <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.comments}</CardText>
            </CardBody>
          </Card>
        </div>
      );
    else
      return(
          <div></div>
      );
  }


}

export default DishDetail;