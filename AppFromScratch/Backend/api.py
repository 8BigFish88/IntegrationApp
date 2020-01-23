from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from marshmallow_sqlalchemy import ModelSchema
from flask_restplus import Api, Resource, reqparse

app = Flask(__name__)

api = Api(app, version='1.0', title='Sample Users_Insert API',
    description='API for insert users in a DB')

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db' 
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=True)
    avatar = db.Column(db.String, nullable=True, 
        default='https://shmector.com/_ph/4/184260380.png')
    description = db.Column(db.String, nullable=True)

class UserSchema(ModelSchema):
    class Meta:
        model = User
        sqla_session = db.session

user_schema = UserSchema()
users_schema = UserSchema(many=True)

db.create_all()

parserPost = reqparse.RequestParser()
parserPost.add_argument('name',type=str, required=True,
help="This field cannot be blank!")
parserPost.add_argument('email',type=str, required=False)
parserPost.add_argument('avatar',type=str, required=False)
parserPost.add_argument('description',type=str, required=False)

@api.route('/api/v1.0/users')
class GET_Users(Resource):
    def get(self):
        users = User.query.order_by(User.name).all()
        return jsonify(users_schema.dump(users))

@api.route('/api/v1.0/user')
class GET_POST_User(Resource):
    @api.expect(parserPost)
    def post(self):
        new_user = User(
        name=request.args.get('name'),
        email=request.args.get('email'),
        avatar=request.args.get('avatar'),
        description=request.args.get('description'))
        db.session.add(new_user)
        db.session.commit()
        return jsonify(user_schema.dump(new_user))

if __name__ == '__main__':
    app.run(debug=True)