from flask import Flask, request, jsonify
from flask_cors import CORS
from deepface import DeepFace
import os
import logging

app = Flask(__name__)
CORS(app)
logging.basicConfig(level=logging.DEBUG)

@app.route('/')
def home():
    return 'Welcome to Personal Progress Flow API'

    image = request.files['image']
    image_path = "temp.jpg"
    image.save(image_path)

    try:
        analysis = DeepFace.analyze(img_path=image_path, actions=['emotion'])
        os.remove(image_path)
        mood = analysis[0]['dominant_emotion']
        return jsonify({'mood': mood})
    except Exception as e:
        logging.error(f"DeepFace analysis failed: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Use 5000 locally, Render will override with its own PORT
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
