class DashboardPage {
  constructor(page) {
    this.titleHeading = page.locator('[data-test="title"]');
  }

  async title() {
    return this.titleHeading.textContent();
  }
}

module.exports = DashboardPage;
