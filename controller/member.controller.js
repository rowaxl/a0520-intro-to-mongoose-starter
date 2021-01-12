const {v4:uuid} = require('uuid');
const members = require('../model/members.model');

const idFilter = req => (member) => member.id === req.params.id

exports.getAllMember = (req, res) => {
    res.json(members);
}

exports.getOneMember = (req, res) => {
    const found = members.some(idFilter(req)) //with helper function

    if(found){
        res.json(members.filter(member => member.id === req.params.id))
    }else{
        //400 = bad request
        res.status(400).json({ msg: `No member with the id of ${req.params.id} found`});
    }
}

exports.createMember = (req, res) => {
    const newMember = {
        id: uuid(),
        status: 'active',
        ...req.body
    }
    members.push(newMember);
    // res.redirect('/');
    res.json(members);
}

exports.updateMember = (req, res) => {
    const found = members.some(idFilter(req));

    if(found){
        const updatedMember = members.map(member => {
            if(member.id === req.params.id){
                return {
                    ...member,
                    ...req.body
                }
            }
            return member;
        });
        res.json({ msg: 'Member updated', updatedMember})

    }else{
        res.status(400).json({ msg: `Unable to update. Member of id ${req.params.id} does not exist.`});
    }
}

exports.deleteMember = (req, res) => {
    const found = members.some(idFilter(req));

    if(found){
        res.json({
            msg: 'Member deleted successfully!',
            member: members.filter(member => member.id !== req.params.id)
        })
    }else{
        res.status(400).json({ msg: `No member with the id of ${req.params.id} found`});
    }
}


