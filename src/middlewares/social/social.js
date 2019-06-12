/**
 *
 *
 * inputs data used for morking social login on Tacebook Twitter and Google
 */

export default (req, res, next) => {
  req.user = {
    id: req.body.id,
    username: 'Rahu-G',
    displayName: undefined,
    name: {
      familyName: 'Ramadhan',
      givenName: 'Rahul',
      middleName: undefined
    },
    gender: undefined,
    profileUrl: undefined,
    photos: [
      {
        value:
          'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1579056305559670&height=50&width=50&ext=1563032609&hash=AeSwH6WuOP66Hnvp'
      }
    ],
    emails: [
      {
        value: 'alain@gml.com'
      }
    ],
    provider: req.body.provider,
    _raw:
      '{"last_name":"Ramadhan","first_name":"Rahul","picture":{"data":{"height":50,"is_silhouette":false,"url":"https:\\/\\/platform-lookaside.fbsbx.com\\/platform\\/profilepic\\/?asid=1579056305559670&height=50&width=50&ext=1563032609&hash=AeSwH6WuOP66Hnvp","width":50}},"id":"1579056305559670"}',
    _json: {
      last_name: 'Ramadhan',
      first_name: 'Rahul',
      picture: { data: [Object] },
      id: req.body.id
    }
  };
  next();
};
