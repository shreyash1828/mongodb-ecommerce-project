// Step 2: CRUD operations and conditional queries
use ecommerce_db;

// ---------- CREATE ----------
// Insert single product
const newProduct = {
  _id: 4001,
  productName: 'Apple Laptop Pro 14',
  category: 'Electronics',
  subCategory: 'Laptops',
  brand: 'Apple',
  price: 125000,
  stockQuantity: 18,
  rating: 4.8,
  discountPercent: 12,
  soldUnits: 250,
  availableColors: ['Silver', 'Black'],
  sizes: ['M'],
  features: ['Premium Quality', 'Energy Efficient', 'Fast Delivery'],
  manufacturerCountry: 'USA',
  warehouseLocation: 'Delhi',
  isActive: true,
  warrantyMonths: 24,
  releaseDate: new Date('2024-05-10T00:00:00Z').toISOString()
};

db.products.insertOne(newProduct);
print('Inserted one product with insertOne');

// Insert multiple products
const bulkProducts = [
  {
    _id: 4002,
    productName: 'Nike Running Shoes',
    category: 'Fashion',
    subCategory: 'Footwear',
    brand: 'Nike',
    price: 5200,
    stockQuantity: 42,
    rating: 4.5,
    discountPercent: 20,
    soldUnits: 310,
    availableColors: ['Black', 'White', 'Blue'],
    sizes: ['S', 'M', 'L', 'XL'],
    features: ['Durable', 'Comfort', 'Premium Quality'],
    manufacturerCountry: 'USA',
    warehouseLocation: 'Mumbai',
    isActive: true,
    warrantyMonths: 12,
    releaseDate: new Date('2023-11-20T00:00:00Z').toISOString()
  },
  {
    _id: 4003,
    productName: 'Philips Air Fryer',
    category: 'Home',
    subCategory: 'Appliances',
    brand: 'Philips',
    price: 8999,
    stockQuantity: 16,
    rating: 4.3,
    discountPercent: 18,
    soldUnits: 150,
    availableColors: ['Black', 'Silver'],
    sizes: ['M'],
    features: ['Energy Efficient', 'Fast Delivery', 'Easy Return'],
    manufacturerCountry: 'Germany',
    warehouseLocation: 'Bengaluru',
    isActive: true,
    warrantyMonths: 18,
    releaseDate: new Date('2024-02-08T00:00:00Z').toISOString()
  }
];

db.products.insertMany(bulkProducts);
print('Inserted multiple products with insertMany');

// ---------- READ ----------
// Read all products (limited for demo)
print('First 5 products:');
printjson(db.products.find().limit(5).toArray());

// Read with simple filter
print('Products from Electronics category:');
printjson(db.products.find({ category: 'Electronics' }).limit(5).toArray());

// Read with greater than and less than
print('Products with price greater than 10000 and less than 30000');
printjson(db.products.find({ price: { $gt: 10000, $lt: 30000 } }).limit(5).toArray());

// Read with >= and <=
print('Products with rating between 4.5 and 5.0');
printjson(db.products.find({ rating: { $gte: 4.5, $lte: 5.0 } }).limit(5).toArray());

// Read with AND and OR
print('Products in Electronics category and price > 50000');
printjson(db.products.find({ $and: [{ category: 'Electronics' }, { price: { $gt: 50000 } }] }).limit(5).toArray());

print('Products where category = Electronics OR category = Fashion');
printjson(db.products.find({ $or: [{ category: 'Electronics' }, { category: 'Fashion' }] }).limit(5).toArray());

// Read with $in
print('Products from selected brands');
printjson(db.products.find({ brand: { $in: ['Apple', 'Samsung', 'Nike'] } }).limit(5).toArray());

// Sort and limit
print('Top 5 highest priced products');
printjson(db.products.find().sort({ price: -1 }).limit(5).toArray());

print('Top 5 lowest priced products');
printjson(db.products.find().sort({ price: 1 }).limit(5).toArray());

// ---------- UPDATE ----------
// Update one product
const updateOneResult = db.products.updateOne(
  { _id: 4001 },
  {
    $set: {
      price: 130000,
      stockQuantity: 10,
      discountPercent: 15,
      features: ['Premium Quality', 'Energy Efficient', 'Fast Delivery', 'Durable']
    }
  }
);
print('Updated one product count:', updateOneResult.modifiedCount);

// Update many products
const updateManyResult = db.products.updateMany(
  { price: { $lt: 2000 }, isActive: true },
  {
    $set: { discountPercent: 25 },
    $inc: { stockQuantity: 10 }
  }
);
print('Updated many products count:', updateManyResult.modifiedCount);

// Update array field
const arrayUpdateResult = db.products.updateOne(
  { _id: 4002 },
  {
    $push: { features: 'Lightweight' }
  }
);
print('Array field updated count:', arrayUpdateResult.modifiedCount);

// ---------- DELETE ----------
// Delete one product
const deleteOneResult = db.products.deleteOne({ _id: 4003 });
print('Deleted one product count:', deleteOneResult.deletedCount);

// Delete many products matching condition
const deleteManyResult = db.products.deleteMany({ isActive: false, price: { $lt: 500 } });
print('Deleted many products count:', deleteManyResult.deletedCount);

// ---------- ADVANCED READ EXAMPLES ----------
print('Products with stock less than 15 and rating > 4.0');
printjson(db.products.find({ stockQuantity: { $lt: 15 }, rating: { $gt: 4.0 } }).limit(5).toArray());

print('Products with soldUnits >= 500 and < 800');
printjson(db.products.find({ soldUnits: { $gte: 500, $lt: 800 } }).limit(5).toArray());

print('Products from Delhi or Mumbai warehouse');
printjson(db.products.find({ warehouseLocation: { $in: ['Delhi', 'Mumbai'] } }).limit(5).toArray());

print('Products not active');
printjson(db.products.find({ isActive: { $ne: true } }).limit(5).toArray());
