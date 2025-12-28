
import Ad from '../models/adModel.js';
import User from '../models/userModel.js'; // Good practice to import User if we reference it.

// @desc    Create a new ad
const createAd = async (req, res) => {
    try {
        console.log("Ad creation started");
        console.log("Body:", req.body);
        console.log("Files:", req.files);
        console.log("User:", req.user);

        const { title, description, category, price, condition, location } = req.body;

        const imageUrls = req.files?.map(file => ({
            url: file.path,
            publicId: file.filename
        })) || [];

        const ad = new Ad({
            seller: req.user._id,
            title,
            description,
            category,
            price,
            condition,
            location,
            imageUrls
        });

        const createdAd = await ad.save();
        console.log("Ad created:", createdAd);
        res.status(201).json({ data: createdAd });

    } catch (err) {
        console.error("❌ Ad creation failed:", err);
        res.status(500).json({ message: "Ad creation failed", error: err.message });
    }
};



// @desc    Get ads (all or by category)
const getAds = async (req, res) => {
    const filter = req.query.category ? { category: { $regex: req.query.category, $options: 'i' } } : {};
    // Populate seller name for potential use on listing pages
    const ads = await Ad.find(filter).populate('seller', 'name').sort({ createdAt: -1 });
    res.status(200).json({ data: ads });
};

const getAdsByTitle = async (req, res) => {
    const title = req.body.title;

    const ads = await Ad.find({ title: { $regex: `^${title}` } }).sort({ createdAt: -1 });
    res.status(200).json({ data: ads });
};


// @desc    Get featured ads
const getFeaturedAds = async (req, res) => {
    // Logic: Return latest 8 ads as "featured"
    const ads = await Ad.find({}).populate('seller', 'name').sort({ createdAt: -1 }).limit(8);
    res.status(200).json({ data: ads });
};

// @desc    Get all ads posted by the logged-in user
const getMyAds = async (req, res) => {
    try {
        console.log("User info in req.user:", req.user);
        const ads = await Ad.find({ seller: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({ data: ads });
    } catch (err) {
        console.error("Error in getMyAds:", err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// @desc    Get a single ad by its ID
const getAdById = async (req, res) => {
    try {

        // Now populating 'name' and 'email' from the referenced User document.
        const ad = await Ad.findById(req.params.id).populate('seller', 'name email');

        if (ad) {
            res.status(200).json({ data: ad });
        } else {
            res.status(404).json({ message: 'Ad not found' });
        }
    } catch (error) {
        console.error("Error in getAdById:", error);
        res.status(500).json({ message: "Server error while fetching ad." });
    }
};

const updateAd = async (req, res) => {
    try {
        const ad = await Ad.findById(req.params.id);

        if (!ad) {
            return res.status(404).json({ message: 'Ad not found' });
        }

        // Check that the logged-in user owns the ad
        if (ad.seller.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to update this ad' });
        }

        // Update fields (add more as needed)
        ad.title = req.body.title || ad.title;
        ad.description = req.body.description || ad.description;
        ad.price = req.body.price || ad.price;
        ad.category = req.body.category || ad.category;
        ad.location = req.body.location || ad.location;

        // Save updated ad
        const updatedAd = await ad.save();

        res.status(200).json({ message: 'Ad updated successfully', data: updatedAd });
    } catch (error) {
        console.error("Error in updateAd:", error);
        res.status(500).json({ message: 'Server error while updating ad' });
    }
};


// @desc    Delete an ad owned by the user
const deleteAd = async (req, res) => {
    try {
        const ad = await Ad.findById(req.params.id);

        if (!ad) {
            return res.status(404).json({ message: 'Ad not found' });
        }

        if (!req.user || ad.seller.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized to delete this ad' });
        }

        if (Array.isArray(ad.imageUrls)) {
            for (const img of ad.imageUrls) {
                try {
                    await cloudinary.uploader.destroy(img.publicId);
                } catch (cloudErr) {
                    console.warn("Cloudinary deletion error for image:", img.publicId, cloudErr);
                }
            }
        }

        await ad.deleteOne();
        res.status(200).json({ message: 'Ad deleted successfully' });

    } catch (error) {
        console.error("Error in deleteAd:", error);
        res.status(500).json({ message: 'Server error while deleting ad' });
    }
};


export { createAd, getAds, getFeaturedAds, getMyAds, getAdById, deleteAd, updateAd, getAdsByTitle };