import { Router } from 'express';
import { getAllCategories, getCategory, getCategoryItems, getRandomProduct } from '../../models/products-data.js';

const router = Router();

/**
 * The products functionality is more complex, involving data fetching and
 * dynamic content, so it gets its own directory. This keeps the code
 * organized and makes it easier to maintain and expand.
 */

// Route for /products - redirects to a random category
router.get('/', async (req, res) => {
    const randomProduct = await getRandomProduct();
    res.redirect(`/products/${randomProduct.category}`);
});

// Route for viewing a category and its items
router.get('/:category', async (req, res) => {
    const { category } = req.params;
    const categoryData = await getCategory(category);

    if (!categoryData) {
        const err = new Error('Category Not Found');
        err.status = 404;
        throw err;
    }

    // Convert items object to array
    const itemsObject = await getCategoryItems(category);
    const items = itemsObject ? Object.values(itemsObject) : [];

    res.render('products', {
        title: `Exploring ${categoryData.name}`,
        categoryId: category,
        categoryName: categoryData.name,
        categoryDescription: categoryData.description,
        items: items,  // Now an array
        display: req.query.display || 'grid'
    });
});

// View one product in detail
router.get('/item/:itemId', async (req, res) => {
    const { itemId } = req.params;

    const numericItemId = Number(itemId);

    const categories = await getAllCategories();
    let product = null;
    let category = null;

    for (const [catId, catData] of Object.entries(categories)) {
        if (catData.items && catData.items[numericItemId]) {
            product = {
                ...catData.items[numericItemId],
                id: numericItemId
            };
            category = {
                id: catId,
                name: catData.name
            };
            break;
        }
    }

    if (!product) {
        const err = new Error('Product Not Found');
        err.status = 404;
        throw err;
    }

    res.render('item', {
        title: product.name,
        product: product,
        category: category.id,
        categoryName: category.name,
    });
});

export default router;