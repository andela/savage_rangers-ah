const ratingsWithUsers = slug => `SELECT rating, 
 "Users"."username", "Users"."email", "Users"."firstName", "Users"."lastName", "Users"."profileImage"
    FROM "Ratings"  
    inner join "Users" on "Users".id = "Ratings"."userId"
    WHERE "articleSlug" = '${slug}';`;

export default {
  ratingsWithUsers
};
