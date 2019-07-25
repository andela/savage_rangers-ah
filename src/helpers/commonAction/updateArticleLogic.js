export default (model, updateContent, object, slug) => {
  model.update({
    title: updateContent.title,
    description: updateContent.description,
    body: updateContent.body,
    category: updateContent.category,
    ...object
  },
  {
    where: {
      slug
    }
  });
};
