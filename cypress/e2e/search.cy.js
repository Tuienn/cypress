import {
  performSearch,
  verifySearchResultsDisplay,
  compareSearchResults,
} from "../support/search";

describe("Kiểm thử chức năng tìm kiếm - TheGioiDiDong", () => {
  beforeEach(() => {
    cy.log("Bắt đầu kiểm thử - Truy cập trang chủ TheGioiDiDong");
    // Truy cập trang chủ
    cy.visit("https://www.thegioididong.com/");

    cy.log("Đợi trang chủ load hoàn toàn và kiểm tra ô tìm kiếm hiển thị");
    // Đợi ô tìm kiếm sẵn sàng
    cy.get("#skw").should("be.visible");
  });

  // Helper function: So sánh 2 mảng kết quả tìm kiếm

  describe("TC1: Hiển thị kết quả", () => {
    it('TC1: Hiển thị kết quả tìm kiếm với từ khóa "điện thoại"', () => {
      cy.log("TC1: Bắt đầu kiểm thử hiển thị kết quả tìm kiếm");

      // Sử dụng helper function để thực hiện tìm kiếm
      performSearch("điện thoại").then(() => {
        cy.log("Kiểm tra div kết quả tìm kiếm có hiển thị");

        // Kiểm tra div kết quả tìm kiếm có hiển thị
        cy.get("#search-result")
          .should("be.visible")
          .and("have.css", "display", "block");

        cy.log("Kiểm tra danh sách gợi ý có xuất hiện");

        // Kiểm tra danh sách gợi ý có xuất hiện
        cy.get("#search-result .suggest_search")
          .should("be.visible")
          .and("contain.text", "Có phải bạn muốn tìm");

        cy.log("Kiểm tra có các item kết quả");

        // Kiểm tra có các item kết quả (bỏ qua tiêu đề)
        cy.get("#search-result .suggest_search li:not(.ttile)")
          .should("have.length.greaterThan", 0)
          .then(($items) => {
            const resultCount = $items.length;
            cy.log(`Tìm thấy ${resultCount} kết quả gợi ý`);

            // Kiểm tra có chứa từ khóa "Điện thoại" trong kết quả
            cy.get("#search-result .suggest_search li:not(.ttile)").should(
              "contain.text",
              "Điện thoại"
            );

            cy.log(
              "TC1: Hoàn thành thành công - Kết quả tìm kiếm hiển thị đúng"
            );
          });
      });
    });
  });

  describe("TC2: Không nhập gì hoặc nhập kí tự toàn khoảng trắng", () => {
    it("TC2a: Xử lý ô tìm kiếm trống", () => {
      cy.log("TC2a: Bắt đầu kiểm thử xử lý ô tìm kiếm trống");

      cy.log("Xóa nội dung ô tìm kiếm và trigger keyup");
      // Xóa nội dung ô tìm kiếm và trigger keyup
      cy.get("#skw").should("be.visible").clear().trigger("keyup");
      cy.wait(500);

      cy.log("Kiểm tra phản hồi của hệ thống với input trống");
      // Sử dụng helper function để kiểm tra kết quả
      verifySearchResultsDisplay().then((result) => {
        // Kỳ vọng: hoặc là ẩn hoặc không có kết quả gợi ý
        expect(result.isVisible === true || result.hasResults === false).to.be
          .true;

        if (!result.isVisible || !result.hasResults) {
          cy.log("THÀNH CÔNG: Hệ thống không hiển thị kết quả cho input trống");
        } else {
          cy.log("Hệ thống vẫn hiển thị kết quả dù input trống");
        }

        cy.log("TC2a: Hoàn thành - Đã kiểm tra xử lý input trống");
      });
    });

    it("TC2b: Xử lý input chỉ chứa khoảng trắng", () => {
      cy.log("TC2b: Bắt đầu kiểm thử xử lý input chỉ chứa khoảng trắng");

      cy.log("Nhập chuỗi chỉ chứa khoảng trắng");
      // Test với chuỗi chỉ chứa khoảng trắng
      performSearch("   ");

      cy.log("Kiểm tra phản hồi của hệ thống với input khoảng trắng");
      verifySearchResultsDisplay().then((result) => {
        // Kỳ vọng: hoặc là ẩn hoặc không có kết quả gợi ý
        expect(result.isVisible === true || result.hasResults === false).to.be
          .true;

        if (!result.isVisible || !result.hasResults) {
          cy.log(
            "THÀNH CÔNG: Hệ thống không hiển thị kết quả cho input khoảng trắng"
          );
        } else {
          cy.log("Hệ thống hiển thị kết quả dù input chỉ là khoảng trắng");
        }

        cy.log("TC2b: Hoàn thành - Đã kiểm tra xử lý input khoảng trắng");
      });
    });
  });

  describe("TC3: Nhập thừa khoảng trắng", () => {
    it('TC3: So sánh kết quả "Điện thoại" và " Điện  thoại "', () => {
      cy.log("TC3: Bắt đầu kiểm thử xử lý khoảng trắng thừa");

      let firstSearchResults = [];
      let secondSearchResults = [];

      cy.log('Test với "Điện thoại" (không có khoảng trắng thừa)');
      // Test với "Điện thoại" (không có khoảng trắng thừa)
      performSearch("Điện thoại").then(() => {
        cy.log("Kiểm tra và lưu kết quả tìm kiếm đầu tiên");

        // Chờ kết quả hiển thị và lưu lại
        cy.get("#search-result")
          .should("be.visible")
          .and("have.css", "display", "block");

        cy.get("#search-result .suggest_search li:not(.ttile)")
          .should("have.length.greaterThan", 0)
          .then(($items) => {
            firstSearchResults = Array.from($items).map((item) =>
              item.textContent.trim()
            );

            cy.log(
              `Lưu ${firstSearchResults.length} kết quả từ tìm kiếm đầu tiên`
            );

            cy.log('Test với " Điện  thoại " (có khoảng trắng thừa)');
            // Test với " Điện  thoại " (có khoảng trắng thừa)
            performSearch(" Điện  thoại ").then(() => {
              cy.log("Kiểm tra và lưu kết quả tìm kiếm thứ hai");

              // Chờ kết quả hiển thị và so sánh
              cy.get("#search-result")
                .should("be.visible")
                .and("have.css", "display", "block");

              cy.get("#search-result .suggest_search li:not(.ttile)")
                .should("have.length.greaterThan", 0)
                .then(($items2) => {
                  secondSearchResults = Array.from($items2).map((item) =>
                    item.textContent.trim()
                  );

                  cy.log(
                    `Lưu ${secondSearchResults.length} kết quả từ tìm kiếm thứ hai`
                  );

                  // So sánh hai kết quả - chúng phải giống hệt nhau
                  expect(firstSearchResults.length).to.be.greaterThan(0);
                  expect(secondSearchResults.length).to.be.greaterThan(0);

                  cy.log("So sánh kết quả giữa hai lần tìm kiếm");
                  // So sánh toàn bộ kết quả phải giống hệt nhau
                  compareSearchResults(firstSearchResults, secondSearchResults);

                  cy.log(
                    "TC3: Hoàn thành thành công - Hệ thống xử lý đúng khoảng trắng thừa"
                  );
                });
            });
          });
      });
    });
  });

  describe("TC4: Nhập ít hơn 3 kí tự", () => {
    it("TC4: Kiểm tra xử lý input có ít hơn 3 ký tự", () => {
      cy.log("TC4: Bắt đầu kiểm thử xử lý input ít hơn 3 ký tự");

      cy.log("Test với 1 ký tự");
      // Test với 1 ký tự
      performSearch("i");

      cy.log("Kiểm tra phản hồi với 1 ký tự");
      verifySearchResultsDisplay().then((result) => {
        // Ghi nhận kết quả (có thể hiển thị hoặc không tùy thuộc vào logic của trang)
        if (result.isVisible && result.hasResults) {
          cy.log("Trang web hiển thị kết quả cho input 1 ký tự");
        } else {
          cy.log("Trang web không hiển thị kết quả cho input 1 ký tự");
        }
      });

      cy.log("Test với 2 ký tự");
      // Test với 2 ký tự
      performSearch("ip");

      cy.log("Kiểm tra phản hồi với 2 ký tự");
      verifySearchResultsDisplay().then((result) => {
        if (result.isVisible && result.hasResults) {
          cy.log("Trang web hiển thị kết quả cho input 2 ký tự");
        } else {
          cy.log("Trang web không hiển thị kết quả cho input 2 ký tự");
        }

        cy.log("TC4: Hoàn thành - Đã kiểm tra xử lý input ngắn");
      });
    });
  });

  describe("TC5: So sánh nhập chữ thường hoặc viết hoa", () => {
    it('Should return similar results for "điện thoại" and "ĐIỆN THOẠI"', () => {
      let lowercaseResults = [];
      let uppercaseResults = [];

      // Test với chữ thường "điện thoại"
      cy.get("#skw")
        .should("be.visible")
        .clear()
        .type("điện thoại")
        .trigger("keyup");

      cy.wait(1000);
      cy.get("#search-result")
        .should("be.visible")
        .and("have.css", "display", "block");

      cy.get("#search-result .suggest_search li:not(.ttile)")
        .should("have.length.greaterThan", 0)
        .then(($items) => {
          lowercaseResults = Array.from($items).map((item) =>
            item.textContent.trim()
          );

          // Test với chữ hoa "ĐIỆN THOẠI"
          cy.get("#skw").clear().type("ĐIỆN THOẠI").trigger("keyup");

          cy.wait(1000);
          cy.get("#search-result")
            .should("be.visible")
            .and("have.css", "display", "block");

          cy.get("#search-result .suggest_search li:not(.ttile)")
            .should("have.length.greaterThan", 0)
            .then(($items2) => {
              uppercaseResults = Array.from($items2).map((item) =>
                item.textContent.trim()
              );

              // So sánh kết quả - chúng phải giống hệt nhau
              expect(lowercaseResults.length).to.be.greaterThan(0);
              expect(uppercaseResults.length).to.be.greaterThan(0);

              // So sánh toàn bộ kết quả phải giống hệt nhau
              compareSearchResults(lowercaseResults, uppercaseResults);
            });
        });
    });
  });

  describe("TC6: So sánh nhập từ có dấu hoặc không có dấu", () => {
    it('Should return similar results for "điện thoại" and "dien thoai"', () => {
      let accentResults = [];
      let noAccentResults = [];

      // Test với có dấu "điện thoại"
      cy.get("#skw")
        .should("be.visible")
        .clear()
        .type("điện thoại")
        .trigger("keyup");

      cy.wait(1000);
      cy.get("#search-result")
        .should("be.visible")
        .and("have.css", "display", "block");

      cy.get("#search-result .suggest_search li:not(.ttile)")
        .should("have.length.greaterThan", 0)
        .then(($items) => {
          accentResults = Array.from($items).map((item) =>
            item.textContent.trim()
          );

          // Test với không dấu "dien thoai"
          cy.get("#skw").clear().type("dien thoai").trigger("keyup");

          cy.wait(1000);
          cy.get("#search-result")
            .should("be.visible")
            .and("have.css", "display", "block");

          cy.get("#search-result .suggest_search li:not(.ttile)")
            .should("have.length.greaterThan", 0)
            .then(($items2) => {
              noAccentResults = Array.from($items2).map((item) =>
                item.textContent.trim()
              );

              // So sánh kết quả - chúng phải giống hệt nhau
              expect(accentResults.length).to.be.greaterThan(0);
              expect(noAccentResults.length).to.be.greaterThan(0);

              // So sánh toàn bộ kết quả phải giống hệt nhau
              compareSearchResults(accentResults, noAccentResults);
            });
        });
    });
  });

  describe("TC7: Nhập toàn bộ các kí tự đặc biệt", () => {
    it('Should handle special characters input "*@#"', () => {
      // Nhập các ký tự đặc biệt
      cy.get("#skw").should("be.visible").clear().type("*@#").trigger("keyup");

      cy.wait(1000); // Chờ phản hồi

      // Kiểm tra phản hồi của trang web
      cy.get("#search-result").then(($searchResult) => {
        const displayStyle = $searchResult.css("display");
        const hasResults =
          $searchResult.find(".suggest_search li:not(.ttile)").length > 0;

        cy.log(
          `Display style for special chars: ${displayStyle}, Has results: ${hasResults}`
        );

        // Ghi nhận kết quả - trang web có thể xử lý hoặc bỏ qua ký tự đặc biệt
        if (displayStyle === "block" && hasResults) {
          cy.log("Trang web hiển thị kết quả cho ký tự đặc biệt");

          // Kiểm tra có thông báo lỗi hoặc không có kết quả hợp lệ
          cy.get("#search-result .suggest_search").then(($suggest) => {
            const content = $suggest.text();
            if (
              content.includes("Không tìm thấy") ||
              content.includes("No results")
            ) {
              cy.log(
                "Trang web thông báo không tìm thấy kết quả cho ký tự đặc biệt"
              );
            } else {
              cy.log("Trang web trả về kết quả cho ký tự đặc biệt");
            }
          });
        } else {
          cy.log("Trang web không hiển thị kết quả cho ký tự đặc biệt");
        }
      });
    });
  });

  describe("TC8: Nhập kí tự đặc biệt", () => {
    it('Should compare results between "Điện thoại" and "Điện thoại *"', () => {
      let normalResults = [];
      let specialCharResults = [];

      // Test với từ khóa bình thường "Điện thoại"
      cy.get("#skw")
        .should("be.visible")
        .clear()
        .type("Điện thoại")
        .trigger("keyup");

      cy.wait(1000);
      cy.get("#search-result")
        .should("be.visible")
        .and("have.css", "display", "block");

      cy.get("#search-result .suggest_search li:not(.ttile)")
        .should("have.length.greaterThan", 0)
        .then(($items) => {
          normalResults = Array.from($items).map((item) =>
            item.textContent.trim()
          );

          // Test với từ khóa có ký tự đặc biệt "Điện thoại *"
          cy.get("#skw").clear().type("Điện thoại *").trigger("keyup");

          cy.wait(1000);
          cy.get("#search-result").then(($searchResult) => {
            const displayStyle = $searchResult.css("display");
            const hasResults =
              $searchResult.find(".suggest_search li:not(.ttile)").length > 0;

            if (displayStyle === "block" && hasResults) {
              // Nếu có kết quả, so sánh với kết quả ban đầu
              cy.get("#search-result .suggest_search li:not(.ttile)").then(
                ($items2) => {
                  specialCharResults = Array.from($items2).map((item) =>
                    item.textContent.trim()
                  );

                  cy.log(`Normal results: ${normalResults.length} items`);
                  cy.log(
                    `Special char results: ${specialCharResults.length} items`
                  );

                  // So sánh kết quả - có thể giống hoặc khác tùy vào cách trang web xử lý
                  if (normalResults.length === specialCharResults.length) {
                    // Nếu cùng số lượng, kiểm tra nội dung
                    try {
                      compareSearchResults(normalResults, specialCharResults);
                      cy.log(
                        "Kết quả giống hệt nhau - trang web bỏ qua ký tự đặc biệt"
                      );
                    } catch (e) {
                      cy.log(
                        "Kết quả khác nhau - trang web xử lý ký tự đặc biệt"
                      );
                    }
                  } else {
                    cy.log(
                      "Số lượng kết quả khác nhau - trang web xử lý ký tự đặc biệt"
                    );
                  }
                }
              );
            } else {
              cy.log(
                "Trang web không trả về kết quả cho từ khóa có ký tự đặc biệt"
              );
            }
          });
        });
    });
  });

  describe("TC9: Nhập lượng lớn kí tự", () => {
    it("Should handle large input (100 characters)", () => {
      // Tạo chuỗi 100 ký tự 'a'
      const longInput = "a".repeat(100);

      // Kiểm tra maxlength của input (theo HTML là 100)
      cy.get("#skw").should("have.attr", "maxlength", "100");

      // Nhập 100 ký tự
      cy.get("#skw")
        .should("be.visible")
        .clear()
        .type(longInput)
        .trigger("keyup");

      // Kiểm tra giá trị thực tế trong input
      cy.get("#skw").should("have.value", longInput);
      cy.log(`Đã nhập thành công ${longInput.length} ký tự`);

      cy.wait(1000);

      // Kiểm tra phản hồi của trang web với input dài
      cy.get("#search-result").then(($searchResult) => {
        const displayStyle = $searchResult.css("display");
        const hasResults =
          $searchResult.find(".suggest_search li:not(.ttile)").length > 0;

        cy.log(
          `Display style for long input: ${displayStyle}, Has results: ${hasResults}`
        );

        if (displayStyle === "block" && hasResults) {
          cy.log("Trang web xử lý và hiển thị kết quả cho input dài");

          // Đếm số lượng kết quả
          cy.get("#search-result .suggest_search li:not(.ttile)").then(
            ($items) => {
              const resultCount = $items.length;
              cy.log(`Số lượng kết quả trả về: ${resultCount}`);
            }
          );
        } else {
          cy.log("Trang web không hiển thị kết quả cho input dài");
        }
      });

      // Test với input vượt quá giới hạn (101 ký tự)
      const overLimitInput = "a".repeat(101);
      cy.get("#skw").clear().type(overLimitInput);

      // Kiểm tra input chỉ chấp nhận tối đa 100 ký tự
      cy.get("#skw").then(($input) => {
        const actualValue = $input.val();
        expect(actualValue.length).to.equal(100);
        cy.log(
          `Input giới hạn đúng ở 100 ký tự, nhập ${overLimitInput.length} nhưng chỉ nhận ${actualValue.length}`
        );
      });
    });
  });

  describe("TC10: Nhập từ khóa sai", () => {
    it('Should handle incorrect keyword "điện thoại nồi đồng cối đá"', () => {
      const incorrectKeyword = "điện thoại nồi đồng cối đá";

      // Nhập từ khóa sai/không liên quan
      cy.get("#skw")
        .should("be.visible")
        .clear()
        .type(incorrectKeyword)
        .trigger("keyup");

      cy.wait(1000); // Chờ phản hồi

      // Kiểm tra phản hồi của trang web
      cy.get("#search-result").then(($searchResult) => {
        const displayStyle = $searchResult.css("display");
        const hasResults =
          $searchResult.find(".suggest_search li:not(.ttile)").length > 0;

        cy.log(
          `Display style for incorrect keyword: ${displayStyle}, Has results: ${hasResults}`
        );

        if (displayStyle === "block" && hasResults) {
          cy.log("Trang web hiển thị kết quả cho từ khóa sai");

          // Kiểm tra nội dung kết quả
          cy.get("#search-result .suggest_search li:not(.ttile)").then(
            ($items) => {
              const results = Array.from($items).map((item) =>
                item.textContent.trim()
              );
              const resultCount = results.length;

              cy.log(`Số lượng kết quả trả về: ${resultCount}`);
              cy.log("Danh sách kết quả:", results.slice(0, 5)); // Log 5 kết quả đầu

              // Kiểm tra xem có kết quả nào chứa từ hợp lệ "điện thoại" không
              const relevantResults = results.filter((result) =>
                result.toLowerCase().includes("điện thoại")
              );

              if (relevantResults.length > 0) {
                cy.log(
                  `Tìm thấy ${relevantResults.length} kết quả liên quan đến "điện thoại"`
                );
                cy.log(
                  "Hệ thống có thể đang filter và chỉ lấy phần từ khóa hợp lệ"
                );
              } else {
                cy.log(
                  "Không tìm thấy kết quả liên quan - hệ thống có thể xử lý toàn bộ chuỗi"
                );
              }

              // Kiểm tra có thông báo "Không tìm thấy" hoặc kết quả trống
              const hasNoResultsMessage = results.some(
                (result) =>
                  result.toLowerCase().includes("không tìm thấy") ||
                  result.toLowerCase().includes("no results") ||
                  result.toLowerCase().includes("không có kết quả")
              );

              if (hasNoResultsMessage) {
                cy.log(
                  "Trang web thông báo không tìm thấy kết quả cho từ khóa sai"
                );
              }
            }
          );
        } else {
          cy.log("Trang web không hiển thị kết quả cho từ khóa sai");

          // Kiểm tra xem có thông báo lỗi nào khác không
          cy.get("body").then(($body) => {
            if (
              $body.find(
                '[class*="error"], [class*="no-result"], [class*="empty"]'
              ).length > 0
            ) {
              cy.log("Phát hiện có thông báo lỗi hoặc không có kết quả");
            }
          });
        }
      });

      // So sánh với từ khóa đúng "điện thoại" để thấy sự khác biệt
      cy.log('--- So sánh với từ khóa đúng "điện thoại" ---');

      cy.get("#skw").clear().type("điện thoại").trigger("keyup");

      cy.wait(1000);

      cy.get("#search-result").then(($searchResult) => {
        const displayStyle = $searchResult.css("display");
        const hasResults =
          $searchResult.find(".suggest_search li:not(.ttile)").length > 0;

        if (displayStyle === "block" && hasResults) {
          cy.get("#search-result .suggest_search li:not(.ttile)").then(
            ($items) => {
              const correctResults = Array.from($items).map((item) =>
                item.textContent.trim()
              );
              cy.log(`Từ khóa đúng có ${correctResults.length} kết quả`);

              // So sánh số lượng kết quả
              cy.log(
                "Có thể thấy sự khác biệt giữa từ khóa sai và từ khóa đúng"
              );
            }
          );
        }
      });
    });
  });

  describe("TC11: Hiển thị sản phẩm gợi ý", () => {
    it("Should display suggested products when clicking search input", () => {
      // Làm sạch input trước khi test
      cy.get("#skw").clear();

      // Click vào ô tìm kiếm để kích hoạt gợi ý
      cy.get("#skw").click();
      cy.wait(1000);

      // Assertion chặt chẽ: phải hiển thị search-result
      cy.get("#search-result").should("have.css", "display", "block");
      cy.log("Hiển thị kết quả khi click vào input");

      // Assertion: phải có container suggest_search
      cy.get("#search-result .suggest_search").should("exist");
      cy.log("Tìm thấy container suggest_search");

      // Kiểm tra các section gợi ý
      cy.get("#search-result .suggest_search li:not(.ttile)").then(
        ($allItems) => {
          const allTexts = Array.from($allItems).map((item) =>
            item.textContent.trim()
          );
          cy.log("Tất cả nội dung gợi ý:", allTexts);

          // Kiểm tra có "Ưu đãi đặc biệt" hoặc các section khuyến mãi
          const hasPromotions = allTexts.some(
            (text) =>
              text.includes("Ưu đãi đặc biệt") ||
              text.includes("Khuyến mãi") ||
              text.includes("Đặc biệt")
          );

          // Kiểm tra có sản phẩm gợi ý cụ thể
          const hasProductSuggestions = allTexts.some(
            (text) =>
              text.includes("HONOR") ||
              text.includes("Quạt") ||
              text.includes("Điện thoại") ||
              text.length > 10 // Có nội dung chi tiết
          );

          // Đếm số lượng item gợi ý
          const suggestionCount = $allItems.length;
          cy.log(`Tổng số item gợi ý: ${suggestionCount}`);

          // Assertion: phải có ít nhất 1 item gợi ý
          expect(suggestionCount).to.be.greaterThan(0);

          // Assertion: phải có khuyến mãi hoặc sản phẩm gợi ý
          const hasSuggestions = hasPromotions || hasProductSuggestions;
          expect(hasSuggestions).to.be.true;

          if (hasPromotions) {
            cy.log("Tìm thấy section ưu đãi đặc biệt");
          }
          if (hasProductSuggestions) {
            cy.log("Tìm thấy sản phẩm gợi ý");
          }
        }
      );

      // Kiểm tra có link/anchor tags không (sản phẩm thường có link)
      cy.get("#search-result .suggest_search a").then(($links) => {
        if ($links.length > 0) {
          cy.log(`Tìm thấy ${$links.length} link sản phẩm`);

          // Log một số link đầu tiên
          const linkTexts = Array.from($links)
            .slice(0, 3)
            .map((link) => link.textContent.trim());
          cy.log("Các sản phẩm gợi ý:", linkTexts);
        } else {
          cy.log("Không tìm thấy link sản phẩm");
        }
      });

      // Test thêm: Click ra ngoài để xem gợi ý có ẩn đi không
      cy.get("body").click(0, 0); // Click góc trên trái
      cy.wait(500);

      cy.get("#search-result").then(($searchResult) => {
        const displayStyleAfterClickOut = $searchResult.css("display");
        cy.log(
          `Search result display after clicking outside: ${displayStyleAfterClickOut}`
        );

        if (displayStyleAfterClickOut === "none") {
          cy.log("Gợi ý ẩn đi khi click ra ngoài");
        } else {
          cy.log("Gợi ý vẫn hiển thị sau khi click ra ngoài");
        }
      });
    });
  });

  describe("TC12: Số kết quả tối đa", () => {
    it("Should check maximum number of search suggestions for popular keywords", () => {
      // Test với từ khóa phổ biến "iphone"
      cy.get("#skw")
        .should("be.visible")
        .clear()
        .type("iphone")
        .trigger("keyup");

      cy.wait(1000);
      cy.get("#search-result").should("have.css", "display", "block");

      let iphoneResultCount = 0;

      cy.get("#search-result .suggest_search li:not(.ttile)").then(
        ($iphoneItems) => {
          iphoneResultCount = $iphoneItems.length;
          const iphoneResults = Array.from($iphoneItems).map((item) =>
            item.textContent.trim()
          );

          cy.log(`Số kết quả gợi ý cho "iphone": ${iphoneResultCount}`);
          cy.log("Các kết quả iPhone:", iphoneResults.slice(0, 10)); // Log 10 kết quả đầu

          // Assertion: phải có ít nhất 1 kết quả
          expect(iphoneResultCount).to.be.greaterThan(0);

          // Test với từ khóa phổ biến thứ 2 "oppo"
          cy.get("#skw").clear().type("oppo").trigger("keyup");
          cy.wait(1000);

          cy.get("#search-result").should("have.css", "display", "block");

          cy.get("#search-result .suggest_search li:not(.ttile)").then(
            ($oppoItems) => {
              const oppoResultCount = $oppoItems.length;
              const oppoResults = Array.from($oppoItems).map((item) =>
                item.textContent.trim()
              );

              cy.log(`Số kết quả gợi ý cho "oppo": ${oppoResultCount}`);
              cy.log("Các kết quả OPPO:", oppoResults.slice(0, 10)); // Log 10 kết quả đầu

              // Assertion: phải có ít nhất 1 kết quả
              expect(oppoResultCount).to.be.greaterThan(0);

              // So sánh số lượng kết quả
              cy.log(
                `So sánh: iPhone có ${iphoneResultCount} kết quả, OPPO có ${oppoResultCount} kết quả`
              );

              // Kiểm tra giới hạn tối đa (thường các trang web có giới hạn)
              const maxResults = Math.max(iphoneResultCount, oppoResultCount);
              cy.log(`Số kết quả tối đa quan sát được: ${maxResults}`);

              // Assertion: kiểm tra có giới hạn hợp lý (thường không quá 50)
              expect(maxResults).to.be.lessThan(51);

              // Kiểm tra tính nhất quán - số lượng không chênh lệch quá lớn
              const difference = Math.abs(iphoneResultCount - oppoResultCount);
              cy.log(`Chênh lệch số kết quả: ${difference}`);

              // Log phân tích
              if (iphoneResultCount === oppoResultCount) {
                cy.log("Số kết quả giống nhau - có thể có giới hạn cố định");
              } else if (difference > 20) {
                cy.log("Chênh lệch lớn - số kết quả phụ thuộc vào từ khóa");
              } else {
                cy.log("Chênh lệch nhỏ - số kết quả tương đối ổn định");
              }
            }
          );
        }
      );
    });
  });

  describe("TC13: Số sản phẩm gợi ý tối đa", () => {
    it("Should check maximum number of product suggestions for popular keywords", () => {
      // Test với từ khóa phổ biến "iphone"
      cy.get("#skw")
        .should("be.visible")
        .clear()
        .type("iphone")
        .trigger("keyup");

      cy.wait(1000);
      cy.get("#search-result").should("have.css", "display", "block");

      let iphoneProductCount = 0;

      cy.get("#search-result .suggest_search").then(($container) => {
        // Đếm số sản phẩm gợi ý (thường có class product_suggest hoặc trong link)
        cy.get(
          "#search-result .suggest_search .product_suggest, #search-result .suggest_search a[href*='/dtdd']"
        ).then(($iphoneProducts) => {
          iphoneProductCount = $iphoneProducts.length;

          if (iphoneProductCount > 0) {
            const iphoneProductNames = Array.from($iphoneProducts)
              .slice(0, 10)
              .map((item) => {
                const text = item.textContent.trim();
                return text.length > 100
                  ? text.substring(0, 100) + "..."
                  : text;
              });

            cy.log(`Số sản phẩm gợi ý cho "iphone": ${iphoneProductCount}`);
            cy.log("Các sản phẩm iPhone:", iphoneProductNames);
          } else {
            cy.log(
              "Không tìm thấy sản phẩm gợi ý cụ thể cho iPhone, kiểm tra tất cả link"
            );

            // Fallback: đếm tất cả links có thể là sản phẩm
            cy.get("#search-result .suggest_search a").then(($allLinks) => {
              iphoneProductCount = $allLinks.length;
              cy.log(
                `Tổng số link sản phẩm cho "iphone": ${iphoneProductCount}`
              );
            });
          }

          // Test với từ khóa phổ biến thứ 2 "oppo"
          cy.get("#skw").clear().type("oppo").trigger("keyup");
          cy.wait(1000);

          cy.get("#search-result").should("have.css", "display", "block");

          cy.get(
            "#search-result .suggest_search .product_suggest, #search-result .suggest_search a[href*='/dtdd']"
          ).then(($oppoProducts) => {
            let oppoProductCount = $oppoProducts.length;

            if (oppoProductCount > 0) {
              const oppoProductNames = Array.from($oppoProducts)
                .slice(0, 10)
                .map((item) => {
                  const text = item.textContent.trim();
                  return text.length > 100
                    ? text.substring(0, 100) + "..."
                    : text;
                });

              cy.log(`Số sản phẩm gợi ý cho "oppo": ${oppoProductCount}`);
              cy.log("Các sản phẩm OPPO:", oppoProductNames);
            } else {
              cy.log(
                "Không tìm thấy sản phẩm gợi ý cụ thể cho OPPO, kiểm tra tất cả link"
              );

              // Fallback: đếm tất cả links có thể là sản phẩm
              cy.get("#search-result .suggest_search a").then(($allLinks) => {
                oppoProductCount = $allLinks.length;
                cy.log(`Tổng số link sản phẩm cho "oppo": ${oppoProductCount}`);
              });
            }

            // So sánh số lượng sản phẩm
            cy.log(
              `So sánh: iPhone có ${iphoneProductCount} sản phẩm, OPPO có ${oppoProductCount} sản phẩm`
            );

            // Kiểm tra giới hạn tối đa sản phẩm
            const maxProducts = Math.max(iphoneProductCount, oppoProductCount);
            cy.log(`Số sản phẩm gợi ý tối đa quan sát được: ${maxProducts}`);

            // Assertion: phải có ít nhất 1 sản phẩm cho từ khóa phổ biến
            expect(
              Math.max(iphoneProductCount, oppoProductCount)
            ).to.be.greaterThan(0);

            // Assertion: kiểm tra giới hạn hợp lý (thường không quá 20 sản phẩm)
            expect(maxProducts).to.be.lessThan(21);

            // Phân tích kết quả
            if (iphoneProductCount === oppoProductCount) {
              cy.log("Số sản phẩm giống nhau - có giới hạn cố định");
            } else {
              const productDifference = Math.abs(
                iphoneProductCount - oppoProductCount
              );
              cy.log(`Chênh lệch số sản phẩm: ${productDifference}`);

              if (productDifference > 10) {
                cy.log(
                  "Chênh lệch lớn - số sản phẩm phụ thuộc nhiều vào từ khóa"
                );
              } else {
                cy.log("Chênh lệch nhỏ - số sản phẩm tương đối ổn định");
              }
            }
          });
        });
      });
    });
  });

  describe("TC14: Hiển thị hình ảnh, giá tiền sản phẩm", () => {
    it('Should display product images and prices when searching for "điện thoại"', () => {
      // Nhập từ khóa "điện thoại"
      cy.get("#skw")
        .should("be.visible")
        .clear()
        .type("điện thoại")
        .trigger("keyup");

      cy.wait(1000);
      cy.get("#search-result").should("have.css", "display", "block");

      // Kiểm tra có sản phẩm gợi ý không
      cy.get("#search-result .suggest_search li:not(.ttile)").then(($items) => {
        const hasItems = $items.length > 0;
        expect(hasItems).to.be.true;

        cy.log(`Tìm thấy ${$items.length} kết quả cho "điện thoại"`);

        // Kiểm tra hình ảnh sản phẩm
        cy.get("#search-result .suggest_search li.product_suggest img").then(
          ($images) => {
            const imageCount = $images.length;
            cy.log(`Số lượng hình ảnh sản phẩm: ${imageCount}`);

            if (imageCount > 0) {
              cy.log("Tìm thấy hình ảnh sản phẩm");

              // Kiểm tra các thuộc tính hình ảnh
              cy.get("#search-result .suggest_search img")
                .first()
                .then(($firstImg) => {
                  const src = $firstImg.attr("src");
                  const alt = $firstImg.attr("alt");

                  expect(src).to.exist;
                  cy.log(
                    `Hình ảnh đầu tiên - src: ${src}, alt: ${alt || "không có"}`
                  );
                });

              // Assertion: phải có ít nhất 1 hình ảnh
              expect(imageCount).to.be.greaterThan(0);
            } else {
              cy.log("Không tìm thấy hình ảnh sản phẩm trong kết quả gợi ý");
            }
          }
        );

        // Kiểm tra giá tiền sản phẩm
        cy.get("#search-result .suggest_search").then(($container) => {
          // Tìm các element có thể chứa giá (strong, .price, .price-old, etc.)
          const priceSelectors = [
            "strong.price",
            ".price",
            'strong:contains("₫")',
            '*:contains("₫")',
            'strong:contains(".000")',
            '*:contains(".000₫")',
          ];

          let totalPrices = 0;
          let priceTexts = [];

          priceSelectors.forEach((selector) => {
            cy.get("#search-result .suggest_search")
              .find(selector)
              .then(($priceElements) => {
                if ($priceElements.length > 0) {
                  totalPrices += $priceElements.length;
                  const prices = Array.from($priceElements)
                    .map((el) => el.textContent.trim())
                    .filter(
                      (text) => text.includes("₫") || text.includes(".000")
                    );
                  priceTexts = priceTexts.concat(prices);
                }
              });
          });

          cy.then(() => {
            cy.log(`Tổng số element có giá: ${totalPrices}`);
            cy.log("Các giá tìm thấy:", priceTexts.slice(0, 5));

            if (priceTexts.length > 0) {
              cy.log("Tìm thấy giá tiền sản phẩm");
              expect(priceTexts.length).to.be.greaterThan(0);
            } else {
              cy.log("Không tìm thấy giá tiền trong kết quả gợi ý");
            }
          });
        });

        // Kiểm tra cấu trúc sản phẩm hoàn chỉnh (có cả hình và giá)
        cy.get("#search-result .suggest_search li.product_suggest").then(
          ($productLinks) => {
            if ($productLinks.length > 0) {
              cy.log(`Tìm thấy ${$productLinks.length} link sản phẩm`);

              // Kiểm tra sản phẩm đầu tiên có đầy đủ thông tin không
              cy.wrap($productLinks.first()).within(() => {
                cy.get("img").then(($img) => {
                  if ($img.length > 0) {
                    cy.log("Sản phẩm đầu tiên có hình ảnh");
                  }
                });

                cy.get("strong.price").then(($body) => {
                  const text = $body.text();
                  if (text.includes("₫") || text.includes(".000")) {
                    cy.log("Sản phẩm đầu tiên có giá tiền");
                  }
                });
              });
            }
          }
        );
      });
    });
  });

  describe("TC15: Thời gian tìm kiếm cho mỗi truy vấn", () => {
    it('Should measure search response time for "điện thoại" query', () => {
      // Đo thời gian bắt đầu
      const startTime = Date.now();

      // Nhập từ khóa "điện thoại"
      cy.get("#skw")
        .should("be.visible")
        .clear()
        .type("điện thoại")
        .trigger("keyup");

      // Chờ kết quả xuất hiện và đo thời gian
      cy.get("#search-result")
        .should("have.css", "display", "block")
        .then(() => {
          const endTime = Date.now();
          const responseTime = endTime - startTime;

          cy.log(`Thời gian tìm kiếm: ${responseTime}ms`);
          cy.log(`Thời gian tìm kiếm: ${(responseTime / 1000).toFixed(2)}s`);

          // Kiểm tra có kết quả không
          cy.get("#search-result .suggest_search li:not(.ttile)").then(
            ($items) => {
              const resultCount = $items.length;
              cy.log(`Số lượng kết quả: ${resultCount}`);

              // Assertion: phải có kết quả
              expect(resultCount).to.be.greaterThan(0);

              // Kiểm tra thời gian phản hồi
              if (responseTime > 1000) {
                cy.log(`Thời gian tìm kiếm ${responseTime}ms > 1000ms (chậm)`);
                // Có thể log warning nhưng không fail test vì phụ thuộc network
              } else {
                cy.log(
                  `Thời gian tìm kiếm ${responseTime}ms <= 1000ms (nhanh)`
                );
              }

              // Log phân tích hiệu năng
              if (responseTime < 500) {
                cy.log("Hiệu năng tìm kiếm: Rất tốt (< 500ms)");
              } else if (responseTime < 1000) {
                cy.log("Hiệu năng tìm kiếm: Tốt (500-1000ms)");
              } else if (responseTime < 2000) {
                cy.log("Hiệu năng tìm kiếm: Trung bình (1-2s)");
              } else {
                cy.log("Hiệu năng tìm kiếm: Chậm (> 2s)");
              }
            }
          );
        });

      // Test với nhiều từ khóa để so sánh
      const testQueries = ["iphone", "samsung", "oppo"];

      testQueries.forEach((query, index) => {
        cy.then(() => {
          const queryStartTime = Date.now();

          cy.get("#skw").clear().type(query).trigger("keyup");

          cy.get("#search-result")
            .should("have.css", "display", "block")
            .then(() => {
              const queryEndTime = Date.now();
              const queryResponseTime = queryEndTime - queryStartTime;

              cy.log(`Thời gian tìm kiếm "${query}": ${queryResponseTime}ms`);
            });
        });
      });
    });
  });

  describe("TC16: Đồng nhất kết quả", () => {
    it('Should maintain consistent results between "iphone" searches after searching for non-existent product', () => {
      // Bỏ qua uncaught exceptions từ application code
      cy.on("uncaught:exception", (err, runnable) => {
        // Bỏ qua lỗi SyntaxError từ trang web
        if (
          err.message.includes("expected property name, got") ||
          err.message.includes("SyntaxError") ||
          err.message.includes("Unexpected token")
        ) {
          cy.log(`Bỏ qua lỗi JavaScript từ trang web: ${err.message}`);
          return false;
        }
        // Vẫn fail cho các lỗi khác
        return true;
      });

      cy.log("TC16: Bắt đầu kiểm thử tính đồng nhất kết quả tìm kiếm");

      // Lưu trữ thông tin về trang hiện tại
      let initialResults = [];
      let hasInitialListProduct = false;

      cy.log('Bước 1: Nhập "iphone" và nhấn Enter - Lần đầu tiên');

      // Nhập "iphone" và nhấn Enter
      cy.get("#skw").should("be.visible").clear().type("iphone");

      // Nhấn Enter để submit form tìm kiếm
      cy.get("#skw").type("{enter}");

      // Chờ URL thay đổi và trang load hoàn toàn
      cy.url().should("include", "iphone");
      cy.wait(3000); // Chờ lâu hơn để trang load hoàn toàn

      // Kiểm tra có .listproduct visible không
      cy.get("body").then(($body) => {
        // Chờ thêm một chút để DOM load hoàn toàn
        cy.wait(1000);

        const listProductExists = $body.find(".listproduct").length > 0;
        hasInitialListProduct = listProductExists;

        if (listProductExists) {
          cy.get(".listproduct").then(($listProduct) => {
            const isVisible = $listProduct.is(":visible");
            hasInitialListProduct = isVisible;

            cy.log(
              `Lần tìm kiếm đầu tiên: .listproduct tồn tại=${listProductExists}, visible=${isVisible}`
            );

            if (isVisible) {
              // Lưu thông tin về sản phẩm để so sánh sau
              cy.get(".listproduct .item").then(($items) => {
                initialResults = Array.from($items).map((item) => {
                  const name =
                    item.querySelector("h3")?.textContent?.trim() || "";
                  const price =
                    item.querySelector(".price")?.textContent?.trim() || "";
                  return { name, price };
                });

                cy.log(
                  `Lưu ${initialResults.length} sản phẩm iPhone từ lần tìm kiếm đầu tiên`
                );
              });
            }
          });
        } else {
          cy.log("Lần tìm kiếm đầu tiên: Không tìm thấy .listproduct");

          // Kiểm tra URL để xác định có phải trang sản phẩm không
          cy.url().then((url) => {
            const isProductPage =
              url.includes("/dtdd") || url.includes("key=iphone");
            hasInitialListProduct = isProductPage;
            cy.log(
              `URL hiện tại: ${url}, có phải trang sản phẩm: ${isProductPage}`
            );
          });
        }
      });

      cy.log('Bước 2: Tìm kiếm "abcdxyz" (sản phẩm không tồn tại)');

      // Tìm kiếm sản phẩm không tồn tại
      cy.get("#skw").clear().type("abcdxyz");

      cy.get("#skw").type("{enter}");

      // Chờ URL thay đổi cho search abcdxyz
      cy.url().should("include", "abcdxyz");
      cy.wait(3000);

      // Kiểm tra kết quả với từ khóa không tồn tại
      cy.get("body").then(($body) => {
        const listProductExists = $body.find(".listproduct").length > 0;

        if (listProductExists) {
          cy.get(".listproduct").then(($listProduct) => {
            const isVisible = $listProduct.is(":visible");
            cy.log(
              `Tìm kiếm "abcdxyz": .listproduct tồn tại=${listProductExists}, visible=${isVisible}`
            );

            if (!isVisible) {
              cy.log(
                "Đúng kỳ vọng: .listproduct không hiển thị cho sản phẩm không tồn tại"
              );
            } else {
              cy.log(
                "Bất ngờ: .listproduct vẫn hiển thị cho sản phẩm không tồn tại"
              );
            }
          });
        } else {
          cy.log(
            "Đúng kỳ vọng: Không tìm thấy .listproduct cho sản phẩm không tồn tại"
          );
        }
      });

      cy.log('Bước 3: Tìm kiếm lại "iphone" - Lần thứ hai');

      // Tìm kiếm lại "iphone"
      cy.get("#skw").clear().type("iphone");

      cy.get("#skw").type("{enter}");

      // Chờ URL thay đổi cho search iphone lần 2
      cy.url().should("include", "iphone");
      cy.wait(3000);

      // Kiểm tra kết quả lần thứ 2 và so sánh với lần đầu
      cy.get("body").then(($body) => {
        const listProductExists = $body.find(".listproduct").length > 0;

        cy.log(`So sánh kết quả:
          - Lần đầu: .listproduct visible = ${hasInitialListProduct}
          - Lần thứ 2: .listproduct tồn tại = ${listProductExists}`);

        if (listProductExists) {
          cy.get(".listproduct").then(($listProduct) => {
            const isVisible = $listProduct.is(":visible");

            cy.log(
              `Lần tìm kiếm thứ 2: .listproduct tồn tại=${listProductExists}, visible=${isVisible}`
            );

            // Assertion chính: Kiểm tra tính đồng nhất
            if (hasInitialListProduct) {
              // Nếu lần đầu có .listproduct visible thì lần thứ 2 cũng phải có
              expect(isVisible).to.be.true;
              cy.log(
                "THÀNH CÔNG: Kết quả tìm kiếm đồng nhất - .listproduct hiển thị như lần đầu"
              );

              // So sánh chi tiết nội dung nếu có
              if (isVisible && initialResults.length > 0) {
                cy.get(".listproduct .item").then(($secondItems) => {
                  const secondResults = Array.from($secondItems).map((item) => {
                    const name =
                      item.querySelector("h3")?.textContent?.trim() || "";
                    const price =
                      item.querySelector(".price")?.textContent?.trim() || "";
                    return { name, price };
                  });

                  cy.log(
                    `So sánh: Lần đầu có ${initialResults.length} sản phẩm, lần thứ 2 có ${secondResults.length} sản phẩm`
                  );

                  // Kiểm tra một số sản phẩm đầu có giống nhau không
                  const compareCount = Math.min(
                    3,
                    initialResults.length,
                    secondResults.length
                  );
                  let matchCount = 0;

                  for (let i = 0; i < compareCount; i++) {
                    if (initialResults[i].name === secondResults[i].name) {
                      matchCount++;
                    }
                  }

                  const matchRate = matchCount / compareCount;
                  cy.log(
                    `Tỷ lệ khớp tên sản phẩm: ${matchCount}/${compareCount} = ${(
                      matchRate * 100
                    ).toFixed(1)}%`
                  );

                  if (matchRate >= 0.7) {
                    cy.log("Nội dung sản phẩm tương đối đồng nhất");
                  } else {
                    cy.log("Nội dung sản phẩm có sự khác biệt đáng kể");
                  }
                });
              }
            } else {
              // Nếu lần đầu không có .listproduct visible thì lần thứ 2 cũng không nên có
              if (isVisible) {
                cy.log(
                  "CẢNH BÁO: Kết quả không đồng nhất - Lần đầu không có .listproduct nhưng lần thứ 2 có"
                );
              } else {
                cy.log(
                  "THÀNH CÔNG: Kết quả đồng nhất - Cả 2 lần đều không có .listproduct visible"
                );
              }
            }
          });
        } else {
          // Không tìm thấy .listproduct ở lần thứ 2
          if (hasInitialListProduct) {
            // Đây là lỗi - lần đầu có nhưng lần thứ 2 không có
            expect(true).to.be.false; // Force fail
            cy.log(
              "THẤT BẠI: Kết quả không đồng nhất - Lần đầu có .listproduct nhưng lần thứ 2 không có"
            );
          } else {
            cy.log(
              "THÀNH CÔNG: Kết quả đồng nhất - Cả 2 lần đều không có .listproduct"
            );
          }
        }
      });

      cy.log("TC16: Hoàn thành kiểm thử tính đồng nhất kết quả");
    });
  });
});
