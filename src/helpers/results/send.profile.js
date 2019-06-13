const sendProfile = (res, status, message, profile, user) => res.status(status).json({
  message,
  user,
  profile
});

export default sendProfile;
