module.exports = [checkUserInfo,saveSchoolInfo]


function checkUserInfo(req,res, next) {

  let collection = req.app.get('DB').collection('userInfo')
  let query = {user_id: req.user._id};
  let p = collection.findOne(query);

  p.then(result => {
    if(result == null)
    {
      let userInfo = {
        user_id: req.user._id,
        generalInfo: "",
        schoolInfo: ""
      }
      req.data.userInfo = userInfo
      next()
    } else {
      req.data.userInfo = result
       next()
     }

  }).catch(error => {
    res.status(400).send("asdasdasdasd")
  })

}

function saveSchoolInfo(req,res) {

  let schoolInfo = {
        high: {
          title: '',
          graduationGrade: ''
        },
        undergraduate: {
          graduationGrade: '',
          title: ''
        },
        graduate: {
          graduationGrade: '',
          title: ''
        },
        postgraduate: {
          graduationGrade: '',
          title: ''
        }
  }

  if(req.body.highSchoolTitle)
  {
    schoolInfo.high.title = req.body.highSchoolTitle
    if(req.body.highSchoolGrade)
      schoolInfo.high.graduationGrade = req.body.highSchoolGrade
  }

  if(req.body.undergraduateTitle)
  {
    schoolInfo.undergraduate.title = req.body.undergraduateTitle
    if(req.body.undergraduateTitle)
      schoolInfo.undergraduate.graduationGrade = req.body.undergraduateTitle
  }

  if(req.body.graduateTitle)
  {
    schoolInfo.graduate.title = req.body.graduateTitle
    if(req.body.graduateGrade)
      schoolInfo.graduate.graduationGrade = req.body.graduateGrade
  }

  if(req.body.postgraduateTitle)
  {
    schoolInfo.postgraduate.title = req.body.postgraduateTitle
    if(req.body.postgraduateGrades)
      schoolInfo.postgraduate.graduationGrade = req.body.postgraduateGrade
  }


  let collection = req.app.get('DB').collection('userInfo');

  if(req.data.userInfo.generalInfo == '') {
    console.log("girdii")
    req.data.userInfo.schoolInfo = schoolInfo

    let p = collection.insertOne(req.data.userInfo)

    p.then(result => {
      res.status(200).send('created-school-info')
    }).catch((error) => {
      res.status(500).json(error);
    })
  } else {
    let filter = {user_id: req.user._id};
    let update = {
      $set: {
        schoolInfo: schoolInfo
      }
    };

    let p = collection.updateOne(filter, update);
    p.then(result => {
      res.status(200).send('school-info-saved')
    }).catch(error => {
      res.status(500).json(error);
    });
  }



}
