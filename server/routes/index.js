const { Router } = require('express');
const { endpoint } = require('../utils/endpoint');


module.exports = (query) => {
   const router = Router();
   router.use('/footer', require('./footer')(query));
   router.use('/industries', require('./industries')(query));
   router.use('/tonics-hero', require('./tonicsHero')(query));
   router.use('/hero', require('./hero')(query));
   router.use('/ingredients', require('./ingredients')(query));
   router.use('/catalog', require('./catalog')(query));
   router.use('/tonics-seo-text-full', require('./tonicsSeoTextFull')(query));
   router.use('/about', require('./about')(query));
   router.use('/navigation', require('./navigation')(query));
   router.use('/partners', require('./partners')(query));
   router.use('/form', require('./form')(query));
   router.use('/blog', require('./blog')(query));
   router.use('/seo', require('./seo')(query));
   router.use('/productHero', require('./productHero')(query));
   router.use('/cards', require('./cards')(query));
   router.use('/invitation', require('./invitation')(query));
   router.use('/characteristic', require('./characteristic')(query));
   router.use('/blogSection', require('./blogSection')(query));
return router;
 };