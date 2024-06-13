const allRoles={
    user:[''],
    guest:['']
};

const roles=Object.keys(allRoles);      //array ['user', 'admin']
const roleRights=new Map(Object.entries(allRoles));

//Object.entries(allRoles) ==> [["user", [""]]]
//new Map([["user", [""]]]) stvara novu mapu gdje je ključ user, a vrijednost je prazan niz [""]

module.exports={
    roleRights,
    roles
}