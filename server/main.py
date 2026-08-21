import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    client = genai.Client()
else:
    client = genai.Client(api_key=api_key)

@app.route('/api/consultant', methods=['POST'])
def consultant():
    try:
        data = request.json
        if not data or "query" not in data:
            return jsonify({"error": "Query missing"}), 400
            
        user_query = data.get("query", "").strip()
        if not user_query:
            return jsonify({"error": "Query empty"}), 400

        # बिल्कुल सिंपल और आज़ाद इंस्ट्रक्शन - कोई पुराना परफ्यूम वाला पहरा नहीं!
        system_instruction = "You are a helpful, smart AI assistant. Answer the user's question directly, accurately, and naturally in Hindi or English based on how they ask."

        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=user_query,
            config={'system_instruction': system_instruction}
        )
        
        if response and response.text:
            return jsonify({"reply": response.text})
        else:
            return jsonify({"reply": "I'm here to help! Please ask your question again."})
            
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)