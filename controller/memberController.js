import mongoose from 'mongoose'
import Members from '../model/Members'

export const getAllMember = async (req, res) => {
    const members = await Members.find({}).catch(err => {
        console.error('DB Error ', err)
    })

    res.json({members})
}

export const getOneMember = async (req, res) => {
    const member = await Members.find({ id: mongoose.Types.ObjectId(req.params.id) }).catch(err => {
        console.error('DB Error ', err)
    })

    if (!member) {
        res.status(404).json({ msg: `No member with the id of ${req.params.id} found` })
        return
    }

    res.json(member)
}

export const createMember = async (req, res) => {
    const newMember = new Members({
        ...req.body,
        status: 'active'
    })

    const result = await newMember.save({ validateBeforeSave: true }).catch(err => {
        console.error('DB Error ', err)
    })

    if (!result) {
        res.status(500).json({ msg: 'Failed to create member' })
        return
    }

    res.status(200).json({ result })
}

export const updateMember = async (req, res) => {
    const result = await Members.updateOne(
        { _id: mongoose.Types.ObjectId(req.params.id) },
        { ...req.body }
    ).catch(err => {
        console.error('DB Error ', err)
    })


    if (!result) {
        res.status(500).json({ msg: 'Failed to update member' })
        return
    }

    res.status(200).json({ result })
}

export const deleteMember = async (req, res) => {
    const result = await Members.deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) }).catch(err => {
        console.error('DB Error ', err)
    })

    if (!result) {
        res.status(500).json({ msg: 'Failed to delete member' })
        return
    }

    res.status(200).json({ result })
}


