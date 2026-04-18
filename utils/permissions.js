// utils/permissions.js

exports.canRequestHelp = (user) => {
  return ['need_help', 'both'].includes(user.role);
};

exports.canProvideHelp = (user) => {
  return ['can_help', 'both'].includes(user.role);
};

exports.isAdmin = (user) => {
  return user.role === 'admin';
};