// dummy data to populate the app

var mongoose = require('mongoose');

exports.dummyData = [
  {
    '_id': 'test1',
    'title': 'test1',
    'uid': 'admin',
    'options': [
      {
        '_id': mongoose.Types.ObjectId(),
        'itemName': 'zero',
        'count': 0,
      },
      {
        '_id': mongoose.Types.ObjectId(),
        'itemName': 'one',
        'count': 0,
      },
      {
        '_id': mongoose.Types.ObjectId(),
        'itemName': 'three',
        'count': 0,
      },
    ]
  }
]