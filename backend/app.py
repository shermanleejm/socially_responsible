from flask import Flask, jsonify, request, Response, url_for
from flask_cors import CORS, cross_origin
from flask_restplus import Api, Resource, fields
from dotenv import load_dotenv
import pymysql.cursors
import json
from werkzeug.middleware.proxy_fix import ProxyFix
import sng
import random
import string

#newly added libraries
import pandas as pd
import pickle
import sklearn #added to requirements
from flask_sqlalchemy import SQLAlchemy
import mysql.connector
from mysql.connector import errorcode
from datetime import datetime

app = Flask(__name__)
api = Api(
    app,
    version="1.0",
    title="Socially Responsible",
    description="For Ellipsis Tech Series 2021",
)
CORS(app)
app.wsgi_app = ProxyFix(app.wsgi_app)

load_dotenv()

#==================== connect to database ====================#
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://admin:password@database-1.cetp5zmopzbq.us-east-1.rds.amazonaws.com:3306/socially_responsible'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# try:
#   cnx = mysql.connector.connect(user='admin', password="password",host="database-1.cetp5zmopzbq.us-east-1.rds.amazonaws.com",database='socially_responsible')
#   print("connected")
# except mysql.connector.Error as err:
#   if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
#     print("Something is wrong with your user name or password")
#   elif err.errno == errorcode.ER_BAD_DB_ERROR:
#     print("Database does not exist")
#   else:
#     print(err)


################## Companies Class Creation ##################
class Companies(db.Model):
    __tablename__ = 'companies'

    uen = db.Column(db.String(256), primary_key=True)
    name = db.Column(db.String(256), nullable=False)
    credit_score = db.Column(db.Date, nullable=False)

    def __init__(self, uen, name, credit_score):
        self.uen = uen
        self.name = name
        self.credit_score = credit_score

    def json(self):
        return {"uen": self.uen, "name": self.name, "credit_score": self.credit_score}

################## Expenditure Class Creation ##################
class Expenditure(db.Model):
    __tablename__ = 'expenditure'

    expenditure_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    amount = db.Column(db.Float(precision=2), nullable=False)
    name = db.Column(db.String(1000), nullable=False)
    uen = db.Column(db.String(256), nullable=True)
    timestamp = db.Column(db.DateTime, nullable=False)

    def __init__(self, amount, name, uen, timestamp):
        self.amount = amount
        self.name = name
        self.uen = uen
        self.timestamp = timestamp

    def json(self):
        return {"amount": self.amount, "name": self.name , "uen": self.uen , "timestamp": self.timestamp}

################## Revenue Class Creation ##################
class Revenue(db.Model):
    __tablename__ = 'revenue'

    revenue_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    amount = db.Column(db.Float(precision=2), nullable=False)
    name = db.Column(db.String(1000), nullable=False)
    uen = db.Column(db.String(256), nullable=True)
    timestamp = db.Column(db.DateTime, nullable=False)

    def __init__(self, amount, name, uen, timestamp):
        self.amount = amount
        self.name = name
        self.uen = uen
        self.timestamp = timestamp

    def json(self):
        return {"amount": self.amount, "name": self.name , "uen": self.uen , "timestamp": self.timestamp}


#==================== Connected to database ====================#





calc_credit_parser = api.parser()
calc_credit_parser.add_argument(
    "details", help="Details of company to help with risk calculation, collected as part of onboarding process."
)

@api.route("/calculate")
@api.doc(description="Calculates the risk profile score for a company. Outputs a numerical risk score from 1 to 10, 1 being the least risky")
class CalculateCreditRisk(Resource):
    @api.expect(calc_credit_parser)
    def get(self):
        details = calc_credit_parser.parse_args().get("details")
        details = json.loads(details)
        years_dict = {'-1': -1, '10+ years': 10, '8 years': 8, '6 years': 6, 
                '7 years': 7, '5 years': 5, '1 year': 1, '< 1 year': 0, 
                '4 years': 4, '3 years': 3, '2 years': 2, '9 years': 9}
        details["years_in_current_job"] = years_dict[details["years_in_current_job"]]
        housing_dict = {"Rent":0,"Paying":1,"Own Home":2}
        details["home_ownership"] = housing_dict[details["home_ownership"]]
        term_dict = {"Short Term":0, "Long Term":1}
        details["term"] = term_dict[details["term"]]
        numeric_feats = ["annual_income","tax_liens","number_of_open_accounts","years_of_credit_history","maximum_open_credit","months_since_last_delinquent","bankruptcies","current_loan_amount","current_credit_balance","monthly_debt"]
        #call on standard scaler object from pickle
        numeric_details = {}
        cat_details = {}
        for x in details:
            if x in numeric_feats:
                numeric_details[x]=details[x]
            else:
                cat_details[x] = details[x]
        numeric_df = pd.DataFrame(numeric_details, index=[0])
        preprocessing_func = pickle.load(open("preprocessing.pickle","rb"))
        numeric_df = pd.DataFrame(preprocessing_func.transform(numeric_df),index=numeric_df.index,columns=numeric_feats)
        cat_df = pd.DataFrame(cat_details, index=[0])
        overall_df = pd.concat([cat_df,numeric_df], axis=1)
        #Run model
        catboost_clf = pickle.load(open("catboost_clf.pickle","rb"))
        y_pred = catboost_clf.predict_proba(overall_df)
        risk = y_pred[0][1]*10
        return risk, 200


add_expense_parser = api.parser()
add_expense_parser.add_argument("amount", help="How much the expense was.")
add_expense_parser.add_argument("name", help="Name or short description of expense.")
add_expense_parser.add_argument("uen", help="uen of the company")
add_expense_parser.add_argument("timestamp", help="Date and time of when the expense was made")

@api.route("/add-expense")
@api.doc(description="Add a new expense")
class AddExpense(Resource):
    @api.expect(add_expense_parser)
    def get(self):
        amount = add_expense_parser.parse_args().get("amount")
        name = add_expense_parser.parse_args().get("name")
        uen = add_expense_parser.parse_args().get("uen")
        timestamp = add_expense_parser.parse_args().get("timestamp")
        print(type(amount))
        print(amount)
        print(type(name))
        print(name)
        print(type(uen))
        print(uen)
        print(type(timestamp))
        print(timestamp)
        expense = Expenditure(float(amount),name,uen,timestamp)
        try:
            db.session.add(expense)
            db.session.commit()
            return "success", 200
        except:
            print("Failed")
            return "Failed", 400


add_revenue_parser = api.parser()
add_revenue_parser.add_argument("amount", help="How much the revenue was.")
add_revenue_parser.add_argument("name", help="Name or short description of expense.")
add_revenue_parser.add_argument("uen", help="uen of the company")
add_revenue_parser.add_argument("timestamp", help="Date and time of when the expense was made")
@api.route("/add-revenue")
@api.doc(description="Add a new transaction")
class AddRevenue(Resource):
    @api.expect(add_revenue_parser)
    def get(self):
        amount = add_revenue_parser.parse_args().get("amount")
        name = add_revenue_parser.parse_args().get("name")
        uen = add_revenue_parser.parse_args().get("uen")
        timestamp = add_revenue_parser.parse_args().get("timestamp")
        revenue = Revenue(float(amount),name,uen,timestamp)
        try:
            db.session.add(revenue)
            db.session.commit()
            return "success", 200
        except:
            print("Failed")
            return "Failed", 400


get_revenue_parser = api.parser()
get_revenue_parser.add_argument("uen", help="UEN of company to retrieve revenue of.")
@api.route("/get-revenue")
@api.doc(description="Get revenue of a particular company")
class GetRevenue(Resource):
    @api.expect(get_revenue_parser)
    def get(self):
        uen = add_revenue_parser.parse_args().get("uen")
        revenue_info = {}
        for exp in Revenue.query.filter_by(uen=uen):
            revenue_info[exp.json()["timestamp"].strftime("%m/%d/%Y, %H:%M:%S")] = {"name":exp.json()["name"],"amount":exp.json()["amount"]} 
        return revenue_info
        # try:
        #     print("test")
        #     return "success", 200
        # except:
        #     print("Failed")
        #     return "Failed", 400


@api.route("/leaderboard")
@api.doc(description="Get latest leaderboard rankings")
class Leaderboard(Resource):
    def get(self):
        gen = sng.Generator.load("leaderboard_model")
        gen.config.suffix = " Pte Ltd"
        res = []
        for name in gen.simulate(n=10):
            res.append(
                {
                    "company": name,
                    "uen": "".join(random.choices(string.digits, k=14)),
                    "credit": round(random.uniform(0, 5), 1),
                    "financial": round(random.uniform(0, 5), 1),
                    "esg": round(random.uniform(0, 5), 1),
                }
            )
        return res




def login():
    pass


def register():
    pass


def newLoan():
    pass


def checkLoanStatus():
    pass


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
