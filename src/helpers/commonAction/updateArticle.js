export default (model, updateContent, slug) => {
  model.update({
    ...updateContent
  },
  {
    where: {
      slug
    }
  });
};
