export default cb => async (req, res, next) => {
	try {
		await cb(req,
			res,
			next);
	} catch (error) {
		const {
			parent,
			details
		} = error;
		if (
			parent
		) {
			return res
				.status(400)
				.json({
					message:
							parent.detail
				});
		}
		if (
			details
		) {
			return res
				.status(400)
				.json({
					message:
							details[0]
								.message
				});
		}
		return res
			.status(500)
			.json({
				message:
						'Something went wrong'
			});
	}
};
