# from enum import Flag
from os import P_PGID, RTLD_LAZY
from flask import Flask, render_template, request, session
# from flask import Flask, render_template, url_for, request, jsonify, make_response, redirect, session, g
import flask
# from flask.signals import _FakeSignal
# from flask.templating import render_template_string
from flask_sqlalchemy import SQLAlchemy
from bs4 import BeautifulSoup 
from bs4 import Comment
from sqlalchemy.exc import SQLAlchemyError
from datetime import datetime
from sqlalchemy.sql import select
# from datetime import date
from sqlalchemy import func
import requests
# import pandas as pd
# from tabulate import tabulate
import re
# import itertools
import time 

from werkzeug.datastructures import ContentSecurityPolicy

app = Flask(__name__)

ENV = 'prod'

if ENV == 'dev':
    app.debug = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@127.0.0.1/NBAStatsPost'
    # 'sqlite:///NBAStatss.db'

else: 
    app.debug = False
    app.config['SQLALCHEMY_DATABASE_URI']= 'postgresql://evtzswwsvlsdkn:0f34727497bc308db99af06a17964f9656c9501cbd0cba73034e43051cfba215@ec2-34-202-54-225.compute-1.amazonaws.com:5432/dag57m5ebejfbj'
    # app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://dupcjiwqfuwbqt:3453adfeb53211a0f64d13bc32263c6c31fa04e4e2b29354947294c4ee63f982@ec2-3-95-130-249.compute-1.amazonaws.com:5432/dfka390kr9p6il'


app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = "secret key"
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///NBAStatss.db'
db = SQLAlchemy(app)


class Stats(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    game = db.Column(db.String(200), nullable=False)
    rowCount = db.Column(db.Integer, nullable=False)
    team = db.Column(db.String(200), nullable=False)
    gameLink = db.Column(db.String(200), nullable=False)
    starters1 = db.Column(db.String(200), nullable=False)
    mp1 = db.Column(db.String(200))
    fg1 = db.Column(db.String(200))
    fga1 = db.Column(db.String(200))
    fg_pct1 = db.Column(db.String(200))
    fg31 = db.Column(db.String(200))
    fg3a1 = db.Column(db.String(200))
    fg3_pct1 = db.Column(db.String(200))
    ft1 = db.Column(db.String(200))
    fta1 = db.Column(db.String(200))
    ft_pct1 = db.Column(db.String(200))
    orb1 = db.Column(db.String(200))
    drb1 = db.Column(db.String(200))
    trb1 = db.Column(db.String(200))
    ast1 = db.Column(db.String(200))
    stl1 = db.Column(db.String(200))
    blk1 = db.Column(db.String(200))
    tov1 = db.Column(db.String(200))
    pf1 = db.Column(db.String(200))
    pts1 = db.Column(db.String(200))
    plus_minus1= db.Column(db.String(200))
    # date_created = db.Column(db.DateTime)

    def __repr__(self):
        # return '<Link %r>' % self.link
        return f"Stats('{self.id}', '{self.game}', '{self.rowCount}', '{self.team}', '{self.gameLink}', '{self.starters1}', '{self.mp1}', '{self.fg1}', '{self.fga1}', '{self.fg_pct1}', '{self.fg31}', '{self.fg3a1}, '{self.fg3_pct1}', '{self.ft1}', '{self.fta1}', '{self.ft_pct1}', '{self.orb1}', '{self.drb1}', '{self.trb1}', '{self.ast1}', '{self.stl1}', '{self.blk1}', '{self.tov1}', '{self.pf1}', '{self.pts1}', '{self.plus_minus1}')"

class Stats2(db.Model):
    id3 = db.Column(db.Integer, primary_key=True)
    game3 = db.Column(db.String(200), nullable=False)
    rowCount = db.Column(db.Integer, nullable=False)
    team3 = db.Column(db.String(200), nullable=False)
    gameLink3 = db.Column(db.String(200), nullable=False)
    starters3 = db.Column(db.String(200), nullable=False)
    mp3 = db.Column(db.String(200))
    fg3 = db.Column(db.String(200))
    fga3 = db.Column(db.String(200))
    fg_pct3 = db.Column(db.String(200))
    fg33 = db.Column(db.String(200))
    fg3a3 = db.Column(db.String(200))
    fg3_pct3 = db.Column(db.String(200))
    ft3 = db.Column(db.String(200))
    fta3 = db.Column(db.String(200))
    ft_pct3 = db.Column(db.String(200))
    orb3 = db.Column(db.String(200))
    drb3 = db.Column(db.String(200))
    trb3 = db.Column(db.String(200))
    ast3 = db.Column(db.String(200))
    stl3 = db.Column(db.String(200))
    blk3 = db.Column(db.String(200))
    tov3 = db.Column(db.String(200))
    pf3 = db.Column(db.String(200))
    pts3 = db.Column(db.String(200))
    plus_minus3= db.Column(db.String(200))
    # date_created3 = db.Column(db.DateTime)

class Game(db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(200), nullable=False)

class QuarterTeam1(db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    gameLink = db.Column(db.String(200))
    team = db.Column(db.String(200), nullable=False)
    first = db.Column(db.Integer, nullable=False)
    second = db.Column(db.Integer, nullable=False)
    third = db.Column(db.Integer, nullable=False)
    fourth = db.Column(db.Integer, nullable=False)

class QuarterTeam2(db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    gameLink = db.Column(db.String(200))
    team = db.Column(db.String(200), nullable=False)
    first = db.Column(db.Integer, nullable=False)
    second = db.Column(db.Integer, nullable=False)
    third = db.Column(db.Integer, nullable=False)
    fourth = db.Column(db.Integer, nullable=False)

class ConferenceTitles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    season = db.Column(db.String(200), nullable=False)
    LeagueChampion = db.Column(db.String(200), nullable=False)
    MVP = db.Column(db.String(200), nullable=False)
    RTY = db.Column(db.String(200), nullable=False)
    PPG = db.Column(db.String(200), nullable=False)
    RPG = db.Column(db.String(200), nullable=False)
    APG = db.Column(db.String(200), nullable=False)
    WS = db.Column(db.String(200), nullable=False)

    def __repr__(self):
        # return '<Link %r>' % self.link
        return f"ConferenceTitles('{self.id}', '{self.season}', '{self.LeagueChampion}', '{self.MVP}', '{self.RTY}', '{self.PPG}', '{self.RPG}', '{self.APG}', '{self.WS}')"

class EasternConference(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    seasonStats = db.Column(db.String(200), nullable=False)
    conferenceTeams = db.Column(db.String(200), nullable=False)
    wins = db.Column(db.String(200))
    losses = db.Column(db.String(200))
    win_losses = db.Column(db.String(200))
    gb = db.Column(db.String(200))
    points_game = db.Column(db.String(200))
    opp_points_game = db.Column(db.String(200))
    srs = db.Column(db.String(200))

    def __repr__(self):
        # return '<Link %r>' % self.link
        return f"EasternConference('{self.id}', '{self.seasonStats}', '{self.conferenceTeams}', '{self.wins}', '{self.losses}', '{self.win_losses}', '{self.gb}', '{self.points_game}', '{self.opp_points_game}', '{self.srs}')"

class WesternConference(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    seasonStats = db.Column(db.String(200), nullable=False)
    conferenceTeams = db.Column(db.String(200), nullable=False)
    wins = db.Column(db.String(200))
    losses = db.Column(db.String(200))
    win_losses = db.Column(db.String(200))
    gb = db.Column(db.String(200))
    points_game = db.Column(db.String(200))
    opp_points_game = db.Column(db.String(200))
    srs = db.Column(db.String(200))

    def __repr__(self):
        # return '<Link %r>' % self.link
        return f"WesternConference('{self.id}', '{self.seasonStats}', '{self.conferenceTeams}', '{self.wins}', '{self.losses}', '{self.win_losses}', '{self.gb}', '{self.points_game}', '{self.opp_points_game}', '{self.srs}')"

class oldConference(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    seasonStats = db.Column(db.String(200), nullable=False)
    conferenceTeams = db.Column(db.String(200), nullable=False)
    wins = db.Column(db.String(200))
    losses = db.Column(db.String(200))
    win_losses = db.Column(db.String(200))
    gb = db.Column(db.String(200))
    points_game = db.Column(db.String(200))
    opp_points_game = db.Column(db.String(200))
    srs = db.Column(db.String(200))


    def __repr__(self):
        # return '<Link %r>' % self.link
        return f"oldConference('{self.id}', '{self.seasonStats}', '{self.conferenceTeams}', '{self.wins}', '{self.losses}', '{self.win_losses}', '{self.gb}', '{self.points_game}', '{self.opp_points_game}', '{self.srs}')"




@app.route('/')
def index():
    return render_template('index.html')

@app.route('/stats', methods=["GET", "POST"])
def stats(): 

    date = request.args.get("date") #get from url, sent from form
    # date = request.form["date"]
    substring="-0"
    date1 = date[:]
    year = date[0:4]
    month = ""
    day = ""

    conferenceStandingsURL = 'https://www.basketball-reference.com/leagues/NBA_{}.html'.format(year)
    conferenceStandingsResult = requests.get(conferenceStandingsURL)
    conferenceStandingsDoc = BeautifulSoup(conferenceStandingsResult.text, "html.parser")

    conferenceTitles = conferenceStandingsDoc.find_all('strong')
    conference = conferenceStandingsDoc.find_all('li', class_='current index')
    season= ''
    for div in conferenceStandingsDoc.find_all('li', class_='current index'):
        season = div.find('a').text
    # print(season)

    conferencePlayers = conferenceStandingsDoc.find_all('p')
    conferenceWinners = []
    conferenceWinnersArry = []
    for titles in range(len(conferencePlayers)):
        for tags in conferencePlayers[titles].find_all('a'):
            conferenceWinners.append(tags.text)

    thisSeason = datetime.now().year + 1
    thisSeason = str(thisSeason)

    if(year==thisSeason):
        insertConference = ConferenceTitles(season=season, LeagueChampion='TBD', MVP='TBD', RTY='TBD', PPG=conferenceWinners[2], RPG=conferenceWinners[3], APG=conferenceWinners[4], WS=conferenceWinners[5])
        db.session.add(insertConference)
        db.session.commit()

    elif(year>thisSeason):
        print('do nothing')
    else:
        insertConference = ConferenceTitles(season=season, LeagueChampion=conferenceWinners[2], MVP=conferenceWinners[3], RTY=conferenceWinners[4], PPG=conferenceWinners[5], RPG=conferenceWinners[6], APG=conferenceWinners[7], WS=conferenceWinners[8])
        db.session.add(insertConference)
        db.session.commit()

    
    conferenceSummary = conferenceStandingsDoc.find_all('table', id='divs_standings_E')
    print(conferenceSummary)
    # print(conferenceSummary)
    counterEast = 0
    year = int(year)
    counterWest = 0
    counterOld = 0
    if(year > 1970):
        for conf in range(len(conferenceSummary)): # get team codes
            for c in conferenceSummary[conf].find_all('tr'):
                # print(c)
                teamName = c.find_all('th', {'data-stat':'team_name'})
                teamWins = c.find_all('td', {'data-stat':'wins'})
                teamLosses = c.find_all('td', {'data-stat':'losses'})
                win_loss_pct = c.find_all('td', {'data-stat':'win_loss_pct'})
                gb = c.find_all('td', {'data-stat':'gb'})
                pts_per_g = c.find_all('td', {'data-stat':'pts_per_g'})
                opp_pts_per_g = c.find_all('td', {'data-stat': 'opp_pts_per_g'})
                srs = c.find_all('td', {'data-stat':'srs'})

                for (a, b, c, d, e, f, g, h) in zip(teamName, teamWins, teamLosses, win_loss_pct, gb, pts_per_g, opp_pts_per_g, srs): 
                    counterEast = counterEast + 1
                    insertEastern = EasternConference(seasonStats=season, conferenceTeams=a.text, wins=b.text, losses=c.text, win_losses=d.text, gb=e.text, points_game=f.text, opp_points_game=g.text, srs=h.text)
                    db.session.add(insertEastern)
                db.session.commit()
                    # except SQLAlchemyError as e: 
                    #     error = str(e.__dict__['orig'])
                    #     print(error)
        conferenceSummaryWest = conferenceStandingsDoc.find_all('table', id='divs_standings_W')
        for confW in range(len(conferenceSummaryWest)):
            for w in conferenceSummaryWest[confW].find_all('tr'): 
                teamNameW = w.find_all('th', {'data-stat':'team_name'})
                teamWinsW = w.find_all('td', {'data-stat':'wins'})
                teamLossesW = w.find_all('td', {'data-stat':'losses'})
                win_loss_pctW = w.find_all('td', {'data-stat':'win_loss_pct'})
                gbW = w.find_all('td', {'data-stat':'gb'})
                pts_per_gW = w.find_all('td', {'data-stat':'pts_per_g'})
                opp_pts_per_gW = w.find_all('td', {'data-stat': 'opp_pts_per_g'})
                srsW = w.find_all('td', {'data-stat':'srs'})

                for (a, b, c, d, e, f, g, h) in zip(teamNameW, teamWinsW, teamLossesW, win_loss_pctW, gbW, pts_per_gW, opp_pts_per_gW, srsW): 
                    counterWest = counterWest + 1
                    # try: 
                    insertWestern = WesternConference(seasonStats=season, conferenceTeams=a.text, wins=b.text, losses=c.text, win_losses=d.text, gb=e.text, points_game=f.text, opp_points_game=g.text, srs=h.text)
                    db.session.add(insertWestern)
                    db.session.commit()
                    # except SQLAlchemyError as e: 
                    #     error = str(e.__dict__['orig'])
                    #     print(error)
    else: 
        oldConferenceSummary = conferenceStandingsDoc.find_all('table', id='divs_standings_')
        for oldConf in range(len(oldConferenceSummary)): # get team codes
            for old in oldConferenceSummary[oldConf].find_all('tr'):
                teamNameOld = old.find_all('th', {'data-stat':'team_name'})
                teamWinsOld = old.find_all('td', {'data-stat':'wins'})
                teamLossesOld = old.find_all('td', {'data-stat':'losses'})
                win_loss_pctOld = old.find_all('td', {'data-stat':'win_loss_pct'})
                gbOld = old.find_all('td', {'data-stat':'gb'})
                pts_per_gOld = old.find_all('td', {'data-stat':'pts_per_g'})
                opp_pts_per_gOld = old.find_all('td', {'data-stat': 'opp_pts_per_g'})
                srsOld = old.find_all('td', {'data-stat':'srs'})

                for (a, b, c, d, e, f, g, h) in zip(teamNameOld, teamWinsOld, teamLossesOld, win_loss_pctOld, gbOld, pts_per_gOld, opp_pts_per_gOld, srsOld): 
                    # try:  
                    counterOld = counterOld + 1
                    insertOld = oldConference(seasonStats=season, conferenceTeams=a.text, wins=b.text, losses=c.text, win_losses=d.text, gb=e.text, points_game=f.text, opp_points_game=g.text, srs=h.text)
                    db.session.add(insertOld)
                    db.session.commit()
                    # except SQLAlchemyError as e: 
                    #     error = str(e.__dict__['orig'])
                    #     print(error)

    if(substring in date[4:6] and substring in date[7:9]):
        print('first 0 and second 0')
        date1 = date[:5] + date[6:] 
        date1 = date1[:7] + date1[8:]
        month = date[6]
        day = date[9]
    elif (substring in date[4:6] and not (substring in date[7:9])):
        print('first 0 only')
        date1 = date[:5] + date[6:] 
        month = date[6]
        day = date[8:10]
    elif(substring in date[7:9] and not (substring in date[4:6])):
        print('second 0 only')
        date1 = date[:8] + date[9:]
        month = date[5:7]
        day = date[9]
    else: 
        month = date[5:7]
        day = date[8:10]
    session["date"] = date
    url = 'https://www.basketball-reference.com/boxscores/?month={}&day={}&year={}'.format(month, day, year)
    #get date and go to date page selected

    result = requests.get(url)
    doc = BeautifulSoup(result.text, "html.parser")
    # getBoxLinks = doc.find_all('td', {'class':'right gamelink'})
    getTeams = doc.find_all('table', class_="teams")
    winnerList = [] #all teams that won that day
    loserList = [] #all teams that lost that day
    gameLinks = [] #get html that contains the teamCodes links
    teamCodes = [] # /boxscores/202111030BRK.html for all teams
    boxscoreLink = [] #full link of chosen team box score
    teamsChosen = [] 
    table = []

    information = request.data.decode("utf-8")
    print(information)

    for t in range(len(getTeams)): # get team codes
            for row in getTeams[t].find_all('tr', class_="winner"):
                winners = row.find_all("a")
                winnerList.append(winners[0].text)
                win = row.find_all("a", href=re.compile('boxscores'))
                if(len(win) > 0):
                    gameLinks.append(win)
            for row in getTeams[t].find_all('tr', class_="loser"):
                losers = row.find_all("a")
                loserList.append(losers[0].text)
                los = row.find_all("a", href=re.compile('boxscores'))
                if(len(los) > 0):
                    gameLinks.append(los)
        #get the teams that won and lost that day 
            hello = gameLinks[t]
            hello = str(hello)
            stringGames = re.findall('"([^"]*)"', hello) 
            teamCodes.append(stringGames[0])
    session["winnerList"] = winnerList
    session["loserList"] = loserList
    # time = datetime.now() 
    # timeFormat = time.strftime("%d/%m/%Y, %H:%M:%S")
    # session["timeFormat"] = timeFormat
    # print(timeFormat)
    teamsChosen.append(information[2:5])
    teamsChosen.append(information[8:11])
    firstTeam = teamsChosen[0]
    secondTeam = teamsChosen[1]

    if information: # if user clicks on a team, sent fron stats.js
        print('retriving team code ')
        for code in range(len(teamCodes)):
            if(firstTeam in teamCodes[code]):
                print('first team')
                print(teamCodes[code])
                session["gameCode"] = teamCodes[code]
                link = 'https://www.basketball-reference.com' + teamCodes[code]
                boxscoreLink.append(link)
                # insertGame = Game(code=teamCodes[code])
            elif(secondTeam in teamCodes[code]):
                print('second team')
                print(teamCodes[code])
                session["gameCode"] = teamCodes[code]
                link = 'https://www.basketball-reference.com' + teamCodes[code]
                boxscoreLink.append(link)
                # insertGame = Game(code=teamCodes[code])
        # print(teamCodes[code])
        boxscoreLinkStr = ' '.join(boxscoreLink)
        print(boxscoreLinkStr)
        insertGame = Game(code=boxscoreLinkStr)
        db.session.add(insertGame)
        db.session.commit()

        print(boxscoreLinkStr)
    else: 
        print('do nothing!')

    
    if request.method == "POST":
        print('in the post request')
        print(boxscoreLink)
        hello = session["gameCode"]
        print(teamCodes[code])
        
        for games in range(len(boxscoreLink)):
            print(boxscoreLink[games])
            print('firstTeam')
            print(firstTeam)  
            print('secondTeam')
            print(secondTeam)  
            url3 = boxscoreLink[games]
            result3 = requests.get(url3)
            doc3 = BeautifulSoup(result3.text, "html.parser")
            tables = doc3.find('table', {'class':'sortable stats_table'}) #id=re.compile('{}-game-basic'.format(secondTeam)))
            tables1 = doc3.find_all('table', class_='sortable stats_table', id=re.compile('{}-game-basic'.format(firstTeam)))
            tables2 = doc3.find_all('table', class_='sortable stats_table', id=re.compile('{}-game-basic'.format(secondTeam)))

            comment = doc3.find_all(text=lambda text: isinstance(text, Comment))
            table = comment[28].strip()
            scoreArryFirst = []
            scoreArrySecond = []            
            
            for quarter in range(1, 5):
                pattern2 = re.search("data-stat=\"{}\" >(.*?)</td><td class".format(quarter), table)
                pattern3 = re.search("</td></tr>\n<tr >(.*?)</td></tr>", table)

                team1Scores = pattern2.group(1)
                team1Scores = int(team1Scores)
                
                team2Scores = pattern3.group(1)

                pattern55 = re.search("data-stat=\"{}\" >(.*?)</td><td class".format(quarter), team2Scores)
                team2Scores = pattern55.group(1)
                team2Scores = int(team2Scores)
                scoreArryFirst.append(team1Scores)
                scoreArrySecond.append(team2Scores)

            print(scoreArryFirst)
            print(scoreArrySecond)

            
            statHeaders = []
            teamsChosenStr = ' '.join(teamsChosen)
            boxscoreLinkStr = ' '.join(boxscoreLink)
            session["boxscoreLinkStr"] = boxscoreLinkStr

            getTeam = re.search("<a href=(.*?)</a>", table)
            getTeamAlone = getTeam.group(1)
            print(getTeamAlone[-3:])
            insertQuarter = QuarterTeam1(gameLink=boxscoreLinkStr, team=getTeamAlone[-3:], first=scoreArryFirst[0], second=scoreArryFirst[1], third=scoreArryFirst[2], fourth=scoreArryFirst[3])
            insertQuarter1 = QuarterTeam2(gameLink=boxscoreLinkStr, team=secondTeam, first=scoreArrySecond[0], second=scoreArrySecond[1], third=scoreArrySecond[2], fourth=scoreArrySecond[3])

            db.session.add(insertQuarter)
            db.session.add(insertQuarter1)
            db.session.commit()

        countertable2 = 0
        for an in range(len(tables2)):
            for rowe in tables2[an].find_all('tr')[2:]:
                names = rowe.find_all('th', {'data-stat':'player'})
                mp = rowe.find_all('td', {'data-stat':'mp'})
                fg = rowe.find_all('td', {'data-stat':'fg'})
                fga = rowe.find_all('td', {'data-stat':'fga'})
                fg_pct = rowe.find_all('td', {'data-stat':'fg_pct'})
                fg3 = rowe.find_all('td', {'data-stat':'fg3'})
                fg3a = rowe.find_all('td', {'data-stat':'fg3a'})
                fg3_pct = rowe.find_all('td', {'data-stat':'fg3_pct'})
                ft = rowe.find_all('td', {'data-stat':'ft'})
                fta = rowe.find_all('td', {'data-stat':'fta'})
                ft_pct = rowe.find_all('td', {'data-stat':'ft_pct'})
                orb = rowe.find_all('td', {'data-stat':'orb'})
                drb = rowe.find_all('td', {'data-stat':'drb'})
                trb = rowe.find_all('td', {'data-stat':'trb'})
                ast = rowe.find_all('td', {'data-stat':'ast'})
                stl = rowe.find_all('td', {'data-stat':'stl'})
                blk = rowe.find_all('td', {'data-stat':'blk'})
                tov = rowe.find_all('td', {'data-stat':'tov'})
                pf = rowe.find_all('td', {'data-stat':'pf'})
                pts = rowe.find_all('td', {'data-stat':'pts'})
                plus_minus = rowe.find_all('td', {'data-stat':'plus_minus'})
                
                for (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u) in zip(names, mp, fg, fga, fg_pct, fg3, fg3a, fg3_pct, ft, fta, ft_pct, orb, drb, trb, ast, stl, blk, tov, pf, pts, plus_minus): 
                    # try: 
                    countertable2 = countertable2 + 1
                    insertStats = Stats(game=teamsChosenStr, team=secondTeam, rowCount=countertable2, gameLink=boxscoreLinkStr, starters1=a.text, mp1=b.text, fg1=c.text, fga1=d.text, fg_pct1=e.text, fg31=f.text, fg3a1=g.text, fg3_pct1=h.text, ft1=i.text, fta1=j.text, ft_pct1=k.text, orb1=l.text, drb1=m.text, trb1=n.text, ast1=o.text, stl1=p.text, blk1=q.text, tov1=r.text, pf1=s.text, pts1=t.text, plus_minus1=u.text)
                    db.session.add(insertStats)
                db.session.commit()
                    # except SQLAlchemyError as e: 
                    #     error = str(e.__dict__['orig'])
                    #     print(error)

        countertable1 = 0
        for an2 in range(len(tables1)):
            for rowe2 in tables1[an2].find_all('tr')[2:]:
                names4 = rowe2.find_all('th', {'data-stat':'player'})   
                mp2 = rowe2.find_all('td', {'data-stat':'mp'})
                fg2 = rowe2.find_all('td', {'data-stat':'fg'})
                fga2 = rowe2.find_all('td', {'data-stat':'fga'})
                fg_pct2 = rowe2.find_all('td', {'data-stat':'fg_pct'})
                fg32 = rowe2.find_all('td', {'data-stat':'fg3'})
                fg3a2 = rowe2.find_all('td', {'data-stat':'fg3a'})
                fg3_pct2 = rowe2.find_all('td', {'data-stat':'fg3_pct'})
                ft2 = rowe2.find_all('td', {'data-stat':'ft'})
                fta2 = rowe2.find_all('td', {'data-stat':'fta'})
                ft_pct2 = rowe2.find_all('td', {'data-stat':'ft_pct'})
                orb2 = rowe2.find_all('td', {'data-stat':'orb'})
                drb2 = rowe2.find_all('td', {'data-stat':'drb'})
                trb2 = rowe2.find_all('td', {'data-stat':'trb'})
                ast2 = rowe2.find_all('td', {'data-stat':'ast'})
                stl2 = rowe2.find_all('td', {'data-stat':'stl'})
                blk2 = rowe2.find_all('td', {'data-stat':'blk'})
                tov2 = rowe2.find_all('td', {'data-stat':'tov'})
                pf2 = rowe2.find_all('td', {'data-stat':'pf'})
                pts2 = rowe2.find_all('td', {'data-stat':'pts'})
                plus_minus2 = rowe2.find_all('td', {'data-stat':'plus_minus'})

                
                for (a2, b2, c2, d2, e2, f2, g2, h2, i2, j2, k2, l2, m2, n2, o2, p2, q2, r2, s2, t2, u2) in zip(names4, mp2, fg2, fga2, fg_pct2, fg32, fg3a2, fg3_pct2, ft2, fta2, ft_pct2, orb2, drb2, trb2, ast2, stl2, blk2, tov2, pf2, pts2, plus_minus2): 
                    try: 
                        countertable1 = countertable1 + 1
                        insertStats2 = Stats2(game3=teamsChosenStr, team3=firstTeam, rowCount=countertable1, gameLink3=boxscoreLinkStr, starters3=a2.text, mp3=b2.text, fg3=c2.text, fga3=d2.text, fg_pct3=e2.text, fg33=f2.text, fg3a3=g2.text, fg3_pct3=h2.text, ft3=i2.text, fta3=j2.text, ft_pct3=k2.text, orb3=l2.text, drb3=m2.text, trb3=n2.text, ast3=o2.text, stl3=p2.text, blk3=q2.text, tov3=r2.text, pf3=s2.text, pts3=t2.text, plus_minus3=u2.text)
                        db.session.add(insertStats2)
                        db.session.commit()
                    except SQLAlchemyError as e: 
                        error = str(e.__dict__['orig'])
                        print(error)

        return render_template('stats.html')

    if request.method == "GET": 
        print('GET request')
        print(information)
        print(season)

        conferenceStats = ConferenceTitles.query.order_by(ConferenceTitles.id.desc()).first()
        conferenceOld = oldConference.query.filter_by(seasonStats=season).limit(counterOld).all()
        conferenceEast = EasternConference.query.filter_by(seasonStats=season).limit(counterEast).all()
        conferenceWest = WesternConference.query.filter_by(seasonStats=season).limit(counterWest).all()

        return render_template('stats.html', date=date, winnerList=winnerList, loserList=loserList, conferenceStats=conferenceStats, conferenceOld=conferenceOld, conferenceEast=conferenceEast, conferenceWest=conferenceWest)

@app.route('/stats/data', methods=['GET', 'POST'])
def get_data():
    time.sleep(2)
    date = session["date"]
    winnerList = session["winnerList"]
    loserList = session["loserList"]
    print('-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=')

    gameArry = []
    games = Game.query.all()
    for g in games: 
        gameArry.append(g.code)
    lastGame = gameArry[-1]

    lastRow = Stats.query.order_by(Stats.id).all()

    gameCountArry = []
    for last in lastRow:
        gameCountArry.append(last.rowCount)
    lastCount = gameCountArry[-1]
    print(lastCount)

    lastRowOther = Stats2.query.order_by(Stats2.id3).all()
    gameCountArryOther = []
    for l in lastRowOther:
        gameCountArryOther.append(l.rowCount)
    lastCountOther = gameCountArryOther[-1]

    stats = Stats.query.filter_by(gameLink=lastGame).limit(lastCount).all()
    stats2 = Stats2.query.filter_by(gameLink3=lastGame).limit(lastCountOther).all()
    score = QuarterTeam1.query.filter_by(gameLink=lastGame).all()
    score2 = QuarterTeam2.query.filter_by(gameLink=lastGame).all()


    return render_template("get_data.html", lastGame=lastGame, stats = stats, stats2=stats2, score=score, score2=score2, date=date, winnerList=winnerList, loserList=loserList)


if __name__ == "__main__":
    app.jinja_env.auto_reload = True
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.run()
