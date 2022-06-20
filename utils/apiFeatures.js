class APIFeatures {
  constructor(model, queryString, attributes) {
    this.model = model;
    this.queryString = queryString;
    this.attributes = attributes;
  }

  filter() {
    // 1) Build query
    const queryObj = { ...this.queryString };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);

    // 2) Filtering data
    const filteredData = this.model.findAll({
      where: queryObj,
      attributes: this.attributes,
    });

    return filteredData;
  }
}

export default APIFeatures;
