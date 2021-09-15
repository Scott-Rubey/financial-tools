from flask import Flask, render_template, request, redirect, url_for

application = Flask(__name__)


@application.route('/')
def retirementcalculator():  # put application's code here
    return render_template('retirement-calculator.html')


if __name__ == '__main__':
    application.run(host='0.0.0.0', debug = True)
