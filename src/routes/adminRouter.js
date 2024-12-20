const express = require('express')
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// import controller
const authAdminController = require('../controllers/admin/authAdminController.js')
const dashboardAdminController = require('../controllers/admin/dashboardAdminController.js')
const cateAdminController = require('../controllers/admin/cateAdminController.js')

// import middleware
const adminMiddleware = require('../middleware/adminMiddleware.js')

// admin auth
router.get('/login', adminMiddleware.checkAuth, authAdminController.getLogin)
router.post('/login', adminMiddleware.checkAuth, authAdminController.postLogin)
router.get('/logout', adminMiddleware.checkUnAuth, authAdminController.getLogout)

// admin dashboard
router.get('/dashboard', adminMiddleware.isLoggedIn, dashboardAdminController.getDashboard)
router.get('/dashboard/getChart', adminMiddleware.isLoggedIn, dashboardAdminController.getChart)
router.get('/', adminMiddleware.isLoggedIn, dashboardAdminController.getDashboard)

// admin cate management
router.post('/categories_admin/add', adminMiddleware.isLoggedIn, cateAdminController.addCategories)
router.get('/categories_admin/add', adminMiddleware.isLoggedIn, cateAdminController.getAddCategories)
router.get('/categories_admin', adminMiddleware.isLoggedIn, cateAdminController.getCategories)

// admin product management
router.post('/products_admin/add', adminMiddleware.isLoggedIn, cateAdminController.addProducts)
router.get('/products_admin/add', adminMiddleware.isLoggedIn, cateAdminController.getAddProducts)
router.get('/products_admin', adminMiddleware.isLoggedIn, cateAdminController.getProducts)




const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

//----
const upload = multer({ storage: storage });
router.post('/upload-image', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'Không có tệp nào được tải lên.' });
    }
    res.status(200).json({ success: true, imageUrl: '/uploads/' + req.file.filename });
});

module.exports = router