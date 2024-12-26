const route_map = [
  {
    serviceName: "user-service",
    actions: {
      get_all_users: {
        httpMethod: "GET",
        backendUrl: "http://localhost:3100/users/",
        data: {
          headers: [],
          body: [],
          params: [],
        },
      },
      get_user: {
        httpMethod: "GET",
        backendUrl: "http://localhost:3100/users/id",
        data: {
          headers: ["Authorization"],
          body: [],
          params: ["id"],
        },
      },
      user_login: {
        httpMethod: "POST",
        backendUrl: "http://localhost:3100/login",
        data: {
          headers: [],
          body: ["email", "password"],
          params: [],
        },
      },
      user_signin: {
        httpMethod: "POST",
        backendUrl: "http://localhost:3100/users/",
        data: {
          headers: [],
          body: ["email", "password"],
          params: [],
        },
      },
      user_update: {
        httpMethod: "PUT",
        backendUrl: "http://localhost:3100/users/id",
        data: {
          headers: ["Authorization"],
          body: ["email", "password"],
          params: ["id"],
        },
      },
    },
  },
  {
    serviceName: "order-service",
    actions: {
      post_order: {
        httpMethod: "POST",
        backendUrl: "http://localhost:3200/orders",
        data: {
          headers: [],
          body: ["product", "quantity", "totalPrice"],
          params: [],
        },
      },
      get_all_orders: {
        httpMethod: "GET",
        backendUrl: "http://localhost:3200/orders",
        data: {
          headers: [],
          body: [],
          params: [],
        },
      },
      get_order: {
        httpMethod: "GET",
        backendUrl: "http://localhost:3200/orders/id",
        data: {
          headers: [],
          body: [],
          params: ["id"],
        },
      },
    },
  },
];
