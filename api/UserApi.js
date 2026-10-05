class UserApi {
  constructor(request) {
    this.request = request;
  }

  async getUsers() {
    return this.request.get("/users");
  }

  async getUser(id) {
    return this.request.get(`/users/${encodeURIComponent(id)}`);
  }

  async createUser(user) {
    return this.request.post("/users", { data: user });
  }
}

module.exports = UserApi;
