import { MongoHelper } from '../external/repositories/mongodb/helpers/mongo-helper'

MongoHelper.connect('mongodb://127.0.0.1:27017/base-api')
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(5000, () => { console.log(`Server running at http://localhost:${process.env.PORT}`) })
  })
  .catch(console.error)
