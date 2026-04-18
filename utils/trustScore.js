// utils/trustScore.js

exports.updateTrustScore = (user, action) => {
  const rules = {
    PROFILE_COMPLETED: 5,
    HELPED_USER: 10,
    POSITIVE_FEEDBACK: 2,
    REPORTED: -10,
    CANCELLED: -5,
  };

  user.trustScore += rules[action] || 0;

  // clamp between 0–100
  user.trustScore = Math.max(0, Math.min(100, user.trustScore));
};