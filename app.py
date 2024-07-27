from flask import Flask, jsonify, request, send_from_directory
import pandas as pd
import logging
from flask_cors import CORS
from flask_swagger_ui import get_swaggerui_blueprint

app = Flask(__name__)
CORS(app)

# Setup logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

# Read CSV files into pandas DataFrames
companies_df = pd.read_csv('companies.csv')
locations_df = pd.read_csv('locations.csv')

@app.route('/')
def home():
    return "Welcome to the Flask API!"

@app.route('/api/data', methods=['POST'])
def post_data():
    new_data = request.json
    return jsonify(new_data), 201

@app.route('/api/data', methods=['GET'])
def get_data():
    df = pd.read_csv('companies.csv')
    data = df.to_dict(orient='records')
    return jsonify(data)

@app.route('/api/companies', methods=['GET'])
def get_all_companies():
    try:
        data = companies_df.to_dict(orient='records')
        return jsonify(data)
    except Exception as e:
        app.logger.error(f"Error getting all companies: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500

@app.route('/api/companies/<int:company_id>', methods=['GET'])
def get_company_by_id(company_id):
    try:
        company = companies_df[companies_df['company_id'] == company_id]

        if company.empty:
            return jsonify({'error': 'Company not found'}), 404
        data = company.to_dict(orient='records')[0]
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': 'Internal Server Error'}), 500

@app.route('/api/companies/<int:company_id>/locations', methods=['GET'])
def get_locations_by_company_id(company_id):
    try:
        locations = locations_df[locations_df['company_id'] == company_id]
        if locations.empty:
            return jsonify({'error': 'No locations found for this company'}), 404
        data = locations.to_dict(orient='records')
        return jsonify(data)
    except Exception as e:
        app.logger.error(f"Error getting locations for company ID {company_id}: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500

@app.route('/swagger.json')
def swagger_json():
    return send_from_directory('.', 'swagger.json')

# Swagger UI setup
SWAGGER_URL = '/apidocs'
API_URL = '/swagger.json'
swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={  # Swagger UI config overrides
        'app_name': "Flask API"
    }
)

app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

if __name__ == '__main__':
    logging.basicConfig(level=logging.DEBUG)
    app.run(debug=True)
