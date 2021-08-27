from flask import Flask, jsonify, request, Response, url_for
from flask_cors import CORS
from flask_restplus import Api, Resource, fields
from dotenv import load_dotenv
import pymysql.cursors
import json
from werkzeug.middleware.proxy_fix import ProxyFix


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
    "company", help="The name of the company to calculate for."
)


@api.route("/calculate")
@api.doc(description="Calculates the risk profile score for a company.")
class CalculateCreditRisk(Resource):
    @api.expect(calc_credit_parser)
    def get(self):
        ## use magic formula to calculate risk
        ## Probability of Default = (loss given default * exposure at default) / expected loss (i.e., company revenue)
        ## write to db (conditional on how long it takes to calculate)
        company = calc_credit_parser.parse_args().get("company")
        print(type(company))
        return company, 200


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
