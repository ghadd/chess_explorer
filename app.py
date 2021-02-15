from src.board_parser import get_pieces_map
from flask import Flask, render_template
app = Flask(__name__)


@app.route('/')
def hello():
    url = 'https://www.chess.com/puzzles/problem/41839'
    rendered_html = render_template(
        'index.html', pieces_map=get_pieces_map(url))
    with open('tmp/index.html', 'w') as f:
        f.write(rendered_html)

    return rendered_html


if __name__ == '__main__':
    app.run(debug=True)
