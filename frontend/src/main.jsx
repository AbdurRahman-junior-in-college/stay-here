import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "./ui/ErrorFallBack.jsx";

createRoot(document.getElementById("root")).render(
  <ErrorBoundary
    FallbackComponent={ErrorFallBack}
    onReset={() => window.location.replace("/")}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ErrorBoundary>
);
