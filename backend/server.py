from flask import Flask
#import statsapi
import requests
#import datetime

#x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__)


# Route for seeing a data
@app.route('/teams')
def get_teams():
    
    
    # Returning an api for showing in  reactjs
    req = requests.get(
        "http://statsapi.mlb.com/api/v1/teams",
        params={'sportId':1}
    ).json()
    req = req["teams"]
    data = []
    
    for dic in req:
        
        data.append({"id": dic["id"], "name": dic["name"]})
        data.sort()
    
    
    
    return data

@app.route('/teams/<id>')
def get_roster(id):

    req = requests.get(
        "https://statsapi.mlb.com/api/v1/teams/" + id + "/roster"
    ).json()
    req = req["roster"]
    data = []
    #return req
    
    
    for dic in req:
        data.append({"id": dic["person"]["id"], "name": dic["person"]["fullName"]})
    return data
# Running app
if __name__ == '__main__':
    app.run(debug=True, port=5100)