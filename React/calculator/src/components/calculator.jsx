import React, { Component } from "react";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

class Calculator extends Component {
  state = {
    number_of_items: 0,
    subtotal: 0.0,
    bags_used: 0,
  };

  //   constructor() {
  //     super();
  //     this.bagIncrement = this.bagIncrement.bind(this);
  //     this.bagDecrement = this.bagDecrement.bind(this);
  //   }

  bagIncrement = () => {
    //console.log("Increment Clicked");
    this.setState({ bags_used: this.state.bags_used + 1 });
    this.setState({ subtotal: this.state.subtotal + 0.05 });
  };
  bagDecrement = () => {
    //console.log("Increment Clicked");
    if (this.state.bags_used >= 1) {
      this.setState({ bags_used: this.state.bags_used - 1 });
      this.setState({ subtotal: this.state.subtotal - 0.05 });
    }
  };

  render() {
    return (
      <div>
        <h1>Checkout Calculator</h1>
        {/*Grid Level for Two main columns*/}
        <Grid
          container
          spacing={2}
          direction="row"
          alignItems="stretch"
          justify="space-evenly"
        >
          <Grid item>
            <h3>Catalog</h3>
            <span>
              <Button variant="outlined">Create New Item</Button>
            </span>
          </Grid>

          {/*Grid Level for right side of page*/}
          <Grid item>
            <Grid container spacing={2} direction="column" alignItems="center">
              <Grid item>
                <h3>Shopping Cart</h3>
              </Grid>
              <Grid item xs={12}>
                <span>{this.formatNumberOfItems()}</span>
              </Grid>
            </Grid>

            <h5>Number of Bags Used</h5>
            <span>{this.state.bags_used}</span>
            <Button
              variant="contained"
              size="small"
              onClick={this.bagIncrement}
            >
              +
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={this.bagDecrement}
            >
              -
            </Button>
            <Grid container spacing={2} direction="column" alignItems="center">
              <Grid item>
                <text>Subtotal: $</text>
                {this.state.subtotal.toFixed(2)}
              </Grid>
              <Grid item>
                <text>Total: $</text>
                {(this.state.subtotal * 1.13).toFixed(2)}
              </Grid>
              <Button variant="contained">Checkout</Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }

  formatNumberOfItems() {
    const { number_of_items } = this.state;
    return number_of_items == 0 ? "Empty Cart" : number_of_items;
  }
}

export default Calculator;
