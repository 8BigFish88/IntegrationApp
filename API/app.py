from flask import Flask, jsonify, request, abort
import requests
import json
from flask_restplus import Api, Resource, reqparse, fields
from flask_sqlalchemy import SQLAlchemy
from marshmallow_sqlalchemy import ModelSchema
from flask_cors import CORS, cross_origin

app = Flask(__name__)

cors = CORS(app)

api = Api(app, version='1.0', title='Sample Users_Insert API',
    description='API for insert users in a DB')

users = api.namespace('api/v1.0/users',description='CRUD operation for users')

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db' 

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=True)
    avatar = db.Column(db.String, nullable=True, default='https://shmector.com/_ph/4/184260380.png')
    description = db.Column(db.String, nullable=True)

class UserSchema(ModelSchema):
    class Meta:
        model = User
        sqla_session = db.session

userModel = users.model('userModel', {
    'name' : fields.String(),
    'email' : fields.String(),
    'description': fields.String(),
    'avatar' : fields.String()
})

user_schema = UserSchema()
users_schema = UserSchema(many=True)

db.create_all()

parserId = reqparse.RequestParser()
parserId.add_argument('user_id',type=int)

@users.route('/<int:user_id>')
class GET_User(Resource):
    def get(self,user_id):
        user = User.query.get_or_404(user_id)
        if not user:
            abort(404)
        return jsonify(user_schema.dump(user))
    
    @users.expect(userModel)
    def put(self,user_id):
        user = User.query.get_or_404(user_id)
        if not user:
            abort(404)
        print(request.get_json())
        if request.is_json:
            user.name = request.get_json()['name'] if request.get_json()['name'] else user.name
            user.description = request.get_json()['description'] if request.get_json()['description'] else user.description
            user.avatar =  request.get_json()['avatar'] if request.get_json()['avatar'] else user.avatar
            user.email =  request.get_json()['email'] if request.get_json()['email'] else user.email
        else:
            user.name = request.args.get('name') if request.args.get('name') else user.name
            user.description = request.args.get('description') if request.args.get('description') else user.description
            user.avatar =  request.args.get('avatar') if request.args.get('avatar') else user.avatar
            user.email =  request.args.get('email') if request.args.get('email') else user.email
        db.session.commit()
        return jsonify(user_schema.dump(user))

    def delete(self,user_id):
        user = User.query.get_or_404(user_id)
        if not user:
            abort(404)
        db.session.delete(user)
        db.session.commit()
        return jsonify({'result': True})


@users.route('/')
class POST_User(Resource):
    @users.expect(userModel)
    def post(self):
        if request.is_json:
            user_name = request.get_json()['name'] 
            user_description = request.get_json()['description']
            user_avatar =  request.get_json()['avatar'] 
            user_email =  request.get_json()['email']
            new_user = User(
            name=user_name,
            email=user_email,
            avatar=user_avatar,
            description=user_description)
        else:
            new_user = User(
            name=request.args.get('name'),
            email=request.args.get('email'),
            avatar=request.args.get('avatar'),
            description=request.args.get('description'))
        db.session.add(new_user)
        db.session.commit()
        return jsonify(user_schema.dump(new_user))

    @users.expect(parserId)
    def get(self):
        if request.args.get('user_id'):
            user_id=request.args.get('user_id')
            user = User.query.get_or_404(user_id)
            if not user:
                abort(404)
            return jsonify(user_schema.dump(user))
        else:
            users = User.query.order_by(User.name).all()
            return jsonify(users_schema.dump(users))
    
    


if __name__ == '__main__':
    app.run(debug=True)