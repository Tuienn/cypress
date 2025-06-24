export function accessLoginPage() {
  cy.log("Truy cập trang đăng nhập TheGioiDiDong");
  return cy
    .visit("https://www.thegioididong.com/lich-su-mua-hang/dang-nhap")
    .then(() => {
      cy.log("Đợi trang load hoàn toàn và kiểm tra input số điện thoại");
      return cy.get("#txtPhoneNumber").should("be.visible");
    });
}

// Helper function: Nhập số điện thoại
export function enterPhoneNumber(phoneNumber) {
  cy.log(`Nhập số điện thoại: ${phoneNumber}`);
  return cy
    .get("#txtPhoneNumber")
    .clear()
    .type(phoneNumber)
    .then(() => {
      cy.log(`Đã nhập số điện thoại: ${phoneNumber}`);
      return cy.wrap(phoneNumber);
    });
}

// Helper function: Nhấn nút Tiếp tục
export function clickContinueButton() {
  cy.log("Nhấn nút 'Tiếp tục'");
  return cy
    .get('button[type="submit"].btn')
    .contains("Tiếp tục")
    .click()
    .then(() => {
      cy.log("Đã nhấn nút 'Tiếp tục'");
      cy.wait(2000); // Đợi phản hồi
    });
}

// Helper function: Kiểm tra form vẫn ở step1 (không submit thành công)
export function verifyStillOnStep1() {
  cy.log("Kiểm tra form vẫn ở step1 - không submit thành công");
  return cy
    .get(".step1")
    .should("be.visible")
    .then(() => {
      return cy
        .get(".step2")
        .should("have.class", "hide")
        .then(() => {
          cy.log("Xác nhận: Form vẫn ở step1, không chuyển sang step2");
          return cy.wrap(true);
        });
    });
}

// Helper function: Kiểm tra message lỗi hiển thị
export function verifyErrorMessage() {
  cy.log("Kiểm tra message lỗi hiển thị");
  return cy
    .get('label[class=""]')
    .should("be.visible")
    .then(() => {
      cy.log("Đã xác nhận message lỗi hiển thị");
      return cy.wrap(true);
    });
}

// Helper function: Kiểm tra reCAPTCHA hiển thị
export function verifyRecaptchaDisplay() {
  cy.log("Kiểm tra reCAPTCHA container và các thành phần");
  return cy
    .get(".captchav2-container")
    .should("be.visible")
    .then(() => {
      cy.log("reCAPTCHA container hiển thị thành công");

      return cy
        .get("#reCapCachaV2")
        .should("be.visible")
        .then(() => {
          cy.log("reCAPTCHA iframe element hiển thị");

          return cy
            .get("#reCapCachaV2 iframe")
            .should("exist")
            .then(() => {
              cy.log("iframe checkbox reCAPTCHA tồn tại");

              return cy
                .contains(
                  'Vui lòng xác thực "Không phải là người máy" để tiếp tục đăng nhập.'
                )
                .should("be.visible")
                .then(() => {
                  cy.log("Label yêu cầu xác thực hiển thị đúng");

                  return cy
                    .get("#g-recaptcha-response")
                    .should("exist")
                    .then(() => {
                      cy.log("Textarea reCAPTCHA response tồn tại");
                      return cy.wrap(true);
                    });
                });
            });
        });
    });
}

// Helper function: Đợi manual bypass reCAPTCHA và chuyển sang step2
export function waitForManualRecaptchaBypass() {
  cy.log("Đợi user bypass reCAPTCHA thủ công - timeout 100s");
  return cy
    .get(".step2", { timeout: 100000 })
    .should("not.have.class", "hide")
    .then(() => {
      return cy
        .get(".step1")
        .should("not.be.visible")
        .then(() => {
          cy.log("Đã chuyển sang step2 thành công sau khi bypass reCAPTCHA");
          return cy.wrap(true);
        });
    });
}

// Helper function: Nhập OTP
export function enterOTP(otpValue) {
  cy.log(`Nhập OTP: ${otpValue}`);
  return cy
    .get('input[name="txtOTP"]')
    .clear()
    .type(otpValue)
    .then(() => {
      cy.log(`Đã nhập OTP: ${otpValue}`);
      return cy.wrap(otpValue);
    });
}

// Helper function: Nhấn nút Xác nhận OTP
export function clickConfirmOTPButton() {
  cy.log("Nhấn nút 'Xác nhận' OTP");
  return cy
    .get('#frmSubmitVerifyCode button[type="submit"]')
    .contains("Xác nhận")
    .click()
    .then(() => {
      cy.log("Đã nhấn nút 'Xác nhận' OTP");
      cy.wait(2000);
    });
}

// Helper function: Kiểm tra form vẫn ở step2 (OTP không hợp lệ)
export function verifyStillOnStep2() {
  cy.log("Kiểm tra form vẫn ở step2 - OTP không được chấp nhận");
  return cy
    .get(".step2")
    .should("not.have.class", "hide")
    .then(() => {
      cy.log("Xác nhận: Form vẫn ở step2");
      return cy.wrap(true);
    });
}
