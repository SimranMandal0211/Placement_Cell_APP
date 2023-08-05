const Student = require('../models/student');

module.exports.createStudentPage = function(request, respond){
    return respond.render('add_student',{
        title: "Placement Cell | Add Student"
    });
};

module.exports.createStudent = async function(request, respond){
    try{
        const { name, email, college, placement, contactNumber, batch, dsa, webd, react } = request.body;

        const student = await Student.findOne({ email });

        if(student){
            console.log('Email already exists');
            return respond.redirect('back');
        }

        // Create a new student record
        const newStudent = await Student.create({
            name,
            email,
            college,
            placement,
            contactNumber,
            batch,
            dsa,
            webd,
            react
        });
        await newStudent.save();

        console.log('Student created successfully');
    
        return respond.redirect('/');     
    }catch (error) {
        console.error('Error creating student:', error);
        return respond.redirect('back');   
    }
};




