from flask import Flask
from models import db
import os

from views import main_service, mypage_view, recommend_view
from flask_cors import CORS
from flask_migrate import Migrate
from dotenv import load_dotenv


load_dotenv()

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:root@127.0.0.1:3306/data_project"
app.secret_key = os.environ.get('SESSION_KEY')
print(f"mysql://{os.environ.get('DB_USER')}:{os.environ.get('DB_PASSWORD')}@127.0.0.1:3306/{os.environ.get('DB_DATABASE')}")

app.register_blueprint(main_service.bp)
app.register_blueprint(mypage_view.bp)
app.register_blueprint(recommend_view.bp)
CORS(app)

db.init_app(app)
Migrate().init_app(app, db)


@app.route('/')
def hello():
    return 'welcome flask'

@app.route('/main')
def main():
    return 'main page'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
