import mongoose from 'mongoose'
import Members from '../model/Members'
import { toObjectId, DBError } from '../util/database'

export const getAllMember = async (req, res) => {
    const members = await Members.find({}).catch(DBError)

    res.json({members})
}

export const getOneMember = async (req, res) => {
    const objectId = toObjectId(req.params.id)

    const result = await Members.findOne({ _id: objectId }).catch(DBError)

    if (!result) {
        const APIError = new Error('Failed to find member')
        APIError.status = 404

        throw APIError
    }

    res.json({ result })
}

export const createMember = async (req, res) => {
    const newMember = new Members({
        ...req.body,
        status: 'active'
    })

    const result = await newMember.save({ validateBeforeSave: true }).catch(DBError)

    if (!result) {
        const APIError = new Error('Failed to create member')
        APIError.status = 403

        throw APIError
    }

    res.status(200).json({ result })
}

export const updateMember = async (req, res) => {
    const objectId = toObjectId(req.params.id)

    const target = await Members.findOne({ _id: objectId })

    if (!target) {
        const APIError = new Error('Cannot found the member')
        APIError.status = 404

        throw APIError
    }

    const result = await Members.updateOne(
        { _id: objectId },
        { ...req.body }
    ).catch(DBError)

    if (!result) {
        const APIError = new Error('Failed to update member')
        APIError.status = 403

        throw APIError
    }

    res.status(200).json({ result })
}

export const deleteMember = async (req, res) => {
    const objectId = toObjectId(req.params.id)

    const target = await Members.findOne({ _id: objectId })

    if (!target) {
        const APIError = new Error('Cannot found the member')
        APIError.status = 404

        throw APIError
    }

    const result = await Members.deleteOne({ _id: objectId }).catch(DBError)

    if (!result) {
        const APIError = new Error('Failed to delete member')
        APIError.status = 403

        throw APIError
    }

    res.status(200).json({ result })
}


