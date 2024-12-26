const express = require("express");
const axios = require("axios");
const routeMap = require("./route-map.js");
const app = express();

app.use(express.json());

const PORT = 3000;

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

app.get("/", (req, res) => {
  const requestData = req.body;

  const service_name = route_map.find(
    (item) => item.serviceName == requestData.service
  );

  const action = service_name.actions[requestData.action];

  if (!action) {
    throw new Error(`Action "${requestData.action}" not found.`);
  }

  let backendURL = action.backendUrl;
  let headersObject = action.data.headers;
  let bodyContent = action.data.body;

  // For backend url
  /////////////////////////////////////////////////////
  if (action.data.params.includes("id")) {
    if (!requestData.data.id) {
      throw new Error(`ID not found.`);
    }
    backendURL = action.backendUrl.replace(/id/, requestData.data.id);
  }

  // For header object
  /////////////////////////////////////////////////////
  if (action.data.headers.includes("Authorization")) {
    if (!requestData.data.authorization && !requestData.data.Authorization) {
      throw new Error(`Authorization header not found.`);
    }

    let token =
      requestData.data.authorization || requestData.data.Authorization;

    //TODO: Add logic to check if Bearer is present in the auth token or add it dynamically
    // if (
    //   !requestData.data?.authorization.includes("Bearer") &&
    //   !requestData.data?.Authorization.includes("Bearer")
    // ) {
    //   token = `Bearer ${requestData.data.authorization}`;
    // }

    headersObject = {
      Authorization: token,
    };
  }

  // For body content
  /////////////////////////////////////////////////////
  const excludeKeys = [...action.data.headers, ...action.data.params];
  if (requestData.data) {
    bodyContent = {};
    Object.keys(requestData.data).map((key) => {
      if (!excludeKeys.includes(key)) {
        bodyContent[key] = requestData.data[key];
      }
    });
  }

  /////////////////////////////////////////////////////
  let axiosConfig = {
    method: action.httpMethod,
    url: backendURL,
    data: bodyContent,
  };

  if (action.data.headers.length > 0) {
    axiosConfig = {
      method: action.httpMethod,
      url: backendURL,
      headers: headersObject,
      data: bodyContent,
    };
  }

  // console.log("backendURL: ", backendURL);
  // console.log("headersObject: ", headersObject);
  // console.log("bodyContent: ", bodyContent);

  // console.log(axiosConfig);

  /////////////////////////////////////////////////////
  axios(axiosConfig)
    .then((response) => {
      res.json({ message: "Response recieved", data: response.data });
      console.log(response.data);
    })
    .catch((error) => {
      res.json({
        message: "Error in recieving the response",
        error: error,
      });
      console.log(error);
    });
});

/////////////////////////////////////////////////////
app.listen(PORT, () => {
  console.log("API Gateway server is running on http://localhost:" + PORT);
});
