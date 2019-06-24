import models from '../api/models';

models.SequelizeMeta.truncate({ truncate: { cascade: false } });
