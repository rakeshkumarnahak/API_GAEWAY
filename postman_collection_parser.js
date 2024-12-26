// import data from "./postman_collections/test-server.postman_collection.json";

const data = require("./postman_collections/test-server.postman_collection.json");

// console.log(data);

const route_map = [];

console.log(
  "\n\n**************************************************************************************************************\n"
);

console.log(data.item);

data.item.map((service) => {
  const data = { service: service.name };
  const actions = {};

  service.item.map((item) => {});
});
