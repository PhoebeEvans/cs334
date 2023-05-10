import os
from flask import Flask, render_template, request, redirect, url_for, jsonify, json, send_from_directory
from flask_sqlalchemy import SQLAlchemy
#from sqlalchem import select
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from flask_mail import Mail, Message
from collections import defaultdict


app = Flask(__name__)
app.secret_key = 'temp'  # Temp Key for now




# Define the path to the database file
db_path = os.path.join(os.path.dirname(__file__), 'iceCreamdb.db')

app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'our334project@gmail.com'
app.config['MAIL_PASSWORD'] = 'qljavjaetpnldpyq'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True


mail = Mail(app)


db = SQLAlchemy(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

@app.route('/service-worker.js')
def serve_service_worker():
    return send_from_directory('.', 'service-worker.js', mimetype='application/javascript')


#create user model
class User(UserMixin, db.Model):
    __tablename__ = "Users"
    username = db.Column(db.String(80), primary_key=True)
    password = db.Column(db.String(120), nullable=False)
    firstname = db.Column(db.String(80), nullable=False)
    lastname = db.Column(db.String(80), nullable=False)

    #override flask_login's get_id function to return the username
    def get_id(self):
        return self.username

#create product model
class Product(db.Model):
    __tablename__ = "products"
    id = db.Column(db.Integer, primary_key=True)
    flavor = db.Column(db.String, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    vendor = db.Column(db.String, nullable=False)
    markup = db.Column(db.Float, nullable=False)
    desc = db.Column(db.String, nullable=True)
    img = db.Column(db.String, nullable=True)


#create transactions model
class Transaction(db.Model):
    __tablename__ = 'transactions'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String)
    date = db.Column(db.String)
    totalAmount = db.Column(db.Float)
    paymentMethod = db.Column(db.String)
    paymentStatus = db.Column(db.String)

#Fetch data from database
@app.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    products_data = [{'id': product.id, 'flavor': product.flavor, 'quantity': product.quantity, 'price': product.price, 'vendor': product.vendor, 'markup': product.markup, 'desc': product.desc, 'img': product.img} for product in products]
    return jsonify(products_data)

@app.route('/transactions', methods=['GET'])
def get_transactions():
    transactions = Transaction.query.all()
    transactions_data = [{'id': transaction.id, 'email': transaction.email, 'date': transaction.date, 'totalAmount': transaction.totalAmount, 'paymentMethod': transaction.paymentMethod, 'paymentStatus': transaction.paymentStatus} for transaction in transactions]
    return jsonify(transactions_data)


def id_counter():
    last = Transaction.query.last()
    id_count = last.id + 1
    return id_count



#user loader function
@login_manager.user_loader
def load_user(username):
    return User.query.get(username)


#index.html

@app.route('/')
def home():
    return render_template('index.html')

#admin pages



@app.route('/admin_index')
@login_required
def admin_index():
    firstname = current_user.firstname
    return render_template('admin_index.html', firstname=firstname)


#basically same as /transactions above, but meant for admin_orders page while /transactions is for admin_index
@app.route('/admin_orders')
@login_required
def admin_orders():
    firstname = current_user.firstname
    transactions_url = url_for('get_transactions')
    return render_template('admin_orders.html', transactions_url=transactions_url, firstname=firstname)

@app.route('/admin_product')
@login_required
def admin_product():
    firstname = current_user.firstname
    return render_template('admin_product.html', firstname=firstname)


#checkout

@app.route('/checkout')
def checkout():
    return render_template('checkout.html')

@app.route('/checkout2')
def checkout2():

    return render_template('checkout2.html')



#email
@app.route('/email', methods=['GET','POST'])
def email():
    #email

    data = request.get_json()
    msg = Message("Ultimate Ice Cream Order Conformation", sender = "UltimateIceCreamShop", recipients = [data['email']])
    msg.body = "Hello " + data['email'] + ", \n" + data['orderItems']

    mail.send(msg)


    return jsonify(status='success')



#login and logout
@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()

        #debug log
        print(f"User found in database: {user is not None}")

        if user and check_password_hash(user.password, password):
            print("Password check successful")
            login_user(user)
            return redirect(url_for('admin_index'))
        else:
            error = "Invalid credentials."
            print("Password check failed")

    return render_template('login.html', error=error)




@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return redirect(url_for('home'))



#order-management

@app.route('/order-management/find_order')
@login_required
def find_order():
    return render_template('order-management/find_order.html')

@app.route('/order-management/list_order')
@login_required
def list_order():
    return render_template('order-management/list_order.html')

@app.route('/order-management/modify_order')
@login_required
def modify_order():
    return render_template('order-management/modify_order.html')

# product-management

@app.route('/product-management/add_product')
@login_required
def add_product():
    return render_template('product-management/add_product.html')

@app.route('/product-management/find_product')
@login_required
def find_product():
    return render_template('product-management/find_product.html')

@app.route('/product-management/list_product')
@login_required
def list_product():
    return render_template('product-management/list_product.html')

@app.route('/product-management/modify_product')
@login_required
def modify_product():
    return render_template('product-management/modify_product.html')

@app.route('/product-management/remove_product')
@login_required
def remove_product():
    return render_template('product-management/remove_product.html')

#Product-management operations

@app.route('/product/add', methods=['POST'])
@login_required
def add_product_api():
    data = request.get_json()

    new_product = Product(
        id=data['id'],
        flavor=data['flavor'],
        quantity=data['quantity'],
        price=data['price'],
        vendor=data['vendor'],
        markup=data['markup'],
        desc=data['desc'],
        img=data['img']
    )

    db.session.add(new_product)
    db.session.commit()

    return jsonify(status='success')


#add transaction
@app.route('/transaction/add', methods=["POST"])
def add_transaction_api():
    obj = Transaction.query.all()
    id_value = obj[-1].id
    id_value = id_value + 1

    data = request.get_json()
    new_transaction = Transaction(
        id=id_value,
        email=data['email'],
        date=data['date'],
        totalAmount=data['totalAmount'],
        paymentMethod=data['paymentMethod'],
        paymentStatus="INCOMPLETE"
    )

    db.session.add(new_transaction)
    db.session.commit()


    return jsonify(status='success')


@app.route('/product/find/<int:product_id>', methods=['GET'])
@login_required
def find_product_details(product_id):
    try:
        product = Product.query.filter_by(id=product_id).first()
        if product:
            product_data = {
                'id': product.id,
                'flavor': product.flavor,
                'vendor': product.vendor,
                'price': product.price,
                'quantity': product.quantity,
                'markup': product.markup,
                'desc': product.desc
            }
            return jsonify(status='success', product=product_data)
        else:
            return jsonify(status='fail', message='Product not found')
    except Exception as e:
        return jsonify(status='error', message=str(e))

@app.route('/product/modify', methods=['PUT'])
@login_required
def modify_product_details():
    try:
        data = request.get_json()
        product_id = data.get('id', None)

        if product_id is None:
            return jsonify(status='fail', message='Missing required data')

        product = Product.query.get(product_id)

        if product is None:
            return jsonify(status='fail', message='Product not found')

        # Update the product attributes if they are different
        for attribute, new_value in data.items():
            if hasattr(product, attribute) and getattr(product, attribute) != new_value:
                setattr(product, attribute, new_value)

        db.session.commit()

        return jsonify(status='success', message='Product details updated')
    except Exception as e:
        return jsonify(status='error', message=str(e))

@app.route('/product/list', methods=['GET'])
@login_required
def list_products():
    products = Product.query.all()
    product_list = [{'id': product.id, 'flavor': product.flavor, 'price': product.price, 'quantity': product.quantity, 'vendor': product.vendor, 'markup': product.markup, 'desc': product.desc, 'img': product.img} for product in products]
    return jsonify(product_list)

@app.route('/product/remove/<int:product_id>', methods=['DELETE'])
@login_required
def remove_product_from_db(product_id):
    try:
        product = Product.query.filter_by(id=product_id).first()
        if product:
            db.session.delete(product)
            db.session.commit()
            return jsonify(status='success')
        else:
            return jsonify(status='fail', message='Product not found')
    except Exception as e:
        return jsonify(status='error', message=str(e))

@app.route('/transactions/find/<int:order_id>', methods=['GET'])
@login_required
def find_order_details(order_id):
    try:
        transaction = Transaction.query.filter_by(id=order_id).first()
        if transaction:
            transaction_data = {
                'id': transaction.id,
                'email': transaction.email,
                'date': transaction.date,
                'totalAmount': transaction.totalAmount,
                'paymentMethod': transaction.paymentMethod,
                'paymentStatus': transaction.paymentStatus
            }
            return jsonify(status='success', transaction=transaction_data)
        else:
            return jsonify(status='fail', message='Order not found')
    except Exception as e:
        return jsonify(status='error', message=str(e))

@app.route('/transactions/modify', methods=['PUT'])
@login_required
def modify_order_details():
    try:
        data = request.get_json()
        order_id = data.get('id', None)

        if order_id is None:
            return jsonify(status='fail', message='Missing required data')

        transaction = Transaction.query.get(order_id)

        if transaction is None:
            return jsonify(status='fail', message='Order not found')

        # Update the transaction attributes if they are different
        for attribute, new_value in data.items():
            if hasattr(transaction, attribute) and getattr(transaction, attribute) != new_value:
                setattr(transaction, attribute, new_value)

        db.session.commit()

        return jsonify(status='success', message='Order details updated')
    except Exception as e:
        return jsonify(status='error', message=str(e))






#API
@app.route('/api/products', methods=['GET'])
def api_products():
    products = Product.query.all()
    product_list = [{'flavor': product.flavor, 'price': product.price} for product in products]
    return jsonify(product_list)




if __name__ == '__main__':
    app.run(debug=True)