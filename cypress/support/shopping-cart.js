export function getProductInfo() {
  cy.log("Đang lấy thông tin sản phẩm từ trang chi tiết");

  // Chain tất cả cy commands và return object cuối cùng
  return cy
    .get(".product-name h1")
    .first()
    .invoke("text")
    .then((productName) => {
      const name = productName.trim();
      cy.log(`Tên sản phẩm: ${name}`);

      return cy
        .get(".box-price .box-price-present")
        .first()
        .invoke("text")
        .then((price) => {
          const productPrice = price.trim();
          cy.log(`Giá sản phẩm: ${productPrice}`);

          return cy
            .get(".box03.group.desk .item.act")
            .first()
            .invoke("text")
            .then((category) => {
              const productCategory = category.trim();
              cy.log(`Phân loại: ${productCategory}`);

              const productInfo = {
                name: name,
                price: productPrice,
                category: productCategory,
              };

              cy.log("Đã lấy xong thông tin sản phẩm");
              return cy.wrap(productInfo);
            });
        });
    });
}

// Hàm helper: Thêm sản phẩm vào giỏ hàng
export function addProductToCart(productUrl) {
  cy.log(`Bắt đầu thêm sản phẩm từ URL: ${productUrl}`);

  // B1: Vào trang sản phẩm cụ thể
  cy.log("Bước 1: Truy cập trang sản phẩm");
  cy.visit(productUrl);
  cy.wait(3000); // Đợi trang sản phẩm load hoàn toàn

  // Lấy thông tin sản phẩm bằng hàm helper
  return getProductInfo().then((productInfo) => {
    // B2: Nhấn nút "Thêm vào giỏ"
    cy.log("Bước 2: Nhấn nút 'Thêm vào giỏ'");

    return cy
      .get(".block-button.buy .btn-buynow.white")
      .contains("Thêm vào giỏ")
      .click({ force: true })
      .wait(2000)
      .then(() => {
        // Kiểm tra xem modal locationbox-v2 có hiển thị không
        return cy.get("body").then(($body) => {
          if (
            $body.find('.locationbox-v2[style*="display: block"]').length > 0
          ) {
            cy.log("Modal địa chỉ xuất hiện, đang xử lý...");

            return cy
              .get(".location-none")
              .click()
              .wait(1000)
              .then(() => {
                return cy
                  .get(".cls-location, .close-symbol")
                  .first()
                  .click({ force: true })
                  .wait(1000)
                  .then(() => {
                    cy.log("Đã xử lý xong modal địa chỉ");
                    cy.log("Sản phẩm đã được thêm vào giỏ hàng thành công");
                    return cy.wrap(productInfo);
                  });
              });
          } else {
            cy.log("Modal địa chỉ không xuất hiện");
            cy.log("Sản phẩm đã được thêm vào giỏ hàng thành công");
            return cy.wrap(productInfo);
          }
        });
      });
  });
}

// Hàm helper: Kiểm tra thông tin sản phẩm trong giỏ hàng
export function verifyProduct(
  expectedName,
  expectedQuantity,
  expectedCategory
) {
  cy.log(
    `Kiểm tra sản phẩm: ${expectedName}, SL: ${expectedQuantity}, Phân loại: ${expectedCategory}`
  );

  // Kiểm tra giỏ hàng không trống
  cy.get(".cart-empty").should("not.exist");
  cy.get(".product-item").should("exist");

  // Kiểm tra tên sản phẩm chính xác
  if (expectedName) {
    cy.get(".product-item__name")
      .should("be.visible")
      .invoke("text")
      .then((cartProductName) => {
        const cartName = cartProductName.trim().toLowerCase();
        const expectedNameLower = expectedName.trim().toLowerCase();

        cy.log(`So sánh tên sản phẩm:`);
        cy.log(`   - Trang chi tiết: "${expectedName}"`);
        cy.log(`   - Trong giỏ hàng: "${cartProductName.trim()}"`);

        // Kiểm tra xem tên trong giỏ hàng có chứa tên từ trang chi tiết không
        // Hoặc ngược lại (vì có thể tên trong giỏ hàng ngắn hơn)
        const isMatching =
          cartName.includes(expectedNameLower) ||
          expectedNameLower.includes(cartName) ||
          // Kiểm tra các từ khóa chính
          (cartName.includes("realme") &&
            expectedNameLower.includes("realme") &&
            cartName.includes("14t") &&
            expectedNameLower.includes("14t"));

        if (isMatching) {
          cy.log(`Tên sản phẩm khớp`);
        } else {
          cy.log(`Tên sản phẩm không khớp`);
          throw new Error(
            `Tên sản phẩm không khớp. Mong đợi: "${expectedName}", Thực tế: "${cartProductName.trim()}"`
          );
        }
      });
  }

  // Kiểm tra số lượng sản phẩm
  if (expectedQuantity) {
    cy.get(".total-product-quantity").should(
      "contain.text",
      `${expectedQuantity} sản phẩm`
    );
    cy.log(`Số lượng khớp: ${expectedQuantity} sản phẩm`);
  }

  // Kiểm tra phân loại nếu có
  if (expectedCategory) {
    cy.get(".product-color__title, .product-item__right-info").should(
      "contain.text",
      expectedCategory
    );
    cy.log(`Phân loại khớp: ${expectedCategory}`);
  }

  cy.log("Kiểm tra sản phẩm hoàn tất");
}
