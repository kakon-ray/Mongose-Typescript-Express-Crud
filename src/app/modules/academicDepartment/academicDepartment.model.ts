import { model, Schema } from 'mongoose'
import { TAcademicDepartment } from './academicDepartment.interface'


const AcademicDepartmentSchema = new Schema<TAcademicDepartment>(
    {
        name: { type: String, required: [true, 'Academic Department is required'], unique: true },
        academicfaculty: { type: Schema.Types.ObjectId, ref: 'AcademicFaculty' },
    },
    {
        timestamps: true,
    },
)

export const AcademicDepartment = model<TAcademicDepartment>('AcademicDepartment', AcademicDepartmentSchema)
