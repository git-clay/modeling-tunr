module.exports = function(sequelize, Sequelize){
 var model = sequelize.define("manager", {
   name: Sequelize.STRING,
   email: Sequelize.STRING,
   office_number: Sequelize.STRING,
   cell_phone_number: Sequelize.STRING
 }
 //,
 // {
 //   instanceMethods: {
 //     shout: function(){
 //       console.log("My name is " + this.name);
 //     }
 //   }
 // }
 );
 // model.sing = function(){
 //   console.log("Tra la la!");
 // };
 return model;
};