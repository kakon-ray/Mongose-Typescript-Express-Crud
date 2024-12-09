import { FilterQuery, Query } from 'mongoose'
import { Student } from '../modules/students/student.model'

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>
  public query: Record<string, unknown>

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery
    this.query = query
  }

  search(searchableFields: string[]) {
    if (this?.query?.searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => ({
          [field]: { $regex: this?.query?.searchTerm, $options: 'i' },
        })),
      })
    }
    return this
  }

  filter() {
    const queryObj = { ...this.query }

    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields']
    excludeFields.forEach((el) => delete queryObj[el])

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>)

    return this
  }

  sort() {
    let sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt'
    this.modelQuery = this.modelQuery.sort(sort as string)
    return this
  }

  paginate() {
    const limit = Number(this?.query?.limit) || 10
    let page = Number(this?.query?.page) || 1
    let skip = (page - 1) * limit
    this.modelQuery = this.modelQuery.skip(skip).limit(limit)

    return this
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v'
    this.modelQuery = this.modelQuery.select(fields)
    return this
  }
}

export default QueryBuilder
