// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// ***********************************************
// Global exception handling for all tests
// ***********************************************

// Xử lý lỗi JavaScript từ trang web thegioididong.com
Cypress.on("uncaught:exception", (err, runnable) => {
  // Bỏ qua lỗi "Script error" từ cross-origin scripts
  if (err.message.includes("Script error")) {
    console.log("Ignored script error from cross-origin:", err.message);
    return false;
  }

  // Bỏ qua các lỗi từ CDN của thegioididong
  if (err.message.includes("cdn.tgdd.vn") || err.message.includes("tgdd.vn")) {
    console.log("Ignored error from TGDD CDN:", err.message);
    return false;
  }

  // Bỏ qua các lỗi network thường gặp
  if (
    err.message.includes("Network Error") ||
    err.message.includes("TypeError: Load failed")
  ) {
    console.log("Ignored network error:", err.message);
    return false;
  }

  // Cho phép các lỗi khác tiếp tục fail test
  return true;
});

// ***********************************************
// Import commands.js and other support files
// ***********************************************
import "./commands";
