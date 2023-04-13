from flask import Flask, render_template, request, jsonify

from chat import get_response

app = Flask(__name__)


@app.route("/", methods=['GET', 'POST'])
def base():
    return render_template("index.html")

@app.route("/virtualtour")
def virtualtour():
    return render_template("arunity/index.html")

@app.post("/predict")
def predict():
    text = request.get_json().get("message")
    response = get_response(text)
    message = {"answer": response}
    return jsonify(message)


if __name__== "__main__":
    app.run(host="0.0.0.0", port=5000)
