const express = require('express');
const router = express.Router();
const members = require("../../Members");
const uuid = require('uuid');

// Get Single Member
router.get("/:id", (req, res) => {
    const found = members.some(member => member.id == req.params.id);
  
    if (found) {
      res.json(members.filter((member) => member.id == req.params.id));
    } else{
        res.status(400).json({ msg: `No member with id ${req.params.id}`})
    }
  });
  
  // Route that gets all members
router.get("/", (req, res) => {
    res.json(members);
  });


// Create Member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if (!newMember.name || !newMember.email) {
        res.status(400).json({ msg: "Pls add name and email"});
    }

    members.push(newMember);
    res.send(members);
})

//Update Member
router.put("/:id", (req, res) => {
    const found = members.some(member => member.id == req.params.id);
  
    if (found) {
      const updMember = req.body;
      members.forEach(member => {
          if(member.id == req.params.id){
              member.name = updMember.name ? updMember.name : member.name;
              member.email = updMember.email ? updMember.email : member.email;
              res.json({msg: "Member updated", member});
            }
      })
    } else{
        res.status(400).json({ msg: `No member with id ${req.params.id}`})
    }
  });

// Delete Single Member
router.delete("/:id", (req, res) => {
    const found = members.some(member => member.id == req.params.id);
  
    if (found) {
      res.json({msg: "Member deleted", members: members.filter((member) => member.id != req.params.id)});
    } else{
        res.status(400).json({ msg: `No member with id ${req.params.id}`})
    }
  });

module.exports = router;