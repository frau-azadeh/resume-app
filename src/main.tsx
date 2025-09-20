import React from "react";
import ReactDOM from "react-dom";

import { ErrorBoundary } from "react-error-boundary";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// ⬅️ اصلاح این خط
import App from "./App";
import ErrorPage from "./pages/error/page";
import { persistor, store } from "./store/store";

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root"),
);
