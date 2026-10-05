// Step 4: Aggregation pipeline and single-purpose aggregation
use ecommerce_db;

// ---------- SINGLE PURPOSE AGGREGATION ----------
// 1. Count total products
print('Total products count:');
printjson(db.products.aggregate([{ $count: 'totalProducts' }]).toArray());

// 2. Average price by category
print('Average price by category:');
printjson(
  db.products.aggregate([
    { $group: { _id: '$category', averagePrice: { $avg: '$price' }, totalProducts: { $sum: 1 } } },
    { $sort: { averagePrice: -1 } }
  ]).toArray()
);

// 3. Total stock by brand
print('Total stock quantity by brand:');
printjson(
  db.products.aggregate([
    { $group: { _id: '$brand', totalStock: { $sum: '$stockQuantity' } } },
    { $sort: { totalStock: -1 } },
    { $limit: 10 }
  ]).toArray()
);

// 4. Average rating by warehouse location
print('Average rating by warehouse:');
printjson(
  db.products.aggregate([
    { $group: { _id: '$warehouseLocation', avgRating: { $avg: '$rating' }, productCount: { $sum: 1 } } },
    { $sort: { avgRating: -1 } }
  ]).toArray()
);

// ---------- AGGREGATION PIPELINE ----------
// 5. Highest revenue category
print('Top categories by total sales value:');
printjson(
  db.products.aggregate([
    { $match: { isActive: true } },
    {
      $group: {
        _id: '$category',
        totalRevenue: { $sum: { $multiply: ['$price', '$soldUnits'] } },
        totalUnits: { $sum: '$soldUnits' }
      }
    },
    { $sort: { totalRevenue: -1 } },
    { $limit: 5 }
  ]).toArray()
);

// 6. Products with discount > 15 sorted by price
print('Products with discount > 15 sorted by price:');
printjson(
  db.products.aggregate([
    { $match: { discountPercent: { $gt: 15 } } },
    { $project: { productName: 1, category: 1, brand: 1, price: 1, discountPercent: 1 } },
    { $sort: { price: -1 } },
    { $limit: 10 }
  ]).toArray()
);

// 7. Average selling price by country and category
print('Average price by country and category:');
printjson(
  db.products.aggregate([
    { $group: { _id: { country: '$manufacturerCountry', category: '$category' }, avgPrice: { $avg: '$price' }, totalProducts: { $sum: 1 } } },
    { $sort: { avgPrice: -1 } },
    { $limit: 10 }
  ]).toArray()
);

// 8. Unwind and group features
print('Most common features across products:');
printjson(
  db.products.aggregate([
    { $unwind: '$features' },
    { $group: { _id: '$features', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 }
  ]).toArray()
);

// 9. Products with price > 50000 and rating >= 4.5
print('High-value premium products:');
printjson(
  db.products.aggregate([
    { $match: { price: { $gt: 50000 }, rating: { $gte: 4.5 } } },
    { $project: { productName: 1, category: 1, brand: 1, price: 1, rating: 1 } },
    { $sort: { price: -1 } },
    { $limit: 10 }
  ]).toArray()
);

// 10. Products by warehouse and stock level
print('Stock summary by warehouse:');
printjson(
  db.products.aggregate([
    { $group: { _id: '$warehouseLocation', totalStock: { $sum: '$stockQuantity' }, avgStock: { $avg: '$stockQuantity' } } },
    { $sort: { totalStock: -1 } }
  ]).toArray()
);

print('Aggregation pipeline demo complete.');
