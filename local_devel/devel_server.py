import flask

app = flask.Flask('app_main', static_url_path='')

FILE_JSON = 'files.json'
SCAN_JSON = 'scan.json'


@app.route('/api/1/files')
def test_files():
    return open(FILE_JSON).read()


@app.route('/api/1/files/scans')
def test_scans():
    return open(SCAN_JSON).read()


@app.route('/api/1/user/loggedin')
def test_logged_in():
    return flask.jsonify({'loggedin': 1})


@app.route('/')
def test_index():
    return app.send_static_file('index.html')


if __name__ == '__main__':
    app.run('0.0.0.0', 8080, debug=True)
