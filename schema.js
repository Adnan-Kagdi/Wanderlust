const Joi = require("joi")

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
          title: Joi.string().required(),
          description: Joi.string().required(),
          price: Joi.number().min(0).required(),
          location: Joi.string().required(),
          country: Joi.string().required(),
          image: Joi.string().allow("", null)
    }).optional(),
});

module.exports.reviewsSchema = Joi.object({
    reviews: Joi.object({
        rating: Joi.number().min(1).max(5).required(),
        comments: Joi.string().required()
    }).required()
})

