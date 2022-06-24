class APIFeatures {
  constructor(model, queryString, attributes, data = null) {
    this.model = model;
    this.queryString = queryString;
    this.attributes = attributes;
    this.data = data;
  }

  filter() {
    // 1) Build query
    const queryObj = { ...this.queryString };
    const excludeFields = ['page', 'order', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);

    // 2) Filtering data
    this.data = this.model.findAll({
      where: queryObj,
      attributes: this.attributes,
    });

    return this;
  }

  sort() {
    // 1) Query
    const { order: orderValue } = this.queryString;
    if (orderValue) {
      // 2) Sorting data
      this.data = this.model.findAll({
        order: [['createdAt', `${orderValue}`]],
      });
    }

    return this;
  }
}

export default APIFeatures;
