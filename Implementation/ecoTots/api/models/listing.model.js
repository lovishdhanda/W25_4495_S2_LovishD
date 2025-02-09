import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        size: {
            type: [String], // Array of sizes (e.g., ["S", "M", "L", "XL"])
            required: true,
        },
        gender: {
            type: String,
            enum: ["Boys", "Girls", "Unisex"], // Enum restricts values to specified options
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        discountedPrice: {
            type: Number,
        },
        brand: {
            type: String,
        },
        material: {
            type: String,
        },
        condition: {
            type: String,
            enum: ["New", "Used"], // Enum restricts values to "New" or "Used"
            required: true,
        },
        imageUrls: {
            type: Array,
            required: true,
        },
        userRef: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;