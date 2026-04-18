const User = require('../models/User');
const Request = require('../models/Request');


// @desc Get user profile (public)
exports.getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    next(err);
  }
};

// @desc Get user stats
exports.getUserStats = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const helpedCount = await Request.countDocuments({
      helpers: userId,
    });

    const createdCount = await Request.countDocuments({
      createdBy: userId,
    });

    res.status(200).json({
      success: true,
      stats: {
        helped: helpedCount,
        created: createdCount,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc Get recent open requests (for helpers)
exports.getRecentRequests = async (req, res, next) => {
  try {
    // only helpers should access
    if (!['can_help', 'both'].includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Only helpers can view requests',
      });
    }

    const requests = await Request.find({ status: 'open' })
      .populate('createdBy', 'name role')
      .sort('-createdAt')
      .limit(10);

    res.status(200).json({
      success: true,
      requests,
    });
  } catch (err) {
    next(err);
  }
};