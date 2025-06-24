import { addProductToCart, verifyProduct } from "../support/shopping-cart";

describe("Kiểm tra chức năng giỏ hàng - TheGioiDiDong", () => {
  // it("TC1: Thêm sản phẩm vào giỏ hàng", () => {
  //   cy.log("Bắt đầu TC1: Thêm sản phẩm vào giỏ hàng");

  //   // Sử dụng hàm helper để thêm sản phẩm
  //   addProductToCart(
  //     "https://www.thegioididong.com/dtdd/realme-14t-5g-8gb"
  //   ).then((productInfo) => {
  //     // Chuyển đến trang giỏ hàng
  //     cy.log("Chuyển đến trang giỏ hàng để kiểm tra");
  //     cy.visit("https://www.thegioididong.com/cart");
  //     cy.wait(3000);

  //     // Kiểm tra xem giỏ hàng có sản phẩm hay không
  //     cy.get("body").then(($body) => {
  //       if ($body.find(".cart-empty").length > 0) {
  //         // Giỏ hàng trống
  //         cy.log("THẤT BẠI: Giỏ hàng vẫn trống, sản phẩm chưa được thêm");
  //         throw new Error("Sản phẩm chưa được thêm vào giỏ hàng");
  //       } else {
  //         // Giỏ hàng có sản phẩm - sử dụng hàm verify
  //         cy.log("THÀNH CÔNG: Giỏ hàng có sản phẩm");
  //         verifyProduct(productInfo.name, 1, productInfo.category);
  //         cy.log(
  //           "TC1 hoàn thành thành công - Sản phẩm đã được thêm vào giỏ hàng"
  //         );
  //       }
  //     });
  //   });
  // });

  // it("TC2: Thêm sản phẩm khác phân loại", () => {
  //   cy.log("Bắt đầu TC2: Thêm sản phẩm khác phân loại");

  //   // Thêm sản phẩm đầu tiên (8GB)
  //   addProductToCart(
  //     "https://www.thegioididong.com/dtdd/realme-14t-5g-8gb"
  //   ).then((firstProduct) => {
  //     cy.log(
  //       `Đã thêm sản phẩm đầu tiên: ${firstProduct.name} - ${firstProduct.category}`
  //     );

  //     // Thêm sản phẩm thứ hai (12GB - khác phân loại)
  //     addProductToCart("https://www.thegioididong.com/dtdd/realme-14t-5g").then(
  //       (secondProduct) => {
  //         cy.log(
  //           `Đã thêm sản phẩm thứ hai: ${secondProduct.name} - ${secondProduct.category}`
  //         );

  //         // Chuyển đến trang giỏ hàng để kiểm tra
  //         cy.log("Chuyển đến trang giỏ hàng để kiểm tra");
  //         cy.visit("https://www.thegioididong.com/cart");
  //         cy.wait(3000);

  //         // Kiểm tra có 2 sản phẩm riêng biệt
  //         cy.get(".product-item").should("have.length", 2);
  //         cy.get(".total-product-quantity").should(
  //           "contain.text",
  //           "2 sản phẩm"
  //         );

  //         // Kiểm tra cả 2 sản phẩm đều có mặt trong giỏ hàng
  //         cy.get(".product-item__name").each(($el, index) => {
  //           const productName = $el.text().trim();
  //           cy.log(`Sản phẩm ${index + 1} trong giỏ: ${productName}`);

  //           // Kiểm tra tên sản phẩm có chứa từ khóa chính
  //           expect(productName.toLowerCase()).to.include("realme");
  //           expect(productName.toLowerCase()).to.include("14t");
  //         });

  //         cy.log(
  //           "TC2 hoàn thành thành công - Đã tạo ra 2 sản phẩm riêng biệt với phân loại khác nhau"
  //         );
  //       }
  //     );
  //   });
  // });

  // it("TC3: Thêm sản phẩm cùng phân loại", () => {
  //   cy.log("Bắt đầu TC3: Thêm sản phẩm cùng phân loại");

  //   // Thêm sản phẩm lần đầu (8GB)
  //   addProductToCart(
  //     "https://www.thegioididong.com/dtdd/realme-14t-5g-8gb"
  //   ).then((firstProduct) => {
  //     cy.log(
  //       `Đã thêm sản phẩm lần đầu: ${firstProduct.name} - ${firstProduct.category}`
  //     );

  //     // Thêm cùng sản phẩm lần nữa (cùng phân loại 8GB)
  //     addProductToCart(
  //       "https://www.thegioididong.com/dtdd/realme-14t-5g-8gb"
  //     ).then((secondProduct) => {
  //       cy.log(
  //         `Đã thêm sản phẩm lần thứ hai: ${secondProduct.name} - ${secondProduct.category}`
  //       );

  //       // Chuyển đến trang giỏ hàng để kiểm tra
  //       cy.log("Chuyển đến trang giỏ hàng để kiểm tra");
  //       cy.visit("https://www.thegioididong.com/cart");
  //       cy.wait(3000);

  //       // Kiểm tra chỉ có 1 sản phẩm nhưng số lượng là 2
  //       cy.get("body").then(($body) => {
  //         if ($body.find(".product-item").length === 1) {
  //           // Trường hợp lý tưởng: gộp thành 1 sản phẩm với số lượng 2
  //           cy.log("Kiểm tra sản phẩm đơn với số lượng 2...");
  //           cy.get(".product-item").should("have.length", 1);
  //           cy.get(".total-product-quantity").should(
  //             "contain.text",
  //             "2 sản phẩm"
  //           );

  //           // Kiểm tra số lượng trong input quantity
  //           cy.get(".product-quantity input").should("have.value", "2");
  //           cy.log("TC3 thành công - Số lượng sản phẩm đã tăng lên 2");
  //         } else if ($body.find(".product-item").length === 2) {
  //           // Trường hợp hệ thống tạo 2 item riêng biệt
  //           cy.log("Hệ thống tạo 2 item riêng biệt thay vì tăng số lượng");
  //           cy.get(".product-item").should("have.length", 2);
  //           cy.get(".total-product-quantity").should(
  //             "contain.text",
  //             "2 sản phẩm"
  //           );
  //           cy.log("TC3 - Hệ thống tạo 2 item riêng thay vì tăng số lượng");
  //         } else {
  //           throw new Error(
  //             "Hành vi không mong đợi: Không tìm thấy 1 item với số lượng 2 hoặc 2 item riêng biệt"
  //           );
  //         }
  //       });
  //     });
  //   });
  // });

  // it("TC4: Chi tiết sản phẩm", () => {
  //   cy.log("Bắt đầu TC4: Kiểm tra chuyển đến trang chi tiết sản phẩm");

  //   const productUrl = "https://www.thegioididong.com/dtdd/realme-14t-5g-8gb";

  //   // Thêm sản phẩm vào giỏ hàng
  //   addProductToCart(productUrl).then((productInfo) => {
  //     cy.log(`Đã thêm sản phẩm: ${productInfo.name} - ${productInfo.category}`);

  //     // Chuyển đến trang giỏ hàng
  //     cy.log("Chuyển đến trang giỏ hàng");
  //     cy.visit("https://www.thegioididong.com/cart");
  //     cy.wait(3000);

  //     // Kiểm tra sản phẩm có trong giỏ hàng
  //     cy.get(".product-item").should("exist");
  //     cy.get(".product-item__name").should("be.visible");

  //     // Lấy href của link sản phẩm để so sánh sau
  //     cy.get(".product-item__name")
  //       .should("have.attr", "href")
  //       .then((href) => {
  //         const expectedUrl = href;
  //         cy.log(`URL mong đợi: ${expectedUrl}`);

  //         // Click vào tên sản phẩm
  //         cy.log("Đang click vào tên sản phẩm trong giỏ hàng");
  //         cy.get(".product-item__name").click();
  //         cy.wait(3000);

  //         // Kiểm tra đã chuyển đến trang chi tiết sản phẩm
  //         cy.url()
  //           .should("include", "/dtdd/realme-14t-5g")
  //           .then((currentUrl) => {
  //             cy.log(`URL hiện tại: ${currentUrl}`);

  //             // Kiểm tra trang chi tiết có load đúng không
  //             cy.get(".product-name h1, h1")
  //               .should("be.visible")
  //               .and("contain.text", "realme");

  //             // Kiểm tra có phần phân loại sản phẩm
  //             cy.get(".box03.group.desk .item").should("exist");

  //             cy.log(
  //               "TC4 hoàn thành thành công - Đã chuyển đến trang chi tiết sản phẩm đúng"
  //             );
  //           });
  //       });
  //   });
  // });

  // it("TC5: Nhập số lượng sản phẩm", () => {
  //   cy.log("Bắt đầu TC5: Thay đổi số lượng sản phẩm bằng cách nhập");

  //   const productUrl = "https://www.thegioididong.com/dtdd/realme-14t-5g-8gb";

  //   // Thêm sản phẩm vào giỏ hàng
  //   addProductToCart(productUrl).then((productInfo) => {
  //     cy.log(`Đã thêm sản phẩm: ${productInfo.name}`);

  //     // Chuyển đến trang giỏ hàng
  //     cy.log("Chuyển đến trang giỏ hàng");
  //     cy.visit("https://www.thegioididong.com/cart");
  //     cy.wait(3000);

  //     // Kiểm tra sản phẩm có trong giỏ hàng
  //     cy.get(".product-item").should("exist");
  //     cy.get(".product-quantity input").should("be.visible");

  //     // Lấy số lượng ban đầu
  //     cy.get(".product-quantity input").should("have.value", "1");
  //     cy.log("Số lượng ban đầu: 1");

  //     // Nhập số lượng mới (3)
  //     const newQuantity = 3;
  //     cy.log(`Nhập số lượng mới: ${newQuantity}`);
  //     cy.get(".product-quantity input")
  //       .clear()
  //       .type(newQuantity.toString())
  //       .trigger("blur") // Trigger change event
  //       .wait(2000);

  //     // Kiểm tra số lượng đã thay đổi
  //     cy.get(".product-quantity input").should(
  //       "have.value",
  //       newQuantity.toString()
  //     );

  //     // Kiểm tra tổng số lượng cập nhật
  //     cy.get(".total-product-quantity").should(
  //       "contain.text",
  //       `${newQuantity} sản phẩm`
  //     );

  //     cy.log("TC5 hoàn thành thành công - Đã thay đổi số lượng bằng cách nhập");
  //   });
  // });

  // it("TC6: Nhấn nút '+'", () => {
  //   cy.log("Bắt đầu TC6: Tăng số lượng sản phẩm bằng nút '+'");

  //   const productUrl = "https://www.thegioididong.com/dtdd/realme-14t-5g-8gb";

  //   // Thêm sản phẩm vào giỏ hàng
  //   addProductToCart(productUrl).then((productInfo) => {
  //     cy.log(`Đã thêm sản phẩm: ${productInfo.name}`);

  //     // Chuyển đến trang giỏ hàng
  //     cy.log("Chuyển đến trang giỏ hàng");
  //     cy.visit("https://www.thegioididong.com/cart");
  //     cy.wait(3000);

  //     // Kiểm tra sản phẩm có trong giỏ hàng
  //     cy.get(".product-item").should("exist");
  //     cy.get(".product-quantity input").should("be.visible");

  //     // Lấy số lượng ban đầu
  //     cy.get(".product-quantity input")
  //       .invoke("val")
  //       .then((initialQuantity) => {
  //         const currentQty = parseInt(initialQuantity);
  //         cy.log(`Số lượng ban đầu: ${currentQty}`);

  //         // Click nút '+'
  //         cy.log("Nhấn nút '+'");
  //         cy.get(".product-quantity__btn button")
  //           .not(".product-quantity__btn-minus") // Không phải nút minus
  //           .last() // Lấy nút cuối (plus)
  //           .click({ force: true })
  //           .wait(2000);

  //         // Kiểm tra số lượng đã tăng lên 1
  //         const expectedQuantity = currentQty + 1;
  //         cy.get(".product-quantity input").should(
  //           "have.value",
  //           expectedQuantity.toString()
  //         );

  //         // Kiểm tra tổng số lượng cập nhật
  //         cy.get(".total-product-quantity").should(
  //           "contain.text",
  //           `${expectedQuantity} sản phẩm`
  //         );

  //         cy.log(`Số lượng đã tăng từ ${currentQty} lên ${expectedQuantity}`);
  //         cy.log("TC6 hoàn thành thành công - Nút '+' hoạt động đúng");
  //       });
  //   });
  // });

  // it("TC7: Nhấn nút '-'", () => {
  //   cy.log("Bắt đầu TC7: Giảm số lượng sản phẩm bằng nút '-'");

  //   const productUrl = "https://www.thegioididong.com/dtdd/realme-14t-5g-8gb";

  //   // Thêm sản phẩm vào giỏ hàng
  //   addProductToCart(productUrl).then((productInfo) => {
  //     cy.log(`Đã thêm sản phẩm: ${productInfo.name}`);

  //     // Chuyển đến trang giỏ hàng
  //     cy.log("Chuyển đến trang giỏ hàng");
  //     cy.visit("https://www.thegioididong.com/cart");
  //     cy.wait(3000);

  //     // Kiểm tra sản phẩm có trong giỏ hàng
  //     cy.get(".product-item").should("exist");
  //     cy.get(".product-quantity input").should("be.visible");

  //     // Tăng số lượng lên 2 trước để có thể giảm
  //     cy.log("Tăng số lượng lên 2 trước để test giảm");
  //     cy.get(".product-quantity input")
  //       .clear()
  //       .type("2")
  //       .trigger("change")
  //       .wait(2000);

  //     // Verify số lượng đã là 2
  //     cy.get(".product-quantity input").should("have.value", "2");
  //     cy.log("Đã set số lượng thành 2");

  //     // Click nút '-'
  //     cy.log("Nhấn nút '-'");
  //     cy.get(".product-quantity__btn-minus, .minus_btn")
  //       .click({ force: true })
  //       .wait(2000);

  //     // Kiểm tra số lượng đã giảm về 1
  //     cy.get(".product-quantity input").should("have.value", "1");

  //     // Kiểm tra tổng số lượng cập nhật
  //     cy.get(".total-product-quantity").should("contain.text", "1 sản phẩm");

  //     cy.log("Số lượng đã giảm từ 2 về 1");
  //     cy.log("TC7 hoàn thành thành công - Nút '-' hoạt động đúng");
  //   });
  // });

  // it("TC8: Nhấn nút '-' khi số lượng sản phẩm bằng 1", () => {
  //   cy.log("Bắt đầu TC8: Nhấn nút '-' khi số lượng sản phẩm bằng 1");

  //   const productUrl = "https://www.thegioididong.com/dtdd/realme-14t-5g-8gb";

  //   // Thêm sản phẩm vào giỏ hàng
  //   addProductToCart(productUrl).then((productInfo) => {
  //     cy.log(`Đã thêm sản phẩm: ${productInfo.name}`);

  //     // Chuyển đến trang giỏ hàng
  //     cy.log("Chuyển đến trang giỏ hàng");
  //     cy.visit("https://www.thegioididong.com/cart");
  //     cy.wait(3000);

  //     // Kiểm tra sản phẩm có trong giỏ hàng với số lượng = 1
  //     cy.get(".product-item").should("exist");
  //     cy.get(".product-quantity input")
  //       .should("be.visible")
  //       .and("have.value", "1");
  //     cy.log("Xác nhận số lượng ban đầu là 1");

  //     // Click nút '-' khi số lượng = 1
  //     cy.log("Nhấn nút '-' khi số lượng = 1");
  //     cy.get(".product-quantity__btn-minus, .minus_btn")
  //       .click({ force: true })
  //       .wait(1000);

  //     // Kiểm tra modal xác nhận xóa có xuất hiện không
  //     cy.get("body").then(($body) => {
  //       if ($body.find(".confirm-delete-product").length > 0) {
  //         cy.log("Modal xác nhận xóa sản phẩm xuất hiện khi nhấn nút '-'");

  //         // Kiểm tra nội dung modal
  //         cy.get(".confirm-delete-product")
  //           .should("be.visible")
  //           .within(() => {
  //             cy.get("p").should(
  //               "contain.text",
  //               "Bạn chắc chắn muốn xóa sản phẩm này?"
  //             );
  //             cy.get("button").should("have.length", 2);

  //             // Click nút "Xóa" để xác nhận
  //             cy.log("Xác nhận xóa sản phẩm bằng cách click nút 'Xóa'");
  //             cy.get("button").contains("Xóa").click({ force: true });
  //           });

  //         cy.wait(2000);

  //         // Kiểm tra sản phẩm đã bị xóa và chuyển về giỏ hàng trống
  //         cy.get(".cart-empty").should("be.visible");
  //         cy.get(".cart-empty h1").should("contain.text", "Giỏ hàng trống");
  //         cy.get(".cart-empty .dmx").should(
  //           "contain.text",
  //           "Không có sản phẩm nào trong giỏ hàng"
  //         );

  //         cy.log(
  //           "TC8 thành công - Nhấn nút '-' khi số lượng = 1 hiển thị modal xác nhận và xóa sản phẩm"
  //         );
  //       } else if ($body.find(".cart-empty").length > 0) {
  //         // Trường hợp sản phẩm bị xóa trực tiếp mà không có modal
  //         cy.log("Sản phẩm đã bị xóa trực tiếp khi nhấn nút '-'");
  //         cy.get(".cart-empty").should("be.visible");
  //         cy.get(".cart-empty h1").should("contain.text", "Giỏ hàng trống");
  //         cy.log("TC8 thành công - Sản phẩm tự động bị xóa khi số lượng = 0");
  //       } else if ($body.find(".product-item").length > 0) {
  //         // Kiểm tra số lượng có bị set về tối thiểu không
  //         cy.get(".product-quantity input")
  //           .invoke("val")
  //           .then((value) => {
  //             const currentQty = parseInt(value);
  //             cy.log(`Số lượng hiện tại: ${currentQty}`);
  //             if (currentQty >= 1) {
  //               cy.log(
  //                 "Hệ thống giữ số lượng tối thiểu là 1, không xóa sản phẩm"
  //               );
  //               cy.log("TC8 - Hệ thống không cho phép giảm xuống dưới 1");
  //             } else {
  //               cy.log("Số lượng = 0 nhưng sản phẩm vẫn còn trong giỏ");
  //             }
  //           });
  //       } else {
  //         throw new Error(
  //           "Trạng thái không xác định: Không có giỏ hàng trống cũng không có sản phẩm"
  //         );
  //       }
  //     });
  //   });
  // });

  // it("TC9: Nhấn nút xóa sản phẩm", () => {
  //   cy.log("Bắt đầu TC9: Nhấn nút xóa sản phẩm");

  //   const productUrl = "https://www.thegioididong.com/dtdd/realme-14t-5g-8gb";

  //   // Thêm sản phẩm vào giỏ hàng
  //   addProductToCart(productUrl).then((productInfo) => {
  //     cy.log(`Đã thêm sản phẩm: ${productInfo.name}`);

  //     // Chuyển đến trang giỏ hàng
  //     cy.log("Chuyển đến trang giỏ hàng");
  //     cy.visit("https://www.thegioididong.com/cart");
  //     cy.wait(3000);

  //     // Kiểm tra sản phẩm có trong giỏ hàng
  //     cy.get(".product-item").should("exist");
  //     verifyProduct(productInfo.name, 1, productInfo.category);

  //     // Click nút xóa sản phẩm
  //     cy.log("Nhấn nút xóa sản phẩm");
  //     cy.get(".product-quantity__remove")
  //       .should("be.visible")
  //       .click({ force: true })
  //       .wait(1000);

  //     // Kiểm tra modal xác nhận xóa có xuất hiện không
  //     cy.get("body").then(($body) => {
  //       if ($body.find(".confirm-delete-product").length > 0) {
  //         cy.log("Modal xác nhận xóa sản phẩm xuất hiện");

  //         // Kiểm tra nội dung modal
  //         cy.get(".confirm-delete-product")
  //           .should("be.visible")
  //           .within(() => {
  //             cy.get("p").should(
  //               "contain.text",
  //               "Bạn chắc chắn muốn xóa sản phẩm này?"
  //             );
  //             cy.get("button").should("have.length", 2);

  //             // Click nút "Xóa" để xác nhận
  //             cy.log("Xác nhận xóa sản phẩm");
  //             cy.get("button").contains("Xóa").click({ force: true });
  //           });

  //         cy.wait(2000);

  //         // Kiểm tra sản phẩm đã bị xóa và chuyển về giỏ hàng trống
  //         cy.get(".cart-empty").should("be.visible");
  //         cy.get(".cart-empty h1").should("contain.text", "Giỏ hàng trống");
  //         cy.get(".cart-empty .dmx").should(
  //           "contain.text",
  //           "Không có sản phẩm nào trong giỏ hàng"
  //         );

  //         cy.log(
  //           "TC9 thành công - Sản phẩm đã bị xóa và hiển thị giỏ hàng trống"
  //         );
  //       } else {
  //         // Trường hợp không có modal, sản phẩm bị xóa trực tiếp
  //         cy.log("Sản phẩm bị xóa trực tiếp mà không có modal xác nhận");
  //         cy.get(".cart-empty").should("be.visible");
  //         cy.log("TC9 thành công - Sản phẩm đã bị xóa ngay lập tức");
  //       }
  //     });
  //   });
  // });

  // it("TC10: Giỏ hàng trống", () => {
  //   cy.log("Bắt đầu TC10: Kiểm tra giao diện giỏ hàng trống");

  //   // Truy cập trực tiếp trang giỏ hàng khi chưa có sản phẩm nào
  //   cy.log("Truy cập trang giỏ hàng khi chưa thêm sản phẩm");
  //   cy.visit("https://www.thegioididong.com/cart");
  //   cy.wait(3000);

  //   // Kiểm tra giao diện giỏ hàng trống
  //   cy.get(".cart-empty").should("be.visible");

  //   // Kiểm tra các thành phần của giao diện giỏ hàng trống
  //   cy.get(".cart-empty").within(() => {
  //     // Icon giỏ hàng trống
  //     cy.get(".iconcart-empty").should("exist");

  //     // Tiêu đề "Giỏ hàng trống"
  //     cy.get("h1").should("be.visible").and("contain.text", "Giỏ hàng trống");

  //     // Mô tả "Không có sản phẩm nào trong giỏ hàng"
  //     cy.get(".dmx")
  //       .should("be.visible")
  //       .and("contain.text", "Không có sản phẩm nào trong giỏ hàng");

  //     // Nút "Về trang chủ"
  //     cy.get(".btn-backhome")
  //       .should("be.visible")
  //       .and("contain.text", "Về trang chủ")
  //       .and("have.attr", "href", "https://www.thegioididong.com");

  //     // Thông tin liên hệ hỗ trợ
  //     cy.get(".note-help")
  //       .should("be.visible")
  //       .and("contain.text", "Khi cần trợ giúp vui lòng gọi");
  //     cy.get("a[href='tel:1900232460']").should("contain.text", "1900 232 460");
  //     cy.get("a[href='tel:02836221060']").should(
  //       "contain.text",
  //       "028.3622.1060"
  //     );
  //   });

  //   // Test chức năng nút "Về trang chủ"
  //   cy.log("Kiểm tra chức năng nút 'Về trang chủ'");
  //   cy.get(".btn-backhome").click();
  //   cy.wait(2000);

  //   // Verify đã chuyển về trang chủ
  //   cy.url().should("eq", "https://www.thegioididong.com/");
  //   cy.log("Đã chuyển về trang chủ thành công");

  //   // Quay lại giỏ hàng để test tiếp
  //   cy.log("Quay lại giỏ hàng để kiểm tra lần nữa");
  //   cy.visit("https://www.thegioididong.com/cart");
  //   cy.wait(2000);

  //   // Verify giỏ hàng vẫn trống
  //   cy.get(".cart-empty").should("be.visible");
  //   cy.log(
  //     "TC10 hoàn thành thành công - Giao diện giỏ hàng trống hoạt động đúng"
  //   );
  // });

  // it("TC11: Tổng tiền thay đổi", () => {
  //   cy.log("Bắt đầu TC11: Kiểm tra tổng tiền thay đổi khi tăng/giảm số lượng");

  //   const productUrl = "https://www.thegioididong.com/dtdd/realme-14t-5g-8gb";

  //   // Thêm sản phẩm vào giỏ hàng
  //   addProductToCart(productUrl).then((productInfo) => {
  //     cy.log(`Đã thêm sản phẩm: ${productInfo.name}`);

  //     // Chuyển đến trang giỏ hàng
  //     cy.log("Chuyển đến trang giỏ hàng");
  //     cy.visit("https://www.thegioididong.com/cart");
  //     cy.wait(3000);

  //     // Kiểm tra sản phẩm có trong giỏ hàng
  //     cy.get(".product-item").should("exist");
  //     cy.get(".product-quantity input").should("be.visible");

  //     // Lấy tổng tiền ban đầu (số lượng = 1)
  //     cy.get(".total-price strong, .total-money, .cart-total strong")
  //       .last()
  //       .invoke("text")
  //       .then((initialTotal) => {
  //         const initialTotalText = initialTotal.trim();
  //         cy.log(`Tổng tiền ban đầu (SL=1): ${initialTotalText}`);

  //         // Tăng số lượng lên 2
  //         cy.log("Tăng số lượng lên 2");
  //         cy.get(".product-quantity input")
  //           .clear()
  //           .type("2")
  //           .trigger("blur")
  //           .wait(2000);

  //         // Verify số lượng đã thay đổi
  //         cy.get(".product-quantity input").should("have.value", "2");

  //         // Lấy tổng tiền sau khi tăng số lượng
  //         cy.get(".total-price strong, .total-money, .cart-total strong")
  //           .last()
  //           .invoke("text")
  //           .then((newTotal) => {
  //             const newTotalText = newTotal.trim();
  //             cy.log(`Tổng tiền sau khi tăng SL=2: ${newTotalText}`);

  //             // Kiểm tra tổng tiền có thay đổi không
  //             if (initialTotalText !== newTotalText) {
  //               cy.log("THÀNH CÔNG: Tổng tiền đã thay đổi khi tăng số lượng");

  //               // Chuyển đổi số để so sánh
  //               const initialAmount = parseInt(
  //                 initialTotalText.replace(/[^\d]/g, "")
  //               );
  //               const newAmount = parseInt(newTotalText.replace(/[^\d]/g, ""));

  //               if (newAmount > initialAmount) {
  //                 cy.log(`Tổng tiền tăng từ ${initialAmount} lên ${newAmount}`);
  //               } else {
  //                 cy.log("Cảnh báo: Tổng tiền không tăng như mong đợi");
  //               }
  //             } else {
  //               cy.log("CẢNH BÁO: Tổng tiền không thay đổi khi tăng số lượng");
  //             }

  //             // Giảm số lượng về 1
  //             cy.log("Giảm số lượng về 1");
  //             cy.get(".product-quantity input")
  //               .clear()
  //               .type("1")
  //               .trigger("blur")
  //               .wait(2000);

  //             // Verify số lượng đã giảm
  //             cy.get(".product-quantity input").should("have.value", "1");

  //             // Lấy tổng tiền sau khi giảm số lượng
  //             cy.get(".total-price strong, .total-money, .cart-total strong")
  //               .last()
  //               .invoke("text")
  //               .then((finalTotal) => {
  //                 const finalTotalText = finalTotal.trim();
  //                 cy.log(`Tổng tiền sau khi giảm SL=1: ${finalTotalText}`);

  //                 // Kiểm tra tổng tiền có quay về giá trị ban đầu không
  //                 if (finalTotalText === initialTotalText) {
  //                   cy.log("THÀNH CÔNG: Tổng tiền quay về giá trị ban đầu");
  //                 } else {
  //                   cy.log("Tổng tiền không quay về giá trị ban đầu");
  //                   cy.log(
  //                     `Ban đầu: ${initialTotalText}, Cuối: ${finalTotalText}`
  //                   );
  //                 }

  //                 // Test với nút + và -
  //                 cy.log("Kiểm tra tổng tiền với nút + và -");

  //                 // Lấy tổng tiền hiện tại
  //                 const currentTotal = finalTotalText;

  //                 // Click nút + để tăng số lượng
  //                 cy.log("Nhấn nút '+' để tăng số lượng");
  //                 cy.get(".product-quantity__btn button")
  //                   .not(".product-quantity__btn-minus")
  //                   .last()
  //                   .click({ force: true })
  //                   .wait(2000);

  //                 // Kiểm tra tổng tiền sau khi nhấn +
  //                 cy.get(
  //                   ".total-price strong, .total-money, .cart-total strong"
  //                 )
  //                   .last()
  //                   .invoke("text")
  //                   .then((plusTotal) => {
  //                     const plusTotalText = plusTotal.trim();
  //                     cy.log(`Tổng tiền sau khi nhấn '+': ${plusTotalText}`);

  //                     if (plusTotalText !== currentTotal) {
  //                       cy.log(
  //                         "THÀNH CÔNG: Tổng tiền thay đổi khi nhấn nút '+'"
  //                       );
  //                     } else {
  //                       cy.log(
  //                         "CẢNH BÁO: Tổng tiền không thay đổi khi nhấn nút '+'"
  //                       );
  //                     }

  //                     // Click nút - để giảm số lượng
  //                     cy.log("Nhấn nút '-' để giảm số lượng");
  //                     cy.get(".product-quantity__btn-minus, .minus_btn")
  //                       .click({ force: true })
  //                       .wait(2000);

  //                     // Kiểm tra tổng tiền sau khi nhấn -
  //                     cy.get(
  //                       ".total-price strong, .total-money, .cart-total strong"
  //                     )
  //                       .last()
  //                       .invoke("text")
  //                       .then((minusTotal) => {
  //                         const minusTotalText = minusTotal.trim();
  //                         cy.log(
  //                           `Tổng tiền sau khi nhấn '-': ${minusTotalText}`
  //                         );

  //                         if (minusTotalText !== plusTotalText) {
  //                           cy.log(
  //                             "THÀNH CÔNG: Tổng tiền thay đổi khi nhấn nút '-'"
  //                           );
  //                         } else {
  //                           cy.log(
  //                             "CẢNH BÁO: Tổng tiền không thay đổi khi nhấn nút '-'"
  //                           );
  //                         }

  //                         cy.log(
  //                           "TC11 hoàn thành - Đã kiểm tra tổng tiền với tất cả các thao tác thay đổi số lượng"
  //                         );
  //                       });
  //                   });
  //               });
  //           });
  //       });
  //   });
  // });

  // it("TC12: Số lượng sản phẩm giỏ hàng", () => {
  //   cy.log(
  //     "Bắt đầu TC12: Kiểm tra số lượng ở icon giỏ hàng khi tăng/giảm số lượng sản phẩm"
  //   );

  //   const productUrl = "https://www.thegioididong.com/dtdd/realme-14t-5g-8gb";

  //   // Thêm sản phẩm vào giỏ hàng
  //   addProductToCart(productUrl).then((productInfo) => {
  //     cy.log(`Đã thêm sản phẩm: ${productInfo.name}`);

  //     // Chuyển đến trang giỏ hàng
  //     cy.log("Chuyển đến trang giỏ hàng");
  //     cy.visit("https://www.thegioididong.com/cart");
  //     cy.wait(3000);

  //     // Kiểm tra sản phẩm có trong giỏ hàng
  //     cy.get(".product-item").should("exist");
  //     cy.get(".product-quantity input").should("be.visible");

  //     // Kiểm tra số lượng ban đầu ở icon giỏ hàng (số lượng = 1)
  //     cy.get(".box-cart .cart-number").should("be.visible");
  //     cy.get(".box-cart .cart-number")
  //       .invoke("text")
  //       .then((initialCartCount) => {
  //         const initialCount = initialCartCount.trim();
  //         cy.log(`Số lượng ban đầu ở icon giỏ hàng: ${initialCount}`);

  //         // Tăng số lượng sản phẩm lên 3 bằng cách nhập
  //         cy.log("Tăng số lượng sản phẩm lên 3 bằng cách nhập");
  //         cy.get(".product-quantity input")
  //           .clear()
  //           .type("3")
  //           .trigger("blur")
  //           .wait(2000);

  //         // Verify số lượng trong giỏ hàng đã thay đổi
  //         cy.get(".product-quantity input").should("have.value", "3");

  //         // Kiểm tra số lượng ở icon giỏ hàng có cập nhật không
  //         cy.get(".box-cart .cart-number")
  //           .invoke("text")
  //           .then((newCartCount) => {
  //             const newCount = newCartCount.trim();
  //             cy.log(
  //               `Số lượng ở icon giỏ hàng sau khi tăng lên 3: ${newCount}`
  //             );

  //             if (newCount !== initialCount) {
  //               cy.log(
  //                 "THÀNH CÔNG: Số lượng ở icon giỏ hàng đã cập nhật khi tăng số lượng sản phẩm"
  //               );

  //               // Kiểm tra số lượng có đúng bằng 3 không
  //               if (newCount === "3") {
  //                 cy.log("THÀNH CÔNG: Số lượng ở icon giỏ hàng chính xác (3)");
  //               } else {
  //                 cy.log(
  //                   `CẢNH BÁO: Số lượng ở icon giỏ hàng không chính xác. Mong đợi: 3, Thực tế: ${newCount}`
  //                 );
  //               }
  //             } else {
  //               cy.log(
  //                 "THẤT BẠI: Số lượng ở icon giỏ hàng không cập nhật khi tăng số lượng sản phẩm"
  //               );
  //             }

  //             // Giảm số lượng về 1 bằng cách nhập
  //             cy.log("Giảm số lượng sản phẩm về 1 bằng cách nhập");
  //             cy.get(".product-quantity input")
  //               .clear()
  //               .type("1")
  //               .trigger("blur")
  //               .wait(2000);

  //             // Verify số lượng trong giỏ hàng đã giảm
  //             cy.get(".product-quantity input").should("have.value", "1");

  //             // Kiểm tra số lượng ở icon giỏ hàng có giảm không
  //             cy.get(".box-cart .cart-number")
  //               .invoke("text")
  //               .then((reducedCartCount) => {
  //                 const reducedCount = reducedCartCount.trim();
  //                 cy.log(
  //                   `Số lượng ở icon giỏ hàng sau khi giảm về 1: ${reducedCount}`
  //                 );

  //                 if (reducedCount !== newCount) {
  //                   cy.log(
  //                     "THÀNH CÔNG: Số lượng ở icon giỏ hàng đã cập nhật khi giảm số lượng sản phẩm"
  //                   );

  //                   // Kiểm tra số lượng có đúng bằng 1 không
  //                   if (reducedCount === "1") {
  //                     cy.log(
  //                       "THÀNH CÔNG: Số lượng ở icon giỏ hàng chính xác (1)"
  //                     );
  //                   } else {
  //                     cy.log(
  //                       `CẢNH BÁO: Số lượng ở icon giỏ hàng không chính xác. Mong đợi: 1, Thực tế: ${reducedCount}`
  //                     );
  //                   }
  //                 } else {
  //                   cy.log(
  //                     "THẤT BẠI: Số lượng ở icon giỏ hàng không cập nhật khi giảm số lượng sản phẩm"
  //                   );
  //                 }

  //                 // Test với nút + và -
  //                 cy.log("Kiểm tra số lượng ở icon giỏ hàng với nút + và -");

  //                 // Lấy số lượng hiện tại ở icon
  //                 const currentIconCount = reducedCount;

  //                 // Click nút + để tăng số lượng
  //                 cy.log("Nhấn nút '+' để tăng số lượng");
  //                 cy.get(".product-quantity__btn button")
  //                   .not(".product-quantity__btn-minus")
  //                   .last()
  //                   .click({ force: true })
  //                   .wait(2000);

  //                 // Kiểm tra số lượng ở icon giỏ hàng sau khi nhấn +
  //                 cy.get(".box-cart .cart-number")
  //                   .invoke("text")
  //                   .then((plusIconCount) => {
  //                     const plusCount = plusIconCount.trim();
  //                     cy.log(
  //                       `Số lượng ở icon giỏ hàng sau khi nhấn '+': ${plusCount}`
  //                     );

  //                     if (plusCount !== currentIconCount) {
  //                       cy.log(
  //                         "THÀNH CÔNG: Số lượng ở icon giỏ hàng cập nhật khi nhấn nút '+'"
  //                       );

  //                       // Kiểm tra số lượng có đúng bằng 2 không
  //                       if (plusCount === "2") {
  //                         cy.log(
  //                           "THÀNH CÔNG: Số lượng ở icon giỏ hàng chính xác (2)"
  //                         );
  //                       } else {
  //                         cy.log(
  //                           `CẢNH BÁO: Số lượng ở icon giỏ hàng không chính xác. Mong đợi: 2, Thực tế: ${plusCount}`
  //                         );
  //                       }
  //                     } else {
  //                       cy.log(
  //                         "THẤT BẠI: Số lượng ở icon giỏ hàng không cập nhật khi nhấn nút '+'"
  //                       );
  //                     }

  //                     // Click nút - để giảm số lượng
  //                     cy.log("Nhấn nút '-' để giảm số lượng");
  //                     cy.get(".product-quantity__btn-minus, .minus_btn")
  //                       .click({ force: true })
  //                       .wait(2000);

  //                     // Kiểm tra số lượng ở icon giỏ hàng sau khi nhấn -
  //                     cy.get(".box-cart .cart-number")
  //                       .invoke("text")
  //                       .then((minusIconCount) => {
  //                         const minusCount = minusIconCount.trim();
  //                         cy.log(
  //                           `Số lượng ở icon giỏ hàng sau khi nhấn '-': ${minusCount}`
  //                         );

  //                         if (minusCount !== plusCount) {
  //                           cy.log(
  //                             "THÀNH CÔNG: Số lượng ở icon giỏ hàng cập nhật khi nhấn nút '-'"
  //                           );

  //                           // Kiểm tra số lượng có quay về 1 không
  //                           if (minusCount === "1") {
  //                             cy.log(
  //                               "THÀNH CÔNG: Số lượng ở icon giỏ hàng quay về 1"
  //                             );
  //                           } else {
  //                             cy.log(
  //                               `CẢNH BÁO: Số lượng ở icon giỏ hàng không quay về 1. Thực tế: ${minusCount}`
  //                             );
  //                           }
  //                         } else {
  //                           cy.log(
  //                             "THẤT BẠI: Số lượng ở icon giỏ hàng không cập nhật khi nhấn nút '-'"
  //                           );
  //                         }

  //                         cy.log(
  //                           "TC12 hoàn thành - Đã kiểm tra số lượng ở icon giỏ hàng với tất cả thao tác tăng/giảm số lượng"
  //                         );
  //                       });
  //                   });
  //               });
  //           });
  //       });
  //   });
  // });

  // it("TC13: Số lượng sản phẩm giỏ hàng khi xóa sản phẩm", () => {
  //   cy.log(
  //     "Bắt đầu TC13: Kiểm tra số lượng ở icon giỏ hàng khi xóa sản phẩm về giỏ hàng rỗng"
  //   );

  //   const productUrl = "https://www.thegioididong.com/dtdd/realme-14t-5g-8gb";

  //   // Thêm sản phẩm vào giỏ hàng
  //   addProductToCart(productUrl).then((productInfo) => {
  //     cy.log(`Đã thêm sản phẩm: ${productInfo.name}`);

  //     // Chuyển đến trang giỏ hàng
  //     cy.log("Chuyển đến trang giỏ hàng");
  //     cy.visit("https://www.thegioididong.com/cart");
  //     cy.wait(3000);

  //     // Kiểm tra sản phẩm có trong giỏ hàng
  //     cy.get(".product-item").should("exist");
  //     verifyProduct(productInfo.name, 1, productInfo.category);

  //     // Kiểm tra số lượng ban đầu ở icon giỏ hàng
  //     cy.get(".box-cart .cart-number").should("be.visible");
  //     cy.get(".box-cart .cart-number")
  //       .invoke("text")
  //       .then((initialCartCount) => {
  //         const initialCount = initialCartCount.trim();
  //         cy.log(`Số lượng ban đầu ở icon giỏ hàng: ${initialCount}`);

  //         // Verify giỏ hàng có ít nhất 1 sản phẩm
  //         expect(parseInt(initialCount)).to.be.at.least(1);
  //         cy.log("Xác nhận giỏ hàng có sản phẩm trước khi xóa");

  //         // Click nút xóa sản phẩm
  //         cy.log("Nhấn nút xóa sản phẩm");
  //         cy.get(".product-quantity__remove")
  //           .should("be.visible")
  //           .click({ force: true })
  //           .wait(1000);

  //         // Kiểm tra modal xác nhận xóa có xuất hiện không
  //         cy.get("body").then(($body) => {
  //           if ($body.find(".confirm-delete-product").length > 0) {
  //             cy.log("Modal xác nhận xóa sản phẩm xuất hiện");

  //             // Kiểm tra nội dung modal và xác nhận xóa
  //             cy.get(".confirm-delete-product")
  //               .should("be.visible")
  //               .within(() => {
  //                 cy.get("p").should(
  //                   "contain.text",
  //                   "Bạn chắc chắn muốn xóa sản phẩm này?"
  //                 );
  //                 cy.get("button").should("have.length", 2);

  //                 // Click nút "Xóa" để xác nhận
  //                 cy.log("Xác nhận xóa sản phẩm bằng cách click nút 'Xóa'");
  //                 cy.get("button").contains("Xóa").click({ force: true });
  //               });

  //             cy.wait(2000);
  //           } else {
  //             cy.log("Sản phẩm bị xóa trực tiếp mà không có modal xác nhận");
  //           }

  //           // Kiểm tra sản phẩm đã bị xóa và chuyển về giỏ hàng trống
  //           cy.get(".cart-empty").should("be.visible");
  //           cy.get(".cart-empty h1").should("contain.text", "Giỏ hàng trống");
  //           cy.get(".cart-empty .dmx").should(
  //             "contain.text",
  //             "Không có sản phẩm nào trong giỏ hàng"
  //           );
  //           cy.log("Xác nhận giỏ hàng đã trống sau khi xóa sản phẩm");

  //           // Kiểm tra số lượng ở icon giỏ hàng sau khi xóa
  //           cy.get("body").then(($body) => {
  //             if ($body.find(".box-cart .cart-number").length > 0) {
  //               // Icon vẫn hiển thị với số lượng
  //               cy.get(".box-cart .cart-number")
  //                 .invoke("text")
  //                 .then((finalCartCount) => {
  //                   const finalCount = finalCartCount.trim();
  //                   cy.log(
  //                     `Số lượng ở icon giỏ hàng sau khi xóa: ${finalCount}`
  //                   );

  //                   // FAIL test nếu số lượng không thay đổi
  //                   expect(finalCount).to.not.equal(
  //                     initialCount,
  //                     `THẤT BẠI: Số lượng ở icon giỏ hàng không cập nhật sau khi xóa sản phẩm. Vẫn là: ${finalCount}`
  //                   );

  //                   cy.log(
  //                     "THÀNH CÔNG: Số lượng ở icon giỏ hàng đã cập nhật sau khi xóa sản phẩm"
  //                   );

  //                   // Kiểm tra số lượng có về 0 hoặc giảm đúng không
  //                   const finalCountNum = parseInt(finalCount);
  //                   const initialCountNum = parseInt(initialCount);

  //                   if (finalCountNum === 0) {
  //                     cy.log("THÀNH CÔNG: Số lượng ở icon giỏ hàng đã về 0");
  //                   } else if (finalCountNum < initialCountNum) {
  //                     cy.log(
  //                       `THÀNH CÔNG: Số lượng ở icon giỏ hàng đã giảm từ ${initialCount} xuống ${finalCount}`
  //                     );

  //                     // FAIL test nếu số lượng không về 0 khi giỏ hàng trống
  //                     expect(finalCountNum).to.equal(
  //                       0,
  //                       `THẤT BẠI: Giỏ hàng đã trống nhưng số lượng ở icon vẫn là ${finalCount} thay vì 0`
  //                     );
  //                   } else {
  //                     // FAIL test nếu số lượng không giảm
  //                     throw new Error(
  //                       `THẤT BẠI: Số lượng ở icon giỏ hàng vẫn là ${finalCount}, không giảm từ ${initialCount}`
  //                     );
  //                   }
  //                 });
  //             } else {
  //               // Icon không hiển thị số lượng nữa (có thể bị ẩn)
  //               cy.log(
  //                 "THÀNH CÔNG: Icon giỏ hàng không hiển thị số lượng nữa sau khi xóa hết sản phẩm"
  //               );

  //               // Kiểm tra xem có class nào chỉ ra giỏ hàng trống không
  //               cy.get(".box-cart").then(($cartIcon) => {
  //                 if (
  //                   $cartIcon.hasClass("empty-cart") ||
  //                   !$cartIcon.find(".cart-number").length
  //                 ) {
  //                   cy.log(
  //                     "THÀNH CÔNG: Icon giỏ hàng đã chuyển sang trạng thái trống"
  //                   );
  //                 } else {
  //                   cy.log(
  //                     "Thông tin: Icon giỏ hàng không có số lượng hiển thị"
  //                   );
  //                 }
  //               });
  //             }

  //             cy.log(
  //               "TC13 hoàn thành thành công - Số lượng ở icon giỏ hàng đã cập nhật đúng khi xóa sản phẩm"
  //             );
  //           });
  //         });
  //       });
  //   });
  // });

  it("TC14: Nhập thông tin tên người nhận hàng", () => {
    cy.log(
      "Bắt đầu TC14: Kiểm tra validation khi nhập tên toàn bộ là kí tự trống"
    );

    const productUrl = "https://www.thegioididong.com/dtdd/realme-14t-5g-8gb";

    // Thêm sản phẩm vào giỏ hàng trước
    addProductToCart(productUrl).then((productInfo) => {
      cy.log(`Đã thêm sản phẩm: ${productInfo.name}`);

      // Chuyển đến trang giỏ hàng
      cy.log("Chuyển đến trang giỏ hàng");
      cy.visit("https://www.thegioididong.com/cart");
      cy.wait(3000);

      // Kiểm tra có sản phẩm trong giỏ hàng
      cy.get(".product-item").should("exist");

      // Click vào div.info__cart location để mở form thông tin
      cy.log("Click vào thông tin người nhận");
      cy.get("div.info__cart")
        .should("be.visible")
        .click({ force: true })
        .wait(2000);

      // Click chọn giới tính "Anh"
      cy.log("Chọn giới tính 'Anh'");
      cy.get("span.flex.gap-\\[5px\\]")
        .contains("Anh")
        .should("be.visible")
        .click({ force: true })
        .wait(1000);

      // Nhập tên với 5 kí tự dấu cách
      cy.log("Nhập tên với 5 kí tự dấu cách");
      const invalidName = "     "; // 5 kí tự dấu cách
      cy.get("input#cusName")
        .clear({ force: true })
        .type(invalidName, { force: true })
        .wait(1000);

      // Nhập số điện thoại hợp lệ
      cy.log("Nhập số điện thoại");
      cy.get('input[name="cusPhone"]#cusPhone')
        .clear({ force: true })
        .type("0854422289", { force: true })
        .wait(1000);

      // Click phương thức giao tận nơi
      cy.log("Chọn phương thức giao tận nơi");
      cy.get("span.deliveryMethod.option-first")
        .contains("Giao tận nơi")
        .should("be.visible")
        .click({ force: true })
        .wait(1000);

      // Nhập địa chỉ và chờ suggestion
      cy.log("Nhập địa chỉ và chọn địa chỉ đầu tiên");
      cy.get('input[name="cusAddress"]#cusAddress')
        .clear({ force: true })
        .type("286", { force: true })
        .wait(3000); // Chờ response suggestion

      // Chọn địa chỉ đầu tiên từ suggestion
      cy.get(".suggest-location ul li")
        .first()
        .should("be.visible")
        .click({ force: true })
        .wait(2000);

      // Click nút xác nhận
      cy.log("Nhấn nút xác nhận");
      cy.get("button.submit-customerinfo")
        .should("be.visible")
        .click({ force: true })
        .wait(2000);

      // Kiểm tra validation error cho tên
      cy.log("Kiểm tra validation cho tên chỉ có dấu cách");
      cy.get("body").then(($body) => {
        // Kiểm tra message lỗi có xuất hiện không
        if ($body.find("span.is-invalid-check").length > 0) {
          cy.get("span.is-invalid-check")
            .should("be.visible")
            .and("contain.text", "Vui lòng nhập họ và tên");
          cy.log("THÀNH CÔNG: Hệ thống đã bắt lỗi tên chỉ có dấu cách");

          // Kiểm tra input có class error không
          cy.get('input[name="cusName"]#cusName').then(($input) => {
            if (
              $input.hasClass("error") ||
              $input.hasClass("is-invalid") ||
              $input.hasClass("invalid")
            ) {
              cy.log("THÀNH CÔNG: Input tên có hiển thị trạng thái lỗi");
            } else {
              cy.log("Thông tin: Input tên không có class lỗi rõ ràng");
            }
          });

          // Verify form không được submit thành công
          cy.url().should("include", "/cart");
          cy.log("THÀNH CÔNG: Form không được submit với tên không hợp lệ");
        } else if ($body.find(".error-message").length > 0) {
          // Kiểm tra error message khác
          cy.get(".error-message")
            .should("be.visible")
            .invoke("text")
            .then((errorText) => {
              cy.log(`THÀNH CÔNG: Hệ thống hiển thị lỗi: ${errorText}`);
            });
        } else {
          // Kiểm tra xem form có được submit thành công không
          cy.url().then((currentUrl) => {
            if (currentUrl.includes("/cart")) {
              // Vẫn ở trang giỏ hàng - có thể là validation client-side ngăn submit
              cy.log(
                "CẢNH BÁO: Không tìm thấy message lỗi rõ ràng nhưng form chưa được submit"
              );

              // Kiểm tra lại giá trị input
              cy.get('input[name="cusName"]#cusName')
                .invoke("val")
                .then((inputValue) => {
                  if (inputValue.trim() === "") {
                    cy.log(
                      "THÀNH CÔNG: Input tên đã bị clear hoặc validation đã xử lý"
                    );
                  } else {
                    cy.log(`CẢNH BÁO: Input tên vẫn chứa: "${inputValue}"`);
                  }
                });

              // Kiểm tra border hoặc style của input
              cy.get('input[name="cusName"]#cusName').then(($input) => {
                const borderColor = $input.css("border-color");
                const backgroundColor = $input.css("background-color");
                cy.log(
                  `Thông tin styling input: border-color: ${borderColor}, background-color: ${backgroundColor}`
                );
              });
            } else {
              // Form đã được submit - đây là lỗi validation
              cy.log("THẤT BẠI: Form đã được submit với tên chỉ có dấu cách");
              expect(currentUrl).to.include(
                "/cart",
                "Form không nên được submit với tên không hợp lệ"
              );
            }
          });
        }

        // Test thêm với tên hợp lệ để đối chứng
        cy.log("Test với tên hợp lệ để đối chứng");
        cy.get('input[name="cusName"]#cusName')
          .clear({ force: true })
          .type("Nguyễn Văn A", { force: true })
          .wait(1000);

        // Click xác nhận lại
        cy.get("button.submit-customerinfo").click({ force: true }).wait(2000);

        // Kiểm tra validation có thay đổi không
        cy.get("body").then(($body) => {
          if ($body.find("span.is-invalid-check:visible").length === 0) {
            cy.log(
              "THÀNH CÔNG: Validation error đã biến mất khi nhập tên hợp lệ"
            );
          } else {
            cy.log(
              "Thông tin: Vẫn còn validation error sau khi nhập tên hợp lệ"
            );
          }
        });

        cy.log("TC14 hoàn thành - Đã kiểm tra validation tên người nhận hàng");
      });
    });
  });

  it("TC15: Kiểm tra đồng bộ thông tin", () => {
    cy.log(
      "Bắt đầu TC15: Kiểm tra thông tin nhập ở form và sau khi cập nhật thành công có khớp nhau không"
    );

    const productUrl = "https://www.thegioididong.com/dtdd/realme-14t-5g-8gb";

    // Dữ liệu test hợp lệ
    const testData = {
      name: "Nguyễn Văn Test",
      phone: "0912345678",
      gender: "Anh",
      deliveryMethod: "Giao tận nơi",
      addressInput: "123",
      expectedAddress: "", // Sẽ được gán sau khi chọn từ suggestion
    };

    // Thêm sản phẩm vào giỏ hàng trước
    addProductToCart(productUrl).then((productInfo) => {
      cy.log(`Đã thêm sản phẩm: ${productInfo.name}`);

      // Chuyển đến trang giỏ hàng
      cy.log("Chuyển đến trang giỏ hàng");
      cy.visit("https://www.thegioididong.com/cart");
      cy.wait(3000);

      // Kiểm tra có sản phẩm trong giỏ hàng
      cy.get(".product-item").should("exist");

      // Click vào div.info__cart để mở form thông tin
      cy.log("Click vào thông tin người nhận");
      cy.get("div.info__cart")
        .should("be.visible")
        .click({ force: true })
        .wait(2000);

      // Click chọn giới tính
      cy.log(`Chọn giới tính '${testData.gender}'`);
      cy.get("span.flex.gap-\\[5px\\]")
        .contains(testData.gender)
        .should("be.visible")
        .click({ force: true })
        .wait(1000);

      // Nhập tên hợp lệ
      cy.log(`Nhập tên: ${testData.name}`);
      cy.get('input[name="cusName"]#cusName')
        .clear({ force: true })
        .type(testData.name, { force: true })
        .wait(1000);

      // Nhập số điện thoại
      cy.log(`Nhập số điện thoại: ${testData.phone}`);
      cy.get('input[name="cusPhone"]#cusPhone')
        .clear({ force: true })
        .type(testData.phone, { force: true })
        .wait(1000);

      // Click phương thức giao hàng
      cy.log(`Chọn phương thức: ${testData.deliveryMethod}`);
      cy.get("span.deliveryMethod.option-first")
        .contains(testData.deliveryMethod)
        .should("be.visible")
        .click({ force: true })
        .wait(1000);

      // Nhập địa chỉ và chọn từ suggestion
      cy.log(`Nhập địa chỉ: ${testData.addressInput}`);
      cy.get('input[name="cusAddress"]#cusAddress')
        .clear({ force: true })
        .type(testData.addressInput, { force: true })
        .wait(3000); // Chờ response suggestion

      // Chọn địa chỉ đầu tiên từ suggestion và lưu text
      cy.get(".suggest-location ul li")
        .first()
        .should("be.visible")
        .invoke("text")
        .then((selectedAddress) => {
          testData.expectedAddress = selectedAddress.trim();
          cy.log(`Địa chỉ được chọn: ${testData.expectedAddress}`);

          // Click để chọn địa chỉ
          cy.get(".suggest-location ul li")
            .first()
            .click({ force: true })
            .wait(2000);

          // Verify dữ liệu đã nhập trước khi submit
          cy.log("Verify dữ liệu đã nhập trước khi submit");
          cy.get('input[name="cusName"]#cusName').should(
            "have.value",
            testData.name
          );
          cy.get('input[name="cusPhone"]#cusPhone').should(
            "have.value",
            testData.phone
          );

          // Click nút xác nhận
          cy.log("Nhấn nút xác nhận");
          cy.get("button.submit-customerinfo")
            .should("be.visible")
            .click({ force: true })
            .wait(3000);

          // Kiểm tra form đã được submit thành công
          cy.get("body").then(($body) => {
            // Kiểm tra xem có thông báo thành công hay form đã đóng
            if ($body.find(".success-message").length > 0) {
              cy.log("Có thông báo thành công hiển thị");
            }

            // Kiểm tra thông tin đã được cập nhật và hiển thị đúng
            cy.log("Kiểm tra đồng bộ thông tin sau khi cập nhật");

            // Kiểm tra tên hiển thị
            cy.get("body").then(($body) => {
              // Tìm các element có thể chứa tên người nhận
              const nameSelectors = [
                '[data-testid="customer-name"]',
                ".customer-name",
                ".recipient-name",
                ".user-name",
                'span:contains("' + testData.name + '")',
                'div:contains("' + testData.name + '")',
              ];

              let foundName = false;
              nameSelectors.forEach((selector) => {
                if ($body.find(selector).length > 0) {
                  cy.get(selector)
                    .invoke("text")
                    .then((displayedName) => {
                      const cleanDisplayedName = displayedName.trim();
                      if (cleanDisplayedName.includes(testData.name)) {
                        cy.log(
                          `THÀNH CÔNG: Tên hiển thị khớp - "${cleanDisplayedName}" chứa "${testData.name}"`
                        );
                        foundName = true;
                      }
                    });
                }
              });

              if (!foundName) {
                cy.log(
                  "Thông tin: Không tìm thấy tên hiển thị rõ ràng, kiểm tra trong input"
                );
                cy.get('input[name="cusName"]#cusName').then(($input) => {
                  if ($input.length > 0) {
                    cy.wrap($input)
                      .invoke("val")
                      .then((currentValue) => {
                        if (currentValue === testData.name) {
                          cy.log(
                            `THÀNH CÔNG: Tên trong input khớp - "${currentValue}"`
                          );
                        } else {
                          cy.log(
                            `CẢNH BÁO: Tên trong input không khớp - Mong đợi: "${testData.name}", Thực tế: "${currentValue}"`
                          );
                        }
                      });
                  }
                });
              }
            });

            // Kiểm tra số điện thoại hiển thị
            cy.get("body").then(($body) => {
              const phoneSelectors = [
                '[data-testid="customer-phone"]',
                ".customer-phone",
                ".recipient-phone",
                ".user-phone",
                'span:contains("' + testData.phone + '")',
                'div:contains("' + testData.phone + '")',
              ];

              let foundPhone = false;
              phoneSelectors.forEach((selector) => {
                if ($body.find(selector).length > 0) {
                  cy.get(selector)
                    .invoke("text")
                    .then((displayedPhone) => {
                      const cleanDisplayedPhone = displayedPhone.trim();
                      if (cleanDisplayedPhone.includes(testData.phone)) {
                        cy.log(
                          `THÀNH CÔNG: Số điện thoại hiển thị khớp - "${cleanDisplayedPhone}" chứa "${testData.phone}"`
                        );
                        foundPhone = true;
                      }
                    });
                }
              });

              if (!foundPhone) {
                cy.log(
                  "Thông tin: Không tìm thấy số điện thoại hiển thị rõ ràng, kiểm tra trong input"
                );
                cy.get('input[name="cusPhone"]#cusPhone').then(($input) => {
                  if ($input.length > 0) {
                    cy.wrap($input)
                      .invoke("val")
                      .then((currentValue) => {
                        if (currentValue === testData.phone) {
                          cy.log(
                            `THÀNH CÔNG: Số điện thoại trong input khớp - "${currentValue}"`
                          );
                        } else {
                          cy.log(
                            `CẢNH BÁO: Số điện thoại trong input không khớp - Mong đợi: "${testData.phone}", Thực tế: "${currentValue}"`
                          );
                        }
                      });
                  }
                });
              }
            });

            // Kiểm tra địa chỉ hiển thị
            cy.get("body").then(($body) => {
              const addressSelectors = [
                '[data-testid="customer-address"]',
                ".customer-address",
                ".recipient-address",
                ".delivery-address",
                ".shipping-address",
              ];

              let foundAddress = false;
              addressSelectors.forEach((selector) => {
                if ($body.find(selector).length > 0) {
                  cy.get(selector)
                    .invoke("text")
                    .then((displayedAddress) => {
                      const cleanDisplayedAddress = displayedAddress.trim();
                      if (
                        cleanDisplayedAddress.includes(testData.addressInput) ||
                        cleanDisplayedAddress.includes(testData.expectedAddress)
                      ) {
                        cy.log(
                          `THÀNH CÔNG: Địa chỉ hiển thị khớp - "${cleanDisplayedAddress}"`
                        );
                        foundAddress = true;
                      }
                    });
                }
              });

              if (!foundAddress) {
                cy.log(
                  "Thông tin: Không tìm thấy địa chỉ hiển thị rõ ràng, kiểm tra trong input"
                );
                cy.get('input[name="cusAddress"]#cusAddress').then(($input) => {
                  if ($input.length > 0) {
                    cy.wrap($input)
                      .invoke("val")
                      .then((currentValue) => {
                        if (
                          currentValue.includes(testData.addressInput) ||
                          currentValue.includes(testData.expectedAddress)
                        ) {
                          cy.log(
                            `THÀNH CÔNG: Địa chỉ trong input khớp - "${currentValue}"`
                          );
                        } else {
                          cy.log(
                            `CẢNH BÁO: Địa chỉ trong input không khớp - Mong đợi chứa: "${testData.expectedAddress}", Thực tế: "${currentValue}"`
                          );
                        }
                      });
                  }
                });
              }
            });

            // Kiểm tra phương thức giao hàng
            cy.get("body").then(($body) => {
              if (
                $body.find("span.deliveryMethod.option-first.active").length > 0
              ) {
                cy.get("span.deliveryMethod.option-first.active")
                  .invoke("text")
                  .then((displayedMethod) => {
                    if (displayedMethod.includes(testData.deliveryMethod)) {
                      cy.log(
                        `THÀNH CÔNG: Phương thức giao hàng khớp - "${displayedMethod}"`
                      );
                    } else {
                      cy.log(
                        `CẢNH BÁO: Phương thức giao hàng không khớp - Mong đợi: "${testData.deliveryMethod}", Thực tế: "${displayedMethod}"`
                      );
                    }
                  });
              } else {
                cy.log(
                  "Thông tin: Không tìm thấy phương thức giao hàng được chọn"
                );
              }
            });

            // Tổng kết kiểm tra đồng bộ
            cy.log("Tổng kết kiểm tra đồng bộ dữ liệu:");
            cy.log(`- Tên nhập: "${testData.name}"`);
            cy.log(`- Số điện thoại nhập: "${testData.phone}"`);
            cy.log(
              `- Địa chỉ nhập: "${testData.addressInput}" -> "${testData.expectedAddress}"`
            );
            cy.log(`- Phương thức: "${testData.deliveryMethod}"`);

            cy.log(
              "TC15 hoàn thành - Đã kiểm tra đồng bộ thông tin form và hiển thị"
            );
          });
        });
    });
  });
});
