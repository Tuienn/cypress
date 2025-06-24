export function compareSearchResults(firstResults, secondResults) {
  cy.log("Bắt đầu so sánh kết quả tìm kiếm");

  // Kiểm tra độ dài mảng phải bằng nhau
  expect(firstResults.length).to.equal(secondResults.length);
  cy.log(`Số lượng kết quả giống nhau: ${firstResults.length} items`);

  // Sắp xếp cả 2 mảng để so sánh chính xác
  const sortedFirst = [...firstResults].sort();
  const sortedSecond = [...secondResults].sort();

  // So sánh từng phần tử
  for (let i = 0; i < sortedFirst.length; i++) {
    expect(sortedFirst[i]).to.equal(sortedSecond[i]);
  }

  cy.log(
    `Đã so sánh thành công ${firstResults.length} kết quả - tất cả đều giống hệt nhau`
  );
}

// Helper function: Kiểm tra kết quả tìm kiếm hiển thị
export function verifySearchResultsDisplay() {
  cy.log("Kiểm tra kết quả tìm kiếm có hiển thị");

  return cy.get("#search-result").then(($searchResult) => {
    const displayStyle = $searchResult.css("display");
    const hasResults =
      $searchResult.find(".suggest_search li:not(.ttile)").length > 0;

    const result = {
      isVisible: displayStyle === "block",
      hasResults: hasResults,
      element: $searchResult,
    };

    cy.log(`Display style: ${displayStyle}, Has results: ${hasResults}`);

    return cy.wrap(result);
  });
}

// Helper function: Thực hiện tìm kiếm và đợi kết quả
export function performSearch(keyword) {
  cy.log(`Thực hiện tìm kiếm với từ khóa: "${keyword}"`);

  return cy
    .get("#skw")
    .should("be.visible")
    .clear()
    .type(keyword)
    .trigger("keyup")
    .wait(1000)
    .then(() => {
      cy.log(`Đã nhập từ khóa "${keyword}" và đợi kết quả`);
    });
}
