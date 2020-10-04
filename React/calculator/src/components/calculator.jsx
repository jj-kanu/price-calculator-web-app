import React, { Component } from "react";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Box from "@material-ui/core/Box";
import { sizing } from "@material-ui/system";

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
        <AppBar position="static">
          <Toolbar>
            <h3>Checkout Calculator</h3>
          </Toolbar>
        </AppBar>
        {/*Grid Level for Two main columns*/}
        <Grid
          container
          spacing={2}
          direction="row"
          alignItems="stretch"
          justify="space-evenly"
        >
          <Grid item>
            <h3 justify="left">Catalog</h3>
            <form noValidate autoComplete="off">
              <TextField
                style={{ marginRight: "0.8rem" }}
                label="Enter Item Name"
              />
              <TextField
                style={{ marginRight: "0.8rem" }}
                label="Enter Item Price"
              />
              <Button variant="outlined" style={{ marginTop: "0.8rem" }}>
                Create New Item
              </Button>
            </form>
            <Box
              style={{ marginTop: "0.8rem" }}
              Topwidth={600}
              height={370}
              border={1}
            >
              List of Items go here
            </Box>
          </Grid>

          {/*Grid Level for right side of page*/}
          <Grid item>
            <Grid container spacing={2} direction="column" alignItems="center">
              <Grid item>
                <h3>Shopping Cart</h3>
              </Grid>
              <Grid item xs={12} height="20rem">
                <Box width={350} height={250} border={1}>
                  {this.formatNumberOfItems()}
                </Box>
              </Grid>

              <Grid item>
                <text style={{ fontWeight: "bold" }}>
                  Number of Bags Used:{" "}
                </text>
                {this.state.bags_used}
                <Button
                  variant="contained"
                  size="small"
                  onClick={this.bagIncrement}
                  style={{ marginLeft: "0.8rem" }}
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
              </Grid>
              <Grid item>
                <Box style={{ textAlign: "center" }}>
                  <text style={{ fontWeight: "bold" }}>Subotal: </text>$
                  {this.state.subtotal.toFixed(2)}
                  <text style={{ fontWeight: "bold", marginLeft: "0.8rem" }}>
                    Total:{" "}
                  </text>
                  ${(this.state.subtotal * 1.13).toFixed(2)}
                </Box>
                <form noValidate autoComplete="off">
                  <TextField
                    style={{ marginRight: "1rem" }}
                    label="Enter Discount Code"
                  />
                  <Button
                    size="small"
                    variant="outlined"
                    style={{ marginTop: "0.8rem" }}
                  >
                    Apply Discount Code
                  </Button>
                </form>
              </Grid>
              <Grid item>
                <Button variant="contained">Checkout</Button>
              </Grid>
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
