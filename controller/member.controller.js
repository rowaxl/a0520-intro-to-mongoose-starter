// const {v4:uuid} = require('uuid');
const Member = require('../model/members.model');

// const idFilter = req => (member) => member.id === req.params.id

exports.getAllMember = (req, res) => {
    Member.getAllMembers((members) => {
        res.json(members);
    });
}

exports.getOneMember = (req, res) => {
    Member.getOneMember(req.params.id, (member) => {
        member ? 
            res.json(member) 
            :
            res.status(400).json({ msg: `No member with the id of ${req.params.id} found`})
    });


    // const found = members.some(idFilter(req))

    // if(found){
    //     res.json(members.filter(member => member.id === req.params.id))
    // }else{
    //     //400 = bad request
    //     res.status(400).json({ msg: `No member with the id of ${req.params.id} found`});
    // }
}

exports.createMember = (req, res) => {
    const member = new Member(req.body.name, req.body.email);
    member.saveMember((member) => {
        res.json(member);
    });
    // const newMember = {
    //     id: uuid(),
    //     status: 'active',
    //     ...req.body
    // }
    // members.push(newMember);
    // res.redirect('/');
    
}

exports.updateMember = (req, res) => {
    Member.updateMember(req.params.id, req.body ,(result) => {
        result ? 
            res.json({ msg: `Member with id: ${req.params.id} has been updated`}) 
            :
            res.status(400).json({ msg: `No member with the id of ${req.params.id} found`})
    });
    // const found = members.some(idFilter(req));

    // if(found){
    //     const updatedMember = members.map(member => {
    //         if(member.id === req.params.id){
    //             return {
    //                 ...member,
    //                 ...req.body
    //             }
    //         }
    //         return member;
    //     });
    //     res.json({ msg: 'Member updated', updatedMember})

    // }else{
    //     res.status(400).json({ msg: `Unable to update. Member of id ${req.params.id} does not exist.`});
    // }
}

exports.deleteMember = (req, res) => {
    Member.deleteMember(req.params.id, (result) => {
        result ? 
            res.json({ msg: `Member with id: ${req.params.id} has been deleted`}) 
            :
            res.status(400).json({ msg: `No member with the id of ${req.params.id} found`})
    });
    // const found = members.some(idFilter(req));

    // if(found){
    //     res.json({
    //         msg: 'Member deleted successfully!',
    //         member: members.filter(member => member.id !== req.params.id)
    //     })
    // }else{
    //     res.status(400).json({ msg: `No member with the id of ${req.params.id} found`});
    // }
}


