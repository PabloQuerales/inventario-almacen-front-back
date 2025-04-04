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
        data = db.session.scalars(db.select(Store).order_by(Store.id)).all()
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

@api.route('/edit-item/<int:store_id>', methods=['PUT'])
def edit_item(store_id):
    try:
        body = request.json
        store = db.session.execute(db.select(Store).filter_by(id=store_id)).scalar_one()
        if "quantity" in body:
            store.quantity = body["quantity"]
        db.session.commit()
        return jsonify({"msg": "store updated"}), 200
    except:
        return jsonify({"msg": "internal server error"}), 500
    
@api.route('/delete-item/<int:store_id>', methods=['DELETE'])
def delete_item(store_id):
    try:
        store = db.session.execute(db.select(Store).filter_by(id=store_id)).scalar_one()
        db.session.delete(store)
        db.session.commit()
        return jsonify({"msg": "item delete"}), 200
    except:
        return jsonify({"msg": "internal server error"}), 500