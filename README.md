# MongoDB E-Commerce Project

This is a complete, step-by-step MongoDB project for an e-commerce system.

It includes:

1. Database creation
2. Large dataset generation with multiple fields
3. CRUD operations
4. Read operations with conditions like greater than, less than, and range queries
5. Sort and limit operations
6. Indexing
7. Aggregation pipeline and single-purpose aggregation

## Project Structure

- `scripts/01_create_database.js`
- `scripts/02_crud_operations.js`
- `scripts/03_indexing.js`
- `scripts/04_aggregation.js`
- `README.md`

## How to run

Open MongoDB Shell and load scripts in order:

```bash
mongosh
```

```javascript
load('scripts/01_create_database.js')
load('scripts/02_crud_operations.js')
load('scripts/03_indexing.js')
load('scripts/04_aggregation.js')
```

## Database Name

```javascript
use ecommerce_db
```

## Collection

```javascript
db.products
```

## Sample Fields in Dataset

- productName
- category
- subCategory
- brand
- price
- stockQuantity
- rating
- discountPercent
- soldUnits
- availableColors
- sizes
- features
- manufacturerCountry
- warehouseLocation
- isActive
- warrantyMonths
- releaseDate

This dataset is large and suitable for indexing and aggregation performance demonstrations.
