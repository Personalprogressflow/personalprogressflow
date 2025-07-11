from flask import Flask, request, jsonify
from flask_cors import CORS
from fer import FER
import cv2
import numpy as np
import os

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return 'Welcome to Personal Progress Flow API'

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    image_file = request.files['image']
    image_bytes = np.asarray(bytearray(image_file.read()), dtype=np.uint8)
    image = cv2.imdecode(image_bytes, cv2.IMREAD_COLOR)

    detector = FER(mtcnn=False)
    emotions = detector.detect_emotions(image)

    if not emotions:
        return jsonify({'mood': None, 'error': 'No face detected'}), 200

    mood = max(emotions[0]["emotions"], key=emotions[0]["emotions"].get)
    return jsonify({'mood': mood})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
