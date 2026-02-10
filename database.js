class TikProDatabase {
  constructor() {
    this.initDatabase();
  }

  initDatabase() {
    if (!localStorage.getItem("tikproUsers")) {
      const defaultUsers = [
        {
          id: 1,
          name: "Admin TikPro",
          username: "admin",
          email: "admin@tikpro.com",
          password: "admin123",
          role: "admin",
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          name: "Test User",
          username: "user",
          email: "user@tikpro.com",
          password: "user123",
          role: "user",
          createdAt: new Date().toISOString(),
        },
      ];
      localStorage.setItem("tikproUsers", JSON.stringify(defaultUsers));
    }

    if (!localStorage.getItem("tikproOrders")) {
      localStorage.setItem("tikproOrders", JSON.stringify([]));
    }
  }

  getUsers() {
    return JSON.parse(localStorage.getItem("tikproUsers")) || [];
  }

  saveUsers(users) {
    localStorage.setItem("tikproUsers", JSON.stringify(users));
  }

  findUserByUsernameOrEmail(identifier) {
    const users = this.getUsers();
    return users.find(
      (u) => u.username === identifier || u.email === identifier,
    );
  }

  createUser(userData) {
    const users = this.getUsers();
    const newUser = {
      id: users.length + 1,
      name: userData.name,
      username: userData.username,
      email: userData.email,
      password: userData.password,
      role: "user",
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    this.saveUsers(users);
    return newUser;
  }

  getOrders() {
    return JSON.parse(localStorage.getItem("tikproOrders")) || [];
  }

  saveOrders(orders) {
    localStorage.setItem("tikproOrders", JSON.stringify(orders));
  }

  createOrder(orderData) {
    const orders = this.getOrders();
    const newOrder = {
      id: Date.now(),
      ...orderData,
      date: new Date().toISOString(),
      status: "pending",
    };

    orders.push(newOrder);
    this.saveOrders(orders);
    return newOrder;
  }

  login(identifier, password) {
    const user = this.findUserByUsernameOrEmail(identifier);

    if (user && user.password === password) {
      const users = this.getUsers();
      const userIndex = users.findIndex((u) => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex].lastLogin = new Date().toISOString();
        this.saveUsers(users);
      }

      return user;
    }
    return null;
  }
}

const db = new TikProDatabase();
