
const User = require("../models/user");
const exceljs = require("exceljs");

const prepareExcel=(data)=>{

    const workbook=new exceljs.Workbook();
    const worksheet =  workbook.addWorksheet('Users');

    const uniqueKeys=[...new Set([...data.flatMap(Object.keys)])];

    console.log(uniqueKeys);
    worksheet.columns= uniqueKeys.map((key)=> ({header: key,key}));

    data.forEach((item)=> worksheet.addRow(Object.values(item)));

    return workbook;


};
exports.generateReport = (req, res) => {
    const userId = req.params.userId;
    User.find().exec((err, users)=> {
        if(err){
            console.log(err);
            res.status(500).send({"message": "SYSTEM_MALFUNCTION"});
            return;
        }
       
       
       const report_users= users.map(user=>{           
            return {
            "_id":user._id,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "email": user.email,          
            "points":user.points,
            "badges": user.badges.map(bad=>bad.name).join(",")
            };
        });

        const workbook=prepareExcel(report_users);

        res.setHeader('Content-Type','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition','attachment; filename=users.xlsx');

       return  workbook.xlsx.write(res);


        //return res.status(200).send({"data": modified_users});
    
    });
};