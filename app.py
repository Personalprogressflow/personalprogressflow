from flask import Flask, request, jsonify
from flask_cors import CORS
from deepface import DeepFace
import os

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    image = request.files['image']
    image_path = "temp.jpg"
    image.save(image_path)

    try:
        analysis = DeepFace.analyze(img_path=image_path, actions=['emotion'])
        os.remove(image_path)
        mood = analysis[0]['dominant_emotion']
        return jsonify({'mood': mood})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run()
