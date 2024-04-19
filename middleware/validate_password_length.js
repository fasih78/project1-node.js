const express = require("express");
const Joi = require("joi");
const validator = require("validator");

const validatePasswordLength = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    name: Joi.string().required(),
    phonenumber: Joi.string().required(),
    password: Joi.string().min(8).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

module.exports = validatePasswordLength;
