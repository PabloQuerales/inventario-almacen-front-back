"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Store
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/get-items', methods=['GET'])
def get_items():
    try:
        data = db.session.scalars(db.select(Store)).all()
        result = list(map(lambda item: item.serialize(),data))
        if not result:
            return jsonify({"msg":"Empty store"}), 404
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"msg": "Error", "error": str(e)}), 500
    
@api.route('/add-item', methods=['POST'])
def add_item():
    try:
        request_body = request.json
        exist = db.session.query(db.select(Store).filter_by(name=request_body["name"]).exists()).scalar()
        if not exist: 
            new_item = Store(name=request_body["name"], quantity=request_body["quantity"], type=request_body["type"])
            db.session.add(new_item)
            db.session.commit()  
            return jsonify(request_body), 200
        else:
            return jsonify({"msg": "Item it's repeated"}), 404
    except Exception as e:
        return jsonify({"msg": "Error", "error": str(e)}), 500