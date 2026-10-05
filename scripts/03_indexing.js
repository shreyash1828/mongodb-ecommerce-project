// Step 3: Indexing in MongoDB
use ecommerce_db;

// Show existing indexes
print('Current indexes:');
printjson(db.products.getIndexes());

// Create single-field indexes
 db.products.createIndex({ category: 1 });
 db.products.createIndex({ brand: 1 });
 db.products.createIndex({ price: -1 });
 db.products.createIndex({ rating: -1 });

// Create compound index
 db.products.createIndex({ category: 1, price: -1 });
 db.products.createIndex({ brand: 1, category: 1, rating: -1 });
 db.products.createIndex({ warehouseLocation: 1, stockQuantity: 1 });

print('Indexes created successfully');
printjson(db.products.getIndexes());

// Check query with explain
print('Explain query using category and price filter');
printjson(
  db.products
    .find({ category: 'Electronics', price: { $gt: 50000 } })
    .sort({ price: -1 })
    .limit(5)
    .explain('executionStats')
);

// Check query for brand and rating
print('Explain query using brand and rating filter');
printjson(
  db.products
    .find({ brand: 'Apple', rating: { $gte: 4.5 } })
    .sort({ rating: -1 })
    .limit(5)
    .explain('executionStats')
);

// Drop index if needed
// db.products.dropIndex({ category: 1, price: -1 });

print('Indexing demonstration completed.');
