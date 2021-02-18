from hashlib import sha256
from sys import argv
from flask import Flask, render_template, request, redirect, flash
from flask.helpers import url_for
from src.database import *
from src.board_parser import get_pieces_map
from sqlalchemy.exc import IntegrityError

from os import getenv
from dotenv import load_dotenv
load_dotenv()


app = Flask(__name__, )
app.config['SQLALCHEMY_DATABASE_URI'] = getenv('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SECRET_KEY'] = "very_secret_key"

db.init_app(app)
with app.app_context():
    db.create_all()


@app.route('/')
def index():
    if len(argv) > 1:
        url = argv[1]
    else:
        url = str(input("Enter puzzle link: "))

    pid = int(url[url.rindex('/')+1:])
    res = Puzzle.query.filter_by(pid=pid).first()
    if res:
        pieces_map = res.puzzle
        pieces_map = {int(k): v for k, v in pieces_map.items()}
    else:
        pieces_map = get_pieces_map(url)

    rendered_html = render_template(
        'index.html', pieces_map=pieces_map)
    puzzle = Puzzle(pid=pid,
                    link=url, puzzle=pieces_map)
    try:
        db.session.add(puzzle)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()

    with open('tmp/index.html', 'w') as f:
        f.write(rendered_html)

    return rendered_html


@app.route('/login', methods=["GET", "POST"])
def login():
    user = User(login=request.form['login'], password=sha256(
        request.form['password'].encode()).hexdigest())

    # xD
    try:
        db.session.add(user)
        db.session.commit()
        flash("Added!")
    except IntegrityError:
        flash("Already added.")
        db.session.rollback()

    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(debug=True)
