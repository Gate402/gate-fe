export const getNodeSnippet = (
  secretToken: string
) => `const express = require('express');
const app = express();

// Middleware to verify Gate402 secret
const gate402Middleware = (req, res, next) => {
  const secret = req.headers['x-gate402-secret'];
  if (secret !== "${secretToken}") {
    return res.status(401).json({ error: 'Unauthorized: Invalid Gate402 Secret' });
  }
  next();
};

app.use("/weather", gate402Middleware, (req, res) => {
  res.json({ weather: "sunny" });
});

app.listen(3000);`;

export const getGoSnippet = (secretToken: string) => `package main

import (
	"net/http"
	"encoding/json"
)

func gate402Middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Header.Get("X-Gate402-Secret") != "${secretToken}" {
			http.Error(w, "Unauthorized: Invalid Gate402 Secret", http.StatusUnauthorized)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func main() {
	http.Handle("/weather", gate402Middleware(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		json.NewEncoder(w).Encode(map[string]string{"weather": "sunny"})
	})))
	http.ListenAndServe(":3000", nil)
}`;

export const getRustSnippet = (secretToken: string) => `use axum::{
    http::{Request, StatusCode},
    middleware::{self, Next},
    response::Response,
    routing::get,
    Router,
};
use std::net::SocketAddr;

async fn auth_middleware<B>(req: Request<B>, next: Next<B>) -> Result<Response, StatusCode> {
    let secret_header = req.headers().get("x-gate402-secret")
        .and_then(|h| h.to_str().ok());

    match secret_header {
        Some("${secretToken}") => Ok(next.run(req).await),
        _ => Err(StatusCode::UNAUTHORIZED),
    }
}

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/weather", get(|| async { "sunny" }))
        .layer(middleware::from_fn(auth_middleware));

    axum::Server::bind(&"0.0.0.0:3000".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}`;

export const getPythonSnippet = (
  secretToken: string
) => `from fastapi import FastAPI, Request, HTTPException

app = FastAPI()

@app.middleware("http")
async def check_secret(request: Request, call_next):
    if request.url.path == "/weather":
        secret = request.headers.get("x-gate402-secret")
        if secret != "${secretToken}":
             return JSONResponse(status_code=401, content={"error": "Unauthorized"})
    
    response = await call_next(request)
    return response

@app.get("/weather")
async def get_weather():
    return {"weather": "sunny"}`;

export const getClientSnippet = (
  gatewayUrl: string
) => `import { x402Client, wrapAxiosWithPayment } from "@x402/axios";
import { registerExactEvmScheme } from "@x402/evm/exact/client";
import { privateKeyToAccount } from "viem/accounts";
import axios from "axios";

// 1. Initialize the Gate402 Client
const client = new x402Client();

// 2. Register your payment capability (e.g. EVM wallet)
registerExactEvmScheme(client, { 
  signer: privateKeyToAccount(process.env.EVM_PRIVATE_KEY) 
});

// 3. Wrap your HTTP client (Axios) to automatically handle payments
const api = wrapAxiosWithPayment(axios.create(), client);

// 4. Make requests as normal - payments are handled in the background!
const run = async () => {
  try {
    // Point this to your new Gateway URL
    const response = await api.get("${gatewayUrl}/weather");
    console.log(response.data);
  } catch (error) {
    console.error("Payment or Request failed:", error);
  }
};

run();`;
