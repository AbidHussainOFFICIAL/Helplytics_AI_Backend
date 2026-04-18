// middleware/trustGuard.js

exports.requireTrust = (minScore = 20) => {
  return (req, res, next) => {
    if (req.user.trustScore < minScore) {
      return res.status(403).json({
        success: false,
        message: `Minimum trust score ${minScore} required`,
      });
    }
    next();
  };
};