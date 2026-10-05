class LoginApi {
  constructor(request) {
    this.request = request;
  }

  async login(credentials) {
    return this.request.post("/auth/login", { data: credentials });
  }
}

module.exports = LoginApi;
