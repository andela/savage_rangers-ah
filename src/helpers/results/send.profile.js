const sendProfile = (res, status, message, profile) => res.status(status).json({
  message,
  profile
});

export default sendProfile;
