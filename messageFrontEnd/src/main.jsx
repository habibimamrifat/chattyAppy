import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ChatForm from "../components/chatForm";
import Container from "../container/Container";
import ContextProvider from "../context/ContextProvider";
import AppRouter from "../routes/AppRouter";
import { Providers } from "../context/HeroUiProvider";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <Providers>
        <Container>
          <AppRouter />
        </Container>
      </Providers>
    </ContextProvider>
  </StrictMode>
);