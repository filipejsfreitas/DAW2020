// Student controller

var Student = require('../models/student')

// Returns student list
module.exports.list = () => {
    return Student
        .find()
        .sort({nome:1})
        .exec()
}

module.exports.get = id => {
    return Student
        .findOne({numero: id})
        .exec()
}

module.exports.insert = student => {
    var newStudent = new Student(student)
    return newStudent.save()
}

module.exports.update = async student => {
    let studentRecord = await Student
        .findOne({ numero: student.id })
        .exec();

    await studentRecord.updateOne(student);
    
    return await studentRecord.save();
}

module.exports.delete = id => {
    return Student.deleteOne({numero: id});
}
