import model from '../../api/models/index';
/* istanbul ignore next: can't have an else statement here */
export default async (whereObject, switchObject, status, msgFragment) => {
  const reaction = await model.Reaction.findOne({ where: whereObject });
  if (reaction) {
    await model.Reaction.update(switchObject,
      { where: { id: reaction.dataValues.id } });
    return {
      status,
      message: msgFragment
    };
  }
  return false;
};
