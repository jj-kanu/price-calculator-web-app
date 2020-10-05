import React, { Component } from "react";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import { FixedSizeList } from "react-window";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Box from "@material-ui/core/Box";
import { sizing } from "@material-ui/system";

class Calculator extends Component {
  state = {
    number_of_items: 0,
    subtotal: 0.0,
    bags_used: 0,
    catalog: [
      { name: "Apple", price: 0.67 },
      { name: "Banana", price: 0.33 },
      { name: "Cake Mix", price: 2.99 },
      { name: "Syrup", price: 3.99 },
    ],
    cart: [],
  };

  /*
  addItemToCatalog = () => {
    //console.log("Increment Clicked");
    this.setState({ bags_used: this.state.bags_used + 1 });
    this.setState({ subtotal: this.state.subtotal + 0.05 });
  };

  itemIncrement = () => {
    cart: [
        ...this.state.cart,
        { name: itemName, price: itemPrice, quantity: 1 },
      ],
    this.setState({ subtotal: this.state.subtotal + 0.05 });
  };
  itemDecrement = () => {
    //console.log("Increment Clicked");
    if (this.state.bags_used >= 1) {
      this.setState({ bags_used: this.state.bags_used - 1 });
      this.setState({ subtotal: this.state.subtotal - 0.05 });
    };


    removeItem = () => {
        //console.log("Increment Clicked");
        if (this.state.bags_used >= 1) {
        this.setState({ bags_used: this.state.bags_used - 1 });
        this.setState({ subtotal: this.state.subtotal - 0.05 });
        };
  */

  addToCart = (itemName, itemPrice) => {
    this.setState({
      cart: [
        ...this.state.cart,
        { name: itemName, price: itemPrice, quantity: 1 },
      ],
    });
    this.setState({ subtotal: this.state.subtotal + itemPrice });
  };

  bagIncrement = () => {
    this.setState({ bags_used: this.state.bags_used + 1 });
    this.setState({ subtotal: this.state.subtotal + 0.05 });
  };
  bagDecrement = () => {
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
              <Button
                color="primary"
                variant="outlined"
                style={{ marginTop: "0.8rem" }}
              >
                Create New Item
              </Button>
            </form>

            {/*Catalog*/}
            <Box
              style={{ marginTop: "0.8rem" }}
              Topwidth={600}
              height={370}
              border={1}
            >
              <List component="nav">
                {this.state.catalog.map((item) => (
                  <ListItem
                    button
                    onClick={(e) => this.addToCart(item.name, item.price)}
                  >
                    {" "}
                    {item.name}
                    <text style={{ marginLeft: "auto" }}>${item.price}</text>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>

          {/*Grid Level for right side of page*/}
          <Grid item>
            <Grid container spacing={2} direction="column" alignItems="center">
              <Grid item>
                <h3>Shopping Cart</h3>
              </Grid>

              {/*Shopping Cart*/}
              <Grid item xs={12} height="20rem">
                <Box width={390} height={250} border={1}>
                  <List component="nav">
                    {this.state.cart.map((item) => (
                      <ListItem button>
                        {" "}
                        {item.name}
                        <text style={{ marginLeft: "auto" }}>
                          ${item.price} x{item.quantity}
                        </text>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Grid>

              {/*Add Bags*/}
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
                    color="secondary"
                    variant="outlined"
                    style={{ marginTop: "0.8rem" }}
                  >
                    Apply Discount Code
                  </Button>
                </form>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginRight: "1rem" }}
                >
                  Checkout
                </Button>
                <Button variant="contained" color="primary">
                  Past Transactions
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }

  formatNumberOfItems() {
    const { number_of_items } = this.state;
    return number_of_items === 0 ? "Empty Cart" : number_of_items;
  }

  /*

  renderRow(props) {
    const { index, style } = props;
  
    return (
      <ListItem button style={style} key={index}>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItem>
    );
  }
  
  renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
  };
  */
}

export default Calculator;
