const sendResult = (res, status, message, user, token) => res.status(status).json({
	message,
	user: {
		email: user.email,
		token,
		username: user.username
	}
});

export default sendResult;
