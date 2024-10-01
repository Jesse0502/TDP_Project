import logging
from tensorflow import keras
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.layers import TextVectorization

# Re-create the TextVectorization layer manually (adjust the parameters based on your setup)
text_vectorization = TextVectorization(max_tokens=15000, output_mode='int', output_sequence_length=300)

# Load the model without custom_objects for TextVectorization
model = load_model('bias_detection.keras')

# Preprocess the input text before prediction
def preprocess_and_predict(text):
    input_text = np.array([text])
    preprocessed_text = text_vectorization(input_text)

    # Make predictions with the loaded model
    predictions = model.predict(preprocessed_text)

    # Extract predictions for bias, opinion, and type
    bias_pred = np.argmax(predictions[0], axis=-1)
    opinion_pred = np.argmax(predictions[1], axis=-1)
    type_pred = np.argmax(predictions[2], axis=-1)

    return bias_pred[0], opinion_pred[0], type_pred[0]

