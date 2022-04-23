import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "../views/login/Login";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
