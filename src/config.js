/* import React from "react"; */

const envi = "php"; //php
const version = "development"; //production, development

const development = "http://localhost/inspirator/app/";
const production = "http://localhost/inspirator/app/";

const developmentphp = "http://localhost/inspirator/php/";
const productionphp = "http://localhost/inspirator/php/";

function Config() {}

export const getHomePath = () => {
  if (version === "production") return production;
  if (version === "development") return development;
};

export const getPhpPath = () => {
  if (version === "production") return productionphp;
  if (version === "development") return developmentphp;
};

export const getEnvironment = () => {
  return envi;
};

export default Config;
