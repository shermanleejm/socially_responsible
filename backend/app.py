from flask import Flask, jsonify, request, Response, url_for
from flask_cors import CORS
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
add_expense_parser.add_argument("title", help="Name of expense.")


@api.route("/add-expense")
@api.doc(description="Add a new expense")
class AddExpanse(Resource):
    @api.expect(add_expense_parser)
    def get(self):
        amount = calc_credit_parser.parse_args().get("amount")
        title = calc_credit_parser.parse_args().get("title")
        # add to db
        return "success", 200


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


def addTransaction():
    pass


def addRevenue():
    pass


def login():
    pass


## Fields: UEN, sector, name
def register():
    pass


def newLoan():
    pass


def checkLoanStatus():
    pass


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
