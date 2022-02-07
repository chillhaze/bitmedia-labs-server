const Joi = require('joi')

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net', 'ru', 'ua', 'uk', 'org', 'ca'] },
  }),
  phone: Joi.string(),
  favorite: Joi.boolean(),
})
