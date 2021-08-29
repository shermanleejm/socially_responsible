from flask import Flask, jsonify, request, Response, url_for
from flask_cors import CORS, cross_origin
from flask_restplus import Api, Resource, fields
from dotenv import load_dotenv
import pymysql.cursors
import json
from werkzeug.middleware.proxy_fix import ProxyFix
import random
import string
import pandas as pd
import pickle
import sklearn
from flask_sqlalchemy import SQLAlchemy
import mysql.connector
from mysql.connector import errorcode
from dateutil import parser
import hashlib, uuid
from datetime import datetime
import hashlib, uuid

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

banks = ["BDS", "cbc", "BofA", "obu", "JMorgan", "SoldmanGachs"]

# ==================== connect to database ====================#
app.config["CORS_HEADERS"] = "Content-Type"
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "mysql+mysqlconnector://admin:password@database-1.cetp5zmopzbq.us-east-1.rds.amazonaws.com:3306/socially_responsible"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
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
    __tablename__ = "companies"

    uen = db.Column(db.String(256), primary_key=True)
    name = db.Column(db.String(256), nullable=False)
    hashed_password = db.Column(db.String(1000),nullable=False)
    salt = db.Column(db.String(1000),nullable=False)
    credit_score = db.Column(db.Float(precision=2), nullable=False)

    def __init__(self, uen, name, hashed_password, salt, credit_score):
        self.uen = uen
        self.name = name
        self.hashed_password = hashed_password
        self.salt = salt
        self.credit_score = credit_score

    def json(self):
        return {"uen": self.uen, "name": self.name, "hashed_password":self.hashed_password,"salt":self.salth, "credit_score": self.credit_score}


################## Expenditure Class Creation ##################
class Expenditure(db.Model):
    __tablename__ = "expenditure"

    expenditure_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    amount = db.Column(db.Float(precision=2), nullable=False)
    name = db.Column(db.String(1000), nullable=False)
    uen = db.Column(db.String(256), nullable=True)
    timestamp = db.Column(db.Date, nullable=False)

    def __init__(self, amount, name, uen, timestamp):
        self.amount = amount
        self.name = name
        self.uen = uen
        self.timestamp = timestamp

    def json(self):
        return {
            "amount": self.amount,
            "name": self.name,
            "uen": self.uen,
            "timestamp": self.timestamp,
        }


################## Revenue Class Creation ##################
class Revenue(db.Model):
    __tablename__ = "revenue"

    revenue_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    amount = db.Column(db.Float(precision=2), nullable=False)
    name = db.Column(db.String(1000), nullable=False)
    uen = db.Column(db.String(256), nullable=True)
    timestamp = db.Column(db.Date, nullable=False)

    def __init__(self, amount, name, uen, timestamp):
        self.amount = amount
        self.name = name
        self.uen = uen
        self.timestamp = timestamp

    def json(self):
        return {
            "amount": self.amount,
            "name": self.name,
            "uen": self.uen,
            "timestamp": self.timestamp,
        }

################## Loan Class Creation ##################
class Loan(db.Model):
    __tablename__ = "loan"

    loan_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    date = db.Column(db.Date, nullable=False)
    provider = db.Column(db.String(256), nullable=False) 
    amount = db.Column(db.Float(precision=2), nullable=False)
    uen = db.Column(db.String(256), nullable=True)
    status = db.Column(db.String(256), nullable=False) 

    def __init__(self, date, provider, amount, uen, status):
        self.date = date
        self.provider = provider
        self.amount = amount
        self.uen = uen
        self.status = status

    def json(self):
        return {
            "date": self.date,
            "provider": self.provider,
            "amount": self.amount,
            "uen": self.uen,
            "status": self.status,
        }

################## Investor Class Creation ##################
class Investors(db.Model):
    __tablename__ = "investors"

    username = db.Column(db.String(256), primary_key=True, nullable=False)
    hashed_password = db.Column(db.String(1000),nullable=False)
    salt = db.Column(db.String(1000),nullable=False)

    def __init__(self, username, hashed_password, salt):
        self.username = username
        self.hashed_password = hashed_password
        self.salt = salt

    def json(self):
        return {
            "username": self.username,
            "hashed_password": self.hashed_password,
            "salt": self.salt,
        }


# ==================== Connected to database ====================#


calc_credit_parser = api.parser()
calc_credit_parser.add_argument(
    "details",
    help="Details of company to help with risk calculation, collected as part of onboarding process.",
)


@api.route("/calculate")
@api.doc(
    description="Calculates the risk profile score for a company. Outputs a numerical risk score from 1 to 10, 1 being the least risky"
)
class CalculateCreditRisk(Resource):
    @api.expect(calc_credit_parser)
    def get(self):
        details = calc_credit_parser.parse_args().get("details")
        details = json.loads(details)
        years_dict = {
            "-1": -1,
            "10+ years": 10,
            "8 years": 8,
            "6 years": 6,
            "7 years": 7,
            "5 years": 5,
            "1 year": 1,
            "< 1 year": 0,
            "4 years": 4,
            "3 years": 3,
            "2 years": 2,
            "9 years": 9,
        }
        details["years_in_current_job"] = years_dict[details["years_in_current_job"]]
        housing_dict = {"Rent": 0, "Paying": 1, "Own Home": 2}
        details["home_ownership"] = housing_dict[details["home_ownership"]]
        term_dict = {"Short Term": 0, "Long Term": 1}
        details["term"] = term_dict[details["term"]]
        numeric_feats = [
            "annual_income",
            "tax_liens",
            "number_of_open_accounts",
            "years_of_credit_history",
            "maximum_open_credit",
            "months_since_last_delinquent",
            "bankruptcies",
            "current_loan_amount",
            "current_credit_balance",
            "monthly_debt",
        ]
        # call on standard scaler object from pickle
        numeric_details = {}
        cat_details = {}
        for x in details:
            if x in numeric_feats:
                numeric_details[x] = details[x]
            else:
                cat_details[x] = details[x]
        numeric_df = pd.DataFrame(numeric_details, index=[0])
        preprocessing_func = pickle.load(open("preprocessing.pickle", "rb"))
        numeric_df = pd.DataFrame(
            preprocessing_func.transform(numeric_df),
            index=numeric_df.index,
            columns=numeric_feats,
        )
        cat_df = pd.DataFrame(cat_details, index=[0])
        overall_df = pd.concat([cat_df, numeric_df], axis=1)
        # Run model
        catboost_clf = pickle.load(open("catboost_clf.pickle", "rb"))
        y_pred = catboost_clf.predict_proba(overall_df)
        risk = y_pred[0][1] * 10
        return risk, 200


add_expense_parser = api.parser()
add_expense_parser.add_argument("amount", help="How much the expense was.")
add_expense_parser.add_argument("name", help="Name or short description of expense.")
add_expense_parser.add_argument("uen", help="uen of the company")
add_expense_parser.add_argument("timestamp", help="Date of when the expense was made")


@api.route("/add-expense")
@api.doc(description="Add a new expense")
class AddExpense(Resource):
    @api.expect(add_expense_parser)
    def get(self):
        amount = add_expense_parser.parse_args().get("amount")
        name = add_expense_parser.parse_args().get("name")
        uen = add_expense_parser.parse_args().get("uen")
        timestamp = add_expense_parser.parse_args().get("timestamp")
        expense = Expenditure(float(amount), name, uen, timestamp)
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
add_revenue_parser.add_argument("timestamp", help="Date of when the expense was made")


@api.route("/add-revenue")
@api.doc(description="Add a new transaction")
class AddRevenue(Resource):
    @api.expect(add_revenue_parser)
    def get(self):
        amount = add_revenue_parser.parse_args().get("amount")
        name = add_revenue_parser.parse_args().get("name")
        uen = add_revenue_parser.parse_args().get("uen")
        timestamp = add_revenue_parser.parse_args().get("timestamp")
        revenue = Revenue(float(amount), name, uen, timestamp)
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
        for rev in Revenue.query.filter_by(uen=uen):
            revenue_info[rev.json()["timestamp"].strftime("%Y-%m-%d")] = {
                "name": rev.json()["name"],
                "amount": rev.json()["amount"],
            }
        if len(revenue_info) == 0:
            return "No revenue found"
        return revenue_info


get_expense_parser = api.parser()
get_expense_parser.add_argument("uen", help="UEN of company to retrieve expenses of.")


@api.route("/get-expense")
@api.doc(description="Get revenue of a particular company")
class GetExpense(Resource):
    @api.expect(get_expense_parser)
    def get(self):
        uen = get_expense_parser.parse_args().get("uen")
        expenses_info = {}
        for exp in Expenditure.query.filter_by(uen=uen):
            expenses_info[exp.json()["timestamp"].strftime("%Y-%m-%d")] = {
                "name": exp.json()["name"],
                "amount": exp.json()["amount"],
            }
        if len(expenses_info) == 0:
            return "No expenses found"
        return expenses_info


@api.route("/leaderboard")
@api.doc(description="Get latest leaderboard rankings")
class Leaderboard(Resource):
    def get(self):
        res = []
        for name in [
            "Rick Grimes",
            "Negan",
            "Daryl Dixon",
            "Maggie Greene",
            "Carl Grimes",
            "Glenn Rhee",
            "Hershel Greene",
            "Michonne",
            "Rosita Espinosa",
            "Beta",
            "Shane Walsh",
            "Andrea",
            "Alpha",
            "Judith Grimes",
        ]:
            res.append(
                {
                    "company": name + " Pte. Ltd.",
                    "uen": "".join(random.choices(string.digits, k=14)),
                    "credit": round(random.uniform(0, 5), 1),
                    "financial": round(random.uniform(0, 5), 1),
                    "esg": round(random.uniform(0, 5), 1),
                }
            )
        return res

new_loan_parser = api.parser()
new_loan_parser.add_argument("amount",help="Amount requested")
new_loan_parser.add_argument("bank",help="Which bank loan is requested from")
new_loan_parser.add_argument("uen",help="uen of company")
@api.route("/new-loan")
@api.doc(description="Request loan from bank")
class newLoan(Resource):
    @api.expect(new_loan_parser)
    def get(self):
        amount = new_loan_parser.parse_args().get("amount")
        bank = new_loan_parser.parse_args().get("bank")
        uen = new_loan_parser.parse_args().get("uen")
        global banks
        #["BDS", "cbc", "BofA", "obu", "JMorgan", "SoldmanGachs"]
        if bank not in banks:
            return "Bank entered not in list of supporting banks", 400
        else:
            status = "pending"
            date = datetime.today().strftime('%Y-%m-%d')
            loan = Loan(date, bank, float(amount), uen, status)
            try:
                db.session.add(loan)
                db.session.commit()
                return "Success",200
            except:
                return "Unexpected error, please contact admin",400


companies_registration_parser = api.parser()
companies_registration_parser.add_argument("uen", help="Company UEN")
companies_registration_parser.add_argument("name", help="Name of company")
companies_registration_parser.add_argument("password", help="Password")
companies_registration_parser.add_argument("home_ownership", help="Paying, Own Home, Rent")
companies_registration_parser.add_argument("annual_income", help="Annual income")
companies_registration_parser.add_argument("years_in_current_job", help="Years in current job")
companies_registration_parser.add_argument("tax_liens",help="Tax liens")
companies_registration_parser.add_argument("number_of_open_accounts",help="Number of open accounts")
companies_registration_parser.add_argument("years_of_credit_history", help="Years of credit history")
companies_registration_parser.add_argument("maximum_open_credit", help="Maximum open credit")
companies_registration_parser.add_argument("months_since_last_delinquent", help="Months since last delinquent")
companies_registration_parser.add_argument("bankruptcies", help="Number of bankruptcies")
companies_registration_parser.add_argument("current_loan_amount", help="Current loan amounts")
companies_registration_parser.add_argument("current_credit_balance", help="Current credit balance")
companies_registration_parser.add_argument("monthly_debt", help="Monthly debt")
@api.route("/companies_register")
@api.doc(description="Registration for companies")
class CompaniesRegistration(Resource):
    @api.expect(companies_registration_parser)
    def get(self):
        uen = companies_registration_parser.parse_args().get("uen")
        name = companies_registration_parser.parse_args().get("name")
        password = companies_registration_parser.parse_args().get("password")
        acc = Companies.query.filter_by(uen=uen).count()
        # print(uen)
        # print(password)
        # print(acc)
        if acc > 0:
            exists=True
        else:
            exists=False
        if exists:
            return 400, "username already exists"
        else:
            #Credit risk calculation
            # print(companies_registration_parser.parse_args().get("home_ownership"))
            details = {
                "home_ownership": companies_registration_parser.parse_args().get("home_ownership"),
                "annual_income": float(companies_registration_parser.parse_args().get("annual_income")),
                "years_in_current_job": float(companies_registration_parser.parse_args().get("years_in_current_job")),
                "tax_liens": float(companies_registration_parser.parse_args().get("tax_liens")),
                "number_of_open_accounts": float(companies_registration_parser.parse_args().get("number_of_open_accounts")),
                "years_of_credit_history": float(companies_registration_parser.parse_args().get("years_of_credit_history")),
                "maximum_open_credit": float(companies_registration_parser.parse_args().get("maximum_open_credit")),
                "number_of_credit_problems":float(0),
                "months_since_last_delinquent": float(companies_registration_parser.parse_args().get("months_since_last_delinquent")),
                "bankruptcies": float(companies_registration_parser.parse_args().get("bankruptcies")),
                "term": "Short Term",
                "current_loan_amount": float(companies_registration_parser.parse_args().get("current_loan_amount")),
                "current_credit_balance": float(companies_registration_parser.parse_args().get("current_credit_balance")),
                "monthly_debt": float(companies_registration_parser.parse_args().get("monthly_debt")),
            }
            years_dict = {
                "-1": -1,
                float(11): 10,
                float(9): 8,
                float(7): 6,
                float(8): 7,
                float(6): 5,
                float(2): 1,
                float(1): 0,
                float(5): 4,
                float(4): 3,
                float(3): 2,
                float(10): 9,
            }
            details["years_in_current_job"] = years_dict[details["years_in_current_job"]]
            housing_dict = {"Rent": 0, "Paying": 1, "Own Home": 2}
            details["home_ownership"] = housing_dict[details["home_ownership"]]
            term_dict = {"Short Term": 0, "Long Term": 1}
            details["term"] = term_dict[details["term"]]
            numeric_feats = [
                "annual_income",
                "tax_liens",
                "number_of_open_accounts",
                "years_of_credit_history",
                "maximum_open_credit",
                "months_since_last_delinquent",
                "bankruptcies",
                "current_loan_amount",
                "current_credit_balance",
                "monthly_debt",
            ]
            # call on standard scaler object from pickle
            numeric_details = {}
            cat_details = {}
            for x in details:
                if x in numeric_feats:
                    numeric_details[x] = details[x]
                else:
                    cat_details[x] = details[x]
            numeric_df = pd.DataFrame(numeric_details, index=[0])
            preprocessing_func = pickle.load(open("preprocessing.pickle", "rb"))
            numeric_df = pd.DataFrame(
                preprocessing_func.transform(numeric_df),
                index=numeric_df.index,
                columns=numeric_feats,
            )
            cat_df = pd.DataFrame(cat_details, index=[0])
            overall_df = pd.concat([cat_df, numeric_df], axis=1)
            # Run model
            catboost_clf = pickle.load(open("catboost_clf.pickle", "rb"))
            y_pred = catboost_clf.predict_proba(overall_df)
            risk = y_pred[0][1] * 10
            credit_score = risk
            salt = uuid.uuid4().hex
            hashed_password= hashlib.sha512((password + salt).encode('utf-8')).hexdigest()
            print(uen)
            print(name)
            print(hashed_password)
            print(salt)
            print("==========risk========")
            print(risk)
            companies = Companies(str(uen),str(name),str(hashed_password),str(salt),round(float(credit_score),2))
            try:
                db.session.add(companies)
                db.session.commit()
                return 200, "Success"
            except:
                return 400,"Unexpected error in registration"


companies_login_parser = api.parser()
companies_login_parser.add_argument("uen", help="UEN of company")
companies_login_parser.add_argument("password", help="Password")
@api.route("/companies_login")
@api.doc(description="Login for companies")
class CompaniesLogin(Resource):
    @api.expect(companies_login_parser)
    def get(self):
        uen = companies_login_parser.parse_args().get("uen")
        password = companies_login_parser.parse_args().get("password")
        acc = Companies.query.filter_by(uen=uen).count()
        if acc > 0:
            exists=True
        else:
            exists=False
        if exists==False:
            return 400, "UEN does not exist"
        else:
            hashed_db_password = Companies.query.filter_by(uen=uen).first().hashed_password
            db_salt = Companies.query.filter_by(uen=uen).first().salt
            hashed_password = hashlib.sha512((password + db_salt).encode('utf-8')).hexdigest()
            if hashed_password==hashed_db_password:
                return 200, "Login successful"
            else:
                return 400, "Incorrect password"


investor_registration_parser = api.parser()
investor_registration_parser.add_argument("username", help="Username")
investor_registration_parser.add_argument("password", help="Password")
@api.route("/investor_register")
@api.doc(description="Registration for investors")
class InvestorRegistration(Resource):
    @api.expect(investor_registration_parser)
    def get(self):
        username = investor_registration_parser.parse_args().get("username")
        password = investor_registration_parser.parse_args().get("password")
        # exists = db.session.query(username).filter(username=username).first() is not None
        acc = Investors.query.filter_by(username=username).count()
        print(acc)
        if acc > 0:
            exists=True
        else:
            exists=False
        if exists:
            return 400, "username already exists"
        else:
            salt = uuid.uuid4().hex
            hashed_password= hashlib.sha512((password + salt).encode('utf-8')).hexdigest()
            investors = Investors(username,hashed_password,salt)
            try:
                db.session.add(investors)
                db.session.commit()
                return 200, "Success"
            except:
                return 400,"Unexpected error in registration"

investor_login_parser = api.parser()
investor_login_parser.add_argument("username", help="Username")
investor_login_parser.add_argument("password", help="Password")
@api.route("/investor_login")
@api.doc(description="Login for investors")
class InvestorLogin(Resource):
    @api.expect(investor_login_parser)
    def get(self):
        username = investor_login_parser.parse_args().get("username")
        password = investor_login_parser.parse_args().get("password")
        acc = Investors.query.filter_by(username=username).count()
        if acc > 0:
            exists=True
        else:
            exists=False
        if exists==False:
            return 400, "username does not exist"
        else:
            hashed_db_password = Investors.query.filter_by(username=username).first().hashed_password
            db_salt = Investors.query.filter_by(username=username).first().salt
            hashed_password = hashlib.sha512((password + db_salt).encode('utf-8')).hexdigest()
            if hashed_password==hashed_db_password:
                return 200, "Login successful"
            else:
                return 400, "Incorrect password"

def checkLoanStatus():
    pass


@api.route("/get-banks")
@api.doc(description="Return list of supporting banks for loans")
class GetBanks(Resource):
    def get(self):
        global banks
        return banks


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
