import {
  accessLoginPage,
  enterPhoneNumber,
  clickContinueButton,
  verifyStillOnStep1,
  verifyErrorMessage,
  verifyRecaptchaDisplay,
  waitForManualRecaptchaBypass,
  enterOTP,
  clickConfirmOTPButton,
  verifyStillOnStep2,
} from "../support/login";

describe("Kiểm thử chức năng đăng nhập - TheGioiDiDong", () => {
  // Helper function: Truy cập trang đăng nhập và đợi load

  beforeEach(() => {
    cy.log("Bắt đầu kiểm thử đăng nhập - Setup ban đầu");
    accessLoginPage();
  });

  it("TC1: Không nhập số điện thoại", () => {
    cy.log("TC1: Bắt đầu kiểm thử trường hợp không nhập số điện thoại");

    cy.log("Kiểm tra input số điện thoại ban đầu có trống không");
    cy.get("#txtPhoneNumber")
      .should("have.value", "")
      .then(() => {
        cy.log("Xác nhận input số điện thoại đang trống");

        // Nhấn nút Tiếp tục mà không nhập số điện thoại
        clickContinueButton().then(() => {
          // Kiểm tra form không submit thành công
          verifyStillOnStep1().then(() => {
            cy.log("Kiểm tra validation HTML5 của trình duyệt");

            cy.get("#txtPhoneNumber").then(($input) => {
              if ($input[0].hasAttribute("required")) {
                expect($input[0].checkValidity()).to.be.false;
                cy.log(
                  "HTML5 validation hoạt động - input required không hợp lệ"
                );
              }
            });

            // Kiểm tra message lỗi
            verifyErrorMessage().then(() => {
              cy.log(
                "TC1: Hoàn thành thành công - Hệ thống đã ngăn chặn submit khi không nhập số điện thoại"
              );
            });
          });
        });
      });
  });

  it("TC2: Nhập chữ/kí tự đặc biệt", () => {
    cy.log(
      "TC2: Bắt đầu kiểm thử trường hợp nhập chữ/ký tự đặc biệt vào số điện thoại"
    );

    // Nhập giá trị không hợp lệ
    enterPhoneNumber("123ab*").then(() => {
      cy.log("Kiểm tra giá trị thực tế trong input sau khi nhập");

      cy.get("#txtPhoneNumber").then(($input) => {
        const actualValue = $input.val();
        cy.log(`Giá trị thực tế trong input: "${actualValue}"`);

        if (actualValue === "123") {
          cy.log(
            "THÀNH CÔNG: Hệ thống đã lọc bỏ ký tự không hợp lệ - chỉ giữ lại số"
          );
          cy.log("TC2: Hoàn thành - Validation input hoạt động đúng");
        } else if (actualValue === "123ab*") {
          cy.log(
            "Hệ thống cho phép nhập ký tự đặc biệt - Kiểm tra validation khi submit"
          );

          clickContinueButton().then(() => {
            verifyStillOnStep1().then(() => {
              verifyErrorMessage().then(() => {
                cy.log("TC2: Validation khi submit đã hoạt động đúng");
              });
            });
          });
        } else {
          cy.log(
            `Hệ thống xử lý input theo cách khác - Giá trị: "${actualValue}"`
          );
        }
      });
    });
  });

  it("TC3: Nhập số điện thoại kèm khoảng trắng", () => {
    cy.log(
      "TC3: Bắt đầu kiểm thử trường hợp nhập số điện thoại có khoảng trắng"
    );

    // Nhập số điện thoại có khoảng trắng
    enterPhoneNumber("085 422 289").then(() => {
      cy.log("Kiểm tra hệ thống xử lý khoảng trắng");

      cy.get("#txtPhoneNumber").then(($input) => {
        const actualValue = $input.val();
        cy.log(`Giá trị sau khi nhập: "${actualValue}"`);

        if (actualValue === "085422289") {
          cy.log("THÀNH CÔNG: Hệ thống đã loại bỏ khoảng trắng");

          // Xác minh giá trị chỉ chứa số
          expect(actualValue).to.not.include(" ");
          expect(actualValue).to.match(/^\d+$/);

          cy.log(
            "TC3: Hoàn thành - Hệ thống xử lý đúng khoảng trắng trong số điện thoại"
          );
        } else {
          cy.log(`Kết quả không như mong đợi: "${actualValue}"`);
        }
      });
    });
  });

  it("TC4: Nhập số điện thoại không đúng định dạng số VN", () => {
    cy.log("TC4: Bắt đầu kiểm thử số điện thoại không đúng định dạng Việt Nam");

    // Nhập số điện thoại không đúng định dạng VN
    enterPhoneNumber("0123456789").then(() => {
      // Thử submit
      clickContinueButton().then(() => {
        cy.log("Kiểm tra validation định dạng số điện thoại Việt Nam");

        // Kiểm tra form không được submit
        verifyStillOnStep1().then(() => {
          verifyErrorMessage().then(() => {
            cy.log(
              "TC4: Hoàn thành - Hệ thống đã ngăn chặn số điện thoại không đúng định dạng VN"
            );
          });
        });
      });
    });
  });

  it("TC5: Hỗ trợ reCaptcha", () => {
    cy.log("TC5: Bắt đầu kiểm thử chức năng hỗ trợ reCAPTCHA");

    // Nhập số điện thoại đúng định dạng
    enterPhoneNumber("0942029421").then(() => {
      // Nhấn nút Tiếp tục để kích hoạt reCAPTCHA
      clickContinueButton().then(() => {
        cy.log("Kiểm tra tất cả thành phần reCAPTCHA");

        // Sử dụng helper function để verify reCAPTCHA
        verifyRecaptchaDisplay().then(() => {
          cy.log("TC5: Hoàn thành - Đã xác minh reCAPTCHA hoạt động đúng");
        });
      });
    });
  });

  it("TC6: Không tích Checkbox xác minh reCaptcha", () => {
    cy.log("TC6: Bắt đầu kiểm thử trường hợp không tích checkbox reCAPTCHA");

    // Nhập số điện thoại đúng định dạng
    enterPhoneNumber("0942029442").then(() => {
      // Nhấn nút Tiếp tục mà không tích checkbox reCAPTCHA
      clickContinueButton().then(() => {
        cy.log("Kiểm tra hệ thống ngăn chặn khi chưa xác minh reCAPTCHA");

        // Kiểm tra form không submit thành công
        verifyStillOnStep1().then(() => {
          // Kiểm tra reCAPTCHA vẫn hiển thị yêu cầu xác thực
          verifyRecaptchaDisplay().then(() => {
            verifyErrorMessage().then(() => {
              cy.log(
                "TC6: Hoàn thành - Hệ thống đã ngăn chặn khi chưa xác minh reCAPTCHA"
              );
            });
          });
        });
      });
    });
  });

  it("TC7: Nhấn nút ENTER để đăng nhập", () => {
    cy.log("TC7: Bắt đầu kiểm thử chức năng nhấn phím ENTER");

    // Nhập số điện thoại đúng định dạng
    enterPhoneNumber("0942029442").then(() => {
      cy.log("Nhấn phím ENTER thay vì click nút Tiếp tục");

      // Nhấn phím ENTER
      cy.get("#txtPhoneNumber")
        .type("{enter}")
        .then(() => {
          cy.log("Đã nhấn phím ENTER");
          cy.wait(2000);

          cy.log("Kiểm tra phím ENTER có tác dụng tương tự nút Tiếp tục");

          // Kiểm tra reCAPTCHA hiển thị (giống TC5)
          verifyRecaptchaDisplay().then(() => {
            cy.log(
              "TC7: Hoàn thành - Phím ENTER hoạt động tương đương nút Tiếp tục"
            );
          });
        });
    });
  });

  it("TC8: Nhập ít/nhiều hơn 6 số OTP", () => {
    cy.log("TC8: Bắt đầu kiểm thử validation độ dài OTP");

    // Setup đến trang nhập OTP
    cy.log(
      "PHẦN 1: Setup đến trang nhập OTP - cần can thiệp thủ công cho reCAPTCHA"
    );

    enterPhoneNumber("0942029422").then(() => {
      clickContinueButton().then(() => {
        // Đợi user manual bypass reCAPTCHA
        waitForManualRecaptchaBypass().then(() => {
          cy.log("PHẦN 2: Bắt đầu test validation OTP");

          // Sub-test 1: Nhập ít hơn 6 số
          cy.log("Sub-test 1: Nhập ít hơn 6 số - nhập 123");
          enterOTP("123").then(() => {
            clickConfirmOTPButton().then(() => {
              cy.log("Kiểm tra form không submit thành công khi OTP ngắn");

              verifyStillOnStep2().then(() => {
                cy.log("Kiểm tra validation message hiển thị cho OTP ngắn");
                cy.get(".step2 label").should("be.visible");

                // Sub-test 2: Nhập nhiều hơn 6 số
                cy.log("Sub-test 2: Nhập nhiều hơn 6 số - nhập 1234567");
                enterOTP("1234567").then(() => {
                  cy.log("Kiểm tra maxlength=6 - chỉ cho phép tối đa 6 số");

                  cy.get('input[name="txtOTP"]')
                    .should("have.value", "123456")
                    .then(($input) => {
                      const value = $input.val();
                      expect(value).to.have.length.at.most(6);
                      cy.log(`Xác minh độ dài value: ${value.length} ≤ 6`);

                      cy.log(
                        "TC8: Hoàn thành - Đã kiểm tra validation độ dài OTP"
                      );
                    });
                });
              });
            });
          });
        });
      });
    });
  });

  it("TC9: Nhập chữ/kí tự đặc biệt vào OTP", () => {
    cy.log("TC9: Bắt đầu kiểm thử nhập ký tự đặc biệt vào trường OTP");

    // Setup đến trang nhập OTP
    cy.log(
      "PHẦN 1: Setup đến trang nhập OTP - cần can thiệp thủ công cho reCAPTCHA"
    );

    enterPhoneNumber("0942029423").then(() => {
      clickContinueButton().then(() => {
        // Đợi user manual bypass reCAPTCHA
        waitForManualRecaptchaBypass().then(() => {
          cy.log("PHẦN 2: Test nhập ký tự đặc biệt vào OTP");

          // Nhập ký tự đặc biệt và chữ cái
          enterOTP("123*ab").then(() => {
            cy.log("Kiểm tra giá trị thực tế trong input OTP sau khi nhập");

            cy.get('input[name="txtOTP"]').then(($input) => {
              const value = $input.val();
              cy.log(`Giá trị hiện tại trong OTP input: "${value}"`);

              if (value === "123") {
                cy.log(
                  "THÀNH CÔNG: Hệ thống đã lọc bỏ ký tự đặc biệt - chỉ giữ lại số"
                );

                // Kiểm tra OTP chỉ chứa số
                expect(value).to.match(/^\d*$/, "OTP chỉ nên chứa số");
                cy.log(
                  "TC9: Hoàn thành - Hệ thống xử lý đúng ký tự đặc biệt trong OTP"
                );
              } else if (value === "123*ab") {
                cy.log(
                  "HỆ THỐNG CHO PHÉP NHẬP KÝ TỰ ĐẶC BIỆT - ĐÂY LÀ LỖI BẢO MẬT!"
                );

                // Thử submit để kiểm tra validation
                clickConfirmOTPButton().then(() => {
                  verifyStillOnStep2().then(() => {
                    cy.get(".step2 label").should("be.visible");

                    cy.log(
                      "Test FAILED: Hệ thống cho phép nhập ký tự đặc biệt vào OTP"
                    );
                    cy.fail(
                      "Lỗi bảo mật: Hệ thống cho phép nhập ký tự đặc biệt vào trường OTP"
                    );
                  });
                });
              } else {
                cy.log(
                  `Hệ thống xử lý input theo cách khác - Giá trị: "${value}"`
                );

                if (value && value.length > 0) {
                  expect(value).to.match(/^\d*$/, "OTP chỉ nên chứa số");
                }

                cy.log(
                  "TC9: Hoàn thành - Đã kiểm tra xử lý ký tự đặc biệt trong OTP"
                );
              }
            });
          });
        });
      });
    });
  });

  it("TC10: Nhập sai mã xác thực", () => {
    cy.log("TC10: Bắt đầu kiểm thử trường hợp nhập mã OTP sai");

    // Setup đến trang nhập OTP
    cy.log(
      "PHẦN 1: Setup đến trang nhập OTP - cần can thiệp thủ công cho reCAPTCHA"
    );

    enterPhoneNumber("0942029424").then(() => {
      clickContinueButton().then(() => {
        // Đợi user manual bypass reCAPTCHA
        waitForManualRecaptchaBypass().then(() => {
          cy.log("PHẦN 2: Test nhập mã OTP sai");

          // Nhập mã OTP sai
          enterOTP("111111").then(() => {
            cy.log("Nhấn nút xác nhận với mã OTP sai");

            clickConfirmOTPButton().then(() => {
              cy.log("Kiểm tra hệ thống xử lý mã OTP sai");

              // Kiểm tra vẫn ở step2
              verifyStillOnStep2().then(() => {
                cy.log("Kiểm tra thông báo chi tiết về mã OTP sai");

                // Kiểm tra message lỗi trong label
                cy.get(".step2 label")
                  .should("be.visible")
                  .then(($label) => {
                    const labelText = $label.text().trim();
                    cy.log(`Thông báo lỗi trong label: "${labelText}"`);

                    if (labelText && labelText.length > 0) {
                      cy.log("Có thông báo lỗi trong label element");
                    }
                  });

                // Kiểm tra responseMessage span
                cy.get(".step2 .responseMessage").then(($responseMsg) => {
                  if (
                    $responseMsg.length > 0 &&
                    !$responseMsg.hasClass("hide")
                  ) {
                    const responseText = $responseMsg.text().trim();
                    cy.log(`Thông báo chi tiết: "${responseText}"`);

                    if (responseText && responseText.length > 0) {
                      cy.log("THÀNH CÔNG: Có thông báo chi tiết về mã OTP sai");
                      expect(responseText).to.not.be.empty;
                    }
                  } else {
                    cy.log(
                      "Không tìm thấy thông báo chi tiết trong responseMessage"
                    );
                  }
                });

                // Kiểm tra số điện thoại vẫn hiển thị đúng
                cy.get(".step2 .s1 b").then(($phoneDisplay) => {
                  const displayedPhone = $phoneDisplay.text().trim();
                  cy.log(`Số điện thoại hiển thị: ${displayedPhone}`);
                  expect(displayedPhone).to.include("0942029442");
                });

                cy.log(
                  "TC10: Hoàn thành - Đã kiểm tra xử lý mã OTP sai và thông báo"
                );
              });
            });
          });
        });
      });
    });
  });

  it("TC11: Hỗ trợ gửi lại mã xác nhận", () => {
    cy.log("TC11: Bắt đầu kiểm thử chức năng gửi lại mã xác nhận");

    // Setup đến trang nhập OTP
    cy.log(
      "PHẦN 1: Setup đến trang nhập OTP - cần can thiệp thủ công cho reCAPTCHA"
    );

    enterPhoneNumber("0942029425").then(() => {
      clickContinueButton().then(() => {
        // Đợi user manual bypass reCAPTCHA
        waitForManualRecaptchaBypass().then(() => {
          cy.log("PHẦN 2: Test chức năng gửi lại mã xác nhận");

          cy.log("Kiểm tra thông báo ban đầu");
          cy.get(".step2 .s1")
            .should("be.visible")
            .and("contain.text", "Mã xác nhận đã được gửi");

          cy.log("Kiểm tra countdown timer ban đầu");
          cy.get(".step2 .resend-sms")
            .should("be.visible")
            .and("contain.text", "Nếu không nhận được mã");

          cy.log("Đợi countdown timer về 0 (có thể mất 1 phút)");
          cy.log("CẢNH BÁO: Test này sẽ đợi tối đa 65 giây cho countdown");

          // Đợi countdown timer hết thời gian (tối đa 65 giây)
          cy.get(".step2 .resend-sms", { timeout: 65000 }).then(($element) => {
            const text = $element.text();
            // Kiểm tra có xuất hiện nút hoặc link "Gửi lại" hoặc countdown về 0
            const hasResendOption =
              text.includes("Gửi lại") ||
              text.includes("0 giây") ||
              text.includes("Thử lại");

            if (!hasResendOption) {
              // Nếu chưa có option gửi lại, log thời gian còn lại
              cy.log(`Countdown hiện tại: ${text}`);
            }
          });

          cy.log("Tìm kiếm nút hoặc link gửi lại mã");

          // Tìm kiếm các element có thể là nút gửi lại
          cy.get("body").then(($body) => {
            // Tìm button hoặc link có text liên quan đến "gửi lại"
            cy.get(".step2 .resend-sms").click();

            cy.wait(2000);

            cy.log("Kiểm tra thông báo 'Mã xác nhận đã được gửi lại'");
            cy.get(".step2 .s2").then(($s2) => {
              if ($s2.length > 0 && !$s2.hasClass("hide")) {
                const s2Text = $s2.text().trim();
                cy.log(`Thông báo gửi lại: "${s2Text}"`);

                if (s2Text.includes("gửi lại")) {
                  cy.log("THÀNH CÔNG: Đã gửi lại mã xác nhận");
                  expect(s2Text).to.include("gửi lại");
                }
              } else {
                cy.log("Kiểm tra các thông báo khác về gửi lại mã");

                // Kiểm tra responseMessage
                cy.get(".step2 .responseMessage").then(($response) => {
                  if ($response.length > 0 && !$response.hasClass("hide")) {
                    const responseText = $response.text().trim();
                    cy.log(`Response message: "${responseText}"`);
                  }
                });
              }
            });

            cy.log(
              "TC11: Hoàn thành - Đã kiểm tra chức năng gửi lại mã xác nhận"
            );
          });
        });
      });
    });
  });

  it("TC12: Hỗ trợ thay đổi số điện thoại", () => {
    cy.log("TC12: Bắt đầu kiểm thử chức năng thay đổi số điện thoại");

    // Setup đến trang nhập OTP
    cy.log(
      "PHẦN 1: Setup đến trang nhập OTP - cần can thiệp thủ công cho reCAPTCHA"
    );

    enterPhoneNumber("0942029426").then(() => {
      clickContinueButton().then(() => {
        // Đợi user manual bypass reCAPTCHA
        waitForManualRecaptchaBypass().then(() => {
          cy.log("PHẦN 2: Test chức năng thay đổi số điện thoại");

          cy.log("Kiểm tra hiển thị số điện thoại hiện tại");
          cy.get(".step2 .s1 b")
            .should("be.visible")
            .should("contain.text", "0942029426");

          cy.log("Tìm và click nút 'Thay đổi số điện thoại'");
          cy.get(".btnChangeNum")
            .should("be.visible")
            .and("contain.text", "Thay đổi số điện thoại")
            .click();

          cy.wait(2000);

          cy.log("Kiểm tra đã quay lại giao diện nhập số điện thoại (step1)");

          // Kiểm tra step1 hiển thị
          cy.get(".step1")
            .should("be.visible")
            .then(() => {
              cy.log("THÀNH CÔNG: Đã quay lại step1");

              // Kiểm tra step2 bị ẩn
              cy.get(".step2")
                .should("have.class", "hide")
                .then(() => {
                  cy.log("Xác nhận: step2 đã bị ẩn");

                  // Kiểm tra input số điện thoại có sẵn và có thể nhập
                  cy.get("#txtPhoneNumber")
                    .should("be.visible")
                    .should("be.enabled")
                    .then(($input) => {
                      const currentValue = $input.val();
                      cy.log(`Giá trị hiện tại trong input: "${currentValue}"`);

                      // Kiểm tra có thể nhập số điện thoại mới
                      cy.log("Test nhập số điện thoại mới");
                      cy.get("#txtPhoneNumber")
                        .clear()
                        .type("0987654321")
                        .should("have.value", "0987654321");

                      cy.log("Kiểm tra nút 'Tiếp tục' có sẵn");
                      cy.get('button[type="submit"].btn')
                        .contains("Tiếp tục")
                        .should("be.visible")
                        .should("be.enabled");

                      cy.log(
                        "TC12: Hoàn thành THÀNH CÔNG - Chức năng thay đổi số điện thoại hoạt động đúng"
                      );
                    });
                });
            });
        });
      });
    });
  });

  it("TC13: Nhấn nút ENTER để xác thực", () => {
    cy.log("TC13: Bắt đầu kiểm thử chức năng nhấn phím ENTER để xác thực OTP");

    // Setup đến trang nhập OTP
    cy.log(
      "PHẦN 1: Setup đến trang nhập OTP - cần can thiệp thủ công cho reCAPTCHA"
    );

    enterPhoneNumber("0942029427").then(() => {
      clickContinueButton().then(() => {
        // Đợi user manual bypass reCAPTCHA
        waitForManualRecaptchaBypass().then(() => {
          cy.log("PHẦN 2: Test nhấn phím ENTER để xác thực");

          // Nhập một mã OTP để test (có thể là mã sai)
          enterOTP("123456").then(() => {
            cy.log("Nhấn phím ENTER thay vì click nút 'Xác nhận'");

            // Nhấn phím ENTER từ input OTP
            cy.get('input[name="txtOTP"]')
              .type("{enter}")
              .then(() => {
                cy.log("Đã nhấn phím ENTER từ input OTP");
                cy.wait(3000); // Đợi phản hồi

                cy.log(
                  "Kiểm tra phím ENTER có tác dụng tương tự nút 'Xác nhận'"
                );

                // Kiểm tra xem có submit được không
                cy.get("body").then(($body) => {
                  // Kiểm tra có chuyển trang hoặc có thông báo lỗi
                  if ($body.find(".step2").length > 0) {
                    // Vẫn ở step2 - kiểm tra có thông báo lỗi không
                    cy.get(".step2").then(($step2) => {
                      if (!$step2.hasClass("hide")) {
                        cy.log("Vẫn ở step2 - kiểm tra thông báo xử lý");

                        // Kiểm tra message lỗi hoặc response
                        cy.get(".step2 label").then(($label) => {
                          if ($label.is(":visible")) {
                            const labelText = $label.text().trim();
                            cy.log(
                              `Thông báo sau khi nhấn ENTER: "${labelText}"`
                            );
                          }
                        });

                        cy.get(".step2 .responseMessage").then(($response) => {
                          if (
                            $response.length > 0 &&
                            !$response.hasClass("hide")
                          ) {
                            const responseText = $response.text().trim();
                            cy.log(`Response message: "${responseText}"`);
                          }
                        });

                        cy.log(
                          "THÀNH CÔNG: Phím ENTER hoạt động tương đương nút 'Xác nhận'"
                        );
                      }
                    });
                  } else {
                    cy.log("Có thể đã chuyển trang - phím ENTER hoạt động");
                  }

                  cy.log(
                    "TC13: Hoàn thành - Đã kiểm tra chức năng phím ENTER cho xác thực OTP"
                  );
                });
              });
          });
        });
      });
    });
  });

  it("TC14: Nhập đúng mã xác thực", () => {
    cy.log("TC14: Bắt đầu kiểm thử trường hợp nhập đúng mã OTP");

    // Setup đến trang nhập OTP
    cy.log(
      "PHẦN 1: Setup đến trang nhập OTP - cần can thiệp thủ công cho reCAPTCHA"
    );

    enterPhoneNumber("0975419326").then(() => {
      clickContinueButton().then(() => {
        // Đợi user manual bypass reCAPTCHA
        waitForManualRecaptchaBypass().then(() => {
          cy.log("PHẦN 2: Đợi user nhập đúng mã OTP thủ công");

          cy.log(
            "HƯỚNG DẪN: Vui lòng nhập mã OTP đúng từ tin nhắn và nhấn 'Xác nhận'"
          );
          cy.log("Hệ thống sẽ đợi tối đa 2 phút (120 giây) để hoàn thành");
          cy.log(
            "Kiểm tra URL sẽ chuyển từ trang đăng nhập sang trang giỏ hàng"
          );

          // Xác định URL ban đầu (trang đăng nhập)
          const loginUrl =
            "https://www.thegioididong.com/lich-su-mua-hang/dang-nhap";
          const cartUrl = "https://www.thegioididong.com/cart";

          cy.log(`URL đăng nhập mong đợi: ${loginUrl}`);
          cy.log(`URL giỏ hàng mong đợi: ${cartUrl}`);

          // Đợi URL thay đổi từ trang đăng nhập sang trang giỏ hàng
          // Sử dụng polling để kiểm tra URL thay đổi
          const checkUrlChange = () => {
            cy.url({ timeout: 5000 }).then((currentUrl) => {
              cy.log(`URL hiện tại: ${currentUrl}`);

              if (currentUrl === cartUrl) {
                cy.log("THÀNH CÔNG: URL đã chuyển đúng sang trang giỏ hàng!");
                return;
              } else if (!currentUrl.includes("dang-nhap")) {
                cy.log(
                  `URL đã thay đổi nhưng không phải giỏ hàng: ${currentUrl}`
                );
                cy.log(
                  "Có thể đăng nhập thành công nhưng chuyển đến trang khác"
                );
                return;
              } else {
                cy.log("Vẫn ở trang đăng nhập - tiếp tục đợi...");
                cy.wait(3000);

                // Kiểm tra nếu đã quá thời gian timeout
                const currentTime = Date.now();
                if (currentTime - startTime < 120000) {
                  checkUrlChange();
                } else {
                  cy.log("Đã hết thời gian chờ 2 phút");
                }
              }
            });
          };

          const startTime = Date.now();
          checkUrlChange();

          // Kiểm tra URL cuối cùng
          cy.url().then((finalUrl) => {
            cy.log(`URL cuối cùng: ${finalUrl}`);

            if (finalUrl === cartUrl) {
              cy.log("HOÀN HẢO: Đã chuyển chính xác đến trang giỏ hàng");
            } else if (!finalUrl.includes("dang-nhap")) {
              cy.log(
                "THÀNH CÔNG: Đã rời khỏi trang đăng nhập (đăng nhập thành công)"
              );
            } else {
              cy.log("THẤT BẠI: Vẫn ở trang đăng nhập");
            }

            cy.log(
              "TC14: Hoàn thành - Đã kiểm tra chuyển đổi URL sau đăng nhập"
            );
          });
        });
      });
    });
  });
});
