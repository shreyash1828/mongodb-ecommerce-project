// Step 1: Create database and populate collection with a large dataset
use ecommerce_db;

// Optional: reset collection in a fresh run
// db.products.deleteMany({});

const categories = ['Electronics', 'Fashion', 'Home', 'Beauty', 'Books', 'Sports', 'Grocery'];
const subCategories = {
  Electronics: ['Mobiles', 'Laptops', 'Audio', 'Accessories'],
  Fashion: ['Men', 'Women', 'Kids', 'Footwear'],
  Home: ['Furniture', 'Kitchen', 'Decor', 'Appliances'],
  Beauty: ['Skincare', 'Makeup', 'Haircare', 'Fragrance'],
  Books: ['Fiction', 'Tech', 'Academic', 'Comics'],
  Sports: ['Fitness', 'Outdoor', 'Indoor', 'Cycling'],
  Grocery: ['Snacks', 'Beverages', 'Staples', 'Organic']
};
const brands = ['Samsung', 'Nike', 'Dell', 'Philips', 'Apple', 'Puma', 'Sony', 'Adidas', 'LG', 'H&M', 'AmazonBasics', 'Lenovo'];
const colors = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Silver', 'Pink', 'Gray', 'Orange'];
const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
const countries = ['India', 'USA', 'China', 'Germany', 'Japan', 'France', 'Brazil', 'UK'];
const warehouses = ['Delhi', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Pune', 'Kolkata', 'Chennai'];

const products = [];

for (let i = 1; i <= 4000; i++) {
  const category = categories[i % categories.length];
  const subCategory = subCategories[category][i % subCategories[category].length];
  const brand = brands[i % brands.length];
  const productName = `${brand} ${subCategory} ${i}`;
  const price = 400 + (i * 73) % 45000;
  const stockQuantity = (i * 13) % 180 + 5;
  const rating = Number((2.8 + ((i * 11) % 22) / 10).toFixed(1));
  const discountPercent = (i * 7) % 45;
  const soldUnits = (i * 23) % 1000;
  const availableColors = colors.slice(0, (i % 5) + 2);
  const productSizes = sizes.slice(0, (i % 4) + 1);
  const features = [
    i % 2 === 0 ? 'Wireless' : 'Portable',
    i % 3 === 0 ? 'Fast Delivery' : 'Easy Return',
    i % 5 === 0 ? 'Durable' : 'Energy Efficient',
    i % 7 === 0 ? 'Premium Quality' : 'Eco Friendly'
  ];
  const manufacturerCountry = countries[i % countries.length];
  const warehouseLocation = warehouses[i % warehouses.length];
  const isActive = i % 3 !== 0;
  const warrantyMonths = 6 + (i % 36);
  const releaseDate = new Date(Date.now() - ((i * 17) % 3000) * 86400000).toISOString();

  products.push({
    _id: i,
    productName,
    category,
    subCategory,
    brand,
    price,
    stockQuantity,
    rating,
    discountPercent,
    soldUnits,
    availableColors,
    sizes: productSizes,
    features,
    manufacturerCountry,
    warehouseLocation,
    isActive,
    warrantyMonths,
    releaseDate
  });
}

const result = db.products.insertMany(products);
print('Inserted product count:', result.insertedCount);
print('Sample product:');
printjson(db.products.findOne());
print('Total products:', db.products.countDocuments());
