from flask import Flask, render_template, url_for, request, jsonify
import csv
import re
import pandas as pd

app = Flask(__name__)

@app.route('/findrisk', methods=['GET','POST'])
def getRisk():
    if request.method == 'GET':
        req = str(request)
        coordinates = re.findall('(?:latitude|longitude)=(-?\d+.\d+)', req)
        lat = coordinates[0]
        lng = coordinates[1]

        df = pd.read_csv('data.csv')
        

        count = 0
        
        
        for index, row in df.iterrows():
            try:
                if(abs(float(row['LATITUDE']) - float(lat) ) <= 1 and abs(float(row['LONGITUDE']) - float(lng) <= 1 )):
                    count += 1
            except:
                continue

        message = "That location has had " + str(count) + " hurricanes and other natural disasters in the past 14 years!"
        return message

    else:
        return "Couldn't compute"



        
        

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run()