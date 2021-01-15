// const { v4: uuid } = require("uuid");
import { Schema, model } from 'mongoose'

const memberSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: [true, 'Empty Member name cannot allowed']
  },
  email: {
    type: Schema.Types.String,
    required: [true, 'Empty Member email cannot allowed']
  },
  status: {
    type: Schema.Types.String,
    required: [true, 'Empty Member statuscannot allowed']
  },
})

const Members = model('Members', memberSchema)

export default Members
