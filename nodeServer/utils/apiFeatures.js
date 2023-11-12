class APIFeatures {
    constructor(query, queryString) {
        this.queryString = queryString;
        this.query = query;
    }
    filter() {
        const queryFind = {...this.queryString};
        const excludeFields = ['sort', 'page', 'limit', 'fields']
        excludeFields.forEach(field => delete queryFind[field]);
        
        console.log(queryFind);
        const queryFindCp = JSON.stringify(queryFind).replace(/\b(lte|lt|gt|gte)\b/g, match => `$${match}`);
        
        this.query = this.query.find(JSON.parse(queryFindCp));
        return this;
    }

    select() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.replace(',', ' ');
            this.query = this.query.select(fields);
        }
        return this;
    }

    paginate() {
        // console.log("in here\n");
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 10;
        const skip = (page - 1) * limit;
        // if (this.queryString.page) {
        //     const numTours = await Tour.countDocuments();
        //     if (numTours > limit) {
        //         throw new Error("this page does not exist\n");
        //     }
        // }
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }

    sort() {
        if (this.queryString.sort) {
            
            let sortBy = this.queryString.sort;
            console.log(sortBy);

            sortBy.replace(',', ' ');
            console.log(sortBy);
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort("-ratingAverage");
        }
        return this;
    }

}

module.exports = APIFeatures;