from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)


@app.route('/')
def retirementcalculator():  # put application's code here
    return render_template('retirement-calculator.html')


if __name__ == '__main__':
    app.run()
