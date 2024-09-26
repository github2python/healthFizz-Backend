from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
from sklearn.impute import SimpleImputer

app = Flask(__name__)
CORS(app)  # This will allow all origins

# Load the trained model
model_heart = joblib.load('heart_model.pkl')
model_diabetes = joblib.load('diabetes_model.pkl')
model_liver = joblib.load('liver_model.pkl')
model_stroke = joblib.load('stroke_model.pkl')


# Define the feature names (make sure these match the ones used during training)
feature_heart = [
    'male',
    'age',
    'education',
    'currentSmoker',
    'cigsPerDay',
    'BPMeds',
    'prevalentStroke',
    'prevalentHyp',
    'diabetes',
    'totChol',
    'sysBP',
    'diaBP',
    'BMI',
    'heartRate',
    'glucose'       
]
feature_diabetes = [
    'HighBP',
    'HighChol',
    'CholCheck',
    'BMI',
    'Smoker',
    'Stroke',
    'HeartDiseaseorAttack',
    'PhysActivity',
    'Fruits',
    'Veggies',
    'HvyAlcoholConsump',
    'AnyHealthcare',
    'NoDocbcCost',
    'GenHlth',
    'MentHlth',
    'PhysHlth',
    'DiffWalk',
    'Sex',
    'Age',
    'Education',
    'Income'
]
feature_liver = [
    'age',
    'gender' ,
    'tb' ,
    'db' ,
    'alkphos' ,
    'sgpt' ,
    'sgot' ,
    'tp' ,
    'alb' ,
    'agRatio'    
]
feature_stroke = [
    'gender',
    'age',
    'hypertension',
    'heart_disease',
    'ever_married',
    'Residence_type',
    'avg_glucose_level',
    'bmi',
    'work_type_Govt_job',
    'work_type_Never_worked',
    'work_type_Private',
    'work_type_Self_employed',
    'work_type_children',
    'smoking_status_formerly_smoked',
    'smoking_status_never_smoked',
    'smoking_status_smokes'    
]

@app.route('/predict/heart', methods=['POST'])
def predict_heart():
    try:
        data = request.json

         # Check if 'features' is present in the request data
        if 'features' not in data:
            app.logger.error('No features provided in request')
            return jsonify({'error': 'No features provided'}), 400
        # print(data['features'])
        # Convert the features to a DataFrame with column names
        features_df = pd.DataFrame([data['features']], columns=feature_heart)

        imputer = SimpleImputer(strategy='mean')  # You can choose 'mean', 'median', or 'most_frequent'
        features_df = imputer.fit_transform(features_df)
        # Make prediction
        prediction = model_heart.predict(features_df)
        return jsonify({'prediction': int(prediction[0])})
    except Exception as e:
        return jsonify({'error': str(e)}), 400



@app.route('/predict/diabetes', methods=['POST'])
def predict_diabetes():
    try:
        data = request.json

         # Check if 'features' is present in the request data
        if 'features' not in data:
            app.logger.error('No features provided in request')
            return jsonify({'error': 'No features provided'}), 400
        # print(data['features'])
        # Convert the features to a DataFrame with column names
        features_df = pd.DataFrame([data['features']], columns=feature_diabetes)

        imputer = SimpleImputer(strategy='mean')  # You can choose 'mean', 'median', or 'most_frequent'
        features_df = imputer.fit_transform(features_df)
        # Make prediction
        prediction = model_diabetes.predict(features_df)
        return jsonify({'prediction': int(prediction[0])})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/predict/liver', methods=['POST']) 
def predict_liver():
    try:
        data = request.json

         # Check if 'features' is present in the request data
        if 'features' not in data:
            app.logger.error('No features provided in request')
            return jsonify({'error': 'No features provided'}), 400
        # print(data['features'])
        # Convert the features to a DataFrame with column names
        features_df = pd.DataFrame([data['features']], columns=feature_liver)

        imputer = SimpleImputer(strategy='mean')  # You can choose 'mean', 'median', or 'most_frequent'
        features_df = imputer.fit_transform(features_df)
        # Make prediction
        prediction = model_liver.predict(features_df)
        return jsonify({'prediction': int(prediction[0])})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/predict/stroke', methods=['POST'])
def predict_stroke():
    try:
        data = request.json

        print(data)
         # Check if 'features' is present in the request data
        if 'features' not in data:
            app.logger.error('No features provided in request')
            return jsonify({'error': 'No features provided'}), 400
        
        # Convert the features to a DataFrame with column names
        features_df = pd.DataFrame([data['features']], columns=feature_stroke)

        # imputer = SimpleImputer(strategy='mean')  # You can choose 'mean', 'median', or 'most_frequent'
        # features_df = imputer.fit_transform(features_df)
        # Make prediction
        prediction = model_stroke.predict(features_df)
        return jsonify({'prediction': int(prediction[0])})
    except Exception as e:
        return jsonify({'error': str(e)}), 400    
    

if __name__ == '__main__':
    app.run(debug=True)
