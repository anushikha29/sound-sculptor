function abc(pee){
    console.log("HEllo WORLD");
    let name="Adnan";
    console.log("hello "+name);
    //alert("Wtf");
    const pi=3.14;
    console.log(typeof pi);
    
    console.log(pee);
}
abc("hii");
const bcd  = ()=>{
    console.log("This be arrow def");
}
let person={
    name:"Adnan", age:20
};
const ifcon = () =>{
    let age=1;
    let name= age>9 ? "Adnan" : "Rashid";
    console.log(name);
}
bcd();
ifcon();
const person2={...person,name:"Anush"};
console.log(person2);
let namess=["a","b","d"];
let names=[...namess,"c"];
console.log(names);
console.log(names.map((name)=>{
    return name+"1";
}));
// console.log(person);
// console.log(person.name);
// console.log(person['age']);