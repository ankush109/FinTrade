import streamlit as st
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import yfinance as yf
from sklearn.preprocessing import MinMaxScaler
from keras.models import load_model
from datetime import timedelta

# Page configuration
st.set_page_config(page_title="Stock Price Prediction", layout="wide")


# Load the pre-trained model
@st.cache_resource
def load_pretrained_model():
    return load_model(
        r"/Users/ankushbanerjee/Documents/personal/FinTrade/stock_predict\Stock Predictions Model.keras"
    )


model = load_pretrained_model()

# Sidebar inputs
st.sidebar.header("User Inputs")
stock = st.sidebar.text_input("Enter Stock Ticker (e.g., TCS.NS):", "TCS.NS")
start_date = st.sidebar.date_input("Start Date:", pd.to_datetime("2012-01-01"))
end_date = st.sidebar.date_input("End Date:", pd.to_datetime("2024-12-31"))
years_to_predict = st.sidebar.slider("Years into the Future", 1, 10, 3)

# Data download
st.write("### Stock Data")
data = yf.download(stock, start=start_date, end=end_date)

if not data.empty:
    st.write(data)

    # Data processing
    data = data.sort_index()
    data.reset_index(inplace=True)
    data.dropna(inplace=True)

    # Train-test split
    data_train = pd.DataFrame(data["Close"][: int(len(data) * 0.80)])
    data_test = pd.DataFrame(data["Close"][int(len(data) * 0.80) :])

    # Scaling the data
    scaler = MinMaxScaler(feature_range=(0, 1))
    past_100_days = data_train.tail(100)
    data_test_full = pd.concat([past_100_days, data_test], ignore_index=True)
    data_test_scaled = scaler.fit_transform(data_test_full)

    # Prepare testing data
    x_test, y_test = [], []
    for i in range(100, len(data_test_scaled)):
        x_test.append(data_test_scaled[i - 100 : i])
        y_test.append(data_test_scaled[i, 0])
    x_test, y_test = np.array(x_test), np.array(y_test)

    # Predictions
    st.write("### Predictions vs Actual Prices")
    y_pred = model.predict(x_test)

    # Rescale predictions
    scale_factor = 1 / scaler.scale_[0]
    y_pred = y_pred * scale_factor
    y_test = y_test * scale_factor

    # Proper X-axis using dates
    date_range = data["Date"].iloc[-len(y_test) :]

    # Plot Predictions
    fig, ax = plt.subplots(figsize=(12, 6))
    ax.plot(date_range, y_test, label="Actual Price", color="green")
    ax.plot(date_range, y_pred.flatten(), label="Predicted Price", color="red")
    ax.set_xlabel("Date")
    ax.set_ylabel("Stock Price (INR)")
    ax.set_title(f"{stock} - Actual vs Predicted")
    ax.legend()
    ax.grid(True)
    plt.xticks(rotation=45)
    st.pyplot(fig)

    # Future prediction
    if st.button("Predict Future Price"):
        # Predict N future trading days
        future_days = years_to_predict * 252
        last_100_days = data_test_full[-100:]
        x_future = scaler.transform(last_100_days)
        predictions = []

        for _ in range(future_days):
            x_input = np.array([x_future[-100:]])
            next_pred = model.predict(x_input, verbose=0)[0][0]
            predictions.append(next_pred)
            x_future = np.append(x_future, [[next_pred]], axis=0)

        predictions = scaler.inverse_transform(np.array(predictions).reshape(-1, 1))
        future_date = data["Date"].iloc[-1] + timedelta(days=years_to_predict * 365)
        st.write(
            f"### 📅 Predicted Price on approx {future_date.date()}: ₹{predictions[-1][0]:.2f}"
        )
else:
    st.error("❌ No data available for the given stock ticker and date range.")
