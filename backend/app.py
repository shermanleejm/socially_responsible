from flask import Flask, jsonify, request, Response, url_for
from flask_cors import CORS
from flask_restplus import Api, Resource, fields
from werkzeug.datastructures import FileStorage
from dotenv import load_dotenv
import os
import pymysql.cursors
import json
from nltk.corpus import wordnet
import pandas as pd
import numpy as np
import sys
from datetime import datetime, timedelta, date
from dateutil.relativedelta import relativedelta
import tempfile
import shutil
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from werkzeug.middleware.proxy_fix import ProxyFix
import decimal


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
    def get(self, company):
        ## use magic formula to calculate risk
        ## Probability of Default = (loss given default * exposure at default) / expected loss (i.e., company revenue)
        ## write to db (conditional on how long it takes to calculate)
        pass


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
