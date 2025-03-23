import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req,res , next) => {
  //check if the listing exists or not
  const listing = await Listing.findById(req.params.id)

  if(!listing){
    return next(errorHandler(404, 'Listing not found!'));
  }

  if(req.user.id !== listing.userRef){
    return next(errorHandler(401, 'You can only delete your own listing'));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been deleted!')
  } catch (error) {
    next(error);
  }

}

export const updateListing = async (req,res , next) => {
  const listing = await Listing.findById(req.params.id);

  if(!listing){
    return next(errorHandler(404, 'Listing not found!'));
  }

  if(req.user.id !== listing.userRef){
    return next(errorHandler(401, 'You can only update your own listing'));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing)
  } catch (error) {
    next(error);
  }

}

export const getListing = async (req,res , next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if(!listing){
      return next(errorHandler(404, 'Listing not found!'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error)
  }
}

// export const getListings = async (req, res, next) => {
// //   try{

// //     const limit = parseInt(req.query.limit) || 9;
// //     const startIndex = parseInt(req.query.startIndex) || 0;

// //     let gender = req.query.gender;

// //     if (gender === undefined || gender === 'all') {
// //       gender = { $in: ['Boys', 'Girls', 'Unisex']};
// //     }

// //     const searchTerm = req.query.searchTerm || '';

// //     const sort = req.query.sort || 'createdAt';

// //     const order = req.query.order || 'desc';

// //     const listings = await Listing.find({
// //       name: { $regex: searchTerm, $options: 'i'},
// //       gender,
// //     }).sort(
// //       {[sort]: order}
// //     ).limit(limit).skip(startIndex);

// //     return res.status(200).json(listings);

// //   } catch (error) {
// //     next(error);
// //   }
// // };
export const getListings = async (req, res) => {
  try {
    const { searchTerm, type, gender, sort = "created_at", order = "desc" } = req.query;
    
    let query = {};

    if (searchTerm) {
      query.name = { $regex: searchTerm, $options: "i" }; // Case-insensitive search
    }

    if (type && type !== "all") {
      query.condition = type.charAt(0).toUpperCase() + type.slice(1); // Match "New" or "Used"
    }

    if (gender && gender !== "all") {
      query.gender = gender;
    }

    const listings = await Listing.find(query).sort({ [sort]: order === "desc" ? -1 : 1 });

    if (listings.length === 0) {
      return res.status(404).json({ message: "No listings found!" });
    }

    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};