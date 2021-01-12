const express = require('express');
const router = express.Router();

const memberController = require('../controller/member.controller');

//Get ALL members /api/members/
router.get('/', memberController.getAllMember);

//Get ONE member
router.get('/:id', memberController.getOneMember);

//Create a member /api/members/post
router.post('/post', memberController.createMember);

//Update a member /api/members/update/:id
router.put('/update/:id', memberController.updateMember);

//Delete a member /api/members/delete/:id
router.delete('/delete/:id', memberController.deleteMember);

module.exports = router;