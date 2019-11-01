module.exports = function(req,res) {
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
    schoolInfo.highSchool.title = req.body.highSchoolTitle
    if(req.body.highSchoolGrade)
      schoolInfo.highSchool.graduationGrade = req.body.highSchoolGrade
  }

  if(req.body.highSchoolTitle)
  {
    schoolInfo.highSchool.title = req.body.highSchoolTitle
    if(req.body.highSchoolGrade)
      schoolInfo.highSchool.graduationGrade = req.body.highSchoolGrade
  }





}
