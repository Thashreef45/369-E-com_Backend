import IRepository from "../../../infrastructure/interface/IRepository"


class GetAllProducts {
    private repository: IRepository

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(query) {


        // Query to inject
        const Query = this.createQuery(query)

        const products = await this.repository.getAllProducts()



        return products
    }

    private createQuery(queries) {

        const { limit, category, page_no, query, lowest_price, highest_price, rating, sort } = queries

        const limitNumber = limit ? parseInt(limit as string, 10) : 10;
        const pageNumber = page_no ? parseInt(page_no as string, 10) : 1;
        const skip = (pageNumber - 1) * limitNumber;

        // Building the query to inject based on queries/conditions (filtration query)
        const conditions: any = {};

        if (category) {
            conditions.category = category;
        }

        if (query) {
            conditions.$or = [
                { name: new RegExp(query as string, 'i') },
                { description: new RegExp(query as string, 'i') }
            ]
        }

        if (lowest_price || highest_price) {
            conditions.price = {};
            if (lowest_price) {
                conditions.price.$gte = parseFloat(lowest_price as string);
            }
            if (highest_price) {
                conditions.price.$lte = parseFloat(highest_price as string);
            }
        }

        if (rating) {
            conditions.rating = { $gte: parseFloat(rating as string) };
        }

        // Sorting logic
        let sortOption: any = {};
        if (sort) {
            switch (sort) {
                case 'rating':
                    sortOption.rating = -1;
                    break;
                case 'price-low':
                    sortOption.price = 1;
                    break;
                case 'price-high':
                    sortOption.price = -1;
                    break;
                case 'latest':
                    sortOption.createdAt = -1;
                    break;
                default:
                    sortOption.relevance = 1;
            }
        }

        //Ending


        ///------------------------------------veruthe---------------------------------
        if (query.limit || query.category || query.page_no || query.query ||
            query.lowest_price || query.highest_price || query.rating || query.sort
        ) console.log("hi")


        // {
        //     "limit": "10",
        //     "category": "ObjectId("6d038j472j88dx89j")",
        //     "page_no": "2",
        //     "query": "laptop",
        //     "lowest_price": "100",
        //     "highest_price": "2000",
        //     "rating": "4",
        //     "sort": "latest"
        // }
    }
}

export default GetAllProducts


interface Dependencies {
    repository: IRepository
}


// // Default values for pagination
// const limitNumber = limit ? parseInt(limit as string, 10) : 10;
// const pageNumber = page_no ? parseInt(page_no as string, 10) : 1;
// const skip = (pageNumber - 1) * limitNumber;

// // Building the query conditions
// const conditions: any = {};

// if (category) {
//     conditions.category = category;
// }

// if (query) {
//     conditions.$or = [
//         { name: new RegExp(query as string, 'i') },
//         { description: new RegExp(query as string, 'i') }
//     ];
// }

// if (lowest_price || highest_price) {
//     conditions.price = {};
//     if (lowest_price) {
//         conditions.price.$gte = parseFloat(lowest_price as string);
//     }
//     if (highest_price) {
//         conditions.price.$lte = parseFloat(highest_price as string);
//     }
// }

// if (rating) {
//     conditions.rating = { $gte: parseFloat(rating as string) };
// }

// // Sorting
// let sortOption: any = {};
// if (sort) {
//     switch (sort) {
//         case 'rating':
//             sortOption.rating = -1;
//             break;
//         case 'price-low':
//             sortOption.price = 1;
//             break;
//         case 'price-high':
//             sortOption.price = -1;
//             break;
//         case 'latest':
//             sortOption.createdAt = -1;
//             break;
//         default:
//             sortOption.relevance = 1; // Assuming you have a relevance field or using some default sorting
//     }
// }

// // Fetching products with conditions, pagination, and sorting
// const products = await productModel.find(conditions)
//     .sort(sortOption)
//     .skip(skip)
//     .limit(limitNumber);

// // Getting the total count for pagination
// const totalProducts = await productModel.countDocuments(conditions);