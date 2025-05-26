import { getNavigationCategories } from '../models/categories/index.js';

/**
 * Middleware to add navigation categories to all templates.
 * This makes navigation data available without explicitly passing it in each route.
 */
async function addNavigationData(req, res, next) {
    try {
        const navigationCategories = await getNavigationCategories();
        res.locals.navigationCategories = navigationCategories;
        next();
    } catch (error) {
        console.error('Error loading navigation data:', error.message);
        // Continue without navigation data rather than failing the request
        res.locals.navigationCategories = [];
        next();
    }
}

export { addNavigationData };


// Middleware to add global data to res.locals
export const addGlobalData = (req, res, next) => {

    // Get the current year for copyright notice
    res.locals.currentYear = new Date().getFullYear();

    // Add NODE_ENV for all views
    res.locals.NODE_ENV = process.env.NODE_ENV || 'development';

    next();
};



