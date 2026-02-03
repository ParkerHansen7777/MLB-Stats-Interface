from flask import Flask
from operator import itemgetter
#import statsapi
import requests
#import datetime
from flask_cors import CORS, cross_origin

#x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__)
cors = CORS(app) # allow CORS for all domains on all routes.
app.config['CORS_HEADERS'] = 'Content-Type'


# Route for seeing a data
@app.route('/teams')
@cross_origin()
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
    data = sorted(data, key=itemgetter('name'))
    return data

@app.route('/teams/<id>')
@cross_origin()
def get_roster(id):

    req = requests.get(
        "https://statsapi.mlb.com/api/v1/teams/" + id + "/roster"
    ).json()
    req = req["roster"]
    data = []
    #return req
    
    
    for dic in req:
        data.append({"id": dic["person"]["id"], "name": dic["person"]["fullName"], "pos": dic["position"]["abbreviation"]})
    return data
    
@app.route('/player/<id>/hitting')
@cross_origin()
def get_player_hitting_stats(id):

    req = requests.get(
        "http://statsapi.mlb.com/api/v1/people/" + id + "/stats?stats=season&group=hitting"
    ).json()
    
    #extract hitting stats from request
    if not req["stats"]:
        return []
    else:
        req = req["stats"][0]["splits"][0]["stat"]

        return req
    
@app.route('/player/<id>/pitching')
@cross_origin()
def get_player_pitching_stats(id):

    req = requests.get(
        "http://statsapi.mlb.com/api/v1/people/" + id + "/stats?stats=season&group=pitching"
    ).json()
    
    #extract pitching stats from request
    #print(req)
    if not req["stats"]:
        return []
    else:
        req = req["stats"][0]["splits"][0]["stat"]

        return req
    
    
# Running app
if __name__ == '__main__':
    app.run(debug=True, port=5100)