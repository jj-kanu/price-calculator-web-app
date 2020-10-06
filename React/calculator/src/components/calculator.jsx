/*
J.J. Kanu
CSC301 A1

Checkout Calculator

4 Main Functions
1. create_item(str iname, double price):
Writes to CSV item name, item price. (grocery_items.csv)
-Checks if item already in csv, if not, new item. if already in csv, overwrite price.

2. add_item(str iname):
Searches CSV to see if item there. if it is, adds to shopping cart: item name, price, and quantity(starts at 1).
-if not in csv return (item does not exist, create item)

3. remove_item(str iname):
Removes item from shopping cart if item is there. If not, return(item not in shopping cart)

4. checkout():
Prints shopping cart to a csv file(transactions.csv).
Prints subtotal and Total.
-clears cart

Extra Functions: (Done if have time. Listed from most important to least.)
5. increment_quantity(str iname):
if item is in shopping cart, increase quantity by one.

6. decrement_quantity(str iname):
if item is in shopping cart, decrease quantity by one. if quantity is ==1, remove item().

7. cancel_transaction():
Emptys shopping cart and reset subtotal and total.

8. apply_discount(double dicount_amount):
Applies discount percent to total.

9. view_past_transactions():
Displays past transactions by reading the transactions.csv.

Variables:
Shopping Cart is a dictionary with a list of size 2. Name of item is the key, the list contains price and quantity.
ex. "banana": [0.33,1]

Sources:
https://stackabuse.com/writing-to-files-in-node-js/
*/

import React, { Component } from "react";
import { Button, ListItemSecondaryAction } from "@material-ui/core";
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
    reset_catalog_entry: 0,
    cart: [],
    new_item_name: "",
    new_item_price: 0,
    discount_code: "",
    discount_applied: false,
    past_transaction: [],
    past_subtotal: 0,
    past_nob: 0,
    viewing_pt: false,
  };

  handleNameChange = (event) => {
    event.preventDefault();
    this.setState({ new_item_name: event.target.value });
  };
  handlePriceChange = (event) => {
    event.preventDefault();
    this.setState({ new_item_price: event.target.value });
  };

  createNewItem = () => {
    if (
      this.state.new_item_name != "" &&
      !isNaN(this.state.new_item_price) &&
      this.state.new_item_price > 0
    ) {
      var tprice = parseFloat(this.state.new_item_price).toFixed(2);
      for (var i = 0; i < this.state.catalog.length; i++) {
        if (this.state.new_item_name == this.state.catalog[i].name) {
          let temp2 = [];
          for (var j = 0; j < this.state.catalog.length; j++) {
            if (j != i) {
              temp2.push(this.state.catalog[j]);
            } else {
              temp2.push({
                name: this.state.new_item_name,
                price: tprice,
              });
            }
          }
          this.setState({ catalog: temp2 });
          return;
        }
      }
      if (this.state.catalog.length < 9) {
        this.setState({
          catalog: [
            ...this.state.catalog,
            {
              name: this.state.new_item_name,
              price: tprice,
            },
          ],
        });
      } else {
        let temp2 = [];
        for (var i = 0; i < this.state.catalog.length; i++) {
          if (i != 4 + this.reset_catalog_entry) {
            temp2.push(this.state.catalog[i]);
          } else {
            temp2.push({
              name: this.state.new_item_name,
              price: this.state.new_item_price,
            });
          }
        }
        this.setState({ catalog: temp2 });
        if (this.reset_catalog_entry < 4) {
          this.setState({ reset_catalog_entry: this.reset_catalog_entry + 1 });
        } else {
          this.setState({ reset_catalog_entry: 0 });
        }
      }
    }
  };

  addToCart = (itemName, itemPrice) => {
    if (!this.state.viewing_pt) {
      for (var i = 0; i < this.state.cart.length; i++) {
        if (itemName == this.state.cart[i].name) {
          this.itemIncrement(i);
          return;
        }
      }
      if (this.state.cart.length < 6) {
        this.setState({
          cart: [
            ...this.state.cart,
            {
              name: itemName,
              price: itemPrice,
              quantity: 1,
            },
          ],
        });
        if (!this.state.discount_applied) {
          this.setState({
            subtotal: parseFloat(this.state.subtotal) + parseFloat(itemPrice),
          });
        } else {
          this.setState({
            subtotal:
              parseFloat(this.state.subtotal) + parseFloat(itemPrice * 0.7),
          });
        }
      }
    }
  };

  getItemIndex = (itemName) => {
    for (var i = 0; i < this.state.cart.length; i++) {
      if (itemName == this.state.cart[i].name) {
        return i;
      }
    }
    return -1;
  };

  /* Bag & Item Increment/Decrement */
  itemIncrement = (itemPosition) => {
    if (!this.state.viewing_pt) {
      let tempItems = [...this.state.cart];
      tempItems[itemPosition].quantity += 1;
      this.setState({ cart: tempItems });
      if (!this.state.discount_applied) {
        this.setState({
          subtotal:
            parseFloat(this.state.subtotal) +
            parseFloat(this.state.cart[itemPosition].price),
        });
      } else {
        this.setState({
          subtotal:
            parseFloat(this.state.subtotal) +
            parseFloat(this.state.cart[itemPosition].price * 0.7),
        });
      }
    }
  };
  itemDecrement = (itemPosition) => {
    if (!this.state.viewing_pt) {
      let tempItems = [...this.state.cart];
      if (tempItems[itemPosition].quantity > 1) {
        tempItems[itemPosition].quantity -= 1;
        this.setState({ cart: tempItems });
        if (!this.state.discount_applied) {
          this.setState({
            subtotal:
              parseFloat(this.state.subtotal) -
              parseFloat(this.state.cart[itemPosition].price),
          });
        } else {
          this.setState({
            subtotal:
              parseFloat(this.state.subtotal) -
              parseFloat(this.state.cart[itemPosition].price * 0.7),
          });
        }
      } else {
        if (!this.state.discount_applied) {
          this.setState({
            subtotal:
              parseFloat(this.state.subtotal) -
              parseFloat(this.state.cart[itemPosition].price),
          });
        } else {
          this.setState({
            subtotal:
              parseFloat(this.state.subtotal) -
              parseFloat(this.state.cart[itemPosition].price * 0.7),
          });
        }
        let temp2 = [];
        for (var i = 0; i < tempItems.length; i++) {
          if (i != itemPosition) {
            temp2.push(tempItems[i]);
          }
        }
        this.setState({ cart: temp2 });
      }
    }
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

  /* Discount Event */
  handleCodeChange = (event) => {
    event.preventDefault();
    this.setState({ discount_code: event.target.value });
  };
  applyDiscount = () => {
    if (!this.state.viewing_pt) {
      if (
        this.state.discount_code == "discount30" &&
        this.state.discount_applied == false
      ) {
        this.setState({ subtotal: this.state.subtotal * 0.7 });
        this.setState({ discount_code: "" });
        this.setState({ discount_applied: true });
      }
    }
  };

  checkout = () => {
    /* Write to transactions text file 
    const fs = require("fs");

    var data = "New File Contents";

    fs.write("src/transactions.txt", data, (err) => {
      if (err) console.log(err);
      console.log("Successfully Written to File.");
    });
    
    fs(`src/transactions.txt`, "Hello World", (err, data) => {
      console.log(err || data);
    });
    

    let path = "src/transactions.txt";
    let buffer = new Buffer(this.cart + "Number of Bags");
    

    fs.write(fd, buffer, 0, buffer.length, null, function (err) {
      if (err) throw "error writing file: " + err;
      fs.close(fd, function () {
        console.log("wrote the file successfully");
      });
    });
    */

    /*Resets the Bags and Total*/
    this.setState({ past_transaction: this.state.cart });
    this.setState({ past_subtotal: this.state.subtotal });
    this.setState({ past_nob: this.state.bags_used });
    this.setState({ cart: [] });
    this.setState({ bags_used: 0 });
    this.setState({ subtotal: 0 });
  };

  viewPastTransaction = () => {
    if (this.state.viewing_pt) {
      this.setState({ cart: [] });
      this.setState({ subtotal: 0 });
      this.setState({ viewing_pt: false });
    } else if (!this.state.view_pt && this.state.past_transaction.length > 0) {
      this.setState({ cart: this.state.past_transaction });
      this.setState({ bags_used: this.state.past_nob });
      this.setState({ subtotal: this.state.past_subtotal });
      this.setState({ viewing_pt: true });
    }
  };

  /* START OF USER INTERFACE */
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
                name="new_item_name"
                value={this.state.new_item_name}
                onChange={this.handleNameChange}
              />
              <TextField
                style={{ marginRight: "0.8rem" }}
                label="Enter Item Price"
                type="float"
                name="new_item_price"
                value={this.state.new_item_price}
                onChange={this.handlePriceChange}
              />
              <Button
                color="primary"
                variant="outlined"
                style={{ marginTop: "0.8rem" }}
                onClick={this.createNewItem}
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
                <h3>Shopping Cart (6 Item Limit)</h3>
              </Grid>

              {/*Shopping Cart*/}
              <Grid item xs={12} height="20rem">
                <Box width={390} height={250} border={1}>
                  <List component="nav">
                    {this.state.cart.map((item) => (
                      <ListItem>
                        {" "}
                        {item.name}
                        <text
                          style={{ marginLeft: "auto", marginRight: "1.2rem" }}
                        >
                          ${item.price} x{item.quantity}
                        </text>
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            onClick={(e) =>
                              this.itemIncrement(this.getItemIndex(item.name))
                            }
                          >
                            +
                          </IconButton>
                          <IconButton
                            edge="end"
                            onClick={(e) =>
                              this.itemDecrement(this.getItemIndex(item.name))
                            }
                          >
                            -
                          </IconButton>
                        </ListItemSecondaryAction>
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
                  {parseFloat(this.state.subtotal).toFixed(2)}
                  <text style={{ fontWeight: "bold", marginLeft: "0.8rem" }}>
                    Total:{" "}
                  </text>
                  ${parseFloat(this.state.subtotal * 1.13).toFixed(2)}
                </Box>
                <form noValidate autoComplete="off">
                  <TextField
                    style={{ marginRight: "1rem" }}
                    label="Enter Discount Code"
                    onChange={this.handleCodeChange}
                    value={this.state.discount_code}
                    type="text"
                  />
                  <Button
                    size="small"
                    color="secondary"
                    variant="outlined"
                    style={{ marginTop: "0.8rem" }}
                    onClick={this.applyDiscount}
                  >
                    Apply Discount Code
                  </Button>
                </form>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.checkout}
                  style={{ marginRight: "1rem" }}
                >
                  Checkout
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.viewPastTransaction}
                >
                  Past Transaction
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }

  renderRow(props) {
    const { index, style } = props;

    return (
      <ListItem button style={style} key={index}>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItem>
    );
  }
  /*
  renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
  };
  */
}

export default Calculator;
