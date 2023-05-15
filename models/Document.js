const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  docItem: {
    type: String,
    required: true
  },
  docName: {
    type: String,
    default: "doc"
  },
  noOfCopies: {
    type: Number,
    required: true
  },
  noOfPages: {
    type: Number,
    required: true
  },
  isSpiralBind: {
    type: String,
    required: true
  },
  isColored: {
    type: String,
    required: true
  },
  additionalInformation: {
    type: String,
    default: "no additional information",
  },
  paymentMethod: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'pending',
    required: true
  },
  thestation:{
    type: String,
    default: 'none'
  },
  theUser: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    firstname: {
      type: String,
      default: "mini"
    },
  },
  station: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
      },
      message: {
        type: String,
        default: 'Pending'
      },
      estTime: {
        type: Number,
        default: 10
      },
      appliedAt: {
        type: Date,
      },
    },
  ],
  

}, {
  timestamps: true
});

documentSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

module.exports = mongoose.model("Document", documentSchema);
