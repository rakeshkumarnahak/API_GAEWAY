route_map = [
  {
    service: "user-service",
    actions: {
      action1: {
        actionName: "get-user",
        httpMethod: "GET",
        backendUrl: "http://localhost:3000/users/{id}",
        data: {
          headers: [],
          body: [],
          params: [id],
        },
      },
      action2: {
        actionName: "post-user",
        httpMethod: "POST",
        backendUrl: "http://localhost:3000/users",
        data: {
          headers: [],
          body: [firstName, lastName, email, password],
          params: [id],
        },
      },
      action3: {
        actionName: "update-user",
        httpMethod: "PUT",
        backendUrl: "http://localhost:3000/users/{id}",
        data: {
          headers: [],
          body: [firstName, lastName],
          params: [id],
        },
      },
      action4: {
        actionName: "delete-user",
        httpMethod: "DELETE",
        backendUrl: "http://localhost:3000/users/{id}",
        data: {
          headers: [],
          body: [],
          params: [id],
        },
      },
    },
  },
  {
    service: "order-service",
    actions: {
      action1: {
        actionName: "get-orders",
        httpMethod: "GET",
        backendUrl: "http://localhost:3001/orders",
        data: {
          headers: [accessToken],
          body: [],
          params: [],
        },
      },
      action1: {
        actionName: "get-order",
        httpMethod: "GET",
        backendUrl: "http://localhost:3001/orders/{id}",
        data: {
          headers: [],
          body: [],
          params: [id],
        },
      },
      action2: {
        actionName: "post-order",
        httpMethod: "POST",
        backendUrl: "http://localhost:3001/orders/",
        data: {
          headers: [accessToken],
          body: [foodId, address],
          params: [id],
        },
      },
      action3: {
        actionName: "update-order",
        httpMethod: "PUT",
        backendUrl: "http://localhost:3001/orders/{id}",
        data: {
          headers: [accessToken],
          body: [address, foodId],
          params: [id],
        },
      },
      action4: {
        actionName: "delete-user",
        httpMethod: "DELETE",
        backendUrl: "http://localhost:3001/orders/{id}",
        data: {
          headers: [accessToken],
          body: [],
          params: [id],
        },
      },
    },
  },
];
