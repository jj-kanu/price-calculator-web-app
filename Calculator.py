"""
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


"""


import csv
import datetime

shopping_cart = {}
subtotal = 0.00
total = 0.00


def in_list(item_name):
    # Checks if item is in csv. Return -1 if it isn't, return the row number if it is.
    check = -1
    line_count = 0
    with open('grocery_items.csv', mode='rt') as csvfile:
        item_reader = csv.reader(csvfile, delimiter=' ', quotechar='|')
        temp = list(item_reader)
        for row in item_reader:
            line_count += 1
            if item_name == temp[line_count][0]:
                check = line_count
    return check


def get_item_price(row_num):
    with open('grocery_items.csv', mode='r') as csvfile:
        item_reader = csv.reader(csvfile, delimiter=' ', quotechar='|')
        temp_items = list(item_reader)
        price = temp_items[row_num][1]
    return price


# Bare Minimum Functions


def create_item(iname, price):
    # Creates new item and writes to file listing items
    # TODO: Check if item already created. overwrite, otherwise.

    with open('grocery_items.csv', 'rt', newline='') as csvfile:
        in_list = -1
        line_count = 0
        item_reader = csv.reader(csvfile, delimiter=' ', quotechar='|')
        #temp = list(item_reader)
        for row in item_reader:
            line_count += 1
            # if iname == temp[line_count][0]:
            if iname in row:
                in_list = line_count
        print("line count: " + str(line_count))

        # If item is in list, overwrite price. If not, append new item.
        if in_list != -1:
            temp_items = list(item_reader)
            temp_items[row][1] = price
            with open('grocery_items.csv', mode='w', newline='') as grocery_items:
                grocery_writer = csv.writer(grocery_items, delimiter=',')
                grocery_writer.writerows(temp_items)
            print("item price overwritten")
        else:
            with open('grocery_items.csv', mode='a', newline='') as grocery_items:
                grocery_writer = csv.writer(grocery_items, delimiter=',')
                grocery_writer.writerow([iname, price])
            print("New item created")


def add_item(iname):
    # TODO Reads CSV File to find item and price, if not there return create a new item.
    global subtotal
    global shopping_cart
    row_num = in_list(iname)
    if row_num != -1:
        tprice = get_item_price(row_num)
        shopping_cart[iname] = [tprice, 1]
        subtotal += tprice
    else:
        print("Item does not exist.")


def remove_item(iname):
    global subtotal
    global shopping_cart
    if iname in shopping_cart:
        tprice = shopping_cart[iname][0] * shopping_cart[iname][1]
        del shopping_cart[iname]
        subtotal -= tprice
    else:
        print("Item not in cart.")


def checkout():
    # Makes Total, prints transaction to transaction history and clears shopping cart.
    global subtotal
    global total
    global shopping_cart
    round(subtotal, 2)
    total = subtotal * 1.13
    round(total, 2)
    with open('transactions.csv', mode='a') as transactions:
        transactions_writer = csv.writer(transactions, delimiter=',')
        transactions_writer.writerow([str(datetime.datetime.now())])
        for item in shopping_cart:
            transactions_writer.writerow([item, shopping_cart[item]])
        transactions_writer.writerow(["Subtotal: " + str(subtotal)])
        transactions_writer.writerow(["Total: " + str(total)])
        transactions_writer.writerow(["---"])
    shopping_cart.clear()
    subtotal = 0.00
    total = 0.00

# Extra Features

# def increment_quantity(iname):
# if item is in shopping cart, increase quantity

# def decrement_quantity(iname):
# if item is in shopping cart, decrease quantity. If quantity ==1, remove item from cart.


def cancel_transaction():
    shopping_cart.clear()
    subtotal = 0.00
    total = 0.00
    print("Your shopping cart has been cleared.")


def apply_discount(discount_amount):
    subtotal = subtotal * (1-discount_amount)


# def view_past_transactions():
    # Shows Past 3 Transactions

def main():
    create_item("banana", 0.33)
    add_item("banana")
    add_item("apple")
    remove_item("banana")
    checkout()


if __name__ == "__main__":
    main()
