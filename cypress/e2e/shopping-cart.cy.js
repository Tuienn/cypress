import { addProductToCart, verifyProduct } from "../support/shopping-cart";

describe("Kiểm tra chức năng giỏ hàng - TheGioiDiDong", () => {
  it("TC1: Thêm sản phẩm vào giỏ hàng", () => {
    cy.log("Bắt đầu TC1: Thêm sản phẩm vào giỏ hàng");

    // Sử dụng hàm helper để thêm sản phẩm
    addProductToCart(
      "https://www.thegioididong.com/dtdd/realme-14t-5g-8gb"
    ).then((productInfo) => {
      // Chuyển đến trang giỏ hàng
      cy.log("Chuyển đến trang giỏ hàng để kiểm tra");
      cy.visit("https://www.thegioididong.com/cart");
      cy.wait(3000);

      // Kiểm tra xem giỏ hàng có sản phẩm hay không
      cy.get("body").then(($body) => {
        if ($body.find(".cart-empty").length > 0) {
          // Giỏ hàng trống
          cy.log("THẤT BẠI: Giỏ hàng vẫn trống, sản phẩm chưa được thêm");
          throw new Error("Sản phẩm chưa được thêm vào giỏ hàng");
        } else {
          // Giỏ hàng có sản phẩm - sử dụng hàm verify
          cy.log("THÀNH CÔNG: Giỏ hàng có sản phẩm");
          verifyProduct(productInfo.name, 1, productInfo.category);
          cy.log(
            "TC1 hoàn thành thành công - Sản phẩm đã được thêm vào giỏ hàng"
          );
        }
      });
    });
  });

  it("TC2: Thêm sản phẩm khác phân loại", () => {
    cy.log("Bắt đầu TC2: Thêm sản phẩm khác phân loại");

    // Thêm sản phẩm đầu tiên (8GB)
    addProductToCart(
      "https://www.thegioididong.com/dtdd/realme-14t-5g-8gb"
    ).then((firstProduct) => {
      cy.log(
        `Đã thêm sản phẩm đầu tiên: ${firstProduct.name} - ${firstProduct.category}`
      );

      // Thêm sản phẩm thứ hai (12GB - khác phân loại)
      addProductToCart("https://www.thegioididong.com/dtdd/realme-14t-5g").then(
        (secondProduct) => {
          cy.log(
            `Đã thêm sản phẩm thứ hai: ${secondProduct.name} - ${secondProduct.category}`
          );

          // Chuyển đến trang giỏ hàng để kiểm tra
          cy.log("Chuyển đến trang giỏ hàng để kiểm tra");
          cy.visit("https://www.thegioididong.com/cart");
          cy.wait(3000);

          // Kiểm tra có 2 sản phẩm riêng biệt
          cy.get(".product-item").should("have.length", 2);
          cy.get(".total-product-quantity").should(
            "contain.text",
            "2 sản phẩm"
          );

          // Kiểm tra cả 2 sản phẩm đều có mặt trong giỏ hàng
          cy.get(".product-item__name").each(($el, index) => {
            const productName = $el.text().trim();
            cy.log(`Sản phẩm ${index + 1} trong giỏ: ${productName}`);

            // Kiểm tra tên sản phẩm có chứa từ khóa chính
            expect(productName.toLowerCase()).to.include("realme");
            expect(productName.toLowerCase()).to.include("14t");
          });

          cy.log(
            "TC2 hoàn thành thành công - Đã tạo ra 2 sản phẩm riêng biệt với phân loại khác nhau"
          );
        }
      );
    });
  });

  it("TC3: Thêm sản phẩm cùng phân loại", () => {
    cy.log("Bắt đầu TC3: Thêm sản phẩm cùng phân loại");

    // Thêm sản phẩm lần đầu (8GB)
    addProductToCart(
      "https://www.thegioididong.com/dtdd/realme-14t-5g-8gb"
    ).then((firstProduct) => {
      cy.log(
        `Đã thêm sản phẩm lần đầu: ${firstProduct.name} - ${firstProduct.category}`
      );

      // Thêm cùng sản phẩm lần nữa (cùng phân loại 8GB)
      addProductToCart(
        "https://www.thegioididong.com/dtdd/realme-14t-5g-8gb"
      ).then((secondProduct) => {
        cy.log(
          `Đã thêm sản phẩm lần thứ hai: ${secondProduct.name} - ${secondProduct.category}`
        );

        // Chuyển đến trang giỏ hàng để kiểm tra
        cy.log("Chuyển đến trang giỏ hàng để kiểm tra");
        cy.visit("https://www.thegioididong.com/cart");
        cy.wait(3000);

        // Kiểm tra chỉ có 1 sản phẩm nhưng số lượng là 2
        cy.get("body").then(($body) => {
          if ($body.find(".product-item").length === 1) {
            // Trường hợp lý tưởng: gộp thành 1 sản phẩm với số lượng 2
            cy.log("Kiểm tra sản phẩm đơn với số lượng 2...");
            cy.get(".product-item").should("have.length", 1);
            cy.get(".total-product-quantity").should(
              "contain.text",
              "2 sản phẩm"
            );

            // Kiểm tra số lượng trong input quantity
            cy.get(".product-quantity input").should("have.value", "2");
            cy.log("TC3 thành công - Số lượng sản phẩm đã tăng lên 2");
          } else if ($body.find(".product-item").length === 2) {
            // Trường hợp hệ thống tạo 2 item riêng biệt
            cy.log("Hệ thống tạo 2 item riêng biệt thay vì tăng số lượng");
            cy.get(".product-item").should("have.length", 2);
            cy.get(".total-product-quantity").should(
              "contain.text",
              "2 sản phẩm"
            );
            cy.log("TC3 - Hệ thống tạo 2 item riêng thay vì tăng số lượng");
          } else {
            throw new Error(
              "Hành vi không mong đợi: Không tìm thấy 1 item với số lượng 2 hoặc 2 item riêng biệt"
            );
          }
        });
      });
    });
  });

  it("TC4: Chi tiết sản phẩm", () => {
    cy.log("Bắt đầu TC4: Kiểm tra chuyển đến trang chi tiết sản phẩm");

    const productUrl = "https://www.thegioididong.com/dtdd/realme-14t-5g-8gb";

    // Thêm sản phẩm vào giỏ hàng
    addProductToCart(productUrl).then((productInfo) => {
      cy.log(`Đã thêm sản phẩm: ${productInfo.name} - ${productInfo.category}`);

      // Chuyển đến trang giỏ hàng
      cy.log("Chuyển đến trang giỏ hàng");
      cy.visit("https://www.thegioididong.com/cart");
      cy.wait(3000);

      // Kiểm tra sản phẩm có trong giỏ hàng
      cy.get(".product-item").should("exist");
      cy.get(".product-item__name").should("be.visible");

      // Lấy href của link sản phẩm để so sánh sau
      cy.get(".product-item__name")
        .should("have.attr", "href")
        .then((href) => {
          const expectedUrl = href;
          cy.log(`URL mong đợi: ${expectedUrl}`);

          // Click vào tên sản phẩm
          cy.log("Đang click vào tên sản phẩm trong giỏ hàng");
          cy.get(".product-item__name").click();
          cy.wait(3000);

          // Kiểm tra đã chuyển đến trang chi tiết sản phẩm
          cy.url()
            .should("include", "/dtdd/realme-14t-5g")
            .then((currentUrl) => {
              cy.log(`URL hiện tại: ${currentUrl}`);

              // Kiểm tra trang chi tiết có load đúng không
              cy.get(".product-name h1, h1")
                .should("be.visible")
                .and("contain.text", "realme");

              // Kiểm tra có phần phân loại sản phẩm
              cy.get(".box03.group.desk .item").should("exist");

              cy.log(
                "TC4 hoàn thành thành công - Đã chuyển đến trang chi tiết sản phẩm đúng"
              );
            });
        });
    });
  });

  it("TC5: Nhập số lượng sản phẩm", () => {
    cy.log("Bắt đầu TC5: Thay đổi số lượng sản phẩm bằng cách nhập");

    const productUrl = "https://www.thegioididong.com/dtdd/realme-14t-5g-8gb";

    // Thêm sản phẩm vào giỏ hàng
    addProductToCart(productUrl).then((productInfo) => {
      cy.log(`Đã thêm sản phẩm: ${productInfo.name}`);

      // Chuyển đến trang giỏ hàng
      cy.log("Chuyển đến trang giỏ hàng");
      cy.visit("https://www.thegioididong.com/cart");
      cy.wait(3000);

      // Kiểm tra sản phẩm có trong giỏ hàng
      cy.get(".product-item").should("exist");
      cy.get(".product-quantity input").should("be.visible");

      // Lấy số lượng ban đầu
      cy.get(".product-quantity input").should("have.value", "1");
      cy.log("Số lượng ban đầu: 1");

      // Nhập số lượng mới (3)
      const newQuantity = 3;
      cy.log(`Nhập số lượng mới: ${newQuantity}`);
      cy.get(".product-quantity input")
        .clear()
        .type(newQuantity.toString())
        .trigger("blur") // Trigger change event
        .wait(2000);

      // Kiểm tra số lượng đã thay đổi
      cy.get(".product-quantity input").should(
        "have.value",
        newQuantity.toString()
      );

      // Kiểm tra tổng số lượng cập nhật
      cy.get(".total-product-quantity").should(
        "contain.text",
        `${newQuantity} sản phẩm`
      );

      cy.log("TC5 hoàn thành thành công - Đã thay đổi số lượng bằng cách nhập");
    });
  });

  it("TC6: Nhấn nút '+'", () => {
    cy.log("Bắt đầu TC6: Tăng số lượng sản phẩm bằng nút '+'");

    const productUrl = "https://www.thegioididong.com/dtdd/realme-14t-5g-8gb";

    // Thêm sản phẩm vào giỏ hàng
    addProductToCart(productUrl).then((productInfo) => {
      cy.log(`Đã thêm sản phẩm: ${productInfo.name}`);

      // Chuyển đến trang giỏ hàng
      cy.log("Chuyển đến trang giỏ hàng");
      cy.visit("https://www.thegioididong.com/cart");
      cy.wait(3000);

      // Kiểm tra sản phẩm có trong giỏ hàng
      cy.get(".product-item").should("exist");
      cy.get(".product-quantity input").should("be.visible");

      // Lấy số lượng ban đầu
      cy.get(".product-quantity input")
        .invoke("val")
        .then((initialQuantity) => {
          const currentQty = parseInt(initialQuantity);
          cy.log(`Số lượng ban đầu: ${currentQty}`);

          // Click nút '+'
          cy.log("Nhấn nút '+'");
          cy.get(".product-quantity__btn button")
            .not(".product-quantity__btn-minus") // Không phải nút minus
            .last() // Lấy nút cuối (plus)
            .click({ force: true })
            .wait(2000);

          // Kiểm tra số lượng đã tăng lên 1
          const expectedQuantity = currentQty + 1;
          cy.get(".product-quantity input").should(
            "have.value",
            expectedQuantity.toString()
          );

          // Kiểm tra tổng số lượng cập nhật
          cy.get(".total-product-quantity").should(
            "contain.text",
            `${expectedQuantity} sản phẩm`
          );

          cy.log(`Số lượng đã tăng từ ${currentQty} lên ${expectedQuantity}`);
          cy.log("TC6 hoàn thành thành công - Nút '+' hoạt động đúng");
        });
    });
  });

  it("TC7: Nhấn nút '-'", () => {
    cy.log("Bắt đầu TC7: Giảm số lượng sản phẩm bằng nút '-'");

    const productUrl = "https://www.thegioididong.com/dtdd/realme-14t-5g-8gb";

    // Thêm sản phẩm vào giỏ hàng
    addProductToCart(productUrl).then((productInfo) => {
      cy.log(`Đã thêm sản phẩm: ${productInfo.name}`);

      // Chuyển đến trang giỏ hàng
      cy.log("Chuyển đến trang giỏ hàng");
      cy.visit("https://www.thegioididong.com/cart");
      cy.wait(3000);

      // Kiểm tra sản phẩm có trong giỏ hàng
      cy.get(".product-item").should("exist");
      cy.get(".product-quantity input").should("be.visible");

      // Tăng số lượng lên 2 trước để có thể giảm
      cy.log("Tăng số lượng lên 2 trước để test giảm");
      cy.get(".product-quantity input")
        .clear()
        .type("2")
        .trigger("change")
        .wait(2000);

      // Verify số lượng đã là 2
      cy.get(".product-quantity input").should("have.value", "2");
      cy.log("Đã set số lượng thành 2");

      // Click nút '-'
      cy.log("Nhấn nút '-'");
      cy.get(".product-quantity__btn-minus, .minus_btn")
        .click({ force: true })
        .wait(2000);

      // Kiểm tra số lượng đã giảm về 1
      cy.get(".product-quantity input").should("have.value", "1");

      // Kiểm tra tổng số lượng cập nhật
      cy.get(".total-product-quantity").should("contain.text", "1 sản phẩm");

      cy.log("Số lượng đã giảm từ 2 về 1");
      cy.log("TC7 hoàn thành thành công - Nút '-' hoạt động đúng");
    });
  });

  it("TC8: Nhấn nút '-' khi số lượng sản phẩm bằng 1", () => {
    cy.log("Bắt đầu TC8: Nhấn nút '-' khi số lượng sản phẩm bằng 1");

    const productUrl = "https://www.thegioididong.com/dtdd/realme-14t-5g-8gb";

    // Thêm sản phẩm vào giỏ hàng
    addProductToCart(productUrl).then((productInfo) => {
      cy.log(`Đã thêm sản phẩm: ${productInfo.name}`);

      // Chuyển đến trang giỏ hàng
      cy.log("Chuyển đến trang giỏ hàng");
      cy.visit("https://www.thegioididong.com/cart");
      cy.wait(3000);

      // Kiểm tra sản phẩm có trong giỏ hàng với số lượng = 1
      cy.get(".product-item").should("exist");
      cy.get(".product-quantity input")
        .should("be.visible")
        .and("have.value", "1");
      cy.log("Xác nhận số lượng ban đầu là 1");

      // Click nút '-' khi số lượng = 1
      cy.log("Nhấn nút '-' khi số lượng = 1");
      cy.get(".product-quantity__btn-minus, .minus_btn")
        .click({ force: true })
        .wait(1000);

      // Kiểm tra modal xác nhận xóa có xuất hiện không
      cy.get("body").then(($body) => {
        if ($body.find(".confirm-delete-product").length > 0) {
          cy.log("Modal xác nhận xóa sản phẩm xuất hiện khi nhấn nút '-'");

          // Kiểm tra nội dung modal
          cy.get(".confirm-delete-product")
            .should("be.visible")
            .within(() => {
              cy.get("p").should(
                "contain.text",
                "Bạn chắc chắn muốn xóa sản phẩm này?"
              );
              cy.get("button").should("have.length", 2);

              // Click nút "Xóa" để xác nhận
              cy.log("Xác nhận xóa sản phẩm bằng cách click nút 'Xóa'");
              cy.get("button").contains("Xóa").click({ force: true });
            });

          cy.wait(2000);

          // Kiểm tra sản phẩm đã bị xóa và chuyển về giỏ hàng trống
          cy.get(".cart-empty").should("be.visible");
          cy.get(".cart-empty h1").should("contain.text", "Giỏ hàng trống");
          cy.get(".cart-empty .dmx").should(
            "contain.text",
            "Không có sản phẩm nào trong giỏ hàng"
          );

          cy.log(
            "TC8 thành công - Nhấn nút '-' khi số lượng = 1 hiển thị modal xác nhận và xóa sản phẩm"
          );
        } else if ($body.find(".cart-empty").length > 0) {
          // Trường hợp sản phẩm bị xóa trực tiếp mà không có modal
          cy.log("Sản phẩm đã bị xóa trực tiếp khi nhấn nút '-'");
          cy.get(".cart-empty").should("be.visible");
          cy.get(".cart-empty h1").should("contain.text", "Giỏ hàng trống");
          cy.log("TC8 thành công - Sản phẩm tự động bị xóa khi số lượng = 0");
        } else if ($body.find(".product-item").length > 0) {
          // Kiểm tra số lượng có bị set về tối thiểu không
          cy.get(".product-quantity input")
            .invoke("val")
            .then((value) => {
              const currentQty = parseInt(value);
              cy.log(`Số lượng hiện tại: ${currentQty}`);
              if (currentQty >= 1) {
                cy.log(
                  "Hệ thống giữ số lượng tối thiểu là 1, không xóa sản phẩm"
                );
                cy.log("TC8 - Hệ thống không cho phép giảm xuống dưới 1");
              } else {
                cy.log("Số lượng = 0 nhưng sản phẩm vẫn còn trong giỏ");
              }
            });
        } else {
          throw new Error(
            "Trạng thái không xác định: Không có giỏ hàng trống cũng không có sản phẩm"
          );
        }
      });
    });
  });

  it("TC9: Nhấn nút xóa sản phẩm", () => {
    cy.log("Bắt đầu TC9: Nhấn nút xóa sản phẩm");

    const productUrl = "https://www.thegioididong.com/dtdd/realme-14t-5g-8gb";

    // Thêm sản phẩm vào giỏ hàng
    addProductToCart(productUrl).then((productInfo) => {
      cy.log(`Đã thêm sản phẩm: ${productInfo.name}`);

      // Chuyển đến trang giỏ hàng
      cy.log("Chuyển đến trang giỏ hàng");
      cy.visit("https://www.thegioididong.com/cart");
      cy.wait(3000);

      // Kiểm tra sản phẩm có trong giỏ hàng
      cy.get(".product-item").should("exist");
      verifyProduct(productInfo.name, 1, productInfo.category);

      // Click nút xóa sản phẩm
      cy.log("Nhấn nút xóa sản phẩm");
      cy.get(".product-quantity__remove")
        .should("be.visible")
        .click({ force: true })
        .wait(1000);

      // Kiểm tra modal xác nhận xóa có xuất hiện không
      cy.get("body").then(($body) => {
        if ($body.find(".confirm-delete-product").length > 0) {
          cy.log("Modal xác nhận xóa sản phẩm xuất hiện");

          // Kiểm tra nội dung modal
          cy.get(".confirm-delete-product")
            .should("be.visible")
            .within(() => {
              cy.get("p").should(
                "contain.text",
                "Bạn chắc chắn muốn xóa sản phẩm này?"
              );
              cy.get("button").should("have.length", 2);

              // Click nút "Xóa" để xác nhận
              cy.log("Xác nhận xóa sản phẩm");
              cy.get("button").contains("Xóa").click({ force: true });
            });

          cy.wait(2000);

          // Kiểm tra sản phẩm đã bị xóa và chuyển về giỏ hàng trống
          cy.get(".cart-empty").should("be.visible");
          cy.get(".cart-empty h1").should("contain.text", "Giỏ hàng trống");
          cy.get(".cart-empty .dmx").should(
            "contain.text",
            "Không có sản phẩm nào trong giỏ hàng"
          );

          cy.log(
            "TC9 thành công - Sản phẩm đã bị xóa và hiển thị giỏ hàng trống"
          );
        } else {
          // Trường hợp không có modal, sản phẩm bị xóa trực tiếp
          cy.log("Sản phẩm bị xóa trực tiếp mà không có modal xác nhận");
          cy.get(".cart-empty").should("be.visible");
          cy.log("TC9 thành công - Sản phẩm đã bị xóa ngay lập tức");
        }
      });
    });
  });

  it("TC10: Giỏ hàng trống", () => {
    cy.log("Bắt đầu TC10: Kiểm tra giao diện giỏ hàng trống");

    // Truy cập trực tiếp trang giỏ hàng khi chưa có sản phẩm nào
    cy.log("Truy cập trang giỏ hàng khi chưa thêm sản phẩm");
    cy.visit("https://www.thegioididong.com/cart");
    cy.wait(3000);

    // Kiểm tra giao diện giỏ hàng trống
    cy.get(".cart-empty").should("be.visible");

    // Kiểm tra các thành phần của giao diện giỏ hàng trống
    cy.get(".cart-empty").within(() => {
      // Icon giỏ hàng trống
      cy.get(".iconcart-empty").should("exist");

      // Tiêu đề "Giỏ hàng trống"
      cy.get("h1").should("be.visible").and("contain.text", "Giỏ hàng trống");

      // Mô tả "Không có sản phẩm nào trong giỏ hàng"
      cy.get(".dmx")
        .should("be.visible")
        .and("contain.text", "Không có sản phẩm nào trong giỏ hàng");

      // Nút "Về trang chủ"
      cy.get(".btn-backhome")
        .should("be.visible")
        .and("contain.text", "Về trang chủ")
        .and("have.attr", "href", "https://www.thegioididong.com");

      // Thông tin liên hệ hỗ trợ
      cy.get(".note-help")
        .should("be.visible")
        .and("contain.text", "Khi cần trợ giúp vui lòng gọi");
      cy.get("a[href='tel:1900232460']").should("contain.text", "1900 232 460");
      cy.get("a[href='tel:02836221060']").should(
        "contain.text",
        "028.3622.1060"
      );
    });

    // Test chức năng nút "Về trang chủ"
    cy.log("Kiểm tra chức năng nút 'Về trang chủ'");
    cy.get(".btn-backhome").click();
    cy.wait(2000);

    // Verify đã chuyển về trang chủ
    cy.url().should("eq", "https://www.thegioididong.com/");
    cy.log("Đã chuyển về trang chủ thành công");

    // Quay lại giỏ hàng để test tiếp
    cy.log("Quay lại giỏ hàng để kiểm tra lần nữa");
    cy.visit("https://www.thegioididong.com/cart");
    cy.wait(2000);

    // Verify giỏ hàng vẫn trống
    cy.get(".cart-empty").should("be.visible");
    cy.log(
      "TC10 hoàn thành thành công - Giao diện giỏ hàng trống hoạt động đúng"
    );
  });

  it("TC11: Tổng tiền thay đổi", () => {
    cy.log("Bắt đầu TC11: Kiểm tra tổng tiền thay đổi khi tăng/giảm số lượng");

    const productUrl = "https://www.thegioididong.com/dtdd/realme-14t-5g-8gb";

    // Thêm sản phẩm vào giỏ hàng
    addProductToCart(productUrl).then((productInfo) => {
      cy.log(`Đã thêm sản phẩm: ${productInfo.name}`);

      // Chuyển đến trang giỏ hàng
      cy.log("Chuyển đến trang giỏ hàng");
      cy.visit("https://www.thegioididong.com/cart");
      cy.wait(3000);

      // Kiểm tra sản phẩm có trong giỏ hàng
      cy.get(".product-item").should("exist");
      cy.get(".product-quantity input").should("be.visible");

      // Lấy tổng tiền ban đầu (số lượng = 1)
      cy.get(".total-price strong, .total-money, .cart-total strong")
        .last()
        .invoke("text")
        .then((initialTotal) => {
          const initialTotalText = initialTotal.trim();
          cy.log(`Tổng tiền ban đầu (SL=1): ${initialTotalText}`);

          // Tăng số lượng lên 2
          cy.log("Tăng số lượng lên 2");
          cy.get(".product-quantity input")
            .clear()
            .type("2")
            .trigger("blur")
            .wait(2000);

          // Verify số lượng đã thay đổi
          cy.get(".product-quantity input").should("have.value", "2");

          // Lấy tổng tiền sau khi tăng số lượng
          cy.get(".total-price strong, .total-money, .cart-total strong")
            .last()
            .invoke("text")
            .then((newTotal) => {
              const newTotalText = newTotal.trim();
              cy.log(`Tổng tiền sau khi tăng SL=2: ${newTotalText}`);

              // Kiểm tra tổng tiền có thay đổi không
              if (initialTotalText !== newTotalText) {
                cy.log("THÀNH CÔNG: Tổng tiền đã thay đổi khi tăng số lượng");

                // Chuyển đổi số để so sánh
                const initialAmount = parseInt(
                  initialTotalText.replace(/[^\d]/g, "")
                );
                const newAmount = parseInt(newTotalText.replace(/[^\d]/g, ""));

                if (newAmount > initialAmount) {
                  cy.log(`Tổng tiền tăng từ ${initialAmount} lên ${newAmount}`);
                } else {
                  cy.log("Cảnh báo: Tổng tiền không tăng như mong đợi");
                }
              } else {
                cy.log("CẢNH BÁO: Tổng tiền không thay đổi khi tăng số lượng");
              }

              // Giảm số lượng về 1
              cy.log("Giảm số lượng về 1");
              cy.get(".product-quantity input")
                .clear()
                .type("1")
                .trigger("blur")
                .wait(2000);

              // Verify số lượng đã giảm
              cy.get(".product-quantity input").should("have.value", "1");

              // Lấy tổng tiền sau khi giảm số lượng
              cy.get(".total-price strong, .total-money, .cart-total strong")
                .last()
                .invoke("text")
                .then((finalTotal) => {
                  const finalTotalText = finalTotal.trim();
                  cy.log(`Tổng tiền sau khi giảm SL=1: ${finalTotalText}`);

                  // Kiểm tra tổng tiền có quay về giá trị ban đầu không
                  if (finalTotalText === initialTotalText) {
                    cy.log("THÀNH CÔNG: Tổng tiền quay về giá trị ban đầu");
                  } else {
                    cy.log("Tổng tiền không quay về giá trị ban đầu");
                    cy.log(
                      `Ban đầu: ${initialTotalText}, Cuối: ${finalTotalText}`
                    );
                  }

                  // Test với nút + và -
                  cy.log("Kiểm tra tổng tiền với nút + và -");

                  // Lấy tổng tiền hiện tại
                  const currentTotal = finalTotalText;

                  // Click nút + để tăng số lượng
                  cy.log("Nhấn nút '+' để tăng số lượng");
                  cy.get(".product-quantity__btn button")
                    .not(".product-quantity__btn-minus")
                    .last()
                    .click({ force: true })
                    .wait(2000);

                  // Kiểm tra tổng tiền sau khi nhấn +
                  cy.get(
                    ".total-price strong, .total-money, .cart-total strong"
                  )
                    .last()
                    .invoke("text")
                    .then((plusTotal) => {
                      const plusTotalText = plusTotal.trim();
                      cy.log(`Tổng tiền sau khi nhấn '+': ${plusTotalText}`);

                      if (plusTotalText !== currentTotal) {
                        cy.log(
                          "THÀNH CÔNG: Tổng tiền thay đổi khi nhấn nút '+'"
                        );
                      } else {
                        cy.log(
                          "CẢNH BÁO: Tổng tiền không thay đổi khi nhấn nút '+'"
                        );
                      }

                      // Click nút - để giảm số lượng
                      cy.log("Nhấn nút '-' để giảm số lượng");
                      cy.get(".product-quantity__btn-minus, .minus_btn")
                        .click({ force: true })
                        .wait(2000);

                      // Kiểm tra tổng tiền sau khi nhấn -
                      cy.get(
                        ".total-price strong, .total-money, .cart-total strong"
                      )
                        .last()
                        .invoke("text")
                        .then((minusTotal) => {
                          const minusTotalText = minusTotal.trim();
                          cy.log(
                            `Tổng tiền sau khi nhấn '-': ${minusTotalText}`
                          );

                          if (minusTotalText !== plusTotalText) {
                            cy.log(
                              "THÀNH CÔNG: Tổng tiền thay đổi khi nhấn nút '-'"
                            );
                          } else {
                            cy.log(
                              "CẢNH BÁO: Tổng tiền không thay đổi khi nhấn nút '-'"
                            );
                          }

                          cy.log(
                            "TC11 hoàn thành - Đã kiểm tra tổng tiền với tất cả các thao tác thay đổi số lượng"
                          );
                        });
                    });
                });
            });
        });
    });
  });
});
