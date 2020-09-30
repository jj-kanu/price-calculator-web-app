import csv

shopping_cart = []
subtotal = 0.00
total = 0.00


class GroceryItem:
    """Create a Grocery Item"""

    def __init__(self, price):
        self.price = price


# Bare Minimum Functions


def create_item(iname, price):
    # Creates new item and writes to file listing items
    # TODO: Check if item already created. overwrite, otherwise.
    iname = GroceryItem(price)
    with open('grocery_items.csv', mode='w') as grocery_items:
        grocery_writer = csv.writer(grocery_items, delimiter=',')
        grocery_writer.writerow([iname, price])


def add_item(iname):
    # TODO Reads CSV File to find item and price, if not there return create a new item.
    shopping_cart.append(iname)
    subtotal += iname.price


def remove_item(iname):
    if iname in shopping_cart:
        shopping_cart.remove(iname)
        subtotal -= iname.price
    else:
        print("Item not in cart.")


def cancel_transaction():
    shopping_cart.clear()
    subtotal = 0.00
    total = 0.00
    print("Your shopping cart has been cleared.")


def apply_discount(discount_amount):
    subtotal = subtotal * (1-discount_amount)


def checkout():
    # Makes Total, prints transaction to transaction history and clears shopping cart.
    total = subtotal * 1.13
    with open('transactions.csv', mode='w') as transactions:
        transactions_writer = csv.writer(transactions, delimiter=',')
        for item in shopping_cart:
            transactions_writer.writerow([item.name, item.price])
        transactions_writer.writerow("Subtototal: " + subtotal)
        transactions_writer.writerow("Total: " + total)
        transactions_writer.writerow("---")
    shopping_cart.clear()

# Extra Features


def view_past_transactions():
    # Shows Past 3 Transactions
