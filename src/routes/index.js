import { Router } from 'express';
import productsRouter from './products/index.js';


const router = Router();

/**
 * This file groups together simple, related routes that don't require 
 * complex logic or data processing. These are often static pages or 
 * simple renders without database interaction.
 */

// Home page route
router.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// About page route  
router.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// Default products route (redirects to grid view)
router.use('/products', productsRouter);

// router.get('/products', (req, res) => {
//     res.redirect('/products/grid');
// });

// // Products page route with display mode validation
// router.get('/products/:display', (req, res) => {
//     const title = "Our Products";
//     const { display } = req.params;
//     res.render('products', { title, products, display });
// });

export default router;