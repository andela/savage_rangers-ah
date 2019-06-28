import slug from 'slug';


const slugString = title => `${slug(title.toString(), { lower: true })}`;

export default slugString;
