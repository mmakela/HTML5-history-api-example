from flask import Flask, jsonify, render_template, request


app = Flask(__name__)

@app.route('/')
@app.route('/fortune-faded')
@app.route('/liar')
@app.route('/universal')
def hello():
    page = request.path.strip('/') or 'index'
    column_template = 'column-{0}.html'.format(page)
    content_template = 'content-{0}.html'.format(page)
    if request.is_xhr:
        return jsonify({
            'left': render_template(column_template),
            'right': render_template(content_template),
        })
    return render_template(
        'index.html',
        column_template=column_template,
        content_template=content_template)


if __name__ == '__main__':
    app.run(debug=True)
