from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import joblib
import os

# Load model
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'emotion_model.pkl')
model = joblib.load(MODEL_PATH)

# Define emotion labels (mock mapping)
EMOTIONS = ['angry', 'disgust', 'fear', 'happy', 'sad', 'surprise', 'neutral']

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return 'Welcome to Personal Progress Flow API (Lightweight Model)'

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    # Decode uploaded image
    image_file = request.files['image']
    file_bytes = np.asarray(bytearray(image_file.read()), dtype=np.uint8)
    image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

    # Load Haar Cascade for face detection
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)

    if len(faces) == 0:
        return jsonify({'mood': None, 'error': 'No face detected'}), 200

    # Assume first detected face
    x, y, w, h = faces[0]
    face = gray[y:y+h, x:x+w]
    face_resized = cv2.resize(face, (6, 8))  # 6x8 = 48 features
    face_flatten = face_resized.flatten().reshape(1, -1)

    prediction = model.predict(face_flatten)[0]
    mood = EMOTIONS[prediction]

    return jsonify({'mood': mood})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
